import { motion } from "framer-motion";

export default function Leaderboard({ players }) {
  return (
    <section className="leaderboard">
      <div className="leaderboard-heading">
        <span>FINAL STANDINGS</span>
      </div>

      <div className="leaderboard-list">
        {players.map((player, index) => (
          <motion.div
            className={`leaderboard-row ${index === 0 ? "first" : ""}`}
            key={player.id}
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.3 + index * 0.12,
            }}
          >
            <div className="rank">{String(index + 1).padStart(2, "0")}</div>

            <div className="result-avatar">
              {player.name.charAt(0).toUpperCase()}
            </div>

            <div className="result-player">
              <strong>{player.name}</strong>

              {index === 0 && <span>WINNER</span>}
            </div>

            <strong className="result-score">{player.score}</strong>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
