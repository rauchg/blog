"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from "@chenglou/pretext";
import * as THREE from "three";

// ----- pretext helpers -----

const FONT_SIZE = 13;
const LINE_HEIGHT = 19;
const FONT = `${FONT_SIZE}px "Geist", ui-sans-serif, system-ui, sans-serif`;
const TEX_SIZE = 1024;

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

/** Render a page of text into a triangular region and return the canvas + end cursor. */
function renderFaceTexture(
  prepared: PreparedTextWithSegments,
  startCursor: LayoutCursor,
  scrollOffset: number
): { canvas: HTMLCanvasElement; endCursor: LayoutCursor; linesRendered: number } {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext("2d")!;

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  // Triangle region: equilateral, apex at top-center
  const pad = 60;
  const triPoints = [
    { x: TEX_SIZE / 2, y: pad },
    { x: pad, y: TEX_SIZE - pad },
    { x: TEX_SIZE - pad, y: TEX_SIZE - pad },
  ];

  // Subtle triangle outline
  ctx.beginPath();
  ctx.moveTo(triPoints[0].x, triPoints[0].y);
  ctx.lineTo(triPoints[1].x, triPoints[1].y);
  ctx.lineTo(triPoints[2].x, triPoints[2].y);
  ctx.closePath();
  ctx.strokeStyle = "rgba(0,0,0,0.04)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Skip lines for scroll offset
  let cursor: LayoutCursor = { ...startCursor };
  let skipped = 0;
  while (skipped < scrollOffset) {
    const line = layoutNextLine(prepared, cursor, TEX_SIZE);
    if (line === null) break;
    cursor = line.end;
    skipped++;
  }

  // Lay out visible text
  ctx.font = FONT;
  ctx.textBaseline = "top";
  ctx.fillStyle = "rgba(0,0,0,0.82)";

  let y = triPoints[0].y;
  const maxY = triPoints[2].y;
  let linesRendered = 0;

  while (y + LINE_HEIGHT <= maxY) {
    const interval = getTriangleIntervalForBand(triPoints, y, y + LINE_HEIGHT);
    if (!interval) {
      y += LINE_HEIGHT;
      continue;
    }
    const lineWidth = interval.right - interval.left;
    const line = layoutNextLine(prepared, cursor, lineWidth);
    if (line === null) break;

    const slack = lineWidth - line.width;
    const x = interval.left + slack / 2;
    ctx.fillText(line.text, x, y);
    cursor = line.end;
    y += LINE_HEIGHT;
    linesRendered++;
  }

  return { canvas, endCursor: cursor, linesRendered };
}

/** Count total lines the text produces for scroll clamping. */
function countTotalLines(prepared: PreparedTextWithSegments): number {
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
  let count = 0;
  while (true) {
    const line = layoutNextLine(prepared, cursor, TEX_SIZE);
    if (line === null) break;
    cursor = line.end;
    count++;
  }
  return count;
}

// ----- Tetrahedron geometry with per-face UVs -----

function createTetrahedronGeometry(radius: number): THREE.BufferGeometry {
  const a = new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(radius);
  const b = new THREE.Vector3(1, -1, -1).normalize().multiplyScalar(radius);
  const c = new THREE.Vector3(-1, 1, -1).normalize().multiplyScalar(radius);
  const d = new THREE.Vector3(-1, -1, 1).normalize().multiplyScalar(radius);

  const faces = [
    [a, b, c],
    [a, c, d],
    [a, d, b],
    [b, d, c],
  ];

  const positions: number[] = [];
  const uvs: number[] = [];
  const groups: { start: number; count: number; materialIndex: number }[] = [];

  const triUVs = [
    [0.5, 1],
    [0, 0],
    [1, 0],
  ];

  faces.forEach((face, fi) => {
    const start = fi * 3;
    face.forEach((v, vi) => {
      positions.push(v.x, v.y, v.z);
      uvs.push(triUVs[vi][0], triUVs[vi][1]);
    });
    groups.push({ start, count: 3, materialIndex: fi });
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.computeVertexNormals();
  groups.forEach((g) => geo.addGroup(g.start, g.count, g.materialIndex));
  return geo;
}

// ----- React Three Fiber components -----

function Tetrahedron({
  materials,
}: {
  materials: THREE.MeshStandardMaterial[];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createTetrahedronGeometry(1.6), []);

  return <mesh ref={meshRef} geometry={geometry} material={materials} />;
}

function Scene({
  prepared,
  scrollOffset,
  maxScroll,
}: {
  prepared: PreparedTextWithSegments;
  scrollOffset: number;
  maxScroll: number;
}) {
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Create materials once
  if (materialsRef.current.length === 0) {
    for (let i = 0; i < 4; i++) {
      materialsRef.current.push(
        new THREE.MeshStandardMaterial({
          roughness: 0.3,
          metalness: 0.0,
          side: THREE.FrontSide,
        })
      );
    }
  }

  // Update textures when scroll changes
  useEffect(() => {
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

    for (let i = 0; i < 4; i++) {
      const faceScroll = Math.floor(scrollOffset / 4) + (i < scrollOffset % 4 ? 1 : 0);
      const { canvas } = renderFaceTexture(prepared, cursor, scrollOffset);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;

      const mat = materialsRef.current[i];
      if (mat.map) mat.map.dispose();
      mat.map = tex;
      mat.needsUpdate = true;

      // Advance cursor for next face
      const advanceCursor = { ...cursor };
      let lines = 0;
      while (lines < 45) {
        const line = layoutNextLine(prepared, advanceCursor, TEX_SIZE);
        if (!line) break;
        Object.assign(advanceCursor, line.end);
        lines++;
      }
      cursor = advanceCursor;
    }
  }, [prepared, scrollOffset]);

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-3, -2, 4]} intensity={0.3} />
      <Tetrahedron materials={materialsRef.current} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={2.5}
        maxDistance={8}
        autoRotate={false}
      />
    </>
  );
}

// ----- Main export -----

export function TriangleText() {
  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const maxScrollRef = useRef(0);

  // Extract text from hidden article
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
        maxScrollRef.current = Math.max(0, countTotalLines(p) - 30);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to advance text
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Only scroll text if not dragging the tetrahedron (ctrl/meta = zoom)
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      setScrollOffset((prev) => {
        const next = prev + (e.deltaY > 0 ? 3 : -3);
        return Math.max(0, Math.min(next, maxScrollRef.current));
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!prepared) return null;

  return (
    <div className="fixed inset-0 z-40">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene
          prepared={prepared}
          scrollOffset={scrollOffset}
          maxScroll={maxScrollRef.current}
        />
      </Canvas>
    </div>
  );
}
