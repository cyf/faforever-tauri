const headers = { "Content-Type": "application/json" };

export async function latestRelease() {
  const resp = await fetch("/faforever/api/releases/latest/", {
    method: "GET",
    headers,
  });
  return await resp.json();
}
