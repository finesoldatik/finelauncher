use std::fs;
use std::fs::File;
use std::path::Path;
use std::io::Write;

// #[tauri::command]
// pub fn read_json_file(file_path: String) -> Result<String, String> {
//     let path = Path::new(&file_path);
//     fs::read_to_string(path).map_err(|e| e.to_string())
// }

#[tauri::command]
pub fn save_json_file(file_path: String, content: String) -> Result<(), String> {
    let path = Path::new(&file_path);

    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }

    let mut file = File::create(path).map_err(|e| e.to_string())?;

    file.write_all(content.as_bytes()).map_err(|e| e.to_string())?;

    Ok(())
}