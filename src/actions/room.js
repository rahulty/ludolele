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
  state.gameState.players = {
    ...state.gameState.players,
    [payload.id]: payload,
  };
  setState({ gameState: state.gameState });
};
