use crate::directory::{exists, get_path};

use std::process::{Command, Stdio};
use std::io::{BufReader, BufRead};
use std::thread;
use std::sync::mpsc;
use std::path::Path;

#[tauri::command(rename_all = "snake_case")]
pub async fn run_version(version: String) {
  let version_path: String = get_path().unwrap() + "\\finelauncher\\versions\\" + &version;
  let path = Path::new(&version_path);
  println!("ЗАПУСК ИГРЫ ПО ПУТИ {}", path.display());
  if exists(path) {
    let (tx, rx) = mpsc::channel();
    thread::scope(|s| {
      s.spawn(move || {
        let cmd = Command::new(version_path.clone() + "\\VoxelEngine.exe")
          .args(["--res", &(version_path.clone() + "\\res"), "--user", &version_path])
          .stdout(Stdio::piped())
          .spawn()
          .unwrap();
        tx.send(cmd).unwrap();
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