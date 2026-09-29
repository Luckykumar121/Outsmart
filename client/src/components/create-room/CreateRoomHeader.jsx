import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Logo from "../common/Logo";

export default function CreateRoomHeader({ navigate }) {
  return (
    <header className="create-header">
      <motion.button
        className="back-btn"
        onClick={() => navigate("home")}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>

      <Logo />
    </header>
  );
}
