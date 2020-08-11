import React from "react";
const styles = {
  overlay: {
    opacity: 0.7,
    background: "black",
  },
  wrapper: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};
export function Overlay({ children, style, ...other }) {
  return (
    <>
      <section style={{ ...styles.wrapper, ...styles.overlay }}></section>
      <section style={{ ...styles.wrapper, ...style }} {...other}>
        {children}
      </section>
    </>
  );
}
