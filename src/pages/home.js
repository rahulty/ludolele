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
    <>
      <button onClick={onClick}>Create New Game</button>
      <section>
        Share the url of new created game with people you wish to play with
      </section>
      <section>
        <h1>Rules:-</h1>
        <ol>
          <li>Player who start the game, starts rolling dice.</li>
          <li>Players take turns in a clockwise order</li>
          <li>A throw of 6 gives another turn.</li>
        </ol>
      </section>
    </>
  );
}
