import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Logo from "../common/Logo";

export default function Navbar() {
  const scrollToHowToPlay = () => {
    document.getElementById("htp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo />

      <motion.button
        className="nav-help"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToHowToPlay}
      >
        <HelpCircle size={18} />
        How to play
      </motion.button>
    </motion.nav>
  );
}
