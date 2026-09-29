import { motion } from "framer-motion";

import CreateRoomHeader from "../components/create-room/CreateRoomHeader";
import CreateRoomForm from "../components/create-room/CreateRoomForm";

export default function CreateRoom({ navigate }) {
  return (
    <main className="create-page">
      <CreateRoomHeader navigate={navigate} />

      <motion.section
        className="create-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="create-intro">
          <span>GAME SETUP</span>

          <h1>
            Create
            <br />
            your room.
          </h1>

          <p>
            Invite your friends and find out who can actually outsmart everyone.
          </p>
        </div>

        <CreateRoomForm navigate={navigate} />
      </motion.section>
    </main>
  );
}
