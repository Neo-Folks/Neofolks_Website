import { useState } from "react";
import Footer from "@/components/Footer";
import ParallaxSection from "@/components/ParallaxSection";
import vanshPhoto from "@/assets/team/vansh.jpg";
import rishiPhoto from "@/assets/team/rishi.jpg";
import zeeshanPhoto from "@/assets/team/zeeshan.jpg";
import sionaPhoto from "@/assets/team/siona.jpg";
import dhvaniPhoto from "@/assets/team/dhvani.jpg";
import dhyeyPhoto from "@/assets/team/dhyey.jpg";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
}

const members: TeamMember[] = [
  { id: "vansh-shah",            name: "Vansh Shah",            role: "Tech Lead",                  image: vanshPhoto   },
  { id: "rishi-kacchadia",       name: "Rishi Kacchadia",       role: "Marketing & Outreach Lead",  image: rishiPhoto   },
  { id: "zeeshan-vahora",        name: "Zeeshan Vahora",        role: "Event Operations Lead",      image: zeeshanPhoto },
  { id: "siona-venuthurumilli",  name: "Siona Venuthurumilli",  role: "Social Media Lead",          image: sionaPhoto   },
  { id: "dhyey-chatrala",        name: "Dhyey Chatrala",        role: "Design Lead",                image: dhyeyPhoto   },
  { id: "dhvani-gohel",          name: "Dhvani Gohel",          role: "Content Lead",               image: dhvaniPhoto  },
];

// col1: index 0,3 | col2: index 1,4 (center — founder placeholder) | col3: index 2,5
const col1 = [members[0], members[3]];
const col2 = [members[1], members[4]];
const col3 = [members[2], members[5]];

export default function Team() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#000000", position: "relative", zIndex: 0 }}>
      {/* Full black overlay to cover gradient grid */}
      <div style={{ position: "fixed", inset: 0, background: "#000000", zIndex: 0 }} />
      {/* Gradient at top — shows through transparent navbar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to bottom, rgba(88,28,235,0.15), transparent)", zIndex: 1, pointerEvents: "none" }} />
      {/* Page Header */}
      <section style={{ paddingTop: "70px", paddingBottom: "30px", position: "relative", overflow: "hidden", zIndex: 1 }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <ParallaxSection>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "16px" }}>The People</p>
            <h1 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(48px, 7vw, 96px)", color: "#ffffff", margin: "0 0 20px 0", lineHeight: 1 }}>Our Team</h1>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              Meet the passionate leaders driving innovation and fostering community growth at NeoFolks.
            </p>
          </ParallaxSection>
        </div>
      </section>

      {/* Team Showcase */}
      <section className="team-section" style={{ padding: "20px 48px 60px", boxSizing: "border-box", marginTop: "-20px", position: "relative", zIndex: 1 }}>
        <div className="team-showcase" style={{ maxWidth: "960px", margin: "0 auto", display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "48px", paddingLeft: "80px" }}>

          {/* ── Photo Grid ── */}
          <div className="team-photo-grid" style={{ display: "flex", gap: "12px", flexShrink: 0, alignItems: "flex-start" }}>

            {/* Column 1 — offset down so cards flank the director */}
            <div className="team-photo-col team-photo-col-offset" style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "97px" }}>
              {col1.map((m) => (
                <PhotoCard key={m.id} member={m} width={155} height={165} hoveredId={hoveredId} onHover={setHoveredId} />
              ))}
            </div>

            {/* Column 2 — no offset, director sits in the middle */}
            <div className="team-photo-col" style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "0px" }}>
              {/* Top member */}
              <PhotoCard member={col2[0]} width={172} height={182} hoveredId={hoveredId} onHover={setHoveredId} />

              {/* Community Director placeholder */}
              <div className="team-director-card" style={{
                width: "172px", height: "182px", borderRadius: "14px", flexShrink: 0,
                border: "1px dashed rgba(168,85,247,0.35)",
                background: "rgba(168,85,247,0.05)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
              }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px dashed rgba(168,85,247,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "20px", color: "rgba(168,85,247,0.5)" }}>+</span>
                </div>
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(168,85,247,0.5)", textAlign: "center", padding: "0 12px", lineHeight: 1.5 }}>
                  Community<br />Director
                </p>
              </div>

              {/* Design Lead */}
              <PhotoCard member={col2[1]} width={172} height={182} hoveredId={hoveredId} onHover={setHoveredId} />
            </div>

            {/* Column 3 — offset down same as col1 */}
            <div className="team-photo-col team-photo-col-offset" style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "97px" }}>
              {col3.map((m) => (
                <PhotoCard key={m.id} member={m} width={162} height={172} hoveredId={hoveredId} onHover={setHoveredId} />
              ))}
            </div>
          </div>

          {/* ── Name List ── */}
          <div className="team-name-list" style={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "8px", flex: 1, marginTop: "97px" }}>
            {members.map((m) => (
              <MemberRow key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} />
            ))}
          </div>

        </div>
        <style>{`
          @media (max-width: 1000px) {
            .team-showcase { padding-left: 24px !important; gap: 28px !important; }
          }
          @media (max-width: 800px) {
            .team-showcase { flex-direction: column !important; padding-left: 0 !important; align-items: center !important; gap: 32px !important; }
            .team-photo-grid { flex-wrap: wrap !important; justify-content: center !important; }
            .team-photo-col-offset { margin-top: 0 !important; }
            .team-name-list { margin-top: 0 !important; width: 100%; max-width: 420px; }
          }
          @media (max-width: 480px) {
            .team-section { padding: 20px 20px 48px !important; }
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}

/* ── Photo Card ── */
function PhotoCard({ member, width, height, hoveredId, onHover }: {
  member: TeamMember; width: number; height: number;
  hoveredId: string | null; onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      style={{
        width: `${width}px`, height: `${height}px`, borderRadius: "14px", overflow: "hidden",
        flexShrink: 0, cursor: "pointer", transition: "opacity 0.4s",
        opacity: isDimmed ? 0.5 : 1,
        background: member.image ? undefined : "rgba(255,255,255,0.04)",
        border: member.image ? undefined : "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "filter 0.5s",
            filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.7)",
          }}
        />
      ) : (
        <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
          No Photo
        </span>
      )}
    </div>
  );
}

/* ── Member Row ── */
function MemberRow({ member, hoveredId, onHover }: {
  member: TeamMember; hoveredId: string | null; onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      style={{ cursor: "pointer", transition: "opacity 0.3s", opacity: isDimmed ? 0.4 : 1 }}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{
          height: "12px", borderRadius: "5px", flexShrink: 0,
          background: isActive ? "#ffffff" : "rgba(255,255,255,0.2)",
          width: isActive ? "20px" : "16px",
          transition: "all 0.3s",
          display: "inline-block",
        }} />
        <span style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "18px", fontWeight: 600, lineHeight: 1,
          letterSpacing: "-0.01em",
          color: isActive ? "#ffffff" : "rgba(255,255,255,0.75)",
          transition: "color 0.3s",
        }}>
          {member.name}
        </span>
      </div>
      <p style={{
        marginTop: "6px", paddingLeft: "26px",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "10px", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.28)",
      }}>
        {member.role}
      </p>
    </div>
  );
}