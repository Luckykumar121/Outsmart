import { Users } from "lucide-react";
import { motion } from "framer-motion";

export default function PlayerSelector({ players, setPlayers }) {
  const decrease = () => {
    if (players > 2) {
      setPlayers(players - 1);
    }
  };

  const increase = () => {
    if (players < 10) {
      setPlayers(players + 1);
    }
  };

  return (
    <div className="form-field">
      <label>Players</label>

      <div className="player-selector">
        <div className="player-label">
          <Users size={18} />
          <span>Room capacity (2–10)</span>
        </div>

        <div className="counter">
          <motion.button whileTap={{ scale: 0.85 }} onClick={decrease}>
            −
          </motion.button>

          <motion.strong
            key={players}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {players}
          </motion.strong>

          <motion.button whileTap={{ scale: 0.85 }} onClick={increase}>
            +
          </motion.button>
        </div>
      </div>
    </div>
  );
}
