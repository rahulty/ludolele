import React, { useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
import { Board } from "./comps/board";
import { Dice } from "./comps/dice";
import useGlobal from "./store";
import {
  playersStates,
  homes,
  places,
  playersColors,
  startIndexes,
} from "./constants";

const socket = io("http://localhost:8002");

socket.on("connect", () => {
  socket.emit("my other event", { fucking: "data" });
});

function App() {
  return (
    <div className="App">
      <Board />
      <Dice />
      <GitiArrangement />
    </div>
  );
}

export default App;

function GitiArrangement() {
  const Gitis = {};
  const [numberOfPlayers, setGitis] = useGlobal(
    (s) => s.numberOfPlayers,
    (a) => a.setGitis
  );

  for (let playerIndex = 0; playerIndex < numberOfPlayers; playerIndex++) {
    let playerState = playersStates[playerIndex];
    for (let gitiIdx = 0; gitiIdx < playerState.length; gitiIdx++) {
      let playerGiti = playerState[gitiIdx];
      let position = [0, 0];
      if (playerGiti[0] === -1) {
        // Player is at home
        position = homes[playerIndex][gitiIdx];
      } else if (playerGiti[0] > -1) {
        position = places[playerIndex][gitiIdx];
      }
      const s = {
        id: playerIndex + "-" + gitiIdx,
        position: { X: position[0], Y: position[1] },
        playerColor: playersColors[playerIndex],
        placeIndex: startIndexes[playerIndex],
        moved: 0,
        playerIndex,
      };
      Gitis[s.id] = s;
    }
  }
  setGitis(Gitis);
  return null;
}
