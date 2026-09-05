"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  // Rotation driven by rAF, never touches React state
  const rotationRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);

  // Refs to each node wrapper div so we can write transforms directly
  const nodeWrapperRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Orbit radius adapts to the available space so nodes never clip on narrow screens.
  const radiusRef = useRef<number>(180);
  const [ringDiameter, setRingDiameter] = useState(360);
  const SPEED_DEG_PER_SEC = 6; // 6°/s = one full rotation in 60 s

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recompute = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const maxByWidth = w / 2 - 70;
      const maxByHeight = h / 2 - 90;
      const r = Math.max(90, Math.min(180, maxByWidth, maxByHeight));
      radiusRef.current = r;
      setRingDiameter(r * 2);
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const getRelatedItems = useCallback((itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  }, [timelineData]);

  const isRelatedToActive = useCallback((itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  }, [activeNodeId, getRelatedItems]);

  // rAF loop — writes transforms directly to DOM, zero React re-renders
  const tick = useCallback((ts: number) => {
    if (lastTsRef.current === 0) lastTsRef.current = ts;
    const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
    lastTsRef.current = ts;

    if (autoRotateRef.current) {
      rotationRef.current = (rotationRef.current + SPEED_DEG_PER_SEC * dt) % 360;
    }

    const total = timelineData.length;
    timelineData.forEach((item, index) => {
      const el = nodeWrapperRefs.current[item.id];
      if (!el) return;
      const angle = ((index / total) * 360 + rotationRef.current) % 360;
      const rad = (angle * Math.PI) / 180;
      const radius = radiusRef.current;
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)));
      const zIndex = Math.round(100 + 50 * Math.cos(rad));
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.opacity = String(opacity);
      el.style.zIndex = String(zIndex);
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [timelineData]);

  useEffect(() => {
    lastTsRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    rotationRef.current = (270 - targetAngle + 360) % 360;
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const isOpening = !prev[id];
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((k) => { newState[parseInt(k)] = false; });
      newState[id] = isOpening;

      if (isOpening) {
        setActiveNodeId(id);
        autoRotateRef.current = false;
        const related = getRelatedItems(id);
        const pulse: Record<number, boolean> = {};
        related.forEach((r) => { pulse[r] = true; });
        setPulseEffect(pulse);
        centerViewOnNode(id);

        // Force expanded node to front and full opacity via DOM
        const el = nodeWrapperRefs.current[id];
        if (el) { el.style.zIndex = "200"; el.style.opacity = "1"; }
      } else {
        setActiveNodeId(null);
        autoRotateRef.current = true;
        setPulseEffect({});
      }

      return newState;
    });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      autoRotateRef.current = true;
    }
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-white bg-black border-white";
      case "in-progress": return "text-black bg-white border-black";
      default: return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
        >
          {/* Center orb */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10 pointer-events-none">
            <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70" />
            <div className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50" style={{ animationDelay: "0.5s" }} />
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md" />
          </div>

          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-white/10 pointer-events-none"
            style={{ width: `${ringDiameter}px`, height: `${ringDiameter}px` }}
          />

          {timelineData.map((item, _index) => {
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeWrapperRefs.current[item.id] = el; }}
                className="absolute cursor-pointer"
                // No transition-all here — that's what caused the hover glitch
                style={{ willChange: "transform" }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Glow halo */}
                <div
                  className={`absolute rounded-full pointer-events-none ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(168,85,247,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5) / 2}px`,
                    top: `-${(item.energy * 0.5) / 2}px`,
                  }}
                />

                {/* Node button — transition only on this inner element, not the wrapper */}
                <div
                  className={[
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 backdrop-blur-sm",
                    "transition-colors transition-shadow duration-300",
                    isExpanded
                      ? "bg-purple-500 text-white border-purple-400 shadow-lg shadow-purple-500/40 scale-150"
                      : isRelated
                      ? "bg-white/50 text-black border-white animate-pulse"
                      : "bg-black/60 text-white border-white/30",
                  ].join(" ")}
                  style={{ transform: isExpanded ? "scale(1.5)" : "scale(1)", transition: "transform 300ms, background-color 300ms, box-shadow 300ms" }}
                >
                  <Icon size={16} />
                </div>

                {/* Label */}
                <div
                  className="absolute whitespace-nowrap text-xs font-semibold tracking-wider pointer-events-none"
                  style={{
                    top: "48px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: isExpanded ? "rgb(216,180,254)" : "rgba(255,255,255,0.7)",
                    transition: "color 300ms",
                  }}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 max-w-[80vw] bg-black/90 backdrop-blur-lg border-purple-500/30 shadow-xl shadow-purple-500/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-purple-400/50" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "ACTIVE" : item.status === "in-progress" ? "GROWING" : "UPCOMING"}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{item.content}</p>
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-white/60">Activity</span>
                          <span className="font-mono text-purple-300">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500" style={{ width: `${item.energy}%` }} />
                        </div>
                      </div>
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/50">Related</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-purple-500/20 bg-transparent hover:bg-purple-500/10 text-white/70 hover:text-white"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/40" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
