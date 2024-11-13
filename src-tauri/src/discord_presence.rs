use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};

#[tauri::command(rename_all = "snake_case")]
pub async fn discord_presence(
    client: tauri::State<'_, std::sync::Mutex<DiscordIpcClient>>,
    is_discord_connected: tauri::State<'_, std::sync::Mutex<bool>>,
    message: &str,
) ->Result<(), String>{

    if *is_discord_connected.lock().unwrap() == false {
        return Err("Discord not connected".to_string());
    }

    let timestamp = 0;
    let payload = activity::Activity::new()
        .details(message)
        .timestamps(discord_rich_presence::activity::Timestamps::new().start(timestamp))
        .assets(discord_rich_presence::activity::Assets::new().large_image("logo"))
        .buttons(vec![activity::Button::new("Присоединиться к Discord серверу", "https://discord.com/invite/KU4dXuWBVv")]);

    match client.lock().unwrap().set_activity(payload) {// .map_err(|err| format!("Failed to set activity: {}", err))
        Ok(()) => Ok(()),
        Err(err) if format!("{}", err) == "Couldn't set activity to the Discord IPC socket" => Ok(()),
        Err(..) => Ok(()),
    }
}

#[tauri::command(rename_all = "snake_case")]
pub async fn reconnect_discord(
    client: tauri::State<'_, std::sync::Mutex<DiscordIpcClient>>,
    is_discord_connected: tauri::State<'_, std::sync::Mutex<bool>>,
) ->Result<(), String>{

    if *is_discord_connected.lock().unwrap() == true {
        client.lock().unwrap()
            .reconnect().map_err(|err| format!("Failed to reconnect: {}", err))
    } else {
        *is_discord_connected.lock().unwrap() = false;
        match client.lock().unwrap().connect() {
            Ok(()) => {
                *is_discord_connected.lock().unwrap() = true;
                return Ok(())
            }
            Err(err) if format!("{}", err) == "Couldn't connect to the Discord IPC socket" => Ok(()),
            Err(..) => Ok(()),
        }
    }
}