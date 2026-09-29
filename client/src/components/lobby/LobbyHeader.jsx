import { motion } from "framer-motion";
import { ArrowLeft, Wifi } from "lucide-react";
import Logo from "../common/Logo";

export default function LobbyHeader({ navigate }) {
  return (
    <motion.header
      className="lobby-header"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.button
        className="back-btn"
        onClick={() => navigate("home")}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft size={18} />
        Leave
      </motion.button>

      <Logo />

      <div className="connection-status">
        <Wifi size={15} />
        <span>CONNECTED</span>
      </div>
    </motion.header>
  );
}
