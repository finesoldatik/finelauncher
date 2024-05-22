use std::io::Cursor;
use std::path::Path;
use std::fs::File;
use std::io::Read;
use std::fs;

fn get_file_as_byte_vec(filename: &str) -> Vec<u8> {
  let mut f = File::open(&filename).expect("no file found");
  let metadata = fs::metadata(&filename).expect("unable to read metadata");
  let mut buffer = vec![0; metadata.len() as usize];
  f.read(&mut buffer).expect("buffer overflow");

  buffer
}

#[tauri::command(rename_all = "snake_case")]
pub fn unzip(src: String, dest: String) {
  let bytes: Vec<u8> = get_file_as_byte_vec(&src);
  let destination = Path::new(&dest).to_path_buf();
  let result = zip_extract::extract(Cursor::new(bytes), &destination, true);

  match result {
    Ok(_) => {
      let _ = fs::remove_file(src);
    },
    Err(e) => {
      println!("Extraction failed: {}", e.to_string());
    }
  }
}