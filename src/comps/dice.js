import React from "react";
import useGlobal from "../store";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Dice() {
  const [dice, rollDice] = useGlobal(
    (s) => s.dice,
    (a) => a.rollDice
  );
  function onDiceClick() {
    rollDice(getRndInteger(1, 6));
  }

  return (
    <div unselectable="on" id="dice" onClick={onDiceClick}>
      {dice}
    </div>
  );
}
