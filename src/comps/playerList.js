import React from "react";
import useGlobal from "../store";

export function PlayersList() {
  const [players] = useGlobal((s) => s.players);
  const [me] = useGlobal((s) => s.me);
  const [isStarted, startGame] = useGlobal(
    (s) => s.gameState.isStarted,
    (a) => a.startGame
  );

  function onClickStart() {
    startGame();
  }
  return (
    <section style={{ position: "absolute" }}>
      <ol>
        {players.map((p) => (
          <li>
            {me.id === p.id ? (
              <b>
                {p.name}:{p.color}
              </b>
            ) : (
              `${p.name}:${p.color}`
            )}
          </li>
        ))}
      </ol>
      {players.length > 1 && !isStarted && (
        <button onClick={onClickStart}>Start Game</button>
      )}
    </section>
  );
}
