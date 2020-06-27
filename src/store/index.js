import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";
import { getRandomInteger } from "../utils";
const rnd = getRandomInteger(1, 1000000000);
// const localMe = localStorage.getItem("me");
const me = { id: rnd, color: null };
// localStorage.setItem("me", me);
const initialState = {
  me,
  players: { [me.id]: me },
  roomId: null,
  isStarted: false,
  turnId: null,
  gameState: {
    dice: 0,
    isRolled: false,
    pitiCount: 0,
    canRollDice: true,
    moves: [],
  },
  gitis: {},
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
