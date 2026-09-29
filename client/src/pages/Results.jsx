import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import PlayerScoreCard from "../components/results/PlayerScoreCard";
import ResultActions from "../components/results/ResultActions";
import { getRoomResults } from "../services/rooms";

export default function Results({ navigate, roomData }) {
  const code = roomData?.room?.code;
  const [resultData, setResultData] = useState(null);
  const [resultError, setResultError] = useState(roomData?.scoreError || "");

  const refreshResults = useCallback(async () => {
    if (!code) return;
    try {
      const latest = await getRoomResults(code);
      setResultData(latest);
      setResultError("");
    } catch (error) {
      setResultError(error.message);
    }
  }, [code]);

  useEffect(() => {
    const initialRefresh = setTimeout(refreshResults, 0);
    const interval = setInterval(refreshResults, 2000);
    return () => {
      clearTimeout(initialRefresh);
      clearInterval(interval);
    };
  }, [refreshResults]);

  const players =
    resultData?.players ||
    (roomData?.room?.players || []).map((player) => ({
      ...player,
      score:
        player.id === roomData?.playerId
          ? (roomData?.finalScore ?? null)
          : null,
    }));
  const sortedPlayers = [...players].sort((first, second) => {
    if (first.score === null) return 1;
    if (second.score === null) return -1;
    return second.score - first.score;
  });
  const allScoresSubmitted = resultData?.completed || false;

  return (
    <main className="results-page">
      <motion.div
        className="results-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.header
        className="results-header"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <span>GAME COMPLETE</span>

        <h1>That's a wrap.</h1>

        <p>{roomData?.totalQuestions || 20} different questions. Nice run.</p>
      </motion.header>

      {resultError && (
        <p className="results-status" role="alert">
          {resultError}
        </p>
      )}
      {!allScoresSubmitted && sortedPlayers.length > 1 && (
        <p className="results-status" role="status">
          Waiting for the other player to finish…
        </p>
      )}

      <section className="player-score-grid" aria-label="Player scores">
        {sortedPlayers.map((player, index) => (
          <PlayerScoreCard
            key={player.id}
            player={player}
            rank={index + 1}
            currentPlayer={player.id === roomData?.playerId}
          />
        ))}
      </section>

      <p className="results-player-count">
        Room code: <strong>{code || "—"}</strong>
      </p>

      <ResultActions navigate={navigate} />
    </main>
  );
}
