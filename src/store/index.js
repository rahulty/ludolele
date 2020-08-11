import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";
import { getRandomInteger } from "../utils";
const rnd = getRandomInteger(1, 1000000000);
const roomId = window.location.hash.split("/")[2];
const local = JSON.parse(localStorage?.getItem(roomId));
const me = {
  id: rnd,
  color: null,
};

const initialState = local || {
  disconnectedPlayers: {},
  me,
  roomId: null,
  players: [me],
  gameState: {
    wonPlayerColors: [],
    isStarted: false,
    turnId: null,
    dice: 0,
    pitiCount: 0,
    next: "rollDice",
    moves: [],
    gitis: {},
    gitisAtPI: {},
  },
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
