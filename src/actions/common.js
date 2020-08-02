import { socket } from "../constants/socket";

export function sendToAny(
  { state: { roomId, me, timer, actionsPlayers, players }, setState },
  action,
  data
) {
  socket.emit("any", {
    room: "room" + roomId,
    action,
    payload: data,
    sentBy: me?.id,
  });
}
export function sendToMyPong(store, data) {
  socket.emit("myPong", { room: "room" + store.state.roomId, ...data });
}
export function getIndex(arr, index) {
  if (index < 0) {
    return arr.length + index;
  }
  if (index >= arr.length) {
    return index % arr.length;
  }
  return index;
}
