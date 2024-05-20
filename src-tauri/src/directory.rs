use directories::UserDirs;
use std::io;
use std::fs;
use std::process::Command;
use glob::glob;

#[cfg(not(target_os = "windows"))]
use std::path::PathBuf;

#[cfg(target_os = "linux")]
use tauri::State;
#[cfg(target_os = "linux")]
use crate::DbusState;
#[cfg(target_os = "linux")]
use std::time::Duration;

pub fn get_path() -> Result<String, io::Error> {
  let user_dirs = UserDirs::new().ok_or(io::Error::new(io::ErrorKind::Other, "Unable to retrieve user directories"))?;
  match user_dirs.document_dir() {
    Some(p) => Ok(p.display().to_string()),
    None => Err(io::Error::new(io::ErrorKind::NotFound, "User documents directory not found")),
  }
}

pub fn mkdir(path: &str) {
  let docs: String = get_path().unwrap() + "/finelauncher/" + path;
  if exists(&docs) == false {
    let _ = fs::create_dir_all(docs);
  }
}

pub fn exists(path: &str) -> bool {
  fs::metadata(path).is_ok()
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_launcher_path() -> String {
  let launcher_path: String = get_path().unwrap() + "/finelauncher/";
  launcher_path.into()
}

#[tauri::command(rename_all = "snake_case")]
pub fn version_exists(version: &str) -> bool {
  let version_path: String = get_path().unwrap() + "/finelauncher/versions/" + version;
  exists(&version_path).into()
}

#[tauri::command(rename_all = "snake_case")]
pub fn mod_exists(version: &str, mod_name: &str) -> bool {
  let mod_path: String = get_path().unwrap() + "/finelauncher/versions/" + version + "/res/content/" + mod_name;
  exists(&mod_path).into()
}

pub fn get_files_by_extension(p: &str, ext: Option<&str>) -> Option<String> {
  let source_file_glob = p;

  for entry in glob(format!("{}/{}", source_file_glob, ext.unwrap_or("*.exe")).as_str())
    .unwrap() {
      if let Ok(path) = entry {
        if let Some(path) = path.to_str() {
          return Some(path.to_string());
        }
      }
    }
  None
}

// use std::fs::rename;
// use std::path::PathBuf;

// pub fn get_mod(path: &str, mod_path: &str) {
//   for file in glob(&(mod_path.to_owned() + "*")).expect("reason") {
//     if let Ok(file_path) = file {
//       if file_path {
//         println!("НАШЕЛСЯ ПЕКЕЙДЖ ДЖСОН ==========================================================================================================")
//       } else {
//         if file_path.is_dir() {
//           get_mod(file_path.to_str().expect("reason"), mod_path)
//         } else {
//           for file in glob(&(path.to_owned() + "*")).expect("reason") {}
//         }
//       }
//     }
//   }
// }

#[cfg(target_os = "linux")]
#[tauri::command]
pub fn show_in_folder(version: String, dbus_state: State<DbusState>) -> Result<(), String> {
  let version_path: String = get_path().unwrap() + "/finelauncher/versions" + &version;
  if exists(&version_path) {
    println("Не рабочая функция, линуксоидам привет")
    // let dbus_guard = dbus_state.0.lock().map_err(|e| e.to_string())?;

    // // see https://gitlab.freedesktop.org/dbus/dbus/-/issues/76
    // if dbus_guard.is_none() || version_path.contains(",") {
    //   let mut path_buf = PathBuf::from(&version_path);
    //   let new_path = match path_buf.is_dir() {
    //     true => version_path,
    //     false => {
    //       path_buf.pop();
    //       path_buf.into_os_string().into_string().unwrap()
    //     }
    //   };
    //   Command::new("xdg-open")
    //     .arg(&new_path)
    //     .spawn()
    //     .map_err(|e| format!("{e:?}"))?;
    // } else {
    //   // https://docs.rs/dbus/latest/dbus/
    //   let dbus = dbus_guard.as_ref().unwrap();
    //   let (_,): (bool,) = zbus::connection::Connection::call_method(
    //       Some("org.freedesktop.FileManager1"),
    //       Some("/org/freedesktop/FileManager1"),
    //       Some("org.freedesktop.FileManager1"),
    //       Some("GetId"),
    //       &(),
    //       &(),
    //     )
    //     .map_err(|e| e.to_string())?;
    //   // "org.freedesktop.FileManager1",
    //   // "ShowItems",
    //   // (vec![version_path], ""),
    // }
  }
  Ok(())
}

#[cfg(not(target_os = "linux"))]
#[tauri::command]
pub fn show_in_folder(version: String) -> Result<(), String> {
  let version_path: String = get_path().unwrap() + "\\finelauncher\\versions\\" + &version;
  if exists(&version_path) {
    #[cfg(target_os = "windows")]
    {
      Command::new("explorer")
        .args(["/select,", &version_path]) // The comma after select is not a typo
        .spawn()
        .map_err(|e| e.to_string())?;
    }

    #[cfg(target_os = "macos")]
    {
      let path_buf = PathBuf::from(&version_path);
      if path_buf.is_dir() {
        Command::new("open")
          .args([&version_path])
          .spawn()
          .map_err(|e| e.to_string())?;
      } else {
        Command::new("open")
          .args(["-R", &version_path])
          .spawn()
          .map_err(|e| e.to_string())?;
      }
    }
  }
  Ok(())
}