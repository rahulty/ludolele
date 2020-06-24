import React from "react";
import useGlobal from "../store";

export function Giti({ id, playerColor }) {
  const [g, moveGiti] = useGlobal(
    (s) => s.gitis[id],
    (a) => a.moveGiti
  );
  const { position, selected } = g;
  function onGitiClick() {
    moveGiti(id);
  }

  return (
    <circle
      cx={position.X}
      cy={position.Y}
      stroke="black"
      r="10px"
      fill={playerColor}
      strokeDasharray={selected ? 2 : 0}
      onClick={onGitiClick}
    ></circle>
  );
}
