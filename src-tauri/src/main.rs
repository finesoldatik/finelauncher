// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Window};

mod download;
mod run;
mod unzip;

use crate::download::download_file;
use crate::run::{run_game, terminate_process};
use crate::unzip::unzip;

// Create the command:
// This command must be async so that it doesn't run on the main thread.
#[tauri::command]
async fn close_splashscreen(window: Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap()
  }
  // Show main window
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}

fn main() {
  #[cfg(target_os = "linux")]
  std::env::set_var(
    "GDK_BACKEND",
    std::env::var("XDG_SESSION_TYPE").expect("x11"),
  );
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![close_splashscreen, download_file, unzip, run_game, terminate_process])
    .run(tauri::generate_context!())
    .expect("error while running finelauncher");
}
