const { randomUUID } = require("node:crypto");

const rooms = new Map();
const CODE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;
const PLAYER_TIMEOUT_MS = 30_000;

function createError(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function normalizeCode(code) {
  return String(code || "")
    .trim()
    .toUpperCase();
}

function createCode() {
  let code;
  do {
    code = Array.from(
      { length: 6 },
      () => CODE_CHARACTERS[Math.floor(Math.random() * CODE_CHARACTERS.length)],
    ).join("");
  } while (rooms.has(code));
  return code;
}

function publicRoom(room) {
  if (room.status === "waiting") {
    const now = Date.now();
    room.players = room.players.filter(
      (player) => now - player.lastSeen < PLAYER_TIMEOUT_MS,
    );
    if (!room.players.some((player) => player.id === room.hostPlayerId)) {
      room.hostPlayerId = room.players[0]?.id || null;
    }
  }

  return {
    id: room.id,
    code: room.code,
    hostPlayerId: room.hostPlayerId,
    capacity: room.capacity,
    mode: room.mode,
    status: room.status,
    players: room.players.map(({ id, name }) => ({
      id,
      name,
      host: id === room.hostPlayerId,
    })),
  };
}

function findRoom(code) {
  const normalizedCode = normalizeCode(code);
  if (!/^[A-Z0-9]{6}$/.test(normalizedCode)) {
    throw createError("Enter a valid 6-character room code.");
  }
  const room = rooms.get(normalizedCode);
  if (!room)
    throw createError("Room not found. Check the code and try again.", 404);
  publicRoom(room);
  return room;
}

function createRoom({ playerName, capacity, mode } = {}) {
  const name = String(playerName || "")
    .trim()
    .slice(0, 24);
  const roomCapacity = Number(capacity);
  if (!name) throw createError("Enter your name to create a room.");
  if (
    !Number.isInteger(roomCapacity) ||
    roomCapacity < MIN_PLAYERS ||
    roomCapacity > MAX_PLAYERS
  ) {
    throw createError("Room size must be between 2 and 10 players.");
  }

  const code = createCode();
  const host = { id: `player-${randomUUID()}`, name, lastSeen: Date.now() };
  const room = {
    id: randomUUID(),
    code,
    hostPlayerId: host.id,
    capacity: roomCapacity,
    mode: String(mode || "classic"),
    status: "waiting",
    players: [host],
    scores: new Map(),
  };
  rooms.set(code, room);
  return { room: publicRoom(room), playerId: host.id, isHost: true };
}

function joinRoom(code, { playerName } = {}) {
  const room = findRoom(code);
  const name = String(playerName || "")
    .trim()
    .slice(0, 24);
  if (!name) throw createError("Enter your name to join the room.");
  if (room.status !== "waiting")
    throw createError("This game has already started.", 409);
  if (room.players.length >= room.capacity)
    throw createError("This room is full.", 409);

  const player = { id: `player-${randomUUID()}`, name, lastSeen: Date.now() };
  room.players.push(player);
  return { room: publicRoom(room), playerId: player.id, isHost: false };
}

function getRoom(code) {
  return publicRoom(findRoom(code));
}

function startRoom(code, { playerId } = {}) {
  const room = findRoom(code);
  if (!playerId || playerId !== room.hostPlayerId) {
    throw createError("Only the room host can start the game.", 403);
  }
  if (room.players.length < MIN_PLAYERS) {
    throw createError(
      "At least 2 real players must join before starting.",
      409,
    );
  }
  if (room.status !== "waiting")
    throw createError("This game has already started.", 409);
  room.status = "playing";
  return publicRoom(room);
}

function heartbeat(code, { playerId } = {}) {
  const room = findRoom(code);
  const player = room.players.find((entry) => entry.id === playerId);
  if (!player)
    throw createError("You are no longer in this room. Join again.", 404);
  player.lastSeen = Date.now();
  return publicRoom(room);
}

function submitScore(code, { playerId, score } = {}) {
  const room = findRoom(code);
  if (room.status !== "playing" && room.status !== "completed") {
    throw createError("This room is not accepting game scores.", 409);
  }
  if (!room.players.some((player) => player.id === playerId)) {
    throw createError("You are not a player in this room.", 403);
  }
  if (!Number.isInteger(score) || score < 0 || score > 2000) {
    throw createError("Score must be a whole number between 0 and 2000.");
  }
  if (room.scores.has(playerId) && room.scores.get(playerId) !== score) {
    throw createError("Your score has already been submitted.", 409);
  }

  room.scores.set(playerId, score);
  if (room.players.every((player) => room.scores.has(player.id))) {
    room.status = "completed";
  }
  return getResults(code);
}

function getResults(code) {
  const room = findRoom(code);
  return {
    completed:
      room.players.length >= MIN_PLAYERS &&
      room.players.every((player) => room.scores.has(player.id)),
    players: room.players.map(({ id, name }) => ({
      id,
      name,
      score: room.scores.has(id) ? room.scores.get(id) : null,
    })),
  };
}

module.exports = {
  createRoom,
  joinRoom,
  getRoom,
  startRoom,
  heartbeat,
  submitScore,
  getResults,
};
