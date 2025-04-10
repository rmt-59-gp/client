import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND, {
  auth: (cb) => {
    cb({ username: localStorage.username })
  }
});

export default socket; 