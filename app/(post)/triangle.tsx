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
  if (right - left < 30) return null;
  return { left, right };
}

// Count the total number of lines the text would produce at the widest width
// (the triangle base), to compute a reasonable max scroll.
function countTotalLines(
  prepared: PreparedTextWithSegments,
  maxWidth: number
): number {
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
  let count = 0;
  while (true) {
    const line = layoutNextLine(prepared, cursor, maxWidth);
    if (line === null) break;
    cursor = line.end;
    count++;
  }
  return count;
}

function layoutTriangle(
  prepared: PreparedTextWithSegments,
  trianglePoints: { x: number; y: number }[],
  lineHeight: number,
  scrollOffset: number
): PositionedLine[] {
  const lines: PositionedLine[] = [];
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

  const minY = Math.min(...trianglePoints.map((p) => p.y));
  const maxY = Math.max(...trianglePoints.map((p) => p.y));

  // Pre-advance cursor by consuming skipped lines
  const skipLines = Math.floor(scrollOffset / lineHeight);
  for (let i = 0; i < skipLines; i++) {
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

    const slack = lineWidth - line.width;
    const x = interval.left + slack / 2;

    lines.push({ x, y, text: line.text, width: line.width });
    cursor = line.end;
    y += lineHeight;
  }

  return lines;
}

const FONT_SIZE = 12;
const LINE_HEIGHT = 20;
const SCALE = 0.65;
const FONT = `${FONT_SIZE}px "Geist", ui-sans-serif, system-ui, sans-serif`;

export function TriangleText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preparedRef = useRef<PreparedTextWithSegments | null>(null);
  const scrollRef = useRef(0);
  const maxScrollRef = useRef(Infinity);
  const rafRef = useRef<number>(0);
  const textReadyRef = useRef(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

        // Compute max scroll: total lines minus the visible lines in the triangle
        const totalLines = countTotalLines(preparedRef.current, 900);
        // Visible lines will be computed during draw, but estimate here
        const visibleEstimate = Math.floor(
          (window.innerHeight * SCALE * 0.7) / LINE_HEIGHT
        );
        maxScrollRef.current = Math.max(
          0,
          (totalLines - visibleEstimate) * LINE_HEIGHT
        );

        setDimensions((d) => ({ ...d }));
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

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

    const paddingX = 40;
    const paddingY = 32;
    const fullBaseWidth = Math.min(width - paddingX * 2, 920);
    const fullHeight = height - paddingY * 2;
    const baseWidth = fullBaseWidth * SCALE;
    const triHeight = fullHeight * SCALE;
    const headerOffset = 80;
    const centerX = width / 2;
    const centerY = height / 2 + headerOffset / 2;
    const topY = centerY - triHeight / 2;
    const bottomY = centerY + triHeight / 2;

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
  }, [dimensions]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Scroll handler with clamping
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const clampScroll = () => {
      scrollRef.current = Math.max(
        0,
        Math.min(scrollRef.current, maxScrollRef.current)
      );
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollRef.current += e.deltaY * 0.5;
      clampScroll();
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
      scrollRef.current += dy * 0.7;
      clampScroll();
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
