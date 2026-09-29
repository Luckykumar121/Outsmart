import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";

export default function RoomCode({ code = "X7K9P2" }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <motion.div
      className="room-code-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <span>ROOM CODE</span>

      <div className="room-code-row">
        <strong>{code}</strong>

        <motion.button onClick={copyCode} whileTap={{ scale: 0.85 }}>
          {copied ? <Check size={19} /> : <Copy size={19} />}
        </motion.button>
      </div>

      <motion.p
        key={copied ? "copied" : "copy"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {copied ? "Code copied!" : "Share this code with your friends"}
      </motion.p>
    </motion.div>
  );
}
