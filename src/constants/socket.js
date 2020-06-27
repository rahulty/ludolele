import io from "socket.io-client";
const location = window.location;
export const socket = io(`${location.protocol}//${location.hostname}:8002`);

socket.on("connect", () => {
  console.log("connected");
});
socket.on("move", console.log);
