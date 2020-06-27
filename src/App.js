import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
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
  All,
} from "./constants";
import { socket } from "./constants/socket";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/r/:id" component={Main} />
      </BrowserRouter>
    </div>
  );
}

export default App;

function Main({ match: { params } }) {
  const [, actions] = useGlobal(
    (s) => false,
    (a) => a
  );
  useEffect(() => {
    socket.on("anyListen", actions.anyListen);
    actions.setRoom(params.id);
  }, []);
  return (
    <>
      <ChooseColor />
      <Players />
      <Board />
      <Dice />
      <InitializeGiti />
    </>
  );
}

function InitializeGiti() {
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
          selected: false,
          moved: 0,
        };
      }
    }
    Object.keys(gitis).length > 0 && setGitis(gitis);
  }, [players, setGitis]);

  return null;
}

function ChooseColor() {
  const colors = ["green", "yellow", "blue", "red"];
  const [players] = useGlobal((s) => s.players);
  const ref = useRef();
  const [myColor, setMe] = useGlobal(
    (s) => s.me.color,
    (a) => a.setMe
  );
  function onClick() {
    const {
      color: { value: color },
      name: { value: name },
    } = ref.current.children;
    setMe({ color, name });
  }

  return (
    !myColor && (
      <section ref={ref}>
        <input type="text" id="name" placeholder="Name" />
        <select id="color">
          {colors.map((c) => {
            for (let p in players) {
              if (players[p].color === c) {
                return null;
              }
            }
            return <option value={c}>{c}</option>;
          })}
        </select>
        <button onClick={onClick}>Select</button>
      </section>
    )
  );
}
function Players() {
  const [players] = useGlobal((s) => s.players);
  const [me] = useGlobal((s) => s.me);
  const [isStarted, startGame] = useGlobal(
    (s) => s.isStarted,
    (a) => a.startGame
  );
  const Ps = useRef([]);
  let [count, setCount] = useState(0);
  useEffect(() => {
    Ps.current = [];
    for (let p in players) {
      const { id, name, color } = players[p];
      const n =
        me.id === id ? (
          <b>Me:{name && name + ":" + color}</b>
        ) : (
          name && name + ":" + color
        );
      setCount(color ? count + 1 : count);
      Ps.current.push(<li>{n}</li>);
    }
  }, [players]);

  function onClickStart() {
    startGame();
  }
  return (
    <section>
      <ol>{Ps.current}</ol>
      {count > 1 && !isStarted && (
        <button onClick={onClickStart}>Start Game</button>
      )}
    </section>
  );
}
