import { io } from "socket.io-client";

// You can use environment variable instead
const socket = io("http://localhost:3000", {
  withCredentials: true,
});

export default socket;
