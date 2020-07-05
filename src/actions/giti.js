import { sendToAny } from "./common";

export const moveGiti = (store, gitiId) => {
  const {
    gameState: { gitis, turnId },
    me,
  } = store.state;
  if (turnId !== me.id) {
    return;
  }

  if (gitis[gitiId].canMoveTo > -1) {
    gitis[gitiId].positionIndex = gitis[gitiId].canMoveTo;
    for (let gk in gitis) {
      gitis[gk] = {
        ...gitis[gk],
        canMoveTo: -1,
        selected: false,
      };
    }
  }
  store.setState({ gitis });
  sendToAny(store.state, "moveGiti", gitis);
};

export const listenMoveGiti = (store, { payload }) => {
  store.state.gameState.gitis = payload;
  store.setState({ gameState: store.state.gameState });
};
export const setGitis = ({ state, setState }, gitis) => {
  state.gameState.gitis = { ...state.gameState.gitis, ...gitis };
  setState({ gameState: state.gameState });
};
