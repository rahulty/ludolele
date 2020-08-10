import React, { useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import { Board } from "./comps/board";
import { Dice } from "./comps/dice";
import useGlobal from "./store";
import { socket } from "./constants/socket";
import { PlayersList } from "./comps/playerList";
import { MyForm } from "./comps/myForm";
import { InitializeGiti } from "./comps/initializeGiti";
import { DisplayTurn } from "./comps/displayTurn";
import { Overlay } from "./comps/overlay";
import { Home } from "./pages/home";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Route path="/" exact component={Home} />
        <Route path="/r/:id" exact component={Main} />
      </HashRouter>
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

function Disconnected() {
  const [disconnectedPlayers] = useGlobal((s) => s.disconnectedPlayers);
  const [disColor1] = Object.keys(disconnectedPlayers).map((col) => col);
  const p1 = disconnectedPlayers[disColor1];

  return p1?.color ? (
    <Overlay>
      <h1>{p1.name + ": " + p1.color} is disconnected.</h1>
      <h1>Reconnecting...</h1>
      Or <a href="/">Go to Home</a>
    </Overlay>
  ) : null;
}
