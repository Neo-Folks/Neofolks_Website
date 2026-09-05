"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GradientPixelGridProps {
  gridCols?: number;
  gridRows?: number;
  maxElevation?: number;
  elevationSmoothing?: number;
  backgroundColor?: string;
  gapRatio?: number;
  borderColor?: string;
  borderOpacity?: number;
  darken?: number;
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
}

export function GradientPixelGrid({
  gridCols = 60,
  gridRows = 40,
  maxElevation = 15,
  elevationSmoothing = 0.1,
  backgroundColor = "#08050F",
  gapRatio = 0.1,
  borderColor = "#ffffff",
  borderOpacity = 0.08,
  darken = 0,
  className = "",
  color1 = "#100A1E",
  color2 = "#21153D",
  color3 = "#7649DF",
  speed = 0.4,
}: GradientPixelGridProps) {
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const samplerRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Mouse position in canvas-normalised coords (0–1), smoothly lerped
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0.5,
    y: 0.4,
    active: false,
  });
  // Smoothed mouse for the glow (lags slightly behind for fluidity)
  const smoothMouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.4 });

  const pixelStateRef = useRef<{
    currentElevation: number;
    targetElevation: number;
    prevBrightness: number;
    r: number;
    g: number;
    b: number;
  }[]>([]);

  const hexToRgb = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "");
    const n = parseInt(h, 16);
    return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
  };

  const lerpColor = (
    a: [number, number, number],
    b: [number, number, number],
    t: number
  ): [number, number, number] => [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];

  // Paint the sampler — original 3-blob animated gradient, unchanged
  // Mouse position is only used for the elevation boost in the draw loop
  const paintSampler = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      const rgb3 = hexToRgb(color3);

      ctx.clearRect(0, 0, w, h);

      // Base fill
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, w, h);

      // Animated blob 1 — large midtone radial
      const cx1 = w * (0.3 + 0.2 * Math.sin(t * 0.7));
      const cy1 = h * (0.4 + 0.15 * Math.cos(t * 0.5));
      const r1 = Math.min(w, h) * 0.7;
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
      g1.addColorStop(0, `rgba(${rgb2[0]},${rgb2[1]},${rgb2[2]},0.9)`);
      g1.addColorStop(1, `rgba(${rgb2[0]},${rgb2[1]},${rgb2[2]},0)`);
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Animated blob 2 — bright accent radial
      const cx2 = w * (0.65 + 0.18 * Math.cos(t * 0.6));
      const cy2 = h * (0.35 + 0.2 * Math.sin(t * 0.8));
      const r2 = Math.min(w, h) * 0.5;
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
      g2.addColorStop(0, `rgba(${rgb3[0]},${rgb3[1]},${rgb3[2]},0.75)`);
      g2.addColorStop(0.6, `rgba(${rgb3[0]},${rgb3[1]},${rgb3[2]},0.2)`);
      g2.addColorStop(1, `rgba(${rgb3[0]},${rgb3[1]},${rgb3[2]},0)`);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Secondary wandering midtone blob
      const cx3 = w * (0.55 + 0.25 * Math.sin(t * 0.45 + 1));
      const cy3 = h * (0.7 + 0.12 * Math.cos(t * 0.55 + 2));
      const r3 = Math.min(w, h) * 0.45;
      const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, r3);
      const mid = lerpColor(rgb2, rgb3, 0.4);
      g3.addColorStop(0, `rgba(${mid[0]},${mid[1]},${mid[2]},0.6)`);
      g3.addColorStop(1, `rgba(${mid[0]},${mid[1]},${mid[2]},0)`);
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);
    },
    [color1, color2, color3]
  );

  useEffect(() => {
    const cells = gridCols * gridRows;
    pixelStateRef.current = Array.from({ length: cells }, () => ({
      currentElevation: 0,
      targetElevation: 0,
      prevBrightness: 0,
      r: 30,
      g: 30,
      b: 30,
    }));
  }, [gridCols, gridRows]);

  useEffect(() => {
    const displayCanvas = displayCanvasRef.current;
    const sampler = samplerRef.current;
    if (!displayCanvas || !sampler) return;

    const dispCtx = displayCanvas.getContext("2d");
    const sCtx = sampler.getContext("2d", { willReadFrequently: true });
    if (!dispCtx || !sCtx) return;

    const SAMPLER_W = gridCols * 4;
    const SAMPLER_H = gridRows * 4;
    sampler.width = SAMPLER_W;
    sampler.height = SAMPLER_H;

    const resize = () => {
      displayCanvas.width = displayCanvas.clientWidth * (window.devicePixelRatio || 1);
      displayCanvas.height = displayCanvas.clientHeight * (window.devicePixelRatio || 1);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(displayCanvas);

    // ── Mouse tracking — window-level so z-index/pointer-events never block it ──
    const onMouseMove = (e: MouseEvent) => {
      const rect = displayCanvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const borderRgbArr = hexToRgb(borderColor);

    // Pixel-grid radius (in grid cells) within which the mouse glow boosts elevation
    const MOUSE_BOOST_RADIUS_FRAC = 0.07; // tight ~6-cell radius

    const draw = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;
      timeRef.current += dt * speed;
      const t = timeRef.current;

      // Smoothly lerp the displayed glow toward the real mouse position
      // (or drift back to a neutral point when inactive)
      const lerpSpeed = 0.35;
      const targetX = mouseRef.current.active ? mouseRef.current.x : 0.5 + 0.08 * Math.sin(t * 0.4);
      const targetY = mouseRef.current.active ? mouseRef.current.y : 0.38 + 0.06 * Math.cos(t * 0.3);
      smoothMouseRef.current.x += (targetX - smoothMouseRef.current.x) * lerpSpeed;
      smoothMouseRef.current.y += (targetY - smoothMouseRef.current.y) * lerpSpeed;

      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      // Paint gradient to sampler
      paintSampler(sCtx, SAMPLER_W, SAMPLER_H, t);
      const imageData = sCtx.getImageData(0, 0, SAMPLER_W, SAMPLER_H);
      const sData = imageData.data;

      const pixels = pixelStateRef.current;

      // Mouse grid position (in cell coordinates)
      const mouseGridX = mx * gridCols;
      const mouseGridY = my * gridRows;
      const boostRadius = MOUSE_BOOST_RADIUS_FRAC * Math.max(gridCols, gridRows);

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const idx = row * gridCols + col;
          const pixel = pixels[idx];
          if (!pixel) continue;

          const sx = Math.floor((col / gridCols) * SAMPLER_W);
          const sy = Math.floor((row / gridRows) * SAMPLER_H);
          const px = (sy * SAMPLER_W + sx) * 4;

          let r = sData[px];
          let g = sData[px + 1];
          let b = sData[px + 2];

          if (darken > 0) {
            const f = 1 - darken;
            r = Math.round(r * f);
            g = Math.round(g * f);
            b = Math.round(b * f);
          }

          pixel.r = r;
          pixel.g = g;
          pixel.b = b;

          const brightness =
            (sData[px] * 0.299 + sData[px + 1] * 0.587 + sData[px + 2] * 0.114) / 255;
          const delta = Math.abs(brightness - pixel.prevBrightness);

          const elevFromBrightness = brightness * maxElevation * 0.6;
          const elevFromDelta = Math.min(1, delta * 20) * maxElevation * 0.4;

          // Extra elevation boost for pixels near the mouse glow
          const dx = col - mouseGridX;
          const dy = row - mouseGridY;
          const distFrac = Math.sqrt(dx * dx + dy * dy) / boostRadius;
          const mouseBoost = Math.max(0, 1 - distFrac * distFrac) * maxElevation * 0.5;

          pixel.targetElevation = elevFromBrightness + elevFromDelta + mouseBoost;
          pixel.prevBrightness = brightness;

          pixel.currentElevation +=
            (pixel.targetElevation - pixel.currentElevation) * elevationSmoothing;
        }
      }

      // ── Render ──
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = displayCanvas.clientWidth;
      const displayHeight = displayCanvas.clientHeight;
      dispCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dispCtx.fillStyle = backgroundColor;
      dispCtx.fillRect(0, 0, displayWidth, displayHeight);

      const cellSize = Math.max(displayWidth / gridCols, displayHeight / gridRows);
      const gap = cellSize * gapRatio;
      const gridW = cellSize * gridCols;
      const gridH = cellSize * gridRows;
      const offsetX = (displayWidth - gridW) / 2;
      const offsetY = (displayHeight - gridH) / 2;

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const idx = row * gridCols + col;
          const pixel = pixels[idx];
          if (!pixel) continue;

          const x = offsetX + col * cellSize;
          const y = offsetY + row * cellSize;
          const elevation = pixel.currentElevation;
          const ox = -elevation * 1.2;
          const oy = -elevation * 1.8;
          const { r, g, b } = pixel;

          // Shadow
          if (elevation > 0.5) {
            dispCtx.fillStyle = `rgba(0,0,0,${Math.min(0.6, elevation * 0.04)})`;
            dispCtx.fillRect(
              x + gap / 2 + elevation * 1.5,
              y + gap / 2 + elevation * 2.0,
              cellSize - gap,
              cellSize - gap
            );
          }

          // Side faces
          if (elevation > 0.5) {
            dispCtx.fillStyle = `rgb(${Math.max(0, r - 80)},${Math.max(0, g - 80)},${Math.max(0, b - 80)})`;
            dispCtx.beginPath();
            dispCtx.moveTo(x + cellSize - gap / 2 + ox, y + gap / 2 + oy);
            dispCtx.lineTo(x + cellSize - gap / 2, y + gap / 2);
            dispCtx.lineTo(x + cellSize - gap / 2, y + cellSize - gap / 2);
            dispCtx.lineTo(x + cellSize - gap / 2 + ox, y + cellSize - gap / 2 + oy);
            dispCtx.closePath();
            dispCtx.fill();

            dispCtx.fillStyle = `rgb(${Math.max(0, r - 50)},${Math.max(0, g - 50)},${Math.max(0, b - 50)})`;
            dispCtx.beginPath();
            dispCtx.moveTo(x + gap / 2 + ox, y + cellSize - gap / 2 + oy);
            dispCtx.lineTo(x + gap / 2, y + cellSize - gap / 2);
            dispCtx.lineTo(x + cellSize - gap / 2, y + cellSize - gap / 2);
            dispCtx.lineTo(x + cellSize - gap / 2 + ox, y + cellSize - gap / 2 + oy);
            dispCtx.closePath();
            dispCtx.fill();
          }

          // Top face
          const bri = 1 + elevation * 0.06;
          dispCtx.fillStyle = `rgb(${Math.min(255, Math.round(r * bri))},${Math.min(255, Math.round(g * bri))},${Math.min(255, Math.round(b * bri))})`;
          dispCtx.fillRect(x + gap / 2 + ox, y + gap / 2 + oy, cellSize - gap, cellSize - gap);

          // Border
          if (borderOpacity > 0) {
            dispCtx.strokeStyle = `rgba(${borderRgbArr[0]},${borderRgbArr[1]},${borderRgbArr[2]},${borderOpacity + elevation * 0.01})`;
            dispCtx.lineWidth = 0.5;
            dispCtx.strokeRect(x + gap / 2 + ox, y + gap / 2 + oy, cellSize - gap, cellSize - gap);
          }
        }
      }

      // ── Mouse glow overlay — soft radial drawn on top of the tiles ──
      if (mouseRef.current.active) {
        const glowX = mx * displayWidth;
        const glowY = my * displayHeight;
        const glowR = cellSize * boostRadius * 1.8;
        const glow = dispCtx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowR);
        glow.addColorStop(0,   'rgba(118,73,223,0.18)');
        glow.addColorStop(0.4, 'rgba(118,73,223,0.08)');
        glow.addColorStop(1,   'rgba(118,73,223,0)');
        dispCtx.fillStyle = glow;
        dispCtx.fillRect(0, 0, displayWidth, displayHeight);
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [
    gridCols, gridRows, maxElevation, elevationSmoothing,
    backgroundColor, gapRatio, borderColor, borderOpacity,
    darken, speed, paintSampler,
  ]);

  return (
    <div style={{ width: "100%", height: "100%", display: "block" }}>
      <canvas ref={samplerRef} style={{ display: "none" }} />
      <canvas
        ref={displayCanvasRef}
        className={cn(className)}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}