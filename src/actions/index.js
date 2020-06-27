import { places, startIndexes, diceNumbersThatOpen, All } from "../constants";
import { socket } from "../constants/socket";

export const anyListen = (store, response) => {
  const { action, payload } = response;
  // console.log(store.state, response);
  if (action === "setPlayer") {
    store.state.players[payload.me.id] = payload.me;
    store.setState({ players: { ...store.state.players } });
  } else if (action === "joinRoom") {
    sendToAny(store.state, "setPlayer", { me: store.state.me });
  } else if (action === "diceRoll") {
    store.state.gameState.dice = payload.gameState.dice;
    store.setState({
      gameState: store.state.gameState,
      gitis: payload.gitis,
    });
  } else if (action === "startGame") {
    store.setState({ isStarted: true });
  }
};

export const setMe = (store, { color, name }) => {
  store.state.me.color = color;
  store.state.me.name = name;
  sendToAny(store.state, "setPlayer", store.state);
  store.setState({ me: store.state.me });
};

export const setRoom = (store, roomId) => {
  store.state.roomId = roomId;
  sendToAny(store.state, "joinRoom", null);
  store.setState({ roomId });
};

export const rollDice = (store, dice) => {
  // const { canRollDice, gitis, turnColorIndex } = store.state;
  const { gameState, isStarted } = store.state;
  if (isStarted) {
    movableGitis(store);
    gameState.dice = dice;
    gameState.moves.unshift(dice);
    sendToAny(store.state, "diceRoll", store.state);
  }
};
export const setGitis = (store, gitis) => {
  store.setState({ gitis });
};
export const startGame = (store) => {
  store.setState({ isStarted: true, turnId: store.state.me.id });
  sendToAny(store.state, "startGame");
};

// export const moveGiti = (store, gitiId) => {
//   const {
//     gitis,
//     dice,
//     turnColorIndex,
//     canRollDice,
//     numberOfPlayers,
//   } = store.state;
//   const giti = gitis[gitiId];
//   if (giti.playerIndex !== turnColorIndex || canRollDice) {
//     return;
//   }
//   const newPosIndex = getNewPosition({ gitis, giti, dice });
//   gitis[gitiId] = {
//     ...gitis[gitiId],
//     position: { X: places[newPosIndex][0], Y: places[newPosIndex][1] },
//     placeIndex: newPosIndex,
//     moved: giti.moved + dice,
//   };
//   for (let k in gitis) {
//     gitis[k] = gitis[k].selected ? { ...gitis[k], selected: false } : gitis[k];
//   }
//   store.setState({
//     gitis,
//     canRollDice: true,
//     turnColorIndex: getIndex(Array(numberOfPlayers), turnColorIndex + 1),
//   });
// };
export const moveGiti = (store, gitiId) => {
  const { gitis } = store.state;
  const giti = gitis[gitiId];
  if (giti.canMoveTo > -1) {
    giti.positionIndex = giti.canMoveTo;
    giti.canMoveTo = -1;
    giti.selected = false;
    store.setState({ gitis });
  }
};
export const movableGitis = (store) => {
  const {
    gameState: { dice, isStarted, isRolled, moves },
    me,
    turnId,
    gitis,
  } = store.state;
  if (!isStarted || me.id !== turnId || !moves.length) {
    return;
  }

  for (let gitiId in gitis) {
    const giti = gitis[gitiId];
    giti.canMoveTo = -1;
    giti.selected = false;
    if (giti.color !== me.color) continue;
    const newPos = getNewPositionIndex({ giti, move: moves[0] });
    if (newPos > -1) {
      moves.shift();
      giti.canMoveTo = newPos;
      giti.selected = true;
    }
  }
  store.setState({ gitis });
  // sendToAny(store.state, "movableGitis", gitis);
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

// function getNewPosition({ gitis, giti, dice }) {
//   if (
//     startIndexes.includes(giti.placeIndex) &&
//     diceNumbersThatOpen.includes(dice)
//   ) {
//     return giti.placeIndex;
//   }
//   return giti.placeIndex + dice;
// }
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
      gitis[giKey] = { ...gitis[giKey], selected: true };
    } else {
      gitis[giKey] = { ...gitis[giKey], selected: false };
    }
  });

  // return currColorGitis
}

function sendToAny(state, action, data) {
  socket.emit("any", { room: "room" + state.roomId, action, payload: data });
}
