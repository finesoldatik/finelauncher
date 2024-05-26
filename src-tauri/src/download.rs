use std::path::Path;

use downloader::Downloader;
use std::thread;

use crate::unzip::unzip;

#[tauri::command(rename_all = "snake_case")]
pub async fn download_file(url: String, dest: String) {
  thread::scope(|s| {
    s.spawn(move || {
      let save_path = Path::new(&dest);

      let mut downloader = Downloader::builder()
        .download_folder(save_path)
        .parallel_requests(1)
        .build()
        .unwrap();

      let filename: String;
      #[cfg(target_os = "windows")]
      {
        println!("os: windows");
        filename = format!("version.zip");
        println!("{:?}", filename)
      }
      #[cfg(not(target_os = "windows"))]
      {
        println!("os: linux");
        filename = format!("version.AppImage");
        println!("{:?}", filename)
      }

      let dl = downloader::Download::new(&url)
        .file_name(std::path::Path::new(&filename));

      let result = downloader.download(&[dl]).unwrap();
      for r in result {
        match r {
          Err(e) => println!("Error: {}", e.to_string()),
          Ok(s) => {
            println!("Success: {}", &s);
            println!("{}", &(dest.clone() + "/" + &filename));
            #[cfg(target_os = "windows")]
            {
              unzip(&(dest.clone() + "/" + &filename), &dest)
            }
          }
        };
      }
    });
  })
}