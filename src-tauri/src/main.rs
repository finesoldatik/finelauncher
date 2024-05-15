// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod download_version;
mod download_mod;
mod directory;
mod unzipper;
mod run;
mod json_handler;

use crate::run::run_version;
use crate::download_version::download_version;
use crate::download_mod::download_mod;
use crate::directory::{mkdir, version_exists, mod_exists, open_directory, get_launcher_path};

fn main() {
  mkdir("");
  mkdir("versions\\");

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![run_version, download_version, version_exists, mod_exists, open_directory, get_launcher_path, download_mod])
    .run(tauri::generate_context!())
    .expect("error while running finelauncher");
}
