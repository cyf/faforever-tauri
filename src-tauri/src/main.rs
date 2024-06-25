// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde_json::Value;
use std::fs::File;
use std::io::BufReader;
use std::path::PathBuf;
use tauri::Manager;

mod events;
mod menu;
mod tray;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn theme_changed(name: &str) {
    println!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_docs(handle: tauri::AppHandle) {
    tauri::WindowBuilder::new(
        &handle,
        "docs", /* the unique window label */
        tauri::WindowUrl::External("https://tauri.app/".parse().unwrap()),
    )
    .title("Docs")
    .build()
    .unwrap();
}

fn load_language_file(file_path: &str) -> Value {
    let current_dir = std::env::current_dir().expect("Failed to get current directory");
    let mut path = PathBuf::from(current_dir);
    path.push(file_path);

    println!("path: {}", path.display());
    let file = File::open(path).expect("Failed to open language file");
    let reader = BufReader::new(file);
    serde_json::from_reader(reader).expect("Failed to parse language file")
}

fn main() {
    let lang = "en";
    let lang_file_path = format!("src/i18n/{}.json", lang);
    let lang_data = load_language_file(&lang_file_path);
    tauri::Builder::default()
        .menu(menu::init("FaForever", &lang_data))
        .on_menu_event(menu::handle_menu_event)
        .system_tray(tray::main_menu())
        .invoke_handler(tauri::generate_handler![theme_changed])
        .invoke_handler(tauri::generate_handler![open_docs])
        .on_system_tray_event(tray::handler)
        .on_window_event(events::handle_window_event)
        .setup(|app| {
            let app_handle = app.handle();
            app.listen_global("change_language", move |event| {
                println!("lang: {}", event.payload().unwrap().trim_matches('"'));
                if let Some(lang) = event.payload() {
                    let lang_file_path = format!("src/i18n/{}.json", lang.trim_matches('"'));
                    let lang_data = load_language_file(&lang_file_path).clone();
                    let menu_handle = app_handle.get_window("main").unwrap().menu_handle();
                    std::thread::spawn(move || {
                        let settings_title = lang_data["settings"].as_str().unwrap();
                        println!("settings_title: {}", settings_title);
                        // you can also `set_selected`, `set_enabled` and `set_native_image` (macOS only).
                        menu_handle
                            .get_item("settings")
                            .set_title(settings_title)
                            .unwrap();
                    });
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
