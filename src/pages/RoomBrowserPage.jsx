import { useEffect } from "react";
import { NavLink } from "react-router";
import RoomCard from "../components/RoomCard";
import socket from "../config/socket";
import useRoom from "../hooks/useRoom";

const RoomBrowserPage = () => {
  const { roomData, setRoomData } = useRoom();

  useEffect(() => {
    socket.disconnect().connect();

    socket.on("message", (arg) => {
      console.log(arg);
      console.log("Welcome message from server:", arg);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    socket.on("room:get", (arg) => {
      setRoomData(arg);
    });

    return () => {
      socket.off("room:get");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-pink-700 font-['Gloria_Hallelujah'] mb-6 text-center">
            🧩 Hello, {localStorage.getItem("username")}
          </h1>
          <p className="text-lg text-gray-800 font-['Fredoka'] text-center mb-1">
            Pick a room and start the fun! <br /> Or
          </p>
          <NavLink
            to={"/room/create"}
            className="hover:cursor-pointer bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full shadow-[3px_3px_0_#000000] font-bold text-lg mb-10"
          >
            ➕ Create New Room
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roomData.length > 0 && roomData.map(({ id, name, code, topic }) => (
            <RoomCard
              key={id}
              id={code}
              name={name}
              topic={topic}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomBrowserPage;
