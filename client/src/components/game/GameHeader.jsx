import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import Timer from "./Timer";

export default function GameHeader({ round, totalRounds, time }) {
  return (
    <motion.header
      className="game-header"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="round-info">
        <div className="round-icon">
          <Brain size={18} />
        </div>

        <div>
          <span>ROUND</span>
          <strong>
            {String(round).padStart(2, "0")} /{" "}
            {String(totalRounds).padStart(2, "0")}
          </strong>
        </div>
      </div>

      <Timer time={time} />
    </motion.header>
  );
}
