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

  // Pre-advance cursor past scrolled lines
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
  const preparedRef = useRef<PreparedTextWithSegments | null>(null);
  const scrollRef = useRef(0);
  const maxScrollRef = useRef(Infinity);
  const rafRef = useRef<number>(0);
  const textReadyRef = useRef(false);
  const linesPoolRef = useRef<HTMLDivElement[]>([]);
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

        const totalLines = countTotalLines(preparedRef.current, 900);
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

  // Sync DOM pool: ensure we have exactly `count` line divs
  const syncPool = useCallback((count: number) => {
    const container = containerRef.current;
    if (!container) return;
    const pool = linesPoolRef.current;

    while (pool.length < count) {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.whiteSpace = "nowrap";
      el.style.font = FONT;
      el.style.lineHeight = `${LINE_HEIGHT}px`;
      el.style.pointerEvents = "auto";
      el.style.cursor = "text";
      el.style.userSelect = "text";
      pool.push(el);
      container.appendChild(el);
    }
    // Hide extras
    for (let i = 0; i < pool.length; i++) {
      pool[i]!.style.display = i < count ? "" : "none";
    }
  }, []);

  const draw = useCallback(() => {
    const prepared = preparedRef.current;
    if (!prepared) return;

    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

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

    // Sync the DOM pool and project lines
    syncPool(lines.length);
    const pool = linesPoolRef.current;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const color = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.78)";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      const el = pool[i]!;
      el.textContent = line.text;
      el.style.left = `${line.x}px`;
      el.style.top = `${line.y}px`;
      el.style.color = color;
      el.style.display = "";
    }
  }, [dimensions, syncPool]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Scroll handler on window
  useEffect(() => {
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

    window.addEventListener("wheel", onWheel, { passive: false });

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

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40"
      style={{ pointerEvents: "none" }}
    />
  );
}
