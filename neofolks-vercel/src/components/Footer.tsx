import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: "#000000", borderTop: "1px solid rgba(255,255,255,0.08)", position: "relative", zIndex: 1 }}>
      <div className="footer-inner" style={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "80px 40px 40px",
        boxSizing: "border-box",
      }}>
        {/* Top row */}
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "64px",
          marginBottom: "80px",
        }}>
          {/* Brand */}
          <div>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "#ffffff",
              marginBottom: "20px",
              letterSpacing: "0.04em",
            }}>
              neofolks
            </p>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
              maxWidth: "340px",
            }}>
              The premier tech community at Navrachana University, fostering innovation and collaboration among students passionate about technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: "24px",
            }}>
              Quick Links
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { to: "/about", label: "About Us" },
                { to: "/team", label: "Our Team" },
                { to: "/events", label: "Events" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.to} to={link.to} style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: "24px",
            }}>
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Navrachana University", href: null },
                { label: "Vadodara, Gujarat", href: null },
                { label: "neofolks@nuv.ac.in", href: "mailto:neofolks@nuv.ac.in" },
                { label: "Instagram", href: "https://www.instagram.com/neofolks/" },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/neofolks" },
              ].map((item, i) => item.href ? (
                <a key={i} href={item.href} style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                }}>
                  {item.label}
                </a>
              ) : (
                <span key={i} style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.25)",
                }}>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <p style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.04em",
          }}>
            © 2026 Neofolks. Built with passion for technology.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              background: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "75px",
              padding: "8px 20px",
              cursor: "pointer",
            }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .footer-inner { padding: 56px 24px 32px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; margin-bottom: 48px !important; }
        }
        @media (max-width: 420px) {
          .footer-bottom { justify-content: center !important; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;