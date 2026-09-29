import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="feature-card"
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
    >
      <div className="feature-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </motion.div>
  );
}
