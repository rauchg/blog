"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from "@chenglou/pretext";

type PositionedLine = {
  x: number;
  y: number;
  text: string;
  width: number;
};

// Given a polygon (array of {x,y} points) and a horizontal band [bandTop, bandBottom],
// find the leftmost and rightmost x where the polygon edges cross the band.
// This matches the approach in pretext's wrap-geometry demo.
function getTriangleIntervalForBand(
  points: { x: number; y: number }[],
  bandTop: number,
  bandBottom: number
): { left: number; right: number } | null {
  let left = Infinity;
  let right = -Infinity;

  // Sample at several y values within the band for accuracy
  const steps = 4;
  for (let s = 0; s <= steps; s++) {
    const y = bandTop + ((bandBottom - bandTop) * s) / steps;
    // Find all x intersections at this y
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
  if (right - left < 30) return null; // too narrow for text
  return { left, right };
}

function layoutTriangle(
  prepared: PreparedTextWithSegments,
  trianglePoints: { x: number; y: number }[],
  lineHeight: number,
  scrollOffset: number
): PositionedLine[] {
  const lines: PositionedLine[] = [];
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

  // Find the vertical bounds of the triangle
  const minY = Math.min(...trianglePoints.map((p) => p.y));
  const maxY = Math.max(...trianglePoints.map((p) => p.y));

  // Pre-advance cursor by consuming skipped lines
  const skipLines = Math.floor(scrollOffset / lineHeight);
  for (let i = 0; i < skipLines; i++) {
    // Use a wide width for skipped lines
    const line = layoutNextLine(prepared, cursor, 900);
    if (line === null) return lines;
    cursor = line.end;
  }

  let y = minY;
  while (y + lineHeight <= maxY) {
    const interval = getTriangleIntervalForBand(
      trianglePoints,
      y,
      y + lineHeight
    );

    if (interval === null) {
      y += lineHeight;
      continue;
    }

    const lineWidth = interval.right - interval.left;
    const line = layoutNextLine(prepared, cursor, lineWidth);
    if (line === null) break;

    // Center the actual text within the available interval
    const slack = lineWidth - line.width;
    const x = interval.left + slack / 2;

    lines.push({ x, y, text: line.text, width: line.width });
    cursor = line.end;
    y += lineHeight;
  }

  return lines;
}

export function TriangleText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preparedRef = useRef<PreparedTextWithSegments | null>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);
  const textReadyRef = useRef(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const FONT_SIZE = 14;
  const LINE_HEIGHT = 22;
  const FONT = `${FONT_SIZE}px "Geist", ui-sans-serif, system-ui, sans-serif`;

  // Extract text from the hidden article DOM
  useEffect(() => {
    const timer = setTimeout(() => {
      const article = document.querySelector("[data-post-content]");
      if (!article) return;

      const text = (article.textContent || "")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      if (text.length > 0) {
        preparedRef.current = prepareWithSegments(text, FONT);
        textReadyRef.current = true;
        setDimensions((d) => ({ ...d }));
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [FONT]);

  // Handle resize
  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const prepared = preparedRef.current;
    if (!canvas || !prepared) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    ctx.fillStyle = isDark ? "#111" : "#fafafa";
    ctx.fillRect(0, 0, width, height);

    // Define triangle polygon - apex at top center, base at bottom
    const paddingX = 40;
    const paddingY = 32;
    const baseWidth = Math.min(width - paddingX * 2, 920) * 0.5;
    const centerX = width / 2;
    const topY = paddingY;
    const bottomY = height - paddingY;

    const trianglePoints = [
      { x: centerX, y: topY },
      { x: centerX - baseWidth / 2, y: bottomY },
      { x: centerX + baseWidth / 2, y: bottomY },
    ];

    const lines = layoutTriangle(
      prepared,
      trianglePoints,
      LINE_HEIGHT,
      scrollRef.current
    );

    // Draw subtle triangle outline
    ctx.beginPath();
    ctx.moveTo(trianglePoints[0].x, trianglePoints[0].y);
    ctx.lineTo(trianglePoints[1].x, trianglePoints[1].y);
    ctx.lineTo(trianglePoints[2].x, trianglePoints[2].y);
    ctx.closePath();
    ctx.strokeStyle = isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(0,0,0,0.04)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw text lines
    ctx.font = FONT;
    ctx.textBaseline = "top";
    ctx.fillStyle = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.78)";

    for (const line of lines) {
      ctx.fillText(line.text, line.x, line.y + 2);
    }
  }, [dimensions, FONT, LINE_HEIGHT]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollRef.current = Math.max(0, scrollRef.current + e.deltaY * 0.5);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      scrollRef.current = Math.max(0, scrollRef.current + dy * 0.7);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50"
      style={{ cursor: "ns-resize" }}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width: dimensions.width, height: dimensions.height }}
      />
    </div>
  );
}
