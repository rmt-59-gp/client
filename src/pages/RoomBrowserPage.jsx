import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import RoomCard from "../components/RoomCard";

const rooms = [
  { id: "QUIZ123", name: "Fun Friday Quiz", players: 3, max: 6 },
  { id: "BRNSTM", name: "Brainstorm Battle", players: 5, max: 8 },
  { id: "LOL123", name: "Meme Mayhem", players: 2, max: 4 },
];

const socket = io("http://localhost:3000", {
  auth: { username: "asep" },
});

const RoomBrowserPage = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    socket.on("score:info", (updatedScores) => {
      setScores(updatedScores);
    });

    return () => {
      socket.off("score:info");
    };
  }, []);

  const handleScoreUpdate = (score) => {
    socket.emit("score:update", { username: "Player1", score });
  };

  return (
    <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-700 font-['Gloria_Hallelujah'] mb-6 text-center">
          🧩 Join a Room
        </h1>
        <p className="text-lg text-gray-800 font-['Fredoka'] text-center mb-10">
          Pick a room and start the fun!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map(({ id, name, players, max }) => (
            <RoomCard key={id} id={id} name={name} players={players} max={max} />
          ))}
        </div>

{/* cek scoring */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Scores:</h2>
          <ul>
            {Object.entries(scores).map(([username, score]) => (
              <li key={username}>
                {username}: {score}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => handleScoreUpdate(10)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add 10 Points
        </button>
      </div>
    </div>
  );
};

export default RoomBrowserPage;