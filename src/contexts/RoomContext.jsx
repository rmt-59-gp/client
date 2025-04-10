import { createContext, useEffect, useState } from "react";
import http from "../helpers/http";

export const RoomContext = createContext({
  roomData: [],
  setRoomData: () => {},
});

export const RoomProvider = ({ children }) => {
  const [roomData, setRoomData] = useState([]);
  const username = localStorage.getItem("username")

  async function fetchRoom() {
    try {
      const { data } = await http({
        url: "/rooms",
        method: "GET",
        headers: {
          Authorization: `${username}`,
        },
      });

      console.log(data)

      setRoomData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRoom();
  }, [username]);

  useEffect(() => {
    console.log(roomData)
  }, [])

  return (
    <RoomContext.Provider value={{ roomData, fetchRoom, setRoomData }}>
      {children}
    </RoomContext.Provider>
  );
};
