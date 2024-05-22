use std::path::Path;

use downloader::Downloader;

#[tauri::command(rename_all = "snake_case")]
pub async fn download_file(url: String, dest: String){
  let save_path = Path::new(&dest);

  let mut downloader = Downloader::builder()
    .download_folder(save_path)
    .parallel_requests(1)
    .build()
    .unwrap();

  let dl = downloader::Download::new(&url);

  let result = downloader.download(&[dl]).unwrap();
  for r in result {
    match r {
      Err(e) => println!("Error: {}", e.to_string()),
      Ok(s) => {
        println!("Success: {}", &s);
      }
    };
  }
}