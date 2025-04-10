import { useState } from "react";
import { useNavigate } from "react-router";
import socket from "../config/socket";
import useRoom from "../hooks/useRoom";

const RoomCreate = () => {
  const [createRoom, setCreateRoom] = useState({
    name: "",
    topic: "",
  });
  const navigate = useNavigate();
  const { setRoomData } = useRoom();

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("room:create", createRoom);

    socket.on("room:get", (arg) => {
      setRoomData(arg);

    });
    
    socket.on("room:new", (arg) => {
      console.log(arg);
      navigate(`/room/${arg.code}`);
    });
    
  };

  const topics = [
    { value: "general", label: "General Knowledge" },
    { value: "science", label: "Science" },
    { value: "history", label: "History" },
    { value: "popculture", label: "Pop Culture" },
    { value: "sports", label: "Sports" },
  ];

  return (
    <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
      <div className="max-w-xl mx-auto bg-white border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0_#00000040]">
        <h1 className="text-3xl font-bold text-pink-700 font-['Gloria_Hallelujah'] text-center mb-6">
          🎨 Create a New Room
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-bold mb-2 text-blue-700 font-['Fredoka']">
              Room Name
            </label>
            <input
              type="text"
              value={createRoom.name}
              onChange={(e) =>
                setCreateRoom({ ...createRoom, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 border-2 border-black rounded-xl shadow-[3px_3px_0_#00000040] focus:outline-none"
              placeholder="e.g. Friday Fun Night"
            />
          </div>

          {/* <div>
            <label className="block text-lg font-bold mb-2 text-blue-700 font-['Fredoka']">
              Max Players
            </label>
            <select
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-black rounded-xl shadow-[3px_3px_0_#00000040] focus:outline-none"
            >
              {[2, 4, 6, 8, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div> */}

          <div>
            <label className="block text-lg font-bold mb-2 text-blue-700 font-['Fredoka']">
              Quiz Topic
            </label>
            <select
              value={createRoom.topic}
              onChange={(e) =>
                setCreateRoom({ ...createRoom, topic: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-black rounded-xl shadow-[3px_3px_0_#00000040] focus:outline-none"
            >
              {topics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="hover:cursor-pointer w-full bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full border-2 border-black shadow-[3px_3px_0_#000000] font-bold text-lg"
          >
            🚀 Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomCreate;
