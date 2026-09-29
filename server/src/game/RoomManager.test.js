const assert = require("node:assert/strict");
const { test } = require("node:test");
const roomManager = require("./RoomManager");

test("a room cannot start until a second real player joins", () => {
  const host = roomManager.createRoom({ playerName: "Host", capacity: 2 });

  assert.equal(host.room.players.length, 1);
  assert.throws(
    () => roomManager.startRoom(host.room.code, { playerId: host.playerId }),
    /At least 2 real players/,
  );

  const friend = roomManager.joinRoom(host.room.code.toLowerCase(), {
    playerName: "Friend",
  });
  assert.equal(friend.room.players.length, 2);
  assert.equal(
    roomManager.startRoom(host.room.code, { playerId: host.playerId }).status,
    "playing",
  );
});

test("room capacity is between 2 and 10 and full rooms reject extra players", () => {
  assert.throws(
    () => roomManager.createRoom({ playerName: "Too small", capacity: 1 }),
    /between 2 and 10/,
  );
  assert.throws(
    () => roomManager.createRoom({ playerName: "Too large", capacity: 11 }),
    /between 2 and 10/,
  );

  const host = roomManager.createRoom({ playerName: "Host", capacity: 2 });
  roomManager.joinRoom(host.room.code, { playerName: "Friend" });
  assert.throws(
    () => roomManager.joinRoom(host.room.code, { playerName: "Third" }),
    /full/,
  );
});

test("only the host can start and started rooms reject late joins", () => {
  const host = roomManager.createRoom({ playerName: "Host", capacity: 3 });
  const friend = roomManager.joinRoom(host.room.code, { playerName: "Friend" });

  assert.throws(
    () => roomManager.startRoom(host.room.code, { playerId: friend.playerId }),
    /Only the room host/,
  );
  roomManager.startRoom(host.room.code, { playerId: host.playerId });
  assert.throws(
    () => roomManager.joinRoom(host.room.code, { playerName: "Late" }),
    /already started/,
  );
});

test("invalid and unknown room codes are rejected", () => {
  assert.throws(() => roomManager.getRoom("bad"), /valid 6-character/);
  assert.throws(() => roomManager.getRoom("ZZZZZZ"), /Room not found/);
});

test("results keep both players' scores until everyone submits", () => {
  const host = roomManager.createRoom({ playerName: "Host", capacity: 2 });
  const friend = roomManager.joinRoom(host.room.code, { playerName: "Friend" });
  roomManager.startRoom(host.room.code, { playerId: host.playerId });

  const firstSubmission = roomManager.submitScore(host.room.code, {
    playerId: host.playerId,
    score: 1200,
  });
  assert.equal(firstSubmission.completed, false);
  assert.deepEqual(
    firstSubmission.players.map(({ score }) => score),
    [1200, null],
  );

  const completed = roomManager.submitScore(host.room.code, {
    playerId: friend.playerId,
    score: 1500,
  });
  assert.equal(completed.completed, true);
  assert.deepEqual(
    completed.players.map(({ score }) => score),
    [1200, 1500],
  );
});

test("only room players can submit valid scores", () => {
  const host = roomManager.createRoom({ playerName: "Host", capacity: 2 });
  roomManager.joinRoom(host.room.code, { playerName: "Friend" });
  roomManager.startRoom(host.room.code, { playerId: host.playerId });

  assert.throws(
    () =>
      roomManager.submitScore(host.room.code, {
        playerId: "stranger",
        score: 100,
      }),
    /not a player/,
  );
  assert.throws(
    () =>
      roomManager.submitScore(host.room.code, {
        playerId: host.playerId,
        score: 2001,
      }),
    /between 0 and 2000/,
  );
});
