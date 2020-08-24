import React from "react";
import useGlobal from "../store";

export function Dice() {
  const [dice, rollDice] = useGlobal(
    (s) => s.gameState.dice,
    (a) => a.rollDice
  );
  useGlobal((s) => s.gameState.moves?.length);
  const [moves] = useGlobal((s) => s.gameState.moves);
  const [turnId] = useGlobal((s) => s.gameState.turnId);
  const [players] = useGlobal((s) => s.players);
  const [next] = useGlobal((s) => s.gameState.next);
  const [me] = useGlobal((s) => s.me);
  const player = players.find((p) => p.id === turnId);
  function onDiceClick() {
    rollDice();
  }

  return (
    <>
      <button
        id="dice"
        disabled={next !== "rollDice" || me.id !== turnId}
        className={next === "rollDice" && me.id === turnId ? "blink" : ""}
        style={{ color: player?.color }}
        onClick={onDiceClick}
      >
        {dice}
      </button>
      <div>{moves}</div>
    </>
  );
}
