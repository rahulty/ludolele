import { useEffect } from "react";
import useGlobal from "../store";
import { All } from "../constants";

export function InitializeGiti() {
  const [players, setGitis] = useGlobal(
    (s) => s.players,
    (a) => a.setGitis
  );

  useEffect(() => {
    const gitis = {};
    for (let p in players) {
      const { color } = players[p];
      if (!color) continue;
      let colorIndex = -1;
      const { homeIndex } = All.find((a, i) => {
        if (a.color === color) {
          colorIndex = i;
          return true;
        }
        return false;
      });
      for (let gitiIndex = 0; gitiIndex < 4; gitiIndex++) {
        gitis[colorIndex + "-" + gitiIndex] = {
          id: colorIndex + "-" + gitiIndex,
          color,
          positionIndex: homeIndex + gitiIndex,
          moved: -1,
          canMoveTo: -1,
        };
      }
    }
    Object.keys(gitis).length > 0 && setGitis(gitis);
  }, [players, setGitis]);

  return null;
}
