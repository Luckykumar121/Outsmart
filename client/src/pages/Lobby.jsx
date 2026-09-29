import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import LobbyHeader from "../components/lobby/LobbyHeader";
import RoomCode from "../components/lobby/RoomCode";
import PlayerList from "../components/lobby/PlayerList";
import StartGameButton from "../components/lobby/StartGameButton";
import { heartbeatRoom, startRoom } from "../services/rooms";

export default function Lobby({ navigate, roomData }) {
  const hostName = roomData?.name || "Player";
  const code = roomData?.room?.code;
  const capacity = roomData?.room?.capacity || roomData?.capacity || 2;
  const mode = roomData?.room?.mode || roomData?.mode || "classic";
  const [room, setRoom] = useState(roomData?.room || null);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);

  const syncRoom = useCallback(async () => {
    if (!code || !roomData?.playerId) return;
    try {
      const nextRoom = await heartbeatRoom(code, roomData.playerId);
      setRoom(nextRoom);
      setError("");
      if (nextRoom.status === "playing") {
        navigate("game", { ...roomData, room: nextRoom });
      }
    } catch (syncError) {
      setError(syncError.message);
    }
  }, [code, roomData, navigate]);

  useEffect(() => {
    const initialSync = setTimeout(syncRoom, 0);
    const timer = setInterval(syncRoom, 2000);
    return () => {
      clearTimeout(initialSync);
      clearInterval(timer);
    };
  }, [syncRoom]);

  const handleStart = async () => {
    if (!roomData?.isHost || !code) return;
    setStarting(true);
    setError("");
    try {
      const startedRoom = await startRoom(code, roomData.playerId);
      setRoom(startedRoom);
      navigate("game", { ...roomData, room: startedRoom });
    } catch (startError) {
      setError(startError.message);
    } finally {
      setStarting(false);
    }
  };

  const players = room?.players || [];

  return (
    <main className="lobby-page">
      <LobbyHeader navigate={navigate} />

      <motion.section
        className="lobby-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lobby-title">
          <span>GAME LOBBY</span>

          <h1>
            Get your crew
            <br />
            <em>ready.</em>
          </h1>

          <p>
            {hostName} created a {mode} room. Share its code and wait for your
            friends to join.
          </p>
        </div>

        <RoomCode code={code || "------"} />

        <PlayerList players={players} capacity={capacity} />

        <div className="lobby-footer">
          <p>
            {roomData?.isHost
              ? "At least 2 friends must be in the room to start."
              : "Waiting for the host to start…"}
          </p>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {roomData?.isHost && (
            <StartGameButton
              onStart={handleStart}
              disabled={starting || players.length < 2}
            />
          )}
        </div>
      </motion.section>
    </main>
  );
}
