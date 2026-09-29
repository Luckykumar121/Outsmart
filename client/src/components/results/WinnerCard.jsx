import { motion } from "framer-motion";
import { Crown, Trophy } from "lucide-react";

export default function WinnerCard({
  player,
  score,
  label = "WINNER",
  tagline = "OUTSMART CHAMPION",
}) {
  return (
    <motion.div
      className="winner-card"
      initial={{
        opacity: 0,
        scale: 0.7,
        y: 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 15,
      }}
    >
      <motion.div
        className="winner-trophy"
        animate={{
          y: [0, -8, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Trophy size={32} />
      </motion.div>

      <span className="winner-label">{label}</span>

      <div className="winner-avatar">{player.charAt(0).toUpperCase()}</div>

      <h2>{player}</h2>

      <div className="winner-score">
        <strong>{score}</strong>
        <span>POINTS</span>
      </div>

      <div className="winner-crown">
        <Crown size={15} />
        {tagline}
      </div>
    </motion.div>
  );
}
