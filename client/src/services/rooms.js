const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

async function request(path, body) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: body ? "POST" : "GET",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(
      "Room server is unavailable. Start the server and try again.",
    );
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.error || "Could not connect to the room server.");
  return data;
}

export const createRoom = (payload) => request("/rooms", payload);
export const joinRoom = (code, payload) =>
  request(`/rooms/${encodeURIComponent(code)}/join`, payload);
export const getRoom = (code) => request(`/rooms/${encodeURIComponent(code)}`);
export const heartbeatRoom = (code, playerId) =>
  request(`/rooms/${encodeURIComponent(code)}/heartbeat`, { playerId });
export const startRoom = (code, playerId) =>
  request(`/rooms/${encodeURIComponent(code)}/start`, { playerId });
export const submitRoomScore = (code, playerId, score) =>
  request(`/rooms/${encodeURIComponent(code)}/score`, { playerId, score });
export const getRoomResults = (code) =>
  request(`/rooms/${encodeURIComponent(code)}/results`);
