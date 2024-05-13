use crate::directory::{exists, get_path, get_exe};

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
  println!("ЗАПУСК ИГРЫ С ПОМОЩЬЮ {}", get_exe(&version_path).unwrap());
  if exists(path) {
    let (tx, rx) = mpsc::channel();
    thread::scope(|s| {
      s.spawn(move || {
        if env::consts::OS == "windows" {
          let cmd = Command::new(get_exe(&version_path).unwrap())
            .current_dir(version_path.clone())
            .args(["--res", &(version_path.clone() + "\\res"), "--user", &version_path])
            .stdout(Stdio::piped())
            .spawn()
            .map_err(|e| e.to_string());
          tx.send(cmd.expect("REASON")).unwrap();
        } else if env::consts::OS == "linux" {
          let cmd = Command::new(version_path.clone() + "/version.AppImage --appimage-extract && " + &version_path.clone() + "/squashfs-root/AppRun") //"chmod +x ".to_owned() + &version_path.clone() + " & " + &version_path.clone()
            .current_dir(version_path.clone() + "/squashfs-root/")
            .args(["--res", &(version_path.clone() + "/squashfs-root/usr/share/VoxelEngine/res"), "--user", &(version_path.clone() + "/squashfs-root/usr/share/VoxelEngine/")])
            .stdout(Stdio::piped())
            .spawn()
            .map_err(|e| e.to_string());
          tx.send(cmd.expect("REASON")).unwrap();
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

        cmdout.wait().expect("Error while stdout cmd");
      });
    });
  } else {
    println!("ОШИБКА! ВЕРСИЯ НЕ НАЙДЕНА")
  }
}
