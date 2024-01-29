// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod tray;
mod menu;
mod events;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn theme_changed(name: &str) {
    println!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_docs(handle: tauri::AppHandle) {
    let docs_window = tauri::WindowBuilder::new(
        &handle,
        "docs", /* the unique window label */
        tauri::WindowUrl::External("https://tauri.app/".parse().unwrap())
    ).title("Docs").build().unwrap();
}

fn main() {
    tauri::Builder::default()
        .menu(menu::init("FaForever"))
        .on_menu_event(menu::handle_menu_event)
        .system_tray(tray::main_menu())
        .invoke_handler(tauri::generate_handler![theme_changed])
        .invoke_handler(tauri::generate_handler![open_docs])
        .on_system_tray_event(tray::handler)
        .on_window_event(events::handle_window_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
