import { sendToAny } from "./common";
import { sortPlayerByColor } from "./moveableGiti";

export function listener({ state, setState }, { payload }) {
  const { me } = payload;
  state.players = sortPlayerByColor([...state.players, me]);

  setState({ players: state.players });
}
export const setSendMe = (store, { color, name }) => {
  Object.assign(store.state.me, { color, name });
  store.state.players = sortPlayerByColor([
    ...store.state.players,
    store.state.me,
  ]);
  sendToAny(store, "setPlayer", store.state);
  store.setState({ me: store.state.me, players: store.state.players });
};
