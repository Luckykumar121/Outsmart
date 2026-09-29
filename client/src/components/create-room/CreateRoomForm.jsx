import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import NameInput from "./NameInput";
import PlayerSelector from "./PlayerSelector";
import GameModeSelector from "./GameModeSelector";
import { createRoom as createRoomRequest } from "../../services/rooms";

export default function CreateRoomForm({ navigate }) {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState(4);
  const [mode, setMode] = useState("classic");
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  const createRoom = async () => {
    if (!name.trim() || players < 2) {
      setError("Enter your name and choose a room size from 2 to 10.");
      return;
    }

    setCreating(true);
    setError("");
    try {
      const { room, playerId, isHost } = await createRoomRequest({
        playerName: name.trim(),
        capacity: players,
        mode,
      });
      navigate("lobby", {
        name: name.trim(),
        capacity: players,
        mode,
        room,
        playerId,
        isHost,
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <motion.div
      className="create-form"
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <NameInput value={name} onChange={setName} />

      <PlayerSelector players={players} setPlayers={setPlayers} />

      <GameModeSelector selected={mode} setSelected={setMode} />

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <motion.button
        className="create-submit"
        onClick={createRoom}
        disabled={creating}
        whileHover={{
          scale: 1.02,
          y: -2,
        }}
        whileTap={{
          scale: 0.97,
        }}
      >
        {creating ? "Creating…" : "Create Room"}
        <ArrowRight size={18} />
      </motion.button>
    </motion.div>
  );
}
