import { sendToAny } from "./common";

export const setGetSendRoomInfo = (store, roomId) => {
  store.state.roomId = roomId;
  sendToAny(store, "joinRoom", null);
  store.setState({ roomId });
};
export const sendPlayerInfo = (store) => {
  sendToAny(store, "playerInfo", {
    player: store.state.me,
    isStarted: store.state.gameState.isStarted,
  });
};
export const setPlayerInfo = ({ state, setState }, { payload }) => {
  if (
    !payload.player.color ||
    state.players.find((p) => p.color === payload.player.color)
  ) {
    return;
  }
  state.players = [...state.players, payload.player];
  state.gameState.isStarted = payload.isStarted;
  setState({ players: state.players, gameState: state.gameState });
};
