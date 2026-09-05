import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import ParallaxSection from "@/components/ParallaxSection";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{ minHeight: "100vh", background: "#000000", position: "relative", zIndex: 0 }}>
      {/* Full black overlay to cover gradient grid */}
      <div style={{ position: "fixed", inset: 0, background: "#000000", zIndex: 0 }} />
      {/* Gradient at top — shows through transparent navbar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to bottom, rgba(88,28,235,0.15), transparent)", zIndex: 1, pointerEvents: "none" }} />

      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "70px 48px 40px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <ParallaxSection>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "16px" }}>
              Lost In Space
            </p>
            <h1 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(48px, 7vw, 96px)", color: "#ffffff", margin: "0 0 20px 0", lineHeight: 1 }}>
              404
            </h1>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "36px" }}>
              This page doesn't exist, or has moved somewhere else. Let's get you back on track.
            </p>
            <Link to="/" style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#000000",
              background: "#ffffff",
              borderRadius: "75px",
              padding: "14px 32px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              Return to Home
            </Link>
          </ParallaxSection>
        </div>
      </section>
    </div>
  );
};

export default NotFound;