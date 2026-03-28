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

/** Lay out text into a triangular region on an offscreen canvas and return it. */
function renderFaceTexture(
  prepared: PreparedTextWithSegments,
  startCursor: LayoutCursor,
  isDark: boolean
): { canvas: HTMLCanvasElement; endCursor: LayoutCursor } {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = isDark ? "#0a0a0a" : "#fafafa";
  ctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  // Triangle region within the texture: equilateral, apex at top-center
  const pad = 60;
  const triPoints = [
    { x: TEX_SIZE / 2, y: pad },
    { x: pad, y: TEX_SIZE - pad },
    { x: TEX_SIZE - pad, y: TEX_SIZE - pad },
  ];

  // Draw subtle triangle outline
  ctx.beginPath();
  ctx.moveTo(triPoints[0].x, triPoints[0].y);
  ctx.lineTo(triPoints[1].x, triPoints[1].y);
  ctx.lineTo(triPoints[2].x, triPoints[2].y);
  ctx.closePath();
  ctx.strokeStyle = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Lay out text
  ctx.font = FONT;
  ctx.textBaseline = "top";
  ctx.fillStyle = isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.75)";

  let cursor: LayoutCursor = { ...startCursor };
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
    if (line === null) break;

    const slack = lineWidth - line.width;
    const x = interval.left + slack / 2;
    ctx.fillText(line.text, x, y);
    cursor = line.end;
    y += LINE_HEIGHT;
  }

  return { canvas, endCursor: cursor };
}

// ----- Tetrahedron geometry with per-face UVs -----

function createTetrahedronGeometry(radius: number): THREE.BufferGeometry {
  // Regular tetrahedron vertices
  const a = new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(radius);
  const b = new THREE.Vector3(1, -1, -1).normalize().multiplyScalar(radius);
  const c = new THREE.Vector3(-1, 1, -1).normalize().multiplyScalar(radius);
  const d = new THREE.Vector3(-1, -1, 1).normalize().multiplyScalar(radius);

  // 4 faces, each an equilateral triangle
  const faces = [
    [a, b, c],
    [a, c, d],
    [a, d, b],
    [b, d, c],
  ];

  const positions: number[] = [];
  const uvs: number[] = [];
  const groups: { start: number; count: number; materialIndex: number }[] = [];

  // UVs for equilateral triangle filling the texture
  const triUVs = [
    [0.5, 1], // apex top-center
    [0, 0],   // bottom-left
    [1, 0],   // bottom-right
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
  textures,
}: {
  textures: THREE.CanvasTexture[];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createTetrahedronGeometry(2.2), []);

  const materials = useMemo(() => {
    return textures.map(
      (tex) =>
        new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.35,
          metalness: 0.0,
          side: THREE.FrontSide,
        })
    );
  }, [textures]);

  // Gentle auto-rotate
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={materials} />
  );
}

function Scene({ prepared, isDark }: { prepared: PreparedTextWithSegments; isDark: boolean }) {
  const { gl } = useThree();

  const textures = useMemo(() => {
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    const texs: THREE.CanvasTexture[] = [];

    for (let i = 0; i < 4; i++) {
      const { canvas, endCursor } = renderFaceTexture(prepared, cursor, isDark);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;
      texs.push(tex);
      cursor = endCursor;
    }
    return texs;
  }, [prepared, isDark, gl]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, -2, 4]} intensity={0.3} />
      <Tetrahedron textures={textures} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
      />
    </>
  );
}

// ----- Main export -----

export function TriangleText() {
  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

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
        setPrepared(prepareWithSegments(text, FONT));
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!prepared) return null;

  return (
    <div className="fixed inset-0 z-40" style={{ cursor: "grab" }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene prepared={prepared} isDark={isDark} />
      </Canvas>
    </div>
  );
}
