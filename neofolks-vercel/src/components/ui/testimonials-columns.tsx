"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
  company?: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ display: "flex", flexDirection: "column", gap: "16px", paddingBottom: "16px" }}
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role, company }, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                  maxWidth: "320px",
                  width: "100%",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Avatar + name row */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <img
                    width={48}
                    height={48}
                    src={image}
                    alt={name}
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(168,85,247,0.4)" }}
                  />
                  <div>
                    <div style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#ffffff",
                      lineHeight: 1.3,
                    }}>
                      {name}
                    </div>
                    <div style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "rgba(168,85,247,0.8)",
                      lineHeight: 1.3,
                    }}>
                      {role}
                    </div>
                    {company && (
                      <div style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: "11px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.35)",
                        lineHeight: 1.3,
                      }}>
                        {company}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quote text */}
                <p style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  "{text}"
                </p>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
