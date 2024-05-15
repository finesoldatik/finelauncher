// Setup warnings/errors:
#![forbid(unsafe_code)]
#![deny(bare_trait_objects, unused_doc_comments, unused_import_braces)]
// Clippy:
#![warn(clippy::all, clippy::nursery, clippy::pedantic)]
#![allow(clippy::non_ascii_literal)]

use crate::directory::{mkdir, get_path, exists};
use crate::unzipper::unzip;

use downloader::Downloader;

use tauri::Window;

use std::path::Path;
use std::thread;

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

// Define a custom progress reporter:
struct SimpleReporterPrivate {
  last_update: std::time::Instant,
  max_progress: Option<u64>,
  message: String,
}
struct SimpleReporter {
  private: std::sync::Mutex<Option<SimpleReporterPrivate>>,
  window: Window,
}

impl SimpleReporter {
  #[cfg(not(feature = "tui"))]
  fn create(window: Window) -> std::sync::Arc<Self> {
    std::sync::Arc::new(Self {
      private: std::sync::Mutex::new(None),
      window: window,
    })
  }
}

impl downloader::progress::Reporter for SimpleReporter {
  fn setup(&self, max_progress: Option<u64>, message: &str) {
    let private = SimpleReporterPrivate {
      last_update: std::time::Instant::now(),
      max_progress,
      message: message.to_owned(),
    };

    let mut guard = self.private.lock().unwrap();
    *guard = Some(private);
  }

  fn progress(&self, current: u64) {
    if let Some(p) = self.private.lock().unwrap().as_mut() {
      let max_bytes = match p.max_progress {
        Some(bytes) => format!("{:?}", bytes),
        None => "{unknown}".to_owned(),
      };
      if p.last_update.elapsed().as_millis() >= 1000 {
        let progress = format!("{current} of {max_bytes} bytes. [{0}]", p.message);
        println!(
          "test file: {} of {} bytes. [{}]",
          current, max_bytes, p.message
        );
        self.window.emit("update-mod-download-progress", Payload { message: progress.into() }).unwrap();
        p.last_update = std::time::Instant::now();
      }
    }
  }

  fn set_message(&self, message: &str) {
    println!("test file: Message changed to: {}", message);
    self.window.emit("update-mod-download-progress", Payload { message: message.into() }).unwrap();
  }

  fn done(&self) {
    let mut guard = self.private.lock().unwrap();
    *guard = None;
    println!("test file: [DONE]");
    self.window.emit("update-mod-download-progress", Payload { message: "[DONE]".into() }).unwrap();
  }
}

#[tauri::command(rename_all = "snake_case")]
pub async fn download_mod(window: Window, url: String, version: String, mod_name: String) {
  let mod_path: String = get_path().unwrap() + "/finelauncher/versions/" + &version + "/res/content/" + &mod_name;
  let path = Path::new(&mod_path);
  if !exists(path) {
    thread::scope(|s| {
      s.spawn(move || {
        println!("ЗАГРУЗКА ВЕРСИИ НАЧАТА");

        let filename: String = format!("mod.zip");
        println!("{:?}", filename);
        let path = format!("versions/{version}/res/content/{mod_name}/");
        let save_path = Path::new(&get_path().unwrap()).join(format!("finelauncher/{path}"));
        mkdir(&path);

        let mut downloader = Downloader::builder()
          .download_folder(&save_path)
          .parallel_requests(1)
          .build()
          .unwrap();

        let dl = downloader::Download::new(&url)
          .file_name(std::path::Path::new(&filename));
        
        #[cfg(not(feature = "tui"))]
        let dl = dl.progress(SimpleReporter::create(window));

        #[cfg(feature = "verify")]
        let dl = {
          use downloader::verify;
          fn decode_hex(s: &str) -> Result<Vec<u8>, std::num::ParseIntError> {
            (0..s.len())
              .step_by(2)
              .map(|i| u8::from_str_radix(&s[i..i + 2], 16))
              .collect()
          }
          dl.verify(verify::with_digest::<sha3::Sha3_256>(
            decode_hex("2197e485d463ac2b868e87f0d4547b4223ff5220a0694af2593cbe7c796f7fd6").unwrap(),
          ))
        };

        let result = downloader.download(&[dl]).unwrap();

        for r in result {
          match r {
            Err(e) => println!("Error: {}", e.to_string()),
            Ok(s) => {
              println!("Success: {}", &s);
              let file = save_path.join(format!("mod.zip"));
              unzip(&file.display().to_string(), save_path.clone());
            },
          };
        }
        println!("ЗАГРУЗКА МОДА ЗАВЕРШЕНА");
      });
    });
  } else {
    println!("МОД УЖЕ УСТАНОВЛЕН")
  }
}