import { motion, AnimatePresence } from "framer-motion";
import PlayerCard from "./PlayerCard";

export default function PlayerList({ players, capacity = 10 }) {
  return (
    <section className="players-section">
      <div className="players-heading">
        <div>
          <span>PLAYERS</span>
          <strong>
            {players.length}/{capacity}
          </strong>
        </div>

        <p>Waiting for players...</p>
      </div>

      <motion.div className="players-grid" layout>
        <AnimatePresence>
          {players.map((player, index) => (
            <PlayerCard key={player.id} player={player} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
