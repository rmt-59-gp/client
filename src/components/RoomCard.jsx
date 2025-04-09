import { useNavigate } from "react-router";
// import socket from "../config/socket";

const RoomCard = ({ id, name, players, max }) => {
  const navigate = useNavigate();

  return (
    <div
      key={id}
      className="bg-white border-4 border-black rounded-xl p-5 shadow-[5px_5px_0_#00000040] hover:scale-[1.02] transition-all"
    >
      <h2 className="text-xl font-bold text-blue-700 font-['Fredoka']">
        {name}
      </h2>
      <p className="text-sm text-gray-600 font-mono mt-2">
        Room ID: <span className="font-bold">{id}</span>
      </p>
      <p className="mt-1 text-sm">
        Players: {players} / {max}
      </p>
      <button onClick={() => {
        // socket.emit("joinRoom", id, localStorage.getItem("username"));

        navigate(`/room/${id}`);
      }} className="mt-4 bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded-full border-2 border-black font-bold shadow-[2px_2px_0_#000000]">
        ✨ Join Room
      </button>
    </div>
  );
};

export default RoomCard;
