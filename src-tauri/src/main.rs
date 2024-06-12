// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chrono::Utc;
use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};

mod download;
mod run;
mod unzip;

use crate::download::download_file;
use crate::run::{run_game, build_game, terminate_process};
use crate::unzip::unzip;

// Из tauri.conf.json, это конфиг для окна оверлея (когда будет готов функционал для поддержки оверлея нужно будет это вернуть)
// {
// 	"title": "finelauncher Overlay",
// 	"fullscreen": true,
// 	"maximized": true,
// 	"resizable": false,
// 	"transparent": true,
// 	"decorations": false,
// 	"url": "/overlay",
//     "label": "overlay"
// }

fn main() {
    let client_id = "1249433232915824751";
    let mut client = DiscordIpcClient::new(client_id).expect("Discord Rich Presence error");
    match client.connect() {
        Ok(()) => {
            let timestamp = Utc::now().timestamp();

            let payload = activity::Activity::new()
                .details("В лаунчере")
                .timestamps(discord_rich_presence::activity::Timestamps::new().start(timestamp))
                .assets(discord_rich_presence::activity::Assets::new().large_image("logo"))
                .buttons(vec![activity::Button::new("Присоединиться к Discord серверу", "https://discord.com/invite/KU4dXuWBVv")]);

            client
                .set_activity(payload)
                .expect("Cannot set activity message!");
        }
        Err(err) if format!("{}", err) == "Couldn't connect to the Discord IPC socket" => (),
        Err(..) => panic!("Discord Rich Presence not connected"),
    };

    #[cfg(target_os = "linux")]
    std::env::set_var(
        "GDK_BACKEND",
        std::env::var("XDG_SESSION_TYPE").unwrap_or("x11".to_owned()),
    );
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            download_file,
            unzip,
            run_game,
            build_game,
            terminate_process
        ])
        .run(tauri::generate_context!())
        .expect("error while running finelauncher");
}
