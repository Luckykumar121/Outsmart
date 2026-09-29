import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RoundIntro({ onComplete }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((current) => {
        if (current === 1) {
          clearInterval(timer);

          setTimeout(() => {
            onComplete();
          }, 500);

          return "GO";
        }

        return current - 1;
      });
    }, 900);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="round-intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span>GET READY</span>

      <AnimatePresence mode="wait">
        <motion.strong
          key={count}
          initial={{
            scale: 2,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity: 0,
          }}
          transition={{
            duration: 0.45,
          }}
        >
          {count}
        </motion.strong>
      </AnimatePresence>
    </motion.div>
  );
}
