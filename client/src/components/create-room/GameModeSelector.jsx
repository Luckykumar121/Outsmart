import { motion } from "framer-motion";
import { Brain, Flame, Zap } from "lucide-react";

const modes = [
  {
    id: "classic",
    icon: Brain,
    title: "Classic",
    description: "Balanced challenges",
  },
  {
    id: "chaos",
    icon: Flame,
    title: "Chaos",
    description: "Anything can happen",
  },
  {
    id: "speed",
    icon: Zap,
    title: "Speed",
    description: "Fast-paced rounds",
  },
];

export default function GameModeSelector({ selected, setSelected }) {
  return (
    <div className="form-field">
      <label>Game Mode</label>

      <div className="mode-grid">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const active = selected === mode.id;

          return (
            <motion.button
              key={mode.id}
              className={`mode-card ${active ? "active" : ""}`}
              onClick={() => setSelected(mode.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon size={20} />

              <strong>{mode.title}</strong>

              <span>{mode.description}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
