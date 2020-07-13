import { sendToAny } from "./common";

export const setGetSendRoomInfo = ({ state, setState }, roomId) => {
  sendToAny({ roomId, me: state.me }, "joinRoom", null);
  setState({ roomId });
};
export const sendPlayerInfo = ({ state }) => {
  sendToAny(state, "playerInfo", state.me);
};
export const setPlayerInfo = ({ state, setState }, { payload }) => {
  if (!payload.color) {
    return;
  }
  state.players = [...state.players, payload];
  setState({ players: state.players });
};
