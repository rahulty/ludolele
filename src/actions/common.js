// export const ChangeState = (store, obj) => {
//     store.setState({obj})
// };
import { socket } from "../constants/socket";

export function sendToAny({ roomId, me }, action, data) {
  console.log("Send---->>>>>>>>", action, data, { roomId, me });
  socket.emit("any", {
    room: "room" + roomId,
    action,
    payload: data,
    sentBy: me?.id,
  });
}
