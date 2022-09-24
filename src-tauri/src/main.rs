#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::sync::Mutex;
use tauri::State;

#[derive(Default)]
struct PixelState(Mutex<bool>);

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("你好, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn step_result(state: State<PixelState>) -> bool {
    let mut pixel_state = state.0.lock().unwrap();
    *pixel_state = !(*pixel_state);
    *pixel_state
}

fn main() {
    tauri::Builder::default()
        .manage(PixelState(Default::default()))
        .invoke_handler(tauri::generate_handler![greet, step_result])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
