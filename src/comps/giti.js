import React from "react";
import useGlobal from "../store";
import { places } from "../constants";
const colorColorMap = {
  green: "rgb(33,75,29)",
  yellow: "yellow",
  blue: "rgb(2,64,133)",
  red: "rgb(254,0,0)",
};
const xTranslateBy = {
  0: 1,
  1: -1,
  2: 2,
  3: -2,
};

export function Giti({ id }) {
  const [g, moveGiti] = useGlobal(
    (s) => s.gameState.gitis[id],
    (a) => a.moveGiti
  );
  useGlobal((s) => s.gameState.gitis[id].canMoveTo);
  const { positionIndex, canMoveTo, color } = g;
  const [gitisAtPI] = useGlobal((s) => s.gameState.gitisAtPI[positionIndex]);
  const [me] = useGlobal((s) => s.me);
  const isActive = canMoveTo > -1 && me.color === color;
  let [cx, cy] = places[positionIndex];
  if (gitisAtPI?.length > 1) {
    if (gitisAtPI % 2 === 0) {
      cx = cx + xTranslateBy[id[0]] * 5;
    } else {
      cy = cy + xTranslateBy[id[0]] * 5;
    }
  }
  function onGitiClick() {
    moveGiti(id);
  }
  return (
    <circle
      cx={cx}
      cy={cy}
      stroke="black"
      r="10px"
      fill={colorColorMap[color]}
      strokeDasharray={isActive ? 2 : 0}
      className={isActive ? "gitiActive" : ""}
      onClick={onGitiClick}
      id={id}
    ></circle>
  );
}
