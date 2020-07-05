import { diceNumbersThatOpen, All } from "../constants";

export const setMoveableGitis = (store) => {
  const {
    gameState: { isStarted, moves, turnId, gitis },
    gameState,
    me,
  } = store.state;
  if (!isStarted || me.id !== turnId || !moves.length) {
    return;
  }

  for (let gitiId in gitis) {
    let giti = gitis[gitiId];
    giti.canMoveTo = -1;
    giti.selected = false;
    if (giti.color !== me.color) continue;
    const newPos = getNewPositionIndex({ giti, move: moves[0] });

    if (newPos > -1) {
      giti = { ...giti, canMoveTo: newPos, selected: true };
    }
    gitis[gitiId] = { ...giti };
  }
  Object.assign(gameState.gitis, gitis);
  store.setState({ gameState: store.state.gameState });
  /**
   * game not started ---
   * dice not rolled ---
   * not my turn ---
   * not my giti ---
   * giti not open & no opening diceVal
   * newPos>curr+diceVal
   * giti outside
   *
   */
};

function getNewPositionIndex({ giti, move }) {
  const { positionIndex } = giti;
  const { turnIndex, outIndex, homeIndex, startIndex } = All.find(
    (a) => a.color === giti.color
  );
  let newPI = positionIndex + move;
  if (positionIndex >= homeIndex) {
    return diceNumbersThatOpen.includes(move) ? startIndex : -1;
  } else if (newPI > giti.outIndex) {
    return -1;
  } else if (outIndex > newPI && newPI > turnIndex) {
    return move - (turnIndex - positionIndex) + outIndex - 5;
  }

  return newPI;
}
