import io from "socket.io-client";
const location = window.location;
// export const socket = io(`${location.protocol}//${location.hostname}:3000`);
export const socket = io(`https://ludo-service.herokuapp.com/`);
socket.on("connect", () => {
  console.log("connected");
});
