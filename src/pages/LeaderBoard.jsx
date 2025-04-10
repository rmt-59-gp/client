import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import socket from "../config/socket"; // Pastikan Anda mengimpor konfigurasi socket

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from the server
    socket.emit('leaderboard:fetch');

    socket.on('leaderboard:get', (data) => {
      console.log('Leaderboard data received:', data); // Debugging log
      setLeaderboardData(data);
    });

    return () => {
      socket.off('leaderboard:get');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">🏆 Leaderboard</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Rank</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.length > 0 ? (
              leaderboardData.map(({ rank, username, score }) => (
                <tr key={rank}>
                  <td className="border border-gray-300 px-4 py-2">{rank}</td>
                  <td className="border border-gray-300 px-4 py-2">{username}</td>
                  <td className="border border-gray-300 px-4 py-2">{score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-center mt-6">
          <NavLink
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;