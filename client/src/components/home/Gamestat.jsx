import { motion } from "framer-motion";

const stats = [
  ["2–10", "PLAYERS"],
  ["5–10", "MINUTES"],
  ["0", "DOWNLOADS"],
];

export default function GameStats() {
  return (
    <motion.div
      className="game-stats"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
    >
      {stats.map(([number, label], index) => (
        <motion.div
          className="stat"
          key={label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + index * 0.15 }}
        >
          <strong>{number}</strong>
          <span>{label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
