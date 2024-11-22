use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};
use std::time::{SystemTime, UNIX_EPOCH};

#[tauri::command(rename_all = "snake_case")]
pub async fn discord_presence(
    client: tauri::State<'_, std::sync::Mutex<DiscordIpcClient>>,
    is_discord_connected: tauri::State<'_, std::sync::Mutex<bool>>,
    message: &str,
) -> Result<(), String> {
    println!("Discord connected? {:?}", is_discord_connected);

    if *is_discord_connected.lock().unwrap() == false {
        return Err("Discord not connected".to_string());
    }
    
    let assets = activity::Assets::new()
        .large_image("logo")
        .small_image("ve");

    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs();

    let payload = activity::Activity::new()
        .details(message)
        .timestamps(activity::Timestamps::new().start(timestamp.try_into().unwrap()))
        .assets(assets)
        .buttons(vec![activity::Button::new("Join Discord Server", "https://discord.com/invite/uzrJwm8pTK")]);

    match client.lock().unwrap().set_activity(payload) {// .map_err(|err| format!("Failed to set activity: {}", err))
        Ok(()) => Ok(()),
        Err(err) if format!("{}", err) == "Couldn't set activity to the Discord IPC socket" => {
            println!("Couldn't set activity to the Discord IPC socket");
            Ok(())
        },
        Err(..) => Ok(()),
    }
}

#[tauri::command(rename_all = "snake_case")]
pub fn is_connected(is_discord_connected: tauri::State<'_, std::sync::Mutex<bool>>,) -> String {
    return is_discord_connected.lock().unwrap().to_string();
}

#[tauri::command(rename_all = "snake_case")]
pub async fn reconnect_discord(
    client: tauri::State<'_, std::sync::Mutex<DiscordIpcClient>>,
    is_discord_connected: tauri::State<'_, std::sync::Mutex<bool>>,
) -> Result<(), String> {

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