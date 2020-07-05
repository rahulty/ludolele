import { sendToAny } from "./common";

export function listener({ state, setState }, { payload }) {
  const { me } = payload;
  state.gameState.players = {
    ...state.gameState.players,
    [me.id]: me,
  };
  setState({ gameState: state.gameState });
}
export const setSendMe = ({ state, setState }, { color, name }) => {
  Object.assign(state.me, { color, name });
  state.gameState.players = {
    ...state.gameState.players,
    [state.me.id]: state.me,
  };
  sendToAny(state, "setPlayer", state);
  setState({ me: state.me, gameState: state.gameState });
};
