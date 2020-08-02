import { sendToAny } from "./common";

export const sendStartGame = (store) => {
  Object.assign(store.state.gameState, {
    isStarted: true,
    turnId: store.state.me.id,
  });
  store.setState({ gameState: store.state.gameState });
  sendToAny(store, "startGame", store.state.gameState);
};

export const listenStartGame = ({ state, setState }, gameState) => {
  Object.assign(state.gameState, { isStarted: true, turnId: gameState.turnId });
  setState({ gameState: state.gameState });
};
