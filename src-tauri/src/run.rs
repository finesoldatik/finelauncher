use crate::directory::{exists, get_path, get_executable};

use tokio::process::{Child, Command};
use tokio::io::{AsyncBufReadExt, BufReader};
use std::process::Stdio;
use serde::Serialize;

#[cfg(target_os = "windows")]
use std::process::Command as StdCommand;

#[cfg(not(target_os = "windows"))]
use nix::sys::signal::{kill, Signal};
#[cfg(not(target_os = "windows"))]
use nix::unistd::Pid;

#[derive(Clone, Serialize)]
struct LogMessage {
    message: String,
}

#[tauri::command(rename_all = "snake_case")]
pub async fn run_game(window: tauri::Window, version_name: String) -> Result<(), String> {
  let version_path: String = get_path().unwrap() + "/finelauncher/versions/" + &version_name;
  if exists(&version_path) {
    let mut child: Child;
    #[cfg(target_os = "windows")]
    {
      child = Command::new(get_executable(&version_path, Some("*.exe")).expect("Game executable not found"))
        .current_dir(&version_path)
        .stdout(Stdio::piped())
        .spawn()
        .map_err(|e| e.to_string())?;
    }
    #[cfg(not(target_os = "windows"))]
    {
      let executable: &str = get_executable(&version_path, Some("*.AppImage")).expect("Game executable not found");
      child = Command::new(&executable + " --appimage-extract && " + &version_path + "/squashfs-root/AppRun")
        .current_dir(&version_path + "/squashfs-root/")
        .args(["--res", &(version_path + "/squashfs-root/usr/share/VoxelEngine/res")])
        .stdout(Stdio::piped())
        .spawn()
        .map_err(|e| e.to_string())?;
    }

    let pid = child.id().expect("Failed to get PID of the game process");
    window.emit("game_process_started", pid).expect("Failed to emit game process PID");

    let window_clone = window.clone();

    tauri::async_runtime::spawn(async move {
      if let Some(stdout) = child.stdout.take() {
        let reader = BufReader::new(stdout);
        let mut lines = reader.lines();

        while let Ok(Some(line)) = lines.next_line().await {
          window_clone.emit("log_message", LogMessage { message: line }).expect("Failed to emit log message");
        }
      }

      let exit_status = child.wait().await.expect("Child game process wasn't running");
      let success = exit_status.success();
      window_clone.emit("game_process_ended", success).expect("Failed to emit game process ended event");

      if success {
        println!("Game process exited successfully");
      } else {
        println!("Game process exited with status: {:?}", exit_status.code());
      }
    });
  }
  Ok(())
}

#[tauri::command]
pub async fn terminate_game(pid: u32) -> Result<(), String> {
  #[cfg(target_os = "windows")]
  {
    let status = StdCommand::new("taskkill")
      .args(&["/PID", &pid.to_string(), "/F"])
      .status()
      .expect("Failed to kill the game process");

    if status.success() {
      Ok(())
    } else {
      Err("Failed to terminate the game process.".to_string())
    }
  }

  #[cfg(not(target_os = "windows"))]
  {
    let result = kill(Pid::from_raw(pid as i32), Signal::SIGTERM);

    match result {
      Ok(_) => Ok(()),
      Err(_) => Err("Failed to terminate the game process.".to_string()),
    }
  }
}
