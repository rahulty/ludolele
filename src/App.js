import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Board } from "./comps/board";
import { Dice } from "./comps/dice";
import useGlobal from "./store";
import { All } from "./constants";
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
    actions.setGetSendRoomInfo(params.id);
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
    (s) => s.gameState.players,
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
  const [players] = useGlobal((s) => s.gameState.players);
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
            for (let p in players) {
              if (players[p].color === c) {
                return null;
              }
            }
            return <option value={c}>{c}</option>;
          })}
        </select>
        <button onClick={onSelectClick}>Select</button>
      </section>
    )
  );
}
function Players() {
  const [players] = useGlobal((s) => s.gameState.players);
  const [me] = useGlobal((s) => s.me);
  const [isStarted, startGame] = useGlobal(
    (s) => s.gameState.isStarted,
    (a) => a.startGame
  );
  const [Ps, setPs] = useState([]);
  let [count, setCount] = useState(0);
  useEffect(() => {
    let ps = [];
    let co = 0;
    for (let p in players) {
      const { id, name, color } = players[p];
      const n =
        me.id === id ? (
          <b>Me:{name && name + ":" + color}</b>
        ) : (
          name && name + ":" + color
        );
      ps.push(<li>{n}</li>);
      co = color ? co + 1 : co;
    }
    setCount(co);
    setPs(ps);
  }, [players, me.id]);

  function onClickStart() {
    startGame();
  }
  return (
    <section>
      <ol>{Ps}</ol>
      {count > 1 && !isStarted && (
        <button onClick={onClickStart}>Start Game</button>
      )}
    </section>
  );
}
