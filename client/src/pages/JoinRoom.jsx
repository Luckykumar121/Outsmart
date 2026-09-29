import { motion } from "framer-motion";
import { useState } from "react";
import { joinRoom as joinRoomRequest } from "../services/rooms";

export default function JoinRoom({ navigate }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !/^[A-Z0-9]{6}$/.test(code.trim().toUpperCase())) {
      setError("Enter your name and a valid 6-character room code.");
      return;
    }

    setJoining(true);
    setError("");
    try {
      const { room, playerId, isHost } = await joinRoomRequest(code, {
        playerName: name.trim(),
      });
      navigate("lobby", { name: name.trim(), room, playerId, isHost });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setJoining(false);
    }
  };

  return (
    <main className="page-shell">
      <motion.div
        className="lobby-card"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={submit}>
          <span className="eyebrow">Join room</span>
          <h1>Enter code</h1>
          <p>Use the code shared by your friend to join their room.</p>
          <label className="join-field">
            Your name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={24}
              autoComplete="nickname"
            />
          </label>
          <label className="join-field">
            6-character room code
            <input
              value={code}
              onChange={(event) =>
                setCode(
                  event.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .slice(0, 6),
                )
              }
              maxLength={6}
              autoCapitalize="characters"
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="primary-btn" type="submit" disabled={joining}>
            {joining ? "Checking code…" : "Join room"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
