// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};
use chrono::Utc;

mod download;
mod run;
mod unzip;

use crate::download::download_file;
use crate::run::{run_game, terminate_process};
use crate::unzip::unzip;

fn main() {
  let client_id = "1249433232915824751";
  let mut client = DiscordIpcClient::new(client_id).expect("Discord Rich Presence error");
  client.connect().expect("Discord Rich Presence not connected");

  let timestamp = Utc::now().timestamp();

  let payload = activity::Activity::new()
    .details("В лаунчере")
    .timestamps(discord_rich_presence::activity::Timestamps::new().start(timestamp))
    .assets(discord_rich_presence::activity::Assets::new().large_image("logo"));

  client.set_activity(payload).expect("Cannot set activity message!");

  #[cfg(target_os = "linux")]
  std::env::set_var(
    "GDK_BACKEND",
    std::env::var("XDG_SESSION_TYPE").unwrap_or("x11".to_owned()),
  );
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![download_file, unzip, run_game, terminate_process])
    .run(tauri::generate_context!())
    .expect("error while running finelauncher");
}
