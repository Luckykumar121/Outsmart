import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sequence = ["◆", "●", "▲", "★"];

const answers = [
  ["◆", "●", "▲", "★"],
  ["●", "◆", "★", "▲"],
  ["▲", "★", "◆", "●"],
  ["★", "▲", "●", "◆"],
];

export default function MemoryRound({ onScore }) {
  const [showSequence, setShowSequence] = useState(true);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSequence(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const selectAnswer = (index) => {
    if (selected !== null) return;

    setSelected(index);

    const isCorrect = index === 0;

    setCorrect(isCorrect);

    if (isCorrect) {
      onScore(100);
    }
  };

  return (
    <motion.section
      className="memory-round"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="challenge-heading">
        <span>MEMORY LOCK</span>

        <h2>
          Remember the
          <br />
          sequence.
        </h2>

        <p>
          {showSequence
            ? "Memorize the symbols."
            : "Select the correct sequence."}
        </p>
      </div>

      <motion.div
        className="sequence-card"
        animate={
          showSequence
            ? {
                scale: [1, 1.02, 1],
              }
            : {
                scale: 1,
              }
        }
        transition={{
          duration: 1,
          repeat: showSequence ? Infinity : 0,
        }}
      >
        {showSequence
          ? sequence.map((symbol, index) => (
              <motion.div
                key={index}
                className="symbol"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.15,
                }}
              >
                {symbol}
              </motion.div>
            ))
          : "?"}
      </motion.div>

      {!showSequence && (
        <motion.div
          className="answer-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {answers.map((answer, index) => {
            const isSelected = selected === index;
            const isCorrectAnswer = index === 0 && selected !== null;

            return (
              <motion.button
                key={index}
                className={`answer-card ${isSelected ? "selected" : ""} ${
                  isCorrectAnswer ? "correct" : ""
                }`}
                onClick={() => selectAnswer(index)}
                whileHover={{
                  y: -4,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <span>{String.fromCharCode(65 + index)}</span>

                <div>
                  {answer.map((symbol, i) => (
                    <b key={i}>{symbol}</b>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {correct !== null && (
        <motion.div
          className={`answer-message ${correct ? "success" : "failure"}`}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          {correct ? "✓ CORRECT +100" : "✕ WRONG ANSWER"}
        </motion.div>
      )}
    </motion.section>
  );
}
