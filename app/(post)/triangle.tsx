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

function layoutTriangle(
  prepared: PreparedTextWithSegments,
  triangleHeight: number,
  lineHeight: number,
  maxWidth: number,
  scrollOffset: number
): PositionedLine[] {
  const lines: PositionedLine[] = [];
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

  const totalPossibleLines = Math.floor(triangleHeight / lineHeight);
  const skipLines = Math.floor(scrollOffset / lineHeight);

  // Pre-advance the cursor by consuming skipped lines
  // Use a wide width for skipped lines so we advance through content faster
  for (let i = 0; i < skipLines; i++) {
    const line = layoutNextLine(prepared, cursor, maxWidth);
    if (line === null) return lines;
    cursor = line.end;
  }

  let y = 0;
  while (y + lineHeight <= triangleHeight) {
    const progress =
      totalPossibleLines <= 1 ? 1 : y / lineHeight / (totalPossibleLines - 1);
    // Triangle: narrow at top, expands to maxWidth at bottom
    // Use eased progress for a more pleasing shape
    const eased = Math.pow(progress, 0.75);
    const minWidth = 60;
    const lineWidth = minWidth + (maxWidth - minWidth) * eased;

    const line = layoutNextLine(prepared, cursor, lineWidth);
    if (line === null) break;

    // Center each line horizontally within the maxWidth
    const x = (maxWidth - line.width) / 2;

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
        // Trigger redraw
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
    ctx.fillStyle = isDark ? "#1C1C1C" : "#fcfcfc";
    ctx.fillRect(0, 0, width, height);

    // Triangle sizing - fill as much of the viewport as possible
    const paddingX = 32;
    const paddingY = 24;
    const triangleMaxWidth = Math.min(width - paddingX * 2, 880);
    const triangleHeight = height - paddingY * 2;

    const lines = layoutTriangle(
      prepared,
      triangleHeight,
      LINE_HEIGHT,
      triangleMaxWidth,
      scrollRef.current
    );

    const offsetX = (width - triangleMaxWidth) / 2;
    const offsetY = paddingY;

    // Draw very subtle triangle guide
    ctx.beginPath();
    ctx.moveTo(width / 2, offsetY - 2);
    ctx.lineTo(offsetX - 6, offsetY + triangleHeight + 2);
    ctx.lineTo(offsetX + triangleMaxWidth + 6, offsetY + triangleHeight + 2);
    ctx.closePath();
    ctx.strokeStyle = isDark
      ? "rgba(255,255,255,0.04)"
      : "rgba(0,0,0,0.03)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Draw text
    ctx.font = FONT;
    ctx.textBaseline = "top";

    const textColor = isDark
      ? "rgba(255,255,255,0.82)"
      : "rgba(0,0,0,0.75)";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Fade edges
      const fadeIn = Math.min(1, (i + 1) / 3);
      const fadeOut = Math.min(1, (lines.length - i) / 3);
      ctx.globalAlpha = fadeIn * fadeOut;
      ctx.fillStyle = textColor;
      ctx.fillText(line.text, offsetX + line.x, offsetY + line.y + 2);
    }
    ctx.globalAlpha = 1;
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
      scrollRef.current = Math.max(0, scrollRef.current + e.deltaY * 0.4);
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
