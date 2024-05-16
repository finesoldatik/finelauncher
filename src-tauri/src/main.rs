// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod download_version;
mod download_mod;
mod directory;
mod unzipper;
mod run;
mod json_handler;

use crate::run::{run_game, terminate_game};
use crate::download_version::download_version;
use crate::download_mod::download_mod;
use crate::directory::{mkdir, version_exists, mod_exists, show_in_folder, get_launcher_path};

#[cfg(target_os = "linux")]
pub struct DbusState(Mutex<Option<dbus::blocking::SyncConnection>>);

fn main() {
  mkdir("");
  mkdir("versions\\");

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![run_game, terminate_game, download_version, version_exists, mod_exists, show_in_folder, get_launcher_path, download_mod])
    .setup(|_app| Ok({
      #[cfg(target_os = "linux")]
      app.manage(DbusState(Mutex::new(dbus::blocking::SyncConnection::new_session().ok())));
    }))
    .run(tauri::generate_context!())
    .expect("error while running finelauncher");
}
