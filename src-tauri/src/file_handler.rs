#[tauri::command]
pub fn remove_file(file_path: String) {
    let path = PathBuf::from(file_path);

    match fs::remove_file(&path) {
        Ok(_) => println!("File successfully removed: {:?}", path),
        Err(e) => eprintln!("Error removing file {:?}: {}", path, e),
    }
}

#[tauri::command]
pub fn create_file(file_path: String) -> Result<(), String> {
    if let Err(err) = std::thread::spawn(move || -> io::Result<()> {
        File::create(&file_path)?;
        Ok(())
    })
        .join()
        .map_err(|err| format!("Failed to execute thread: {:?}", err))?
    {
        return Err(format!("Failed to create file: {:?}", err));
    }
    Ok(())
}