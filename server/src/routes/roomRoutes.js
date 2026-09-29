const express = require("express");
const roomManager = require("../game/RoomManager");

const router = express.Router();

router.post("/", (request, response) => {
  try {
    const result = roomManager.createRoom(request.body);
    response.status(201).json(result);
  } catch (error) {
    response.status(error.status || 400).json({ error: error.message });
  }
});

router.post("/:code/join", (request, response) => {
  try {
    response.json(roomManager.joinRoom(request.params.code, request.body));
  } catch (error) {
    response.status(error.status || 400).json({ error: error.message });
  }
});

router.get("/:code", (request, response) => {
  try {
    response.json(roomManager.getRoom(request.params.code));
  } catch (error) {
    response.status(error.status || 404).json({ error: error.message });
  }
});

router.post("/:code/heartbeat", (request, response) => {
  try {
    response.json(roomManager.heartbeat(request.params.code, request.body));
  } catch (error) {
    response.status(error.status || 400).json({ error: error.message });
  }
});

router.post("/:code/start", (request, response) => {
  try {
    response.json(roomManager.startRoom(request.params.code, request.body));
  } catch (error) {
    response.status(error.status || 400).json({ error: error.message });
  }
});

router.post("/:code/score", (request, response) => {
  try {
    response.json(roomManager.submitScore(request.params.code, request.body));
  } catch (error) {
    response.status(error.status || 400).json({ error: error.message });
  }
});

router.get("/:code/results", (request, response) => {
  try {
    response.json(roomManager.getResults(request.params.code));
  } catch (error) {
    response.status(error.status || 404).json({ error: error.message });
  }
});

module.exports = router;
