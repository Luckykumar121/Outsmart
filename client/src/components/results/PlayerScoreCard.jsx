import { motion } from "framer-motion";
import { Crown, Trophy } from "lucide-react";

export default function PlayerScoreCard({ player, rank, currentPlayer }) {
  const hasScore = Number.isInteger(player.score);

  return (
    <motion.article
      className={`player-score-card ${rank === 1 && hasScore ? "top-score" : ""}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
    >
      <div className="player-score-card-top">
        <span className="player-score-rank">
          PLAYER {String(rank).padStart(2, "0")}
        </span>
        {rank === 1 && hasScore && <Trophy size={19} aria-label="Top score" />}
      </div>
      <div className="player-score-avatar">
        {player.name.charAt(0).toUpperCase()}
      </div>
      <h2>
        {player.name}
        {currentPlayer ? " (You)" : ""}
      </h2>
      <strong className="player-score-value">
        {hasScore ? player.score : "—"}
      </strong>
      <span className="player-score-caption">
        {hasScore ? "POINTS" : "WAITING FOR SCORE"}
      </span>
      {rank === 1 && hasScore && (
        <div className="player-score-winner">
          <Crown size={14} /> TOP SCORE
        </div>
      )}
    </motion.article>
  );
}
