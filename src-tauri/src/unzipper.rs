use std::io::Cursor;
use std::path::PathBuf;
use std::fs::File;
use std::io::Read;
use std::fs;

fn get_file_as_byte_vec(filename: &str) -> Vec<u8> {
    let mut f = File::open(&filename).expect("no file found");
    let metadata = fs::metadata(&filename).expect("unable to read metadata");
    let mut buffer = vec![0; metadata.len() as usize];
    f.read(&mut buffer).expect("buffer overflow");

    buffer
}

pub fn unzip(_file_path: &str, _unpack_path: PathBuf) {
    let bytes: Vec<u8> = get_file_as_byte_vec(_file_path);
    let target = _unpack_path;
    let result = zip_extract::extract(Cursor::new(bytes), &target, true);

    match result {
        Ok(_) => {
            let _ = fs::remove_file(_file_path);
        },
        Err(e) => {
            println!("Extraction failed: {}", e.to_string());
        }
    }
    
}