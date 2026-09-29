import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

export default function NameInput({ value, onChange }) {
  return (
    <div className="form-field">
      <label htmlFor="room-name">Your name</label>

      <motion.div className="input-wrapper" whileFocus={{ scale: 1.01 }}>
        <UserRound size={18} />

        <input
          id="room-name"
          type="text"
          value={value}
          placeholder="Enter your name"
          onChange={(event) => onChange(event.target.value)}
        />
      </motion.div>
    </div>
  );
}
