import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import socket from "../config/socket";
import useRoom from "../hooks/useRoom";

const WaitingRoomPage = () => {
  const { id } = useParams();

  const { roomData, setRoomData } = useRoom();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

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

  useEffect(() => {
    // Emit event untuk bergabung ke room
    socket.emit("room:join", { code: id, username });
  
    // Dengarkan event pembaruan room
    socket.on("room:updated", (updatedRoom) => {
      if (updatedRoom.code === id) {
        setRoom(updatedRoom); // Perbarui state room
      }
    });
  
    // Bersihkan listener saat komponen unmount
    return () => {
      socket.emit("room:leave", { code: id });
      socket.off("room:updated");
    };
  }, [id, username]);

  useEffect(()=> {
    socket.on("quiz:start", ({roomCode}) => {
      navigate(`/game/${roomCode}`);
    })

    return () => {
      socket.off("quiz:start");
    }
  }, [])
  
  const handleStartQuiz = () => {
    socket.emit("startQuiz", id);
    navigate(`/game/${id}`);
  };

  const handleLeaveRoom = () => {
    socket.emit("room:leave", { code: id, username }); 
    navigate("/"); 
  };

  return (
        <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
           <button
            onClick={handleLeaveRoom}
            className="absolute top-4 left-4 hover:cursor-pointer shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3"/>
            </svg>
          </button>
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
                {room && room.members.length > 0 ? (
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
                  ))
                ) : (
                  <li className="text-gray-500">No participants yet.</li>
                )}
              </ul>
            </div>
            <div onClick={handleStartQuiz} className="text-center">
            { room && room.host === localStorage.getItem("username") && 
           (
              <button className="bg-pink-400 hover:cursor-pointer hover:bg-pink-500 font-['Fredoka'] text-white px-6 py-2 rounded-full shadow-md">
                Start Quiz
              </button>
            )
            }
            </div>
          </div>
        </div>
  );
};

export default WaitingRoomPage;
