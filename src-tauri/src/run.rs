use std::path::Path;
use std::process::Stdio;
use tokio::io::{AsyncBufReadExt, BufReader};
use tokio::process::Command;

#[tauri::command(rename_all = "snake_case")]
pub async fn run_game(
  window: tauri::Window,
  executable: String,
  instance_path: String,
) -> Result<(), String> {
  let mut child = Command::new(&executable)
    .arg("--dir ./")
    .current_dir(Path::new(&instance_path))
    .stdout(Stdio::piped())
    .spawn()
    .map_err(|e| e.to_string())?;
  let pid = child.id().expect("Failed to get PID of the game process");
  window
    .emit("game_process_started", pid)
    .expect("Failed to emit game process PID");

  let window_clone = window.clone();

  tauri::async_runtime::spawn(async move {
    if let Some(stdout) = child.stdout.take() {
      let reader = BufReader::new(stdout);
      let mut lines = reader.lines();

      while let Ok(Some(line)) = lines.next_line().await {
        window_clone
          .emit("log_message", line)
          .expect("Failed to emit log message");
      }
    }
    let exit_status = child
      .wait()
      .await
      .expect("Child game process wasn't running");
    let success = exit_status.success();
    window_clone
      .emit("game_process_ended", success)
      .expect("Failed to emit game process ended event");

    if success {
      println!("Game process exited successfully");
    } else {
      println!("Game process exited with status: {:?}", exit_status.code());
    }
  });
  Ok(())
}