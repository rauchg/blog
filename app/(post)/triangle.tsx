"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from "@chenglou/pretext";

const DEFAULT_FONT_SIZE = 12;
const DEFAULT_LINE_HEIGHT = 20;
const DEFAULT_EDGE = 280;

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
  const pad = faceWidth * 0.06;
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

// --- CSS 3D Tetrahedron via matrix3d ---
// Compute an exact CSS matrix3d to map each 2D face div onto its 3D face.
//
// Each face div is faceWidth x faceHeight with clip-path triangle:
//   p0 = (fw/2, 0)     -- apex
//   p1 = (0, fh)       -- bottom-left
//   p2 = (fw, fh)      -- bottom-right
//
// We compute a matrix that maps those 2D points to the 3D vertex positions.

type V3 = [number, number, number];

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

function sub(a: V3, b: V3): V3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

// Compute CSS matrix3d that maps from a 2D face (with given triangle points)
// to 3D positions. The face div's origin (0,0) is at top-left.
// We map: p0->v0, p1->v1, p2->v2
function faceMatrix3d(
  v0: V3, v1: V3, v2: V3,  // 3D target vertices
  fw: number, fh: number    // face div dimensions
): string {
  // 2D source points (in the face div's coordinate system)
  const s0x = fw / 2, s0y = 0;   // apex
  const s1x = 0,      s1y = fh;  // bottom-left
  const s2x = fw,     s2y = fh;  // bottom-right

  // We need affine 2D->3D: [X,Y,Z] = A * [x,y] + t
  // This gives us 3 equations (for x,y -> X, Y, Z) with 3 point pairs.
  // 
  // Using matrix form:
  // [s0x s1x s2x]   [a b c]^T   [v0x v1x v2x]
  // [s0y s1y s2y] * [d e f]   = [v0y v1y v2y]  
  // [  1   1   1]   [g h i]     [v0z v1z v2z]
  //
  // Solve for the 3x3 coefficient matrix

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

  // CSS matrix3d is column-major 4x4:
  // Column 0: what happens to X direction (face x-axis)
  // Column 1: what happens to Y direction (face y-axis)  
  // Column 2: what happens to Z direction (face has no depth, but we need the normal)
  // Column 3: translation

  // Face normal (for Z column, needed for backface-visibility to work)
  const edge1 = sub(v1, v0);
  const edge2 = sub(v2, v0);
  const normal = normalize(cross(edge1, edge2));
  
  // matrix3d(a1,b1,c1,d1, a2,b2,c2,d2, a3,b3,c3,d3, a4,b4,c4,d4)
  // where columns are: [a1,b1,c1,d1], [a2,b2,c2,d2], [a3,b3,c3,d3], [a4,b4,c4,d4]
  // col0 = face X -> 3D: [ax, ay, az, 0]
  // col1 = face Y -> 3D: [bx, by, bz, 0]
  // col2 = normal:       [nx, ny, nz, 0]
  // col3 = translation:  [cx, cy, cz, 1]
  
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

  // Re-prepare text when font size changes
  const rePrepare = useCallback((text: string, font: string) => {
    if (text.length === 0) return;
    const p = prepareWithSegments(text, font);
    setPrepared(p);
    maxScrollRef.current = Math.max(0, countTotalLines(p) - 40);
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
      rePrepare(text, FONT);
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

  const verts = useMemo<V3[]>(() => {
    const s = params.edge;
    return [
      [0, s * Math.sqrt(2 / 3) * 0.75, 0],
      [-s / 2, -s * Math.sqrt(2 / 3) * 0.25, s * Math.sqrt(3) / 6],
      [s / 2, -s * Math.sqrt(2 / 3) * 0.25, s * Math.sqrt(3) / 6],
      [0, -s * Math.sqrt(2 / 3) * 0.25, -s * Math.sqrt(3) / 3],
    ];
  }, [params.edge]);

  const faceIndices: [number, number, number][] = useMemo(() => [
    [0, 2, 1],
    [0, 3, 2],
    [0, 1, 3],
    [1, 2, 3],
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
          perspective: 1000,
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
            max={500}
            step={10}
            value={params.edge}
            onChange={(e) => setParams((p) => ({ ...p, edge: +e.target.value }))}
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
              const newFont = `${fs}px "Geist", ui-sans-serif, system-ui, sans-serif`;
              rePrepare(rawTextRef.current, newFont);
              setParams((p) => ({ ...p, fontSize: fs, lineHeight: Math.round(fs * 1.6) }));
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
            onChange={(e) => setParams((p) => ({ ...p, lineHeight: +e.target.value }))}
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
