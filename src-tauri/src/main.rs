// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::{
  utils::{set_window_shadow}
};

mod utils;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      set_window_shadow(app);
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}