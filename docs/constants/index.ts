import { SystemOS } from "@/types/common";

export const cacheLngKey: string = "__faforever_website_lng__";
export const cacheThemeKey: string = "__faforever_website_theme__";
export const basePath =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "/faforever" : "";
export const domain =
  process.env.NODE_ENV === "production"
    ? `https://chenyifaer.com${basePath}`
    : `http://localhost:3000${basePath}`;
export const platforms: Record<SystemOS, string[]> = {
  macos: [
    "aarch64.dmg",
    "universal.dmg",
    "x64.dmg",
    "aarch64.app.tar.gz",
    "universal.app.tar.gz",
    "x64.app.tar.gz",
  ],
  windows: [
    "arm64-setup.exe",
    "x64-setup.exe",
    "x64-setup.nsis.zip",
    "x86-setup.exe",
    "x86-setup.nsis.zip",
  ],
  linux: ["amd64.AppImage", "amd64.AppImage.tar.gz", "amd64.deb"],
};
export const pageSize: number = 10;
