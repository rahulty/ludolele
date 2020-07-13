import { sendToAny } from "./common";
import { sortPlayerByColor } from "./moveableGiti";

export function listener({ state, setState }, { payload }) {
  const { me } = payload;
  state.players = sortPlayerByColor([...state.players, me]);

  setState({ players: state.players });
}
export const setSendMe = ({ state, setState }, { color, name }) => {
  Object.assign(state.me, { color, name });
  state.players = sortPlayerByColor([...state.players, state.me]);
  sendToAny(state, "setPlayer", state);
  setState({ me: state.me, players: state.players });
};
