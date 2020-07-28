import { sendToAny } from "./common";
import { getMoveableGitis, changeTurn, getPitiGitis } from "./moveableGiti";
import { All } from "../constants";

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

  if (gitis[gitiId].canMoveTo > -1) {
    const moveBy = moves.shift();

    gitis[gitiId].positionIndex = gitis[gitiId].canMoveTo;

    const pitiGitis = getPitiGitis(gitis, gitis[gitiId]);
    pitiGitis.forEach((giti) => {
      giti.positionIndex =
        All.find((a) => a.color === giti.color).homeIndex + Number(giti.id[2]);
      giti.moved = -1;
    });
    if (pitiGitis.length) {
      gitis[gitiId].isPitiGiti = true;
    } else if (gitis[gitiId].moved === -1) {
      gitis[gitiId].moved = 0;
    } else {
      gitis[gitiId].moved = gitis[gitiId].moved + moveBy;
    }
    for (let gk in gitis) {
      gitis[gk] = { ...gitis[gk], canMoveTo: -1 };
    }
  }
  let shouldChangeTurn = false;
  if (moves.length) {
    const moveableGitis = getMoveableGitis(gitis, turnId, me, moves[0]);
    if (Object.keys(moveableGitis).length) {
      Object.assign(gameState.gitis, moveableGitis);
      gameState.next = "moveGiti";
    } else {
      shouldChangeTurn = true;
    }
  } else {
    shouldChangeTurn = true;
  }
  if (gitis[gitiId].isPitiGiti) {
    delete gitis[gitiId].isPitiGiti;
    gameState.next = "rollDice";
  } else if (shouldChangeTurn) {
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
