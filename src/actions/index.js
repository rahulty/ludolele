import { listener as rollDiceListener, rollDice } from "./rollDice";
import { listener as setPlayerListener, setSendMe } from "./setPlayers";
import { sendPlayerInfo, setPlayerInfo, setGetSendRoomInfo } from "./room";
import { moveGiti, setGitis, listenMoveGiti } from "./giti";
import { sendStartGame, listenStartGame } from "./game";

const ActionsListenersMap = {
  joinRoom: {
    id: "joinRoom",
    action: setGetSendRoomInfo,
    listener: sendPlayerInfo,
  },
  playerInfo: { id: "playerInfo", listener: setPlayerInfo },
  startGame: {
    id: "startGame",
    action: sendStartGame,
    listener: listenStartGame,
  },
  rollDice: { id: "rollDice", action: rollDice, listener: rollDiceListener },
  setPlayer: { id: "setPlayer", listener: setPlayerListener },
  moveGiti: { id: "moveGiti", action: moveGiti, listener: listenMoveGiti },
  setGitis: { id: "setGitis", action: setGitis },
  setSendMe: { id: "setSendMe", action: setSendMe },
};

const anyListen = (store, response) => {
  const { action, sentBy } = response;
  if (sentBy === store.state.me?.id) {
    return;
  }
  ActionsListenersMap[action].listener(store, response);
};

export {
  setGetSendRoomInfo,
  setPlayerInfo,
  sendStartGame as startGame,
  rollDice,
  moveGiti,
  setGitis,
  setSendMe,
  anyListen,
};
