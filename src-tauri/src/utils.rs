use tauri::{Manager, Runtime};
use window_shadows::set_shadow;

pub fn set_window_shadow<R: Runtime>(app: &tauri::App<R>) {
  let window = app.get_window("customization").unwrap();
  set_shadow(&window, true).expect("Unsupported platform!");
}