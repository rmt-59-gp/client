import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND, {
  auth: {
    userName: localStorage.getItem("username"),
  },
});

export default socket; 