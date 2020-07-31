import React from "react";
import useGlobal from "../store";

export function Dice() {
  const [dice, rollDice] = useGlobal(
    (s) => s.gameState.dice,
    (a) => a.rollDice
  );
  const [moves] = useGlobal((s) => s.gameState.moves);
  const [turnId] = useGlobal((s) => s.gameState.turnId);
  const [players] = useGlobal((s) => s.players);
  const player = players.find((p) => p.id === turnId);
  function onDiceClick() {
    rollDice();
  }

  return (
    <>
      <div
        unselectable="on"
        id="dice"
        style={{ color: player?.color }}
        onClick={onDiceClick}
      >
        {dice}
      </div>
      <div>{moves}</div>
    </>
  );
}
