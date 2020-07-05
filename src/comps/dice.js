import React from "react";
import useGlobal from "../store";

export function Dice() {
  const [dice, rollDice] = useGlobal(
    (s) => s.gameState.dice,
    (a) => a.rollDice
  );
  function onDiceClick() {
    rollDice();
  }

  return (
    <div unselectable="on" id="dice" onClick={onDiceClick}>
      {dice}
    </div>
  );
}
