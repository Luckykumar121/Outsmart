import { motion } from "framer-motion";

export default function Scoreboard({ score }) {
  return (
    <motion.div
      className="scoreboard"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <span>YOUR SCORE</span>

      <motion.strong
        key={score}
        initial={{
          scale: 1.4,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
      >
        {score}
      </motion.strong>
    </motion.div>
  );
}
