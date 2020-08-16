import { sendToAny } from "./common";
import {
  getMoveableGitis,
  changeTurn,
  getPitiGitis,
  getGitisOnPIGroupByColor,
} from "./moveableGiti";
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
    const gitisAtPos = getGitisOnPIGroupByColor(
      gitis,
      gitis[gitiId].positionIndex
    );
    const pitiGitis = getPitiGitis(gitis[gitiId], gitisAtPos);
    pitiGitis.forEach((giti) => {
      giti.positionIndex =
        All.find((a) => a.color === giti.color).homeIndex + Number(giti.id[2]);
      giti.moved = -1;
    });
    if (
      pitiGitis.length ||
      All.find((a) => a.color === gitis[gitiId].color).outIndex ===
        gitis[gitiId].positionIndex
    ) {
      gameState.pitiCount = 1;
    }

    if (gitis[gitiId].moved === -1) {
      gitis[gitiId].moved = 0;
    } else {
      gitis[gitiId].moved = gitis[gitiId].moved + moveBy;
    }
    for (let gk in gitis) {
      gitis[gk] = { ...gitis[gk], canMoveTo: -1 };
    }
    if (areAllGitiHome(gitis, gitis[gitiId].color)) {
      gameState.wonPlayerColors.push(gitis[gitiId].color);
    }
    if (Object.keys(gitisAtPos).length > 1) {
      const gitisAtPI = [];
      Object.values(gitisAtPos).forEach((gitiArr) =>
        gitiArr.forEach((ga) => gitisAtPI.push(ga))
      );
      Object.assign(gameState.gitisAtPI, {
        [gitis[gitiId].positionIndex]: gitisAtPI,
      });
    } else {
      delete gameState.gitisAtPI[gitis[gitiId].positionIndex];
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

  if (shouldChangeTurn) {
    gameState.next = "rollDice";
    if (
      !gameState.pitiCount ||
      gameState.wonPlayerColors.includes(gitis[gitiId].color)
    ) {
      gameState.turnId = changeTurn(players, turnId, gameState.wonPlayerColors);
      gameState.moves = [];
    }
    if (gameState.pitiCount > 0) {
      gameState.pitiCount = 0;
    }
  }
  store.setState({ gameState });
  sendToAny(store, "moveGiti", gameState);
};

export const listenMoveGiti = (store, { payload: gameState }) => {
  store.setState({ gameState });
};
export const setGitis = ({ state, setState }, gitis) => {
  state.gameState.gitis = { ...state.gameState.gitis, ...gitis };
  setState({ gameState: state.gameState });
};

function areAllGitiHome(gitis, color) {
  let i = 0;
  const allV = All.find((a) => a.color === color);
  for (const k in gitis) {
    if (gitis[k].color === color && allV.outIndex === gitis[k].positionIndex) {
      if (++i === 4) {
        return true;
      }
    }
  }
  return false;
}
