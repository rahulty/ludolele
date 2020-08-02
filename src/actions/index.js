import { listener as rollDiceListener, rollDice } from "./rollDice";
import { listener as setPlayerListener, setSendMe } from "./setPlayers";
import { sendPlayerInfo, setPlayerInfo, setGetSendRoomInfo } from "./room";
import { moveGiti, setGitis, listenMoveGiti } from "./giti";
import { sendStartGame, listenStartGame } from "./startGame";
import { sendToMyPong, sendToAny } from "./common";

const reConnectListener = (store) => {
  sendToAny(store, "reConnected", store.state.gameState);
};
const reConnectedListener = (store, response) => {
  const { payload: gameState } = response;
  store.setState({ gameState });
};

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
  reConnect: { id: "reConnect", listener: reConnectListener },
  reConnected: { id: "reConnected", listener: reConnectedListener },
};

const anyListen = (store, response) => {
  const { action, sentBy } = response;
  if (sentBy === store.state.me?.id) {
    return;
  }
  ActionsListenersMap[action].listener(store, response);
};

let timer = {};
const pongListen = (store, data) => {
  const { players, me, disconnectedPlayers } = store.state;
  const { player } = data;
  if (timer[player.color]) {
    clearInterval(timer[player.color]);
    timer[player.color] = 0;
    let dp = disconnectedPlayers;
    if (disconnectedPlayers[player.color]) {
      dp = { ...disconnectedPlayers };
    }
    delete dp[player.color];
    store.setState({ disconnectedPlayers: dp });
  }
  players.forEach((p) => {
    if (!p.color || p.id === me.id) {
      return;
    }

    if (!timer[p.color]) {
      timer[p.color] = setInterval(() => {
        const dp = { ...disconnectedPlayers, [p.color]: p };
        store.setState({ disconnectedPlayers: dp });
      }, 7000);
    }
  });
};
const runPongInterval = (store) => {
  setInterval(() => {
    const { me } = store.state;
    if (me.color) {
      sendToMyPong(store, { player: me });
    }
  }, 5000);
};
const connected = (store) => {
  const { roomId, me } = store.state;
  if (!roomId || !me.color) {
    return;
  }
  sendToAny(store, "reConnect");
};
const disconnected = (store) => {
  const { me } = store.state;
  store.setState({ disconnectedPlayers: { [me.color]: me } });
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
  pongListen,
  runPongInterval,
  connected,
  disconnected,
};
