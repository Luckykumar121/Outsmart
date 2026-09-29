import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Results from "./pages/Results";

import PageTransition from "./components/common/PageTransition";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [roomData, setRoomData] = useState({
    name: "Player",
    capacity: 4,
    mode: "classic",
  });

  const navigate = (page, data = null) => {
    setScreen(page);

    if (data) {
      setRoomData(data);
    }
  };

  const pages = {
    home: <Home navigate={navigate} />,
    create: <CreateRoom navigate={navigate} />,
    join: <JoinRoom navigate={navigate} />,
    lobby: <Lobby navigate={navigate} roomData={roomData} />,
    game: <Game navigate={navigate} roomData={roomData} />,
    results: <Results navigate={navigate} roomData={roomData} />,
  };

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={screen}>{pages[screen]}</PageTransition>
    </AnimatePresence>
  );
}
