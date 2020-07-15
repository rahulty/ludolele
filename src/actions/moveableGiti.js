import { diceNumbersThatOpen, All } from "../constants";
import { getIndex } from "./common";

export const getMoveableGitis = (gitis, turnId, me, move) => {
  if (me.id !== turnId) {
    return;
  }

  let localGitis = {};
  for (let gitiId in gitis) {
    let giti = gitis[gitiId];
    giti.canMoveTo = -1;
    if (giti.color !== me.color) continue;
    const newPI = getNewPositionIndex({ giti, move });

    if (newPI > -1) {
      giti = { ...giti, canMoveTo: newPI };
      localGitis[gitiId] = giti;
    }
  }
  return localGitis;
  /**
   * game not started ---
   * dice not rolled ---
   * not my turn ---
   * not my giti ---
   * giti not open & no opening diceVal
   * newPos>curr+diceVal
   * giti outside
   *
   */
};

function getNewPositionIndex({ giti, move }) {
  const { positionIndex, moved } = giti;
  const { turnIndex, outIndex, homeIndex, startIndex } = All.find(
    (a) => a.color === giti.color
  );
  let newPI = positionIndex + move;
  if (positionIndex >= homeIndex) {
    newPI = diceNumbersThatOpen.includes(move) ? startIndex : -1;
  } else if (newPI > outIndex) {
    newPI = -1;
  } else if (moved + move > 50) {
    newPI = move - (turnIndex - positionIndex) + outIndex - 5;
  } else if (turnIndex !== 50 && newPI > 51) {
    newPI = move - 1;
  }
  // else if (outIndex > newPI && newPI > turnIndex) {
  //   return move - (turnIndex - positionIndex) + outIndex - 5;
  // }

  return newPI;
}

export function pitiGiti(gitis, posIndex) {
  const gitisAtPos = { length: 0 };
  for (let k in gitis) {
    const { color, positionIndex } = gitis[k];
    if (positionIndex === posIndex) {
      if (gitisAtPos[color]) {
        gitisAtPos[color].push(gitis[k]);
      } else {
        gitisAtPos[color] = [gitis[k]];
      }
      gitisAtPos.length += 1;
    }
  }
  if (gitisAtPos.length > 1) {
  }
  return 0;
}

export function sortPlayerByColor(players) {
  // const currColor = players.find(p=>p.id===turnId).color;
  // const nextColor = All[getIndex(All, All.findIndex(a=>a.color===currColor)+1)];
  let newPlayers = [];
  for (let v of All) {
    const player = players.find((p) => p.color === v.color);
    player && newPlayers.push(player);
  }
  return newPlayers;
}
export function changeTurn(players, currTurnId) {
  const i = getIndex(
    players,
    players.findIndex((p) => p.id === currTurnId) + 1
  );
  return players[i].id;
}
