import React from "react";
import useGlobal from "../store";

export function DisplayTurn() {
  const [turnId] = useGlobal((s) => s.gameState.turnId);
  const [players] = useGlobal((s) => s.players);

  return players.length && turnId ? (
    <section>{players.find((p) => p.id === turnId).name}'s Turn</section>
  ) : null;
}
