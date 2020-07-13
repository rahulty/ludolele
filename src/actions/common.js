// export const ChangeState = (store, obj) => {
//     store.setState({obj})
// };
import { socket } from "../constants/socket";

export function sendToAny({ roomId, me }, action, data) {
  socket.emit("any", {
    room: "room" + roomId,
    action,
    payload: data,
    sentBy: me?.id,
  });
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
