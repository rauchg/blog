"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from "@chenglou/pretext";

const FONT_SIZE = 12;
const LINE_HEIGHT = 20;
const FONT = `${FONT_SIZE}px "Geist", ui-sans-serif, system-ui, sans-serif`;

// --- triangle text layout helpers ---

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
  scrollOffset: number
): { lines: LayoutLine[]; endCursor: LayoutCursor } {
  const pad = faceWidth * 0.06;
  // Triangle pointing up: apex at top-center, base at bottom
  const triPoints = [
    { x: faceWidth / 2, y: pad },
    { x: pad, y: faceHeight - pad },
    { x: faceWidth - pad, y: faceHeight - pad },
  ];

  let cursor: LayoutCursor = { ...startCursor };

  // Skip lines for scroll
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

  while (y + LINE_HEIGHT <= maxY) {
    const interval = getTriangleIntervalForBand(triPoints, y, y + LINE_HEIGHT);
    if (!interval) {
      y += LINE_HEIGHT;
      continue;
    }
    const lineWidth = interval.right - interval.left;
    const line = layoutNextLine(prepared, cursor, lineWidth);
    if (!line) break;

    const slack = lineWidth - line.width;
    lines.push({
      text: line.text,
      x: interval.left + slack / 2,
      y,
      width: line.width,
    });
    cursor = line.end;
    y += LINE_HEIGHT;
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

// --- CSS 3D tetrahedron ---
// Based on the proven approach from Stack Overflow:
// - One face lies flat as the base
// - Three faces fold up from each edge of the base using transform-origin at bottom edge
// - The fold angle is 180 - atan(2*sqrt(2)) in degrees ≈ 109.47°
// - clip-path: polygon(50% 0, 0% 100%, 100% 100%) makes each div triangular

const FOLD_ANGLE = 180 - Math.atan(2 * Math.sqrt(2)) * (180 / Math.PI); // ~109.47°

// --- Face component ---

function Face({
  lines,
  faceWidth,
  faceHeight,
  style,
}: {
  lines: LayoutLine[];
  faceWidth: number;
  faceHeight: number;
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: faceWidth,
        height: faceHeight,
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        ...style,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: line.x,
            top: line.y,
            font: FONT,
            lineHeight: `${LINE_HEIGHT}px`,
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

// --- Main export ---

export function TriangleText() {
  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const maxScrollRef = useRef(0);
  const [rotation, setRotation] = useState({ x: -30, y: 45 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Tetrahedron face size
  const FACE_W = 300;
  const FACE_H = FACE_W * Math.sqrt(3) / 2; // equilateral triangle height

  // Extract text
  useEffect(() => {
    const timer = setTimeout(() => {
      const article = document.querySelector("[data-post-content]");
      if (!article) return;
      const text = (article.textContent || "")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      if (text.length > 0) {
        const p = prepareWithSegments(text, FONT);
        setPrepared(p);
        maxScrollRef.current = Math.max(0, countTotalLines(p) - 40);
      }
    }, 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to advance text
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

  // Drag to rotate
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
    setRotation((r) => ({
      x: r.x - dy * 0.4,
      y: r.y + dx * 0.4,
    }));
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Compute all face lines, text flows continuously across faces
  const faceData = useMemo(() => {
    if (!prepared) return [];
    const faces: LayoutLine[][] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

    for (let i = 0; i < 4; i++) {
      const { lines, endCursor } = layoutFaceLines(
        prepared,
        cursor,
        FACE_W,
        FACE_H,
        i === 0 ? scrollOffset : 0
      );
      faces.push(lines);
      cursor = endCursor;
    }
    return faces;
  }, [prepared, scrollOffset, FACE_W, FACE_H]);

  if (!prepared) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{
        perspective: 800,
        cursor: dragging.current ? "grabbing" : "grab",
        marginTop: 80,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* 3D container */}
      <div
        style={{
          position: "relative",
          width: FACE_W,
          height: FACE_H,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Face 1: base - lies flat, facing down */}
        <Face
          lines={faceData[0] || []}
          faceWidth={FACE_W}
          faceHeight={FACE_H}
          style={{
            top: 0,
            left: 0,
            transformOrigin: "50% 100%",
            transform: "rotateX(180deg)",
          }}
        />

        {/* Face 2: front - folds up from bottom edge of base */}
        <Face
          lines={faceData[1] || []}
          faceWidth={FACE_W}
          faceHeight={FACE_H}
          style={{
            top: 0,
            left: 0,
            transformOrigin: "50% 100%",
            transform: `rotateX(-${FOLD_ANGLE}deg)`,
          }}
        />

        {/* Face 3: right - rotate base 60deg, fold up from bottom-right edge */}
        <Face
          lines={faceData[2] || []}
          faceWidth={FACE_W}
          faceHeight={FACE_H}
          style={{
            top: 0,
            left: 0,
            transformOrigin: "100% 100%",
            transform: `rotate(-60deg) rotateX(-${FOLD_ANGLE}deg)`,
          }}
        />

        {/* Face 4: left - rotate base -60deg, fold up from bottom-left edge */}
        <Face
          lines={faceData[3] || []}
          faceWidth={FACE_W}
          faceHeight={FACE_H}
          style={{
            top: 0,
            left: 0,
            transformOrigin: "0% 100%",
            transform: `rotate(60deg) rotateX(-${FOLD_ANGLE}deg)`,
          }}
        />
      </div>
    </div>
  );
}
