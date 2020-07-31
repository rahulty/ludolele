import { diceNumbersThatOpen, All, safeIndexes } from "../constants";
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
  const { turnIndex, outIndex, homeIndex, startIndex, turnInIndex } = All.find(
    (a) => a.color === giti.color
  );
  let newPI = positionIndex + move;
  if (positionIndex === outIndex) {
    newPI = -1;
  } else if (positionIndex >= homeIndex) {
    newPI = diceNumbersThatOpen.includes(move) ? startIndex : -1;
  } else if (moved + move > 50 && positionIndex < turnInIndex) {
    newPI = turnInIndex + move - 1 - (turnIndex - positionIndex);
  } else if (turnIndex !== 50 && newPI > 51 && positionIndex < turnInIndex) {
    const movesBefore51 = 51 - positionIndex;
    newPI = move - movesBefore51 - 1;
  }
  if (newPI > outIndex) {
    newPI = -1;
  }

  return newPI;
}

export function getPitiGitis(movingGiti, gitisAtPos) {
  let pitiGitis = [];
  const { positionIndex } = movingGiti;
  if (safeIndexes.includes(positionIndex)) {
    return pitiGitis;
  }
  const gitisAtPosVals = Object.values(gitisAtPos);
  if (gitisAtPosVals.length > 1) {
    if (gitisAtPosVals[0].length === gitisAtPosVals[1].length) {
      pitiGitis =
        gitisAtPos[
          Object.keys(gitisAtPos).find((e) => e !== movingGiti.color)
        ] || [];
    }
  }
  return pitiGitis;
}

export function getGitisOnPIGroupByColor(gitis, positionIndex) {
  const gitisAtPos = {};
  for (let k in gitis) {
    const { color, positionIndex: currGitiPI } = gitis[k];
    if (currGitiPI === positionIndex) {
      if (gitisAtPos[color]) {
        gitisAtPos[color].push(gitis[k]);
      } else {
        gitisAtPos[color] = [gitis[k]];
      }
    }
  }
  return gitisAtPos;
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
