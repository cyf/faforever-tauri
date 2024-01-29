use tauri::{Runtime, GlobalWindowEvent};

pub fn handle_window_event<R: Runtime>(event: GlobalWindowEvent<R>) {
    match event.event() {
        tauri::WindowEvent::ThemeChanged { .. } => {
            let theme = event.window().theme().unwrap();
            event.window().emit("theme_changed", theme.to_string()).expect("Failed to change theme");
        }
        _ => {}
    }
}
