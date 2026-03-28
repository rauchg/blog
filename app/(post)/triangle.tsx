"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from "@chenglou/pretext";

const DEFAULT_FONT_SIZE = 12;
const DEFAULT_LINE_HEIGHT = 12;
const DEFAULT_EDGE = 500;

function getTriangleIntervalForBand(
  points: { x: number; y: number }[],
  bandTop: number,
  bandBottom: number
): { left: number; right: number } | null {
  let left = Infinity;
  let right = -Infinity;
  const steps = 4;
  for (let s = 0; s <= steps; s++) {
    const y = bandTop + ((bandBottom - bandTop) * s) / steps;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const a = points[i]!;
      const b = points[j]!;
      if ((a.y > y) !== (b.y > y)) {
        const x = ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }
  if (!Number.isFinite(left) || !Number.isFinite(right)) return null;
  if (right - left < 20) return null;
  return { left, right };
}

interface LayoutLine {
  text: string;
  x: number;
  y: number;
  width: number;
}

function layoutFaceLines(
  prepared: PreparedTextWithSegments,
  startCursor: LayoutCursor,
  faceWidth: number,
  faceHeight: number,
  scrollOffset: number,
  lineHeight: number
): { lines: LayoutLine[]; endCursor: LayoutCursor } {
  const pad = faceWidth * 0.04;
  const triPoints = [
    { x: faceWidth / 2, y: pad },
    { x: pad, y: faceHeight - pad },
    { x: faceWidth - pad, y: faceHeight - pad },
  ];
  let cursor: LayoutCursor = { ...startCursor };
  let skipped = 0;
  while (skipped < scrollOffset) {
    const line = layoutNextLine(prepared, cursor, faceWidth);
    if (!line) break;
    cursor = line.end;
    skipped++;
  }
  const lines: LayoutLine[] = [];
  let y = triPoints[0].y;
  const maxY = triPoints[1].y;
  while (y + lineHeight <= maxY) {
    const interval = getTriangleIntervalForBand(triPoints, y, y + lineHeight);
    if (!interval) { y += lineHeight; continue; }
    const lineWidth = interval.right - interval.left;
    const line = layoutNextLine(prepared, cursor, lineWidth);
    if (!line) break;
    const slack = lineWidth - line.width;
    lines.push({ text: line.text, x: interval.left + slack / 2, y, width: line.width });
    cursor = line.end;
    y += lineHeight;
  }
  return { lines, endCursor: cursor };
}

function countTotalLines(prepared: PreparedTextWithSegments): number {
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
  let count = 0;
  while (true) {
    const line = layoutNextLine(prepared, cursor, 400);
    if (!line) break;
    cursor = line.end;
    count++;
  }
  return count;
}

// Compute the number of lines that fit in one face at a given edge/lineHeight
function linesPerFace(edge: number, lineHeight: number): number {
  const fh = (edge * Math.sqrt(3)) / 2;
  const pad = edge * 0.04;
  return Math.floor((fh - 2 * pad) / lineHeight);
}

// --- CSS 3D Tetrahedron via matrix3d ---

type V3 = [number, number, number];

function sub(a: V3, b: V3): V3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a: V3, b: V3): V3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function normalize(v: V3): V3 {
  const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
  return [v[0] / len, v[1] / len, v[2] / len];
}

