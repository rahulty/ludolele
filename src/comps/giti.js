import React from "react";
import useGlobal from "../store";
import { places } from "../constants";

export function Giti({ id }) {
  const [g, moveGiti] = useGlobal(
    (s) => s.gameState.gitis[id],
    (a) => a.moveGiti
  );
  useGlobal((s) => s.gameState.gitis[id].canMoveTo);
  const { positionIndex, canMoveTo, color } = g;
  function onGitiClick() {
    moveGiti(id);
  }
  return (
    <circle
      cx={places[positionIndex][0]}
      cy={places[positionIndex][1]}
      stroke="black"
      r="10px"
      fill={color}
      strokeDasharray={canMoveTo > -1 ? 2 : 0}
      onClick={onGitiClick}
    >
      {g.id}
    </circle>
  );
}
