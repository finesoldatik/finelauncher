// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod download;
mod directory;
mod unzipper;
mod run;

use crate::run::run_version;
use crate::download::download_version;
use crate::directory::{mkdir, version_exists, open_directory, get_launcher_path};

fn main() {
  mkdir("");
  mkdir("versions\\");

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![run_version, download_version, version_exists, open_directory, get_launcher_path])
    .run(tauri::generate_context!())
    .expect("error while running finelauncher");
}
