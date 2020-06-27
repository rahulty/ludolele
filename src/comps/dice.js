import React from "react";
import useGlobal from "../store";
import { getRandomInteger } from "../utils";

export function Dice() {
  const [dice, rollDice] = useGlobal(
    (s) => s.gameState.dice,
    (a) => a.rollDice
  );
  function onDiceClick() {
    rollDice(getRandomInteger(1, 6));
  }

  return (
    <div unselectable="on" id="dice" onClick={onDiceClick}>
      {dice}
    </div>
  );
}
