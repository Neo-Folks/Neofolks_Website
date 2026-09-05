import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <style>{`
        .nav-link:hover { color: #ffffff !important; }
        .join-btn:hover { background: rgba(255,255,255,0.18) !important; }
        @media (max-width: 768px) {
          .nav-pill { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>

      {/* Logo — left */}
      <Link to="/" style={{
        position: "fixed",
        top: "20px",
        left: "28px",
        zIndex: 50,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        color: "#ffffff",
        textDecoration: "none",
        letterSpacing: "0.02em",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}>
        <span style={{ fontWeight: 600 }}>neofolks</span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>nuv</span>
      </Link>

      {/* Right side controls — pill (desktop) or hamburger (mobile) */}
      <div style={{
        position: "fixed",
        top: "20px",
        right: "28px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
      }}>

        {/* Liquid glass pill — right */}
        <div
          className="nav-pill"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "6px 6px 6px 20px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="nav-link"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: isActive(link.href) ? 500 : 400,
                color: isActive(link.href) ? "#ffffff" : "rgba(255,255,255,0.55)",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: "999px",
                background: isActive(link.href) ? "rgba(255,255,255,0.1)" : "transparent",
                transition: "color 0.2s, background 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Join Us button */}
          <Link
            to="/join"
            className="join-btn"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              color: "#ffffff",
              textDecoration: "none",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
              marginLeft: "4px",
            }}
          >
            Join Us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          top: "72px",
          right: "16px",
          zIndex: 49,
          background: "rgba(10,10,10,0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          minWidth: "180px",
        }}>
          {[...navLinks, { href: "/join", label: "Join Us" }].map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: isActive(link.href) ? "#ffffff" : "rgba(255,255,255,0.55)",
                textDecoration: "none",
                padding: "11px 16px",
                borderRadius: "12px",
                background: isActive(link.href) ? "rgba(255,255,255,0.08)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navigation;