// Map the 2D face div (with clip-path triangle apex at top-center,
// base at bottom) onto 3D vertex positions via an affine matrix3d.
function faceMatrix3d(
  v0: V3, v1: V3, v2: V3,
  fw: number, fh: number
): string {
  // 2D source points matching the clip-path triangle.
  // Swap bottom-left and bottom-right so the affine transform
  // doesn't mirror the text horizontally.
  const s0x = fw / 2, s0y = 0;   // apex
  const s1x = fw,     s1y = fh;  // bottom-right (swapped)
  const s2x = 0,      s2y = fh;  // bottom-left  (swapped)

  const det = s0x * (s1y - s2y) - s1x * (s0y - s2y) + s2x * (s0y - s1y);
  const computeRow = (t0: number, t1: number, t2: number) => {
    const a = ((s1y - s2y) * t0 + (s2y - s0y) * t1 + (s0y - s1y) * t2) / det;
    const b = ((s2x - s1x) * t0 + (s0x - s2x) * t1 + (s1x - s0x) * t2) / det;
    const c = ((s1x * s2y - s2x * s1y) * t0 + (s2x * s0y - s0x * s2y) * t1 + (s0x * s1y - s1x * s0y) * t2) / det;
    return [a, b, c] as const;
  };

  const [ax, bx, cx] = computeRow(v0[0], v1[0], v2[0]);
  const [ay, by, cy] = computeRow(v0[1], v1[1], v2[1]);
  const [az, bz, cz] = computeRow(v0[2], v1[2], v2[2]);

  const edge1 = sub(v1, v0);
  const edge2 = sub(v2, v0);
  const normal = normalize(cross(edge1, edge2));

  return `matrix3d(${ax},${ay},${az},0, ${bx},${by},${bz},0, ${normal[0]},${normal[1]},${normal[2]},0, ${cx},${cy},${cz},1)`;
}

