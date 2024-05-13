use directories::UserDirs;
use std::io;
use std::fs;
use std::path::Path;
use std::process::Command;
use glob::glob;

pub fn get_path() -> Result<String, io::Error> {
  let user_dirs = UserDirs::new().ok_or(io::Error::new(io::ErrorKind::Other, "Unable to retrieve user directories"))?;
  match user_dirs.document_dir() {
    Some(p) => Ok(p.display().to_string()),
    None => Err(io::Error::new(io::ErrorKind::NotFound, "User documents directory not found")),
  }
}

pub fn mkdir(path: &str) {
  let docs: String = get_path().unwrap() + "\\finelauncher\\" + path;
  let path = Path::new(&docs);
  if exists(path) == false {
    let _ = fs::create_dir(docs);
  }
}

pub fn exists(path: &Path) -> bool {
  fs::metadata(path).is_ok()
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_launcher_path() -> String {
  let launcher_path: String = get_path().unwrap() + "\\finelauncher\\";
  launcher_path.into()
}

#[tauri::command(rename_all = "snake_case")]
pub fn version_exists(version: &str) -> bool {
  let docs: String = get_path().unwrap() + "\\finelauncher\\versions\\" + version;
  let path = Path::new(&docs);
  exists(path).into()
}

#[tauri::command(rename_all = "snake_case")]
pub async fn open_directory(version: String) {
  let version_path: String = get_path().unwrap() + "\\finelauncher\\versions\\" + &version;
  let path = Path::new(&version_path);
  if exists(path) {
    Command::new("explorer").arg(&version_path).spawn().unwrap();
  }
}

pub fn get_exe(p: &str) -> Option<String> {
  let source_file_glob = p;

  for entry in glob(format!("{}/{}", source_file_glob, "*.exe").as_str())
    .unwrap() {
      if let Ok(path) = entry {
        if let Some(path) = path.to_str() {
          return Some(path.to_string());
        }
      }
    }
  None
}