pub async fn download(
    url: &str,
    name: &str,
    mut progress_callback: impl FnMut(f32),
) -> Result<Vec<u8>, String> {
    let bytes = match reqwest::ClientBuilder::new()
        .user_agent("finelauncherWGET/1.0")
        .build()
        .unwrap()
        .get(url)
        .send()
        .await
    {
        Ok(mut response) => {
            let download = || async move {
                let mut bytes = Vec::new();
                let mut progress = 0;
                let content_length = response.content_length();
                while let Some(chunk) = response.chunk().await? {
                    bytes.extend_from_slice(&chunk);
                    progress += chunk.len();
                    if let Some(length) = content_length {
                        progress_callback(progress as f32 / length as f32);
                    }
                }
                Ok(bytes)
            };
            download().await
        }
        Err(err) => Err(err),
    };
    bytes.map_err(|err| format!("Failed to download {}: {}", name, err))
}

#[tauri::command(rename_all = "snake_case")]
pub async fn download_file(
    window: tauri::Window,
    url: String,
    dest: String,
    out_filename: String,
) -> Result<(), String> {
    let out_path = std::path::Path::new(&dest).join(&out_filename);

    let bytes = download(&url, &out_filename, |progress| {
        window
            .emit("download_progress", progress * 100.0)
            .expect("Failed to emit download progress");
    })
    .await?;

    if !out_filename.ends_with(".AppImage") {
        zip_extract::extract(std::io::Cursor::new(bytes), &out_path, true)
            .map_err(|err| format!("Extraction failed: {}", err))?;
    } else {
        let mut binfile = tokio::fs::File::create(&out_path).await.unwrap();
        tokio::io::copy(&mut std::io::Cursor::new(bytes), &mut binfile).await.unwrap();
        drop(binfile);
    }

    Ok(())
}
