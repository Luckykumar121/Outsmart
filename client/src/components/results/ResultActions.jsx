import { motion } from "framer-motion";
import { Home, RotateCcw } from "lucide-react";

export default function ResultActions({ navigate }) {
  return (
    <motion.div
      className="result-actions"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.8,
      }}
    >
      <motion.button
        className="play-again-btn"
        onClick={() => navigate("lobby")}
        whileHover={{
          scale: 1.03,
          y: -2,
        }}
        whileTap={{
          scale: 0.96,
        }}
      >
        <RotateCcw size={18} />
        PLAY AGAIN
      </motion.button>

      <motion.button
        className="home-result-btn"
        onClick={() => navigate("home")}
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.96,
        }}
      >
        <Home size={18} />
        HOME
      </motion.button>
    </motion.div>
  );
}
