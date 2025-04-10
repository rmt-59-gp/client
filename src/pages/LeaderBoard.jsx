import { useEffect } from "react";
import socket from "../config/socket";
import { NavLink, useParams } from "react-router-dom";
import useLeaderboard from "../hooks/useLeaderboard";

const LeaderboardPage = () => {
  const { leaderboardData, setLeaderboardData } = useLeaderboard();
  const { id } = useParams();

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
    socket.emit("leaderboard:fetch", { id });

    socket.on("leaderboard:get", (arg) => {
      setLeaderboardData(arg);
    });

    return () => {
      socket.off("leaderboard:get");
    };
  }, [id, setLeaderboardData]);

  return (
    <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-pink-700 font-['Gloria_Hallelujah'] mb-6 text-center">
            🏆 Leaderboard
          </h1>
          <p className="text-lg text-gray-800 font-['Fredoka'] text-center mb-1">
            Check out the top players! <br /> Or
          </p>
          <NavLink
            to={`/room/${id}`}
            className="hover:cursor-pointer bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full shadow-[3px_3px_0_#000000] font-bold text-lg mb-10"
          >
            ↩️ Back to Rooms
          </NavLink>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full">
            <thead>
              <tr className="bg-pink-200">
                <th className="py-2 text-left text-gray-700 font-bold">Rank</th>
                <th className="py-2 text-left text-gray-700 font-bold">Username</th>
                <th className="py-2 text-left text-gray-700 font-bold">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.length > 0 ? (
                leaderboardData.map(({ rank, username, score }) => (
                  <tr key={rank} className="border-b">
                    <td className="py-2 text-gray-800">{rank}</td>
                    <td className="py-2 text-gray-800">{username}</td>
                    <td className="py-2 text-gray-800">{score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-2 text-center text-gray-500">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;