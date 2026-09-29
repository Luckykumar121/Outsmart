import { motion } from "framer-motion";

export default function QuestionRound({ question, selectedIndex, onAnswer }) {
  const answered = selectedIndex !== null;

  return (
    <motion.section
      className="memory-round question-round"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      key={question.prompt}
    >
      <div className="challenge-heading">
        <span>{question.category.toUpperCase()}</span>
        <h2>{question.prompt}</h2>
        <p>{answered ? "Answer locked in" : "Choose your answer"}</p>
      </div>

      <div className="answer-grid">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = answered && question.answerIndex === index;
          return (
            <motion.button
              key={option}
              type="button"
              className={`answer-card ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""}`}
              onClick={() => onAnswer(index)}
              disabled={answered}
              whileHover={!answered ? { y: -4 } : undefined}
              whileTap={!answered ? { scale: 0.96 } : undefined}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <div>{option}</div>
            </motion.button>
          );
        })}
      </div>

      {answered && (
        <motion.div
          className={`answer-message ${selectedIndex === question.answerIndex ? "success" : "failure"}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
        >
          {selectedIndex === question.answerIndex
            ? "✓ CORRECT +100"
            : "✕ NOT QUITE"}
        </motion.div>
      )}
    </motion.section>
  );
}
