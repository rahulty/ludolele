import React, { useRef } from "react";
import { MobileView } from "react-device-detect";
import WhatsAppImg from "../imgs/whatsAppIcon.png";
import ShareIcon from "../imgs/shareIcon.png";
import useGlobal from "../store";
import { Overlay } from "./overlay";

export function PlayersList() {
  const [players] = useGlobal((s) => s.players);
  const [me] = useGlobal((s) => s.me);
  const [isStarted, startGame] = useGlobal(
    (s) => s.gameState.isStarted,
    (a) => a.startGame
  );

  function onClickStart() {
    startGame();
  }
  return isStarted || !me.color ? null : (
    <Overlay style={{ flexDirection: "column" }}>
      <ol>
        {players.map((p) => (
          <li>
            {me.id === p.id ? (
              <b>
                {p.name}:{p.color}
              </b>
            ) : (
              `${p.name}:${p.color}`
            )}
          </li>
        ))}
      </ol>
      <h3>Waiting for players to join</h3>
      {players.length > 1 && !isStarted && (
        <>
          <h3>OR</h3>
          <button onClick={onClickStart}>Start Game</button>
        </>
      )}

      <Share />
    </Overlay>
  );
}
function Share() {
  // hack to share location hash on whatsapp
  const hash = window.location.hash.split("/").slice(1).join("/");
  const text = `Hey, I'd like to invite you to play ludo with me.%0A${window.location.origin}/%23/${hash}`;
  const refLink = useRef();

  return (
    <section>
      <h2>Share:</h2>
      <section
        onClick={() => {
          refLink.current.select();
          document.execCommand("copy");
        }}
      >
        <input
          readOnly
          value={window.location}
          style={{ fontSize: "15px" }}
          ref={refLink}
        />
        <button style={{ fontSize: "15px", marginLeft: "10px" }}>
          Copy Link
        </button>
      </section>
      <MobileView style={{ marginTop: "10px" }}>
        <a
          href={`whatsapp://send?text=${text}`}
          data-action="share/whatsapp/share"
        >
          <img
            src={WhatsAppImg}
            alt="Share on WhatsApp"
            style={{ width: "64px" }}
          />
        </a>
        {navigator.share && (
          <div
            onClick={() => {
              navigator.share({
                title: "share",
                text: "ludo",
                url: window.location,
              });
            }}
          >
            <img src={ShareIcon} alt="Share via" style={{ width: "64px" }} />
          </div>
        )}
      </MobileView>
    </section>
  );
}
