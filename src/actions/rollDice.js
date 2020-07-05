import { setMoveableGitis } from "./moveableGiti";
import { sendToAny } from "./common";
import { getRandomInteger } from "../utils";

export const rollDice = (store) => {
  const {
    gameState: { isStarted, turnId },
    gameState,
    me,
  } = store.state;
  if (!isStarted || turnId !== me.id) {
    return;
  }
  const dice = getRandomInteger(1, 6);
  gameState.dice = dice;
  gameState.moves.unshift(dice);
  setMoveableGitis(store);
  sendToAny(store.state, "rollDice", gameState);
  store.setState({ gameState });
};

export const listener = ({ state, setState }, { payload: gameState }) => {
  Object.assign(state.gameState, {
    dice: gameState.dice,
    gitis: gameState.gitis,
  });
  setState({ gameState: state.gameState });
};
