import { useEffect, useState } from "react";
import { io } from "socket.io-client";




const WaitingRoomPage = () => {
    const participantsEx = ["Alice", "Bob", "Charlie", "Diana"]; // Contoh
    const [participants, setParticipants] = useState([]);
    
    useEffect(() => {
        const socket = io("http://localhost:3000");

        const username = localStorage.getItem("username");   

        if (username) {
            socket.emit("joinRoom", username); 
        }
        
        socket.on("newParticipant", (username) => {
            setParticipants((prevParticipants) => [...prevParticipants, username]); 
        });

        return () => {
            socket.off("newParticipant");
        };
    }, []);

    return (
        <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-pink-700 font-['Gloria_Hallelujah'] mb-8">
                    📒 Waiting Room
                </h1>
                <p className="text-center text-lg font-['Fredoka'] text-gray-700 mb-6">
                    Please wait while everyone joins the quiz!
                </p>
                <div className="bg-yellow-100 border-[3px] font-['Fredoka'] border-dashed border-pink-400 rounded-3xl shadow-[6px_6px_0_#00000040] p-6 rotate-[1.5deg] mb-7">
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">Participants:</h2>
                    <ul className="list-disc list-inside">
                        {participantsEx.map((participant, index) => (
                            <li key={index} className="text-gray-700 ">
                                {participant}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-center">
                    <button className="bg-pink-400 hover:cursor-pointer hover:bg-pink-500 font-['Fredoka'] p-6 rotate-[1.5deg] text-white px-6 py-2 rounded-full shadow-md">
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WaitingRoomPage;