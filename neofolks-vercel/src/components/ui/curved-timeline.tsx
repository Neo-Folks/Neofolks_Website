"use client";

import React, { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface CurvedTimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  badge?: string;
  meta?: string;
  image?: string;
}

interface Point {
  x: number;
  y: number;
}

// Catmull-Rom -> cubic Bezier, so the path flows smoothly through every node
// instead of just connecting them with straight segments.
function smoothPath(points: Point[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const VBW = 1000; // svg viewBox width, in "units"
const ROW_H = 340; // vertical space each item gets, in units
const PAD_Y = 70;

// Node swing: how far left/right of center each node sits (as % of width).
const NODE_LEFT_PCT = 38;
const NODE_RIGHT_PCT = 62;
// Space reserved between a node and the card next to it, and between a
// card and the outer container edge — keeps everything inside 0-100% so
// nothing ever forces a horizontal scrollbar.
const NODE_CARD_GAP = 4;
const EDGE_PAD = 2;
const CARD_WIDTH_PCT = NODE_LEFT_PCT - NODE_CARD_GAP - EDGE_PAD; // symmetric both sides

export function CurvedTimeline({
  items,
  className,
}: {
  items: CurvedTimelineItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { points, totalHeight, pathD } = useMemo(() => {
    const pts: Point[] = items.map((_, i) => ({
      x: i % 2 === 0 ? VBW * (NODE_LEFT_PCT / 100) : VBW * (NODE_RIGHT_PCT / 100),
      y: PAD_Y + i * ROW_H + ROW_H / 2,
    }));
    const h = PAD_Y * 2 + items.length * ROW_H;
    return { points: pts, totalHeight: h, pathD: smoothPath(pts) };
  }, [items]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 55%"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });
  const glowOpacity = useTransform(pathLength, [0, 0.05, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-x-hidden", className)}>
      {/* ---------- Desktop / tablet: curved serpentine layout ---------- */}
      <div
        className="relative hidden md:block w-full"
        style={{ aspectRatio: `${VBW} / ${totalHeight}` }}
      >
        <svg
          viewBox={`0 0 ${VBW} ${totalHeight}`}
          preserveAspectRatio="xMidYMin meet"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <defs>
            <linearGradient id="curved-timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.85)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.35)" />
            </linearGradient>
            <filter id="curved-timeline-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* faint static track */}
          <path
            d={pathD}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* animated gradient fill, drawn on scroll */}
          <motion.path
            d={pathD}
            stroke="url(#curved-timeline-gradient)"
            strokeWidth={3}
            strokeLinecap="round"
            filter="url(#curved-timeline-glow)"
            style={{ pathLength, opacity: glowOpacity }}
          />
        </svg>

        {items.map((item, i) => {
          const p = points[i];
          const leftSide = i % 2 === 0;
          const topPct = (p.y / totalHeight) * 100;
          const nodeLeftPct = (p.x / VBW) * 100;

          return (
            <React.Fragment key={item.id}>
              {/* node */}
              <motion.div
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${topPct}%`, left: `${nodeLeftPct}%` }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(168,85,247,0.4)" }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: "rgba(168,85,247,0.85)" }} />
                </div>
                <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm" style={{ border: "1px solid rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)", color: "rgba(255,255,255,0.85)", fontFamily: "Inter, system-ui, sans-serif" }}>
                  {item.date}
                </span>
              </motion.div>

              {/* content card, on the outer side of the node */}
              <motion.div
                className="absolute z-0"
                style={{
                  top: `${topPct}%`,
                  width: `${CARD_WIDTH_PCT}%`,
                  left: leftSide ? `${EDGE_PAD}%` : `${nodeLeftPct + NODE_CARD_GAP}%`,
                  transform: "translateY(-50%)",
                }}
                initial={{ opacity: 0, x: leftSide ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                  {item.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {item.badge && (
                        <span className="absolute top-2 left-2 rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    {!item.image && item.badge && (
                      <span
                        className="inline-block mb-1.5 rounded-full px-2 py-0.5 text-[10px]"
                        style={{ border: "1px solid rgba(168,85,247,0.3)", color: "rgba(168,85,247,0.75)" }}
                      >
                        {item.badge}
                      </span>
                    )}
                    <h3
                      className="text-sm mb-1"
                      style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.9)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed line-clamp-3"
                      style={{ fontFamily: "Inter, system-ui, sans-serif", color: "rgba(255,255,255,0.4)" }}
                    >
                      {item.description}
                    </p>
                    {item.meta && (
                      <p
                        className="mt-2 text-[10px]"
                        style={{ fontFamily: "Inter, system-ui, sans-serif", color: "rgba(255,255,255,0.28)" }}
                      >
                        {item.meta}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      {/* ---------- Mobile: simple stacked fallback ---------- */}
      <div className="md:hidden relative pl-9">
        <div className="flex flex-col gap-6">
          {items.map((item) => {
            return (
              <motion.div
                key={item.id}
                className="relative"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="absolute -left-9 top-0 flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(168,85,247,0.4)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(168,85,247,0.85)" }} />
                </div>
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                  {item.image && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-[10px] font-medium"
                        style={{ fontFamily: "Inter, system-ui, sans-serif", color: "rgba(168,85,247,0.8)" }}
                      >
                        {item.date}
                      </span>
                      {item.badge && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px]"
                          style={{ border: "1px solid rgba(168,85,247,0.3)", color: "rgba(168,85,247,0.75)" }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-sm mb-1"
                      style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.9)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ fontFamily: "Inter, system-ui, sans-serif", color: "rgba(255,255,255,0.4)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CurvedTimeline;