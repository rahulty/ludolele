import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";

const initialState = {
  dice: 0,
  turnColorIndex: 0,
  gitis: {},
  numberOfPlayers: 2,
  canRollDice: true,
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
