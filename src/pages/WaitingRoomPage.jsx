import { useEffect, useState } from "react";
import useRoom from "../hooks/useRoom";
import { useNavigate, useParams } from "react-router";
import socket from "../config/socket";

const WaitingRoomPage = () => {
  const { id } = useParams();

  const { roomData, setRoomData } = useRoom();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room:get", (arg) => {
      setRoomData(arg);
    });

    return () => {
      socket.off("room:get");
    };
  }, []);

  useEffect(() => {
    const foundRoom = roomData.find((room) => room.code === id);
    if (foundRoom) setRoom(foundRoom);
  }, [roomData, id]);

  const handleStartQuiz = () => {
    // socket.emit("startQuiz", id);
    navigate(`/game/${id}`);
  };

  // useEffect(() => {
  //   socket.on("quizStarted", () => {
  //     navigate(`/game/${id}`);
  //   });

  //   return () => {
  //     socket.off("quizStarted");
  //   };
  // }, [navigate, id]);

  return (
    <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <span className="text-4xl animate-spin mr-4">⏳</span>
          <h1 className="text-5xl font-bold text-center text-pink-700 font-['Gloria_Hallelujah']">
            Waiting Room
          </h1>
        </div>
        <p className="text-center text-lg font-['Fredoka'] text-gray-700 mb-6">
          Please wait while everyone joins the quiz!
        </p>
        <div className="bg-yellow-100 border-[2px] font-['Fredoka'] border-dashed border-pink-400 rounded-3xl shadow-[4px_4px_0_#00000040] p-4 rotate-[-1.5deg] mb-7">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Participants:
          </h2>
          <ul className="list-none">
            {room &&
              room.members.map((participant, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 mb-2"
                >
                  <span className="mr-2 font-bold text-blue-800">
                    {index + 1}.
                  </span>
                  {participant}
                </li>
              ))}
          </ul>
        </div>
        <div onClick={handleStartQuiz} className="text-center">
          <button className="bg-pink-400 hover:cursor-pointer hover:bg-pink-500 font-['Fredoka'] text-white px-6 py-2 rounded-full shadow-md">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoomPage;
