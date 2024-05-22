// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod download;
mod run;
mod unzip;

use crate::download::download_file;
use crate::run::run_game;
use crate::unzip::unzip;

fn main() {
  #[cfg(target_os = "linux")]
  std::env::set_var(
    "GDK_BACKEND",
    std::env::var("XDG_SESSION_TYPE").expect("x11"),
  );
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![download_file, unzip, run_game])
    .run(tauri::generate_context!())
    .expect("error while running finelauncher");
}
