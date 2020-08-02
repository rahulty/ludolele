import React, { useEffect } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import "./App.css";
import { Board } from "./comps/board";
import { Dice } from "./comps/dice";
import useGlobal from "./store";
import { socket } from "./constants/socket";
import { PlayersList } from "./comps/playerList";
import { MyForm } from "./comps/myForm";
import { InitializeGiti } from "./comps/initializeGiti";
import { DisplayTurn } from "./comps/displayTurn";
import { getRandomInteger } from "./utils";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/r/:id" exact component={Main} />
      </BrowserRouter>
    </div>
  );
}

export default App;

function Main({ match: { params } }) {
  const [, actions] = useGlobal(
    () => false,
    (a) => a
  );
  useEffect(() => {
    socket.on("anyListen", actions.anyListen);
    socket.on("myPongListen", actions.pongListen);
    socket.on("connect", actions.connected);
    socket.on("disconnect", actions.disconnected);
    actions.setGetSendRoomInfo(params.id);
    actions.runPongInterval();
  }, [actions, params.id]);
  return (
    <>
      <MyForm />
      <PlayersList />
      <Board />
      <Dice />
      <DisplayTurn />
      <InitializeGiti />
      <Disconnected />
    </>
  );
}

function Home() {
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
    </>
  );
}

function Disconnected() {
  const [disconnectedPlayers] = useGlobal((s) => s.disconnectedPlayers);
  const [disColor1] = Object.keys(disconnectedPlayers).map((col) => col);
  const p1 = disconnectedPlayers[disColor1];

  return p1 ? (
    <section
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        background: "black",
        opacity: 0.7,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
      }}
    >
      <h1>{p1.name + ": " + p1.color} is disconnected.</h1>
      <h1>Reconnecting...</h1>
      Or <a href="/">Go to Home</a>
    </section>
  ) : null;
}
