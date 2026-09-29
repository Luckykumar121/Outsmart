import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import GameHeader from "../components/game/GameHeader";
import Scoreboard from "../components/game/Scoreboard";
import RoundIntro from "../components/game/RoundIntro";
import QuestionRound from "../components/game/QuestionRound";
import { QUESTIONS } from "../data/questions";
import { submitRoomScore } from "../services/rooms";

export const QUESTION_TIME_LIMIT = 30;

export default function Game({ navigate, roomData }) {
  const totalRounds = QUESTIONS.length;
  const [intro, setIntro] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [time, setTime] = useState(QUESTION_TIME_LIMIT);
  const [score, setScore] = useState(0);

  const startRound = useCallback(() => setIntro(false), []);

  const advanceQuestion = useCallback(async () => {
    if (questionIndex + 1 >= totalRounds) {
      let scoreError = "";
      if (roomData?.room?.code && roomData?.playerId) {
        try {
          await submitRoomScore(roomData.room.code, roomData.playerId, score);
        } catch (error) {
          scoreError = error.message;
        }
      }
      navigate("results", {
        ...roomData,
        finalScore: score,
        totalQuestions: totalRounds,
        scoreError,
      });
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelectedIndex(null);
    setTime(QUESTION_TIME_LIMIT);
  }, [questionIndex, totalRounds, navigate, roomData, score]);

  useEffect(() => {
    if (intro) return undefined;
    const interval = setInterval(() => {
      setTime((current) => Math.max(0, current - 1));
    }, 1000);

    const transition =
      selectedIndex === null
        ? setTimeout(advanceQuestion, QUESTION_TIME_LIMIT * 1000)
        : setTimeout(advanceQuestion, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(transition);
    };
  }, [intro, selectedIndex, advanceQuestion]);

  const submitAnswer = (answerIndex) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(answerIndex);
    if (answerIndex === QUESTIONS[questionIndex].answerIndex) {
      setScore((current) => current + 100);
    }
  };

  return (
    <main className="game-page-main">
      <AnimatePresence>
        {intro && <RoundIntro onComplete={startRound} />}
      </AnimatePresence>

      {!intro && (
        <>
          <GameHeader
            round={questionIndex + 1}
            totalRounds={totalRounds}
            time={time}
          />
          <Scoreboard score={score} />
          <QuestionRound
            question={QUESTIONS[questionIndex]}
            selectedIndex={selectedIndex}
            onAnswer={submitAnswer}
          />
        </>
      )}
    </main>
  );
}
