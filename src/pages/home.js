import React from "react";
import { useHistory } from "react-router-dom";
import { getRandomInteger } from "../utils";

export function Home() {
  const history = useHistory();
  const onClick = () => {
    const roomId = getRandomInteger(9999, 99999999);
    history.replace(`/r/${roomId}`);
  };
  return (
    <section style={{ marginTop: "10%" }}>
      <section>
        Play your favorite game: Ludo with friends and family online, on browser
        <br />
        No app installs required. Just create a new game and share link via
        whatsapp or other source
      </section>
      <button style={{ fontSize: "25px", marginTop: "10px" }} onClick={onClick}>
        Create New Game
      </button>
      <section>
        <h1>Rules:-</h1>
        <ol>
          <li>Player who start the game, starts rolling dice.</li>
          <li>Players take turns in a clockwise order</li>
          <li>A throw of 6 gives another turn.</li>
        </ol>
      </section>
    </section>
  );
}
