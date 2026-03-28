"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  faceSize: number,
  scrollOffset: number
): { lines: LayoutLine[]; endCursor: LayoutCursor } {
  const pad = faceSize * 0.08;
  const triPoints = [
    { x: faceSize / 2, y: pad },
    { x: pad, y: faceSize - pad },
    { x: faceSize - pad, y: faceSize - pad },
  ];

  let cursor: LayoutCursor = { ...startCursor };

  // Skip lines for scroll
  let skipped = 0;
  while (skipped < scrollOffset) {
    const line = layoutNextLine(prepared, cursor, faceSize);
    if (!line) break;
    cursor = line.end;
    skipped++;
  }

  const lines: LayoutLine[] = [];
  let y = triPoints[0].y;
  const maxY = triPoints[2].y;

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
    const line = layoutNextLine(prepared, cursor, 600);
    if (!line) break;
    cursor = line.end;
    count++;
  }
  return count;
}

// --- CSS 3D tetrahedron geometry ---
// Regular tetrahedron: 4 equilateral triangle faces
// Edge length = size. We position faces using rotations.

// Dihedral angle of a tetrahedron: arccos(1/3) ≈ 70.528°
const DIHEDRAL = Math.acos(1 / 3) * (180 / Math.PI); // ~70.528°

function getFaceTransforms(size: number) {
  // The tetrahedron sits with one face as the base.
  // We build it by placing 4 triangular faces and folding them up.
  // The "inradius" (center to face) of a regular tetrahedron with edge a:
  // r = a / (2 * sqrt(6)) * 2 = a / sqrt(24) ≈ a * 0.2041
  // Actually: inradius = a * sqrt(6) / 12 ≈ 0.2041 * a
  const inradius = size * Math.sqrt(6) / 12;
  const h = size * Math.sqrt(3) / 2; // height of equilateral triangle face

  // Each face is an equilateral triangle of side `size`.
  // We use clip-path to make it triangular.
  // Face transforms position each face of the tetrahedron.

  return [
    // Bottom face (base) - lies in XZ plane, facing down
    `translateY(${inradius}px) rotateX(-90deg)`,
    // Front face
    `translateZ(${inradius}px)`,
    // Right face
    `rotateY(120deg) translateZ(${inradius}px)`,
    // Left face
    `rotateY(-120deg) translateZ(${inradius}px)`,
  ];
}

// --- Face component ---

function Face({
  lines,
  size,
  transform,
  faceIndex,
}: {
  lines: LayoutLine[];
  size: number;
  transform: string;
  faceIndex: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size * Math.sqrt(3) / 2,
        transform: `${transform} translateX(-${size / 2}px) translateY(-${(size * Math.sqrt(3) / 2) / 2}px)`,
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        backfaceVisibility: "hidden",
        background: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
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
  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(
    null
  );
  const [scrollOffset, setScrollOffset] = useState(0);
  const maxScrollRef = useRef(0);
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const FACE_SIZE = 340;

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
      x: Math.max(-89, Math.min(89, r.x - dy * 0.4)),
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

  // Compute face lines
  const faceData = (() => {
    if (!prepared) return [];
    const faceHeight = FACE_SIZE * Math.sqrt(3) / 2;
    const faces: LayoutLine[][] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

    for (let i = 0; i < 4; i++) {
      const { lines, endCursor } = layoutFaceLines(
        prepared,
        cursor,
        FACE_SIZE,
        i === 0 ? scrollOffset : 0
      );
      faces.push(lines);
      cursor = endCursor;
    }
    return faces;
  })();

  const transforms = getFaceTransforms(FACE_SIZE);

  if (!prepared) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ perspective: 900, cursor: dragging.current ? "grabbing" : "grab" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        style={{
          width: FACE_SIZE,
          height: FACE_SIZE,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {faceData.map((lines, i) => (
          <Face
            key={i}
            lines={lines}
            size={FACE_SIZE}
            transform={transforms[i]}
            faceIndex={i}
          />
        ))}
      </div>
    </div>
  );
}
