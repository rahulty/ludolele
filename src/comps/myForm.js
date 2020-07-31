import React, { useRef } from "react";
import { All } from "../constants";
import useGlobal from "../store";
const commonStyles = {
  screenCover: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};
const styles = {
  overlay: {
    ...commonStyles.screenCover,
    background: "black",
    opacity: 0.7,
  },
  wrapper: {
    position: "absolute",
    top: "3vh",
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
};

export function MyForm() {
  const colors = All.map((a) => a.color);
  const [players] = useGlobal((s) => s.players);
  const ref = useRef();
  const [myColor, setSendMe] = useGlobal(
    (s) => s.me.color,
    (a) => a.setSendMe
  );
  function onSelectClick(ev) {
    ev.preventDefault();
    const {
      color: { value: color },
      name: { value: name },
    } = ref.current.children;
    if (!color || !name) {
      // action show error snack
      return;
    }
    setSendMe({ color, name });
  }

  return (
    !myColor && (
      <>
        <div style={styles.overlay}></div>
        <form onSubmit={onSelectClick} ref={ref} style={styles.wrapper}>
          <h2>Set your Name and Color to start</h2>
          <input type="text" id="name" placeholder="Name" />
          <select id="color">
            {colors.map((c) => {
              if (players.find((p) => p.color === c)) {
                return null;
              }
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </>
    )
  );
}
