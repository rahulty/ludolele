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
    zIndex: 1,
  },
  wrapper: {
    position: "absolute",
    top: "3vh",
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 1,
  },
};

export function MyForm() {
  const colors = All.map((a) => a.color);
  const [players] = useGlobal((s) => s.players);
  const [isStarted] = useGlobal((s) => s.gameState.isStarted);
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
        {!isStarted ? (
          <form onSubmit={onSelectClick} ref={ref} style={styles.wrapper}>
            <h2>Choose your Name and Color to join the game</h2>
            <input
              type="text"
              maxLength="7"
              id="name"
              placeholder="Name"
              style={{ fontSize: "20px" }}
            />
            <br />
            <select id="color" style={{ fontSize: "30px" }}>
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
            <br />
            <input style={{ fontSize: "20px" }} type="submit" value="Add Me!" />
          </form>
        ) : (
          <h1 style={styles.wrapper}>
            This game is already started.
            <a href="/">Go to home</a>
            and create your own link.
            <br /> Share it with your friends to play.
          </h1>
        )}
      </>
    )
  );
}
