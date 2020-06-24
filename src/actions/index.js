import {
  places,
  playersColors,
  startIndexes,
  diceNumbersThatOpen,
} from "../constants";

export const rollDice = (store, dice) => {
  const { canRollDice, gitis, turnColorIndex } = store.state;
  if (canRollDice) {
    getGitisCanBeMoved({ turnColorIndex, gitis, dice });

    store.setState({ dice, canRollDice: false, gitis });
  }
};
export const setGitis = (store, gitis) => {
  store.setState({ gitis });
};
export const moveGiti = (store, gitiId) => {
  const {
    gitis,
    dice,
    turnColorIndex,
    canRollDice,
    numberOfPlayers,
  } = store.state;
  const giti = gitis[gitiId];
  if (giti.playerIndex !== turnColorIndex || canRollDice) {
    return;
  }
  const newPosIndex = getNewPosition({ gitis, giti, dice });
  gitis[gitiId] = {
    ...gitis[gitiId],
    position: { X: places[newPosIndex][0], Y: places[newPosIndex][1] },
    placeIndex: newPosIndex,
    moved: giti.moved + dice,
  };
  store.setState({
    gitis,
    canRollDice: true,
    turnColorIndex: getIndex(Array(numberOfPlayers), turnColorIndex + 1),
  });
};

function getNewPosition({ gitis, giti, dice }) {
  if (
    startIndexes.includes(giti.placeIndex) &&
    diceNumbersThatOpen.includes(dice)
  ) {
    return giti.placeIndex;
  }
  return giti.placeIndex + dice;
}

function getIndex(arr, index) {
  if (index < 0) {
    return arr.length + index;
  }
  if (index >= arr.length) {
    return index % arr.length;
  }
  return index;
}
function getGitisCanBeMoved({ turnColorIndex, dice, gitis }) {
  // const currColorGitis = gitis.filter((gi) => gi.id[0] == turnColorIndex);
  Object.keys(gitis).forEach((giKey) => {
    if (gitis[giKey].id[0] == turnColorIndex) {
      gitis[giKey].selected = true;
    }
  });

  // return currColorGitis
}
