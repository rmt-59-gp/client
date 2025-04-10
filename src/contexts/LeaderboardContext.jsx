import { createContext, useState, useEffect } from "react";
import socket from "../config/socket";

export const LeaderboardContext = createContext({
  leaderboardData: [],
  setLeaderboardData: () => {},
});

export const LeaderboardProvider = ({ children }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    socket.on("leaderboard:get", (data) => {
      setLeaderboardData(data);
    });

    return () => {
      socket.off("leaderboard:get");
    };
  }, []);

  return (
    <LeaderboardContext.Provider value={{ leaderboardData, setLeaderboardData }}>
      {children}
    </LeaderboardContext.Provider>
  );
};