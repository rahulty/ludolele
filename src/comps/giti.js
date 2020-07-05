import React from "react";
import useGlobal from "../store";
import { places } from "../constants";

export function Giti({ id }) {
  const [g, moveGiti] = useGlobal(
    (s) => s.gameState.gitis[id],
    (a) => a.moveGiti
  );
  const { positionIndex, selected, color } = g;
  function onGitiClick() {
    moveGiti(id);
  }
  console.log(id);
  return (
    <circle
      cx={places[positionIndex][0]}
      cy={places[positionIndex][1]}
      stroke="black"
      r="10px"
      fill={color}
      strokeDasharray={selected ? 2 : 0}
      onClick={onGitiClick}
    >
      {g.id}
    </circle>
  );
}
