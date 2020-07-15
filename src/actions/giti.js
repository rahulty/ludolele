import { sendToAny } from "./common";
import { getMoveableGitis, changeTurn } from "./moveableGiti";

export const moveGiti = (store, gitiId) => {
  const {
    gameState: { gitis, turnId, next, moves },
    gameState,
    me,
    players,
  } = store.state;
  if (
    turnId !== me.id ||
    gitis[gitiId].color !== me.color ||
    next !== "moveGiti"
  ) {
    return;
  }

  const moveBy = moves.shift();
  if (gitis[gitiId].canMoveTo > -1) {
    gitis[gitiId].positionIndex = gitis[gitiId].canMoveTo;
    gitis[gitiId].moved = gitis[gitiId].moved + moveBy;
    for (let gk in gitis) {
      gitis[gk] = { ...gitis[gk], canMoveTo: -1 };
    }
  }
  if (moves.length) {
    Object.assign(
      gameState.gitis,
      getMoveableGitis(gitis, turnId, me, moves[0])
    );
    gameState.next = "moveGiti";
  } else {
    gameState.next = "rollDice";
    gameState.turnId = changeTurn(players, turnId);
  }
  store.setState({ gameState });
  sendToAny(store.state, "moveGiti", gameState);
};

export const listenMoveGiti = (store, { payload: gameState }) => {
  // Object.assign(store.state.gameState,{})
  store.setState({ gameState });
};
export const setGitis = ({ state, setState }, gitis) => {
  state.gameState.gitis = { ...state.gameState.gitis, ...gitis };
  setState({ gameState: state.gameState });
};
