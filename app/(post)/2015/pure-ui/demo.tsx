"use client";

import "./demo.css";
import loadScript from "load-script";
import { useEffect, useRef } from "react";

export function Demo({ id }) {
  return <div id={id} className="pure-ui-demo"></div>;
}

export function Demos() {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;

    // @ts-ignore
    if (!window.Viewer) {
      loadScript("/pure-ui-demo.js", onScriptLoad);
    } else {
      onScriptLoad();
    }

    mounted.current = true;
  }, []);
  return null;
}

function onScriptLoad() {
  document.querySelector("#pure-ui-demo1")?.classList.add("loaded");

  // @ts-ignore
  Viewer(
    [
      {
        title: "Thumb tooltip",
        views: [
          [
            {
              title: "Default",
              require: "thumbTip",
              params: {
                width: 136,
                height: 78,
                css: true,
              },
            },
            {
              title: "Custom offset (30px)",
              require: "thumbTip",
              params: {
                width: 136,
                height: 78,
                tipLeft: 30,
              },
            },
            {
              title: "Custom offset (left edge)",
              require: "thumbTip",
              params: {
                width: 136,
                height: 78,
                tipLeft: 0,
              },
            },
            {
              title: "Custom offset (right edge)",
              require: "thumbTip",
              params: {
                width: 136,
                height: 78,
                tipLeft: 142,
              },
            },
            {
              title: "Loading",
              require: "thumbTip",
              params: {
                width: 136,
                height: 78,
                waiting: true,
              },
            },
            {
              title: "Loaded",
              require: "thumbTip",
              params: {
                url: "/images/pure-ui/tY2dbQWFVw.png",
                width: 136,
                height: 78,
                index: 38,
                rows: 10,
                cols: 10,
                at: 30,
              },
            },
          ],
        ],
      },
    ],
    document.querySelector("#pure-ui-demo1"),
    () => {}
  );

  // @ts-ignore
  Viewer(
    [
      {
        title: "Transcoding",
        views: [
          {
            title: "In progress (dark thumbnail)",
            require: "converting",
            params: {
              title: "The video of all galaxies that span the universe",
              bgurl: "/images/pure-ui/VK_jwU0ZRK.png",
              progress: 65,
              width: "ontouchstart" in document ? 320 : 560,
              height: 315,
            },
          },
        ],
      },
    ],
    document.querySelector("#pure-ui-demo2"),
    () => {}
  );
}
