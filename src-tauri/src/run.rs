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
    let mut child: tokio::process::Child;
    #[cfg(target_os = "windows")]
    {
        const CREATE_NO_WINDOW: u32 = 0x08000000;
        child = Command::new(executable)
            .current_dir(Path::new(&instance_path))
            .args(["--dir", &instance_path])
            .creation_flags(CREATE_NO_WINDOW)
            .stdout(Stdio::piped())
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    #[cfg(not(target_os = "windows"))]
    {
        child = Command::new(executable)
            .current_dir(Path::new(&instance_path))
            .args(["--dir", &instance_path])
            .stdout(Stdio::piped())
            .spawn()
            .map_err(|e| e.to_string())?;
    }
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
                println!("[STDOUT] {:}", line);
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

#[tauri::command(rename_all = "snake_case")]
pub async fn build_game(
    source_path: String,
    build_commands: Vec<String>,
) -> Result<String, String> {
    let source_path = std::path::PathBuf::from(source_path);
    for command in &build_commands[..build_commands.len() - 1] {
        println!("{}", command);
        let (path, command_str) = if command.starts_with("@") {
            let (path, command) = command
                .split_once(' ')
                .ok_or(format!("Invalid @path, missing command: {}", command))?;
            (source_path.join(&path[1..]), command)
        } else {
            (source_path.clone(), command.as_str())
        };
        let command = command_str.split(' ').collect::<Vec<_>>();

        let mut process = Command::new(
            command
                .first()
                .ok_or(format!("Malformed command: {}", command_str))?,
        );
        // #[cfg(target_os = "windows")]
        // {
        //     const CREATE_NO_WINDOW: u32 = 0x08000000;
        //     process.creation_flags(CREATE_NO_WINDOW);
        // }
        process
            .current_dir(path)
            .args(&command[1..])
            .status()
            .await
            .map_err(|e| println!("{}", e))
            .ok();
    }
    build_commands
        .into_iter()
        .last()
        .ok_or("No build artifact in build instructions".to_owned())
}

#[tauri::command(rename_all = "snake_case")]
pub async fn terminate_process(pid: u32) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        use std::process::Command;
        let status = Command::new("taskkill")
            .args(&["/PID", &pid.to_string(), "/F"])
            .status()
            .expect("Failed to kill the process");

        if status.success() {
            Ok(())
        } else {
            Err("Failed to terminate the process.".to_string())
        }
    }

    #[cfg(not(target_os = "windows"))]
    {
        use nix::sys::signal::{kill, Signal};
        use nix::unistd::Pid;

        let result = kill(Pid::from_raw(pid as i32), Signal::SIGTERM);

        match result {
            Ok(_) => Ok(()),
            Err(_) => Err("Failed to terminate the process.".to_string()),
        }
    }
}
