mod download;
mod run;
mod unzip;
mod discord_presence;

use crate::download::download_file;
use crate::run::{build_game, run_game, terminate_process};
use crate::unzip::unzip;
use crate::discord_presence::{discord_presence, reconnect_discord};
use discord_rich_presence::{DiscordIpc, DiscordIpcClient};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let client_id = "1249433232915824751";
    let mut client = DiscordIpcClient::new(client_id).expect("Discord Rich Presence error");

    let mut is_discord_connected = false;

    match client.connect() {
        Ok(()) => is_discord_connected = true,
        Err(err) if format!("{}", err) == "Couldn't connect to the Discord IPC socket" => (),
        Err(..) => (),
    };

    #[cfg(target_os = "linux")]
    std::env::set_var(
        "GDK_BACKEND",
        std::env::var("XDG_SESSION_TYPE").unwrap_or("x11".to_owned()),
    );
    tauri::Builder::default()
        .manage(std::sync::Mutex::new(client))
        .manage(std::sync::Mutex::new(is_discord_connected))
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            discord_presence,
            reconnect_discord,
            download_file,
            unzip,
            run_game,
            build_game,
            terminate_process
        ])
        .run(tauri::generate_context!())
        .expect("error while running finelauncher");
}