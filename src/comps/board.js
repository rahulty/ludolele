import React from "react";
import "./board.css";
import { Giti } from "./giti";
import useGlobal from "../store";

export function Board() {
  return (
    <svg
      version="1.1"
      id="svg2"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 383 383"
      style={{ height: "80vh", width: "100vw" }}
      space="preserve"
    >
      <g id="layer1">
        <Rectangles />
        <Gitis />
      </g>
    </svg>
  );
}

function Gitis() {
  const [gitis] = useGlobal((s) => s.gameState.gitis);
  return (
    <g id="players">
      {Object.keys(gitis).map((gi) => {
        const { playerColor, position, id } = gitis[gi];
        return (
          <Giti
            key={id}
            id={id}
            playerColor={playerColor}
            position={position}
          />
        );
      })}
    </g>
  );
}

function Rectangles() {
  return (
    <>
      <rect
        id="rect1310"
        x="11.5"
        y="11.5"
        className="st0"
        width="360"
        height="360"
      />
      <path
        id="path4280"
        className="st1"
        d="M155.5,347.5h48v-120h24l-36-36l-36,36h24v96h-24V347.5"
      />
      <path
        id="path5010"
        className="st2"
        d="M35.5,155.5v48h120v24l36-36l-36-36v24h-96v-24H35.5"
      />
      <path
        id="path5759"
        className="st3"
        d="M227.5,35.5h-48v120h-24l36,36l36-36h-24v-96h24V35.5"
      />
      <path
        id="path5761"
        className="st4"
        d="M347.5,227.5v-48h-120v-24l-36,36l36,36v-24h96v24H347.5"
      />
      <rect
        id="rect2307"
        x="11.5"
        y="227.5"
        className="st1"
        width="144"
        height="144"
      />
      <rect
        id="rect3035"
        x="11.5"
        y="11.5"
        className="st2"
        width="144"
        height="144"
      />
      <rect
        id="rect3037"
        x="227.5"
        y="11.5"
        className="st3"
        width="144"
        height="144"
      />
      <rect
        id="rect3039"
        x="227.5"
        y="227.5"
        className="st4"
        width="144"
        height="144"
      />
      <rect
        id="rect4004"
        x="11.5"
        y="11.5"
        className="st5"
        width="360"
        height="360"
      />
      <g id="squares" transform="translate(-0.5,-0.5)">
        <g id="g7984">
          <path id="path6495" className="st6" d="M156,372V228" />
          <path id="path7964" className="st6" d="M156,228h72" />
          <path id="path7968" className="st6" d="M156,252h72" />
          <path id="path7970" className="st6" d="M156,276h72" />
          <path id="path7972" className="st6" d="M156,300h72" />
          <path id="path7974" className="st6" d="M156,324h72" />
          <path id="path7976" className="st6" d="M156,348h72" />
          <path id="path7978" className="st6" d="M180,372V228" />
          <path id="path7980" className="st6" d="M204,372V228" />
          <path id="path7982" className="st6" d="M228,372V228" />
        </g>
        <g id="g7996" transform="matrix(0,1,-1,0,384,0)">
          <path className="st6" d="M156,372V228" />
          <path className="st6" d="M156,228h72" />
          <path className="st6" d="M156,252h72" />
          <path className="st6" d="M156,276h72" />
          <path className="st6" d="M156,300h72" />
          <path className="st6" d="M156,324h72" />
          <path className="st6" d="M156,348h72" />
          <path className="st6" d="M180,372V228" />
          <path className="st6" d="M204,372V228" />
          <path className="st6" d="M228,372V228" />
        </g>
        <g id="g8018" transform="matrix(-1,0,0,-1,384,384)">
          <path className="st6" d="M156,372V228" />
          <path className="st6" d="M156,228h72" />
          <path className="st6" d="M156,252h72" />
          <path className="st6" d="M156,276h72" />
          <path className="st6" d="M156,300h72" />
          <path className="st6" d="M156,324h72" />
          <path className="st6" d="M156,348h72" />
          <path className="st6" d="M180,372V228" />
          <path className="st6" d="M204,372V228" />
          <path className="st6" d="M228,372V228" />
        </g>
        <g id="g8040" transform="matrix(0,-1,1,0,0,384)">
          <path className="st6" d="M156,372V228" />
          <path className="st6" d="M156,228h72" />
          <path className="st6" d="M156,252h72" />
          <path className="st6" d="M156,276h72" />
          <path className="st6" d="M156,300h72" />
          <path className="st6" d="M156,324h72" />
          <path className="st6" d="M156,348h72" />
          <path className="st6" d="M180,372V228" />
          <path className="st6" d="M204,372V228" />
          <path className="st6" d="M228,372V228" />
        </g>
        <path id="path8062" className="st6" d="M156,228l72-72" />
        <path id="path8064" className="st6" d="M156,156l72,72" />
      </g>
      <g id="g3221">
        <path
          id="path3041"
          className="st7"
          d="M83.5,227.5l72,72l-72,72l-72-72L83.5,227.5z"
        />
        <g id="g3215">
          <rect
            id="rect3178"
            x="71.5"
            y="263.5"
            className="st8"
            width="24"
            height="24"
          />
          <rect
            id="rect3180"
            x="47.5"
            y="287.5"
            className="st8"
            width="24"
            height="24"
          />
          <rect
            id="rect3182"
            x="71.5"
            y="311.5"
            className="st8"
            width="24"
            height="24"
          />
          <rect
            id="rect3184"
            x="95.5"
            y="287.5"
            className="st8"
            width="24"
            height="24"
          />
        </g>
      </g>
      <g id="g3230" transform="translate(0,-216)">
        <path className="st7" d="M83.5,227.5l72,72l-72,72l-72-72L83.5,227.5z" />
        <g id="g3236">
          <rect x="71.5" y="263.5" className="st9" width="24" height="24" />
          <rect x="47.5" y="287.5" className="st9" width="24" height="24" />
          <rect x="71.5" y="311.5" className="st9" width="24" height="24" />
          <rect x="95.5" y="287.5" className="st9" width="24" height="24" />
        </g>
      </g>
      <g id="g3246" transform="translate(216,0)">
        <path className="st7" d="M83.5,227.5l72,72l-72,72l-72-72L83.5,227.5z" />
        <g id="g3252">
          <rect x="71.5" y="263.5" className="st10" width="24" height="24" />
          <rect x="47.5" y="287.5" className="st10" width="24" height="24" />
          <rect x="71.5" y="311.5" className="st10" width="24" height="24" />
          <rect x="95.5" y="287.5" className="st10" width="24" height="24" />
        </g>
      </g>
      <g id="g3262" transform="translate(216,-216)">
        <path className="st7" d="M83.5,227.5l72,72l-72,72l-72-72L83.5,227.5z" />
        <g id="g3268">
          <rect x="71.5" y="263.5" className="st11" width="24" height="24" />
          <rect x="47.5" y="287.5" className="st11" width="24" height="24" />
          <rect x="71.5" y="311.5" className="st11" width="24" height="24" />
          <rect x="95.5" y="287.5" className="st11" width="24" height="24" />
        </g>
      </g>
      <g class="stars">
        <polygon class="st12" points="173.1,104.5 167.3,101.3 161.5,104.2 162.7,97.8 158.1,93.2 164.6,92.3 167.6,86.5 170.4,92.5 176.9,93.5 172.1,98 "/>
        <polygon class="st12" points="293.1,176.8 287.3,173.6 281.5,176.5 282.7,170.1 278.1,165.5 284.6,164.6 287.6,158.8 290.4,164.8 296.9,165.8 292.1,170.3 "/>
        <polygon class="st12" points="220.8,296.5 215.1,293.3 209.2,296.2 210.4,289.8 205.8,285.2 212.3,284.3 215.3,278.5 218.1,284.5 224.6,285.5 219.8,290 "/>
        <polygon class="st12" points="101.1,224 95.3,220.9 89.5,223.8 90.7,217.4 86.1,212.7 92.6,211.9 95.6,206.1 98.4,212 104.9,213.1 100.1,217.6 "/>
      </g>
    </>
  );
}
