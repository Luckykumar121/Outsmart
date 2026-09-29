import { motion } from "framer-motion";

export default function Timer({ time }) {
  const danger = time <= 3;

  return (
    <motion.div
      className={`game-timer ${danger ? "danger" : ""}`}
      animate={
        danger
          ? {
              scale: [1, 1.08, 1],
            }
          : {}
      }
      transition={{
        duration: 0.5,
        repeat: danger ? Infinity : 0,
      }}
    >
      <span>TIME</span>
      <strong>00:{String(time).padStart(2, "0")}</strong>
    </motion.div>
  );
}
