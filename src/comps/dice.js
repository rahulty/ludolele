import React from "react";
import useGlobal from "../store";

export function Dice() {
  const [dice, rollDice] = useGlobal(
    (s) => s.gameState.dice,
    (a) => a.rollDice
  );
  const [next] = useGlobal((s) => s.gameState.next);
  const [moves] = useGlobal((s) => s.gameState.moves);
  function onDiceClick() {
    rollDice();
  }

  return (
    <>
      <div
        unselectable="on"
        id="dice"
        className={next === "rollDice" ? "rollDice" : ""}
        onClick={onDiceClick}
      >
        {dice}
      </div>
      <div>{moves}</div>
    </>
  );
}
