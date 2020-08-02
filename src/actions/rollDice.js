import { getMoveableGitis, changeTurn } from "./moveableGiti";
import { sendToAny } from "./common";
import { getRandomInteger } from "../utils";
import { diceNumbersThatOpen } from "../constants";

export const rollDice = (store) => {
  const {
    gameState: { isStarted, turnId, next, gitis },
    gameState,
    players,
    me,
  } = store.state;
  if (!isStarted || turnId !== me.id || next !== "rollDice") {
    return;
  }
  const dice = getRandomInteger(1, 6);
  gameState.dice = dice;
  if (gameState.moves.length >= 3) {
    gameState.moves = [];
  }
  gameState.moves.push(dice);
  if (!diceNumbersThatOpen.includes(dice)) {
    Object.assign(gameState, { next: "moveGiti" });
  }
  const movableGitis = getMoveableGitis(gitis, turnId, me, gameState.moves[0]);
  Object.assign(gameState.gitis, movableGitis);
  if (!Object.keys(movableGitis).length) {
    // change turn if no giti movable
    Object.assign(gameState, {
      turnId: changeTurn(players, turnId),
      next: "rollDice",
      moves: [],
    });
  }
  sendToAny(store, "rollDice", gameState);
  store.setState({ gameState });
};

export const listener = ({ state, setState }, { payload: gameState }) => {
  Object.assign(state.gameState, {
    dice: gameState.dice,
    gitis: gameState.gitis,
    turnId: gameState.turnId,
    next: gameState.next,
    moves: gameState.moves,
  });
  setState({ gameState: state.gameState });
};