function Face({
  lines,
  faceWidth,
  faceHeight,
  transform,
  font,
  lineHeight,
}: {
  lines: LayoutLine[];
  faceWidth: number;
  faceHeight: number;
  transform: string;
  font: string;
  lineHeight: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: faceWidth,
        height: faceHeight,
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        background: "#fff",
        transform,
        transformOrigin: "0 0",
        backfaceVisibility: "hidden",
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: line.x,
            top: line.y,
            font,
            lineHeight: `${lineHeight}px`,
            whiteSpace: "nowrap",
            color: "rgba(0,0,0,0.85)",
            pointerEvents: "auto",
            cursor: "text",
            userSelect: "text",
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

export function TriangleText() {
  const [params, setParams] = useState({
    edge: DEFAULT_EDGE,
    fontSize: DEFAULT_FONT_SIZE,
    lineHeight: DEFAULT_LINE_HEIGHT,
  });
  const [copied, setCopied] = useState(false);
  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const maxScrollRef = useRef(0);
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const rawTextRef = useRef("");

  const FONT = `${params.fontSize}px "Geist", ui-sans-serif, system-ui, sans-serif`;
  const FACE_W = params.edge;
  const FACE_H = (params.edge * Math.sqrt(3)) / 2;

  const rePrepare = useCallback((text: string, font: string, edge: number, lh: number) => {
    if (text.length === 0) return;
    const p = prepareWithSegments(text, font);
    setPrepared(p);
    // Max scroll: total lines minus ~4 faces worth of visible lines
    const total = countTotalLines(p);
    const visiblePerFace = linesPerFace(edge, lh);
    maxScrollRef.current = Math.max(0, total - visiblePerFace * 4);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const article = document.querySelector("[data-post-content]");
      if (!article) return;
      const text = (article.textContent || "")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      rawTextRef.current = text;
      rePrepare(text, FONT, params.edge, params.lineHeight);
    }, 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrollOffset((prev) => {
        const next = prev + (e.deltaY > 0 ? 3 : -3);
        return Math.max(0, Math.min(next, maxScrollRef.current));
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setRotation((r) => ({ x: r.x - dy * 0.4, y: r.y + dx * 0.4 }));
  }, []);

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Regular tetrahedron vertices centered at origin.
  // Standard formulation: edge length = s
  //   v0 = ( 0,      h_top, 0     )  -- apex
  //   v1 = (-s/2,   -h_bot, d     )  -- front-left
  //   v2 = ( s/2,   -h_bot, d     )  -- front-right
  //   v3 = ( 0,     -h_bot, -2d   )  -- back
  // where h = s * sqrt(2/3), h_top = 3/4 * h, h_bot = 1/4 * h
  //       d = s * sqrt(3) / 6 (inradius of base triangle)
  const verts = useMemo<V3[]>(() => {
    const s = params.edge;
    const h = s * Math.sqrt(2 / 3);
    const ht = h * 0.75;
    const hb = h * 0.25;
    const d = s / (2 * Math.sqrt(3)); // = s * sqrt(3) / 6
    return [
      [0,    ht,  0],         // apex (top)
      [-s/2, -hb,  d],       // front-left
      [ s/2, -hb,  d],       // front-right
      [0,    -hb, -2 * d],   // back
    ];
  }, [params.edge]);

  // Face winding: text faces outward
  const faceIndices: [number, number, number][] = useMemo(() => [
    [0, 2, 1], // front
    [0, 3, 2], // right
    [0, 1, 3], // left
    [1, 2, 3], // bottom
  ], []);

  const faceData = useMemo(() => {
    if (!prepared) return [];
    const result: LayoutLine[][] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    for (let i = 0; i < 4; i++) {
      const { lines, endCursor } = layoutFaceLines(
        prepared, cursor, FACE_W, FACE_H, i === 0 ? scrollOffset : 0, params.lineHeight
      );
      result.push(lines);
      cursor = endCursor;
    }
    return result;
  }, [prepared, scrollOffset, FACE_W, FACE_H, params.lineHeight]);

  const faceTransforms = useMemo(() => {
    return faceIndices.map(([i0, i1, i2]) =>
      faceMatrix3d(verts[i0], verts[i1], verts[i2], FACE_W, FACE_H)
    );
  }, [verts, faceIndices, FACE_W, FACE_H]);

  if (!prepared) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center"
        style={{
          perspective: 1200,
          cursor: dragging.current ? "grabbing" : "grab",
          marginTop: 80,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            width: 0,
            height: 0,
          }}
        >
          {faceIndices.map((_, i) => (
            <Face
              key={i}
              lines={faceData[i] || []}
              faceWidth={FACE_W}
              faceHeight={FACE_H}
              transform={faceTransforms[i]}
              font={FONT}
              lineHeight={params.lineHeight}
            />
          ))}
        </div>
      </div>

      {/* Tuning controls */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-5 rounded-full px-5 py-2.5"
        style={{
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(12px)",
          color: "#fff",
          fontSize: 13,
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <label className="flex items-center gap-2">
          size
          <input
            type="range"
            min={120}
            max={600}
            step={10}
            value={params.edge}
            onChange={(e) => {
              const edge = +e.target.value;
              rePrepare(rawTextRef.current, FONT, edge, params.lineHeight);
              setParams((p) => ({ ...p, edge }));
            }}
            className="w-20 accent-white"
          />
          <span className="w-8 text-right">{params.edge}</span>
        </label>
        <label className="flex items-center gap-2">
          font
          <input
            type="range"
            min={6}
            max={24}
            step={1}
            value={params.fontSize}
            onChange={(e) => {
              const fs = +e.target.value;
              const lh = Math.round(fs * 1);
              const newFont = `${fs}px "Geist", ui-sans-serif, system-ui, sans-serif`;
              rePrepare(rawTextRef.current, newFont, params.edge, lh);
              setParams((p) => ({ ...p, fontSize: fs, lineHeight: lh }));
            }}
            className="w-20 accent-white"
          />
          <span className="w-8 text-right">{params.fontSize}</span>
        </label>
        <label className="flex items-center gap-2">
          lead
          <input
            type="range"
            min={params.fontSize}
            max={params.fontSize * 3}
            step={1}
            value={params.lineHeight}
            onChange={(e) => {
              const lh = +e.target.value;
              rePrepare(rawTextRef.current, FONT, params.edge, lh);
              setParams((p) => ({ ...p, lineHeight: lh }));
            }}
            className="w-20 accent-white"
          />
          <span className="w-8 text-right">{params.lineHeight}</span>
        </label>
        <button
          onClick={() => {
            const str = `edge: ${params.edge}, fontSize: ${params.fontSize}, lineHeight: ${params.lineHeight}`;
            navigator.clipboard.writeText(str);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="ml-1 rounded-full px-3 py-1 text-xs transition-colors"
          style={{ background: copied ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)" }}
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
    </>
  );
}
