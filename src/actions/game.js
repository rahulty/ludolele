import { sendToAny } from "./common";

export const sendStartGame = ({ state, setState }) => {
  Object.assign(state.gameState, { isStarted: true, turnId: state.me.id });
  setState({ gameState: state.gameState });
  sendToAny(state, "startGame", state.gameState);
};

export const listenStartGame = ({ state, setState }, gameState) => {
  Object.assign(state.gameState, { isStarted: true, turnId: gameState.turnId });
  setState({ gameState: state.gameState });
};
