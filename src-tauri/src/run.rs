use crate::directory::{exists, get_path};

use std::process::{Command, Stdio};
use std::io::{BufReader, BufRead};
use std::thread;
use std::sync::mpsc;
use std::path::Path;
use std::env;

#[tauri::command(rename_all = "snake_case")]
pub async fn run_version(version: String) {
  let version_path: String = get_path().unwrap() + "\\finelauncher\\versions\\" + &version;
  let path = Path::new(&version_path);
  println!("ЗАПУСК ИГРЫ ПО ПУТИ {}", path.display());
  if exists(path) {
    let (tx, rx) = mpsc::channel();
    thread::scope(|s| {
      s.spawn(move || {
        if env::consts::OS == "windows" {
          let cmd = Command::new(version_path.clone() + "\\VoxelEngine.exe")
            .args(["--res", &(version_path.clone() + "\\res"), "--user", &version_path])
            .stdout(Stdio::piped())
            .spawn()
            .unwrap();
          tx.send(cmd).unwrap();
        } else if env::consts::OS == "linux" {
          let cmd = Command::new(version_path.clone() + "/version.AppImage --appimage-extract && " + &version_path.clone() + "/squashfs-root/AppRun") //"chmod +x ".to_owned() + &version_path.clone() + " & " + &version_path.clone()
            .args(["--res", &(version_path.clone() + "/squashfs-root/usr/share/VoxelEngine/res"), "--user", &(version_path.clone() + "/squashfs-root/usr/share/VoxelEngine/")])
            .stdout(Stdio::piped())
            .spawn()
            .unwrap();
          tx.send(cmd).unwrap();
          // let cmd = Command::new(version_path.clone())
          //   .args(["--res", &(version_path.clone() + "\\res"), "--user", &version_path])
          //   .stdout(Stdio::piped())
          //   .spawn()
          //   .unwrap();
        }
      });
      s.spawn(move || {
        // надо будет посмотреть и придумать как выводить логи сразу с 2 и более запущенных игр.
        let mut cmdout = rx.recv().unwrap();
        // чистим консоль и получаем логи
        print!("{}[2J", 27 as char);
        let stdout = cmdout.stdout.as_mut().unwrap();
        let stdout_reader = BufReader::new(stdout);
        let stdout_lines = stdout_reader.lines();
        // выводим логи
        for line in stdout_lines {
          println!("ВЫВОД: {:?}", line);
        }

        cmdout.wait().unwrap();
      });
    });
  } else {
    println!("ОШИБКА! ВЕРСИЯ НЕ НАЙДЕНА")
  }
}



// #[tauri::command]
// async fn run_and_monitor_executable(
//     window: tauri::Window,
//     executable_path: String,
//     dir: String,
// ) -> Result<(), String> {
//     let mut child = tokio::process::Command::new(&executable_path)
//         .current_dir(&dir)
//         .stdout(std::process::Stdio::piped())
//         .spawn()
//         .map_err(|e| e.to_string())?;

//     // Отправляем PID внешнего процесса на фронтенд
//     let pid = child.id().expect("Failed to get PID of the process");
//     window.emit("process_started", pid).expect("Failed to emit process PID");

//     let window_clone = window.clone();

//     tauri::async_runtime::spawn(async move {
//         if let Some(stdout) = child.stdout.take() {
//             let reader = BufReader::new(stdout);
//             let mut lines = reader.lines();
//         }

//         let exit_status = child.wait().await.expect("Child process wasn't running");
//         let success = exit_status.success();

//         if success {
//             println!("Process exited successfully");
//         } else {
//             println!("Process exited with status: {:?}", exit_status.code());
//         }
//     });

//     Ok(())
// }