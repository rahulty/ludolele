import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Board } from "./comps/board";
import { Dice } from "./comps/dice";
import useGlobal from "./store";
import { socket } from "./constants/socket";
import { PlayersList } from "./comps/playerList";
import { MyForm } from "./comps/myForm";
import { InitializeGiti } from "./comps/initializeGiti";
import { DisplayTurn } from "./comps/displayTurn";

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
      <MyForm />
      <PlayersList />
      <Board />
      <Dice />
      <DisplayTurn />
      <InitializeGiti />
    </>
  );
}
