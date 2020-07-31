import { sendToAny } from "./common";

export const setGetSendRoomInfo = ({ state, setState }, roomId) => {
  sendToAny({ roomId, me: state.me }, "joinRoom", null);
  setState({ roomId });
};
export const sendPlayerInfo = ({ state }) => {
  sendToAny(state, "playerInfo", {
    player: state.me,
    isStarted: state.gameState.isStarted,
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
