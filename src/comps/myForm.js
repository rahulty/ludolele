import React, { useRef } from "react";
import { All } from "../constants";
import useGlobal from "../store";

export function MyForm() {
  const colors = All.map((a) => a.color);
  const [players] = useGlobal((s) => s.players);
  const ref = useRef();
  const [myColor, setSendMe] = useGlobal(
    (s) => s.me.color,
    (a) => a.setSendMe
  );
  function onSelectClick() {
    const {
      color: { value: color },
      name: { value: name },
    } = ref.current.children;
    setSendMe({ color, name });
  }

  return (
    !myColor && (
      <section ref={ref}>
        <input type="text" id="name" placeholder="Name" />
        <select id="color">
          {colors.map((c) => {
            if (players.find((p) => p.color === c)) {
              return null;
            }
            return <option value={c}>{c}</option>;
          })}
        </select>
        <button onClick={onSelectClick}>Select</button>
      </section>
    )
  );
}
