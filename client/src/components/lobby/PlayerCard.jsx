import { Crown, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export default function PlayerCard({ player, index }) {
  return (
    <motion.div
      className="player-card"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="player-avatar">{player.name.charAt(0).toUpperCase()}</div>

      <div className="player-info">
        <strong>
          {player.name}
          {player.host ? <Crown size={14} /> : null}
        </strong>
        <span>{player.host ? "HOST" : "READY"}</span>
      </div>

      <Wifi size={14} className="player-online" />
    </motion.div>
  );
}
