import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function StartGameButton({ onStart, disabled }) {
  return (
    <motion.button
      className="start-game-btn"
      disabled={disabled}
      whileHover={!disabled ? { y: -2, scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      onClick={onStart}
    >
      Start Game
      <ArrowRight size={18} />
    </motion.button>
  );
}
