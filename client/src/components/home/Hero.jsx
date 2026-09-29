import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({ navigate }) {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="live-dot" />
        REAL-TIME PARTY GAME
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Think fast.
        <br />
        <span>Trust nobody.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Outsmart your friends through a series of fast, unpredictable
        challenges.
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button className="hero-primary" onClick={() => navigate("create")}>
          Create a Room
          <ArrowRight size={18} />
        </button>

        <button className="hero-secondary" onClick={() => navigate("join")}>
          Join with Code
        </button>
      </motion.div>
    </section>
  );
}
