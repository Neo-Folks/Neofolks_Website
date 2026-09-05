import Footer from "@/components/Footer";
import ParallaxSection from "@/components/ParallaxSection";

const About = () => {
  const highlights = [
    {
      number: "01",
      title: "Community Building",
      description: "Fostering an inclusive tech community where students explore, learn, and innovate together.",
      metric: "Growing Community"
    },
    {
      number: "02",
      title: "Industry Connection",
      description: "Bridging academic learning with real-world applications through workshops and partnerships.",
      metric: "Industry Focus"
    },
    {
      number: "03",
      title: "Technical Innovation",
      description: "Empowering students with cutting-edge technologies and hands-on learning experiences.",
      metric: "Tech Excellence"
    }
  ];

  const focusAreas = [
    "Web Development", "Mobile Apps", "Data Science", "AI/ML",
    "Cloud Computing", "Cybersecurity", "UI/UX Design", "Community Building",
    "Blockchain", "IoT", "Game Development", "DevOps"
  ];

  const values = [
    { title: "Innovation", description: "Pushing boundaries and exploring new technological possibilities" },
    { title: "Collaboration", description: "Working together to achieve greater goals and build connections" },
    { title: "Learning", description: "Continuous growth and knowledge sharing among all members" },
    { title: "Inclusivity", description: "Welcoming everyone regardless of background or experience" }
  ];

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
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "16px" }}>Who We Are</p>
            <h1 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(48px, 7vw, 96px)", color: "#ffffff", margin: "0 0 20px 0", lineHeight: 1 }}>About Neofolks</h1>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              The premier technology club at Navrachana University, dedicated to fostering innovation,
              creativity, and collaboration among students passionate about technology.
            </p>
          </ParallaxSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "20px 48px 60px", boxSizing: "border-box", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <ParallaxSection>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "40px",
              marginBottom: "56px",
            }} className="about-mission">
              <div>
                <h2 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "22px", fontWeight: 600, color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.01em" }}>
                  Our Mission &amp; Vision
                </h2>
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "14px" }}>
                  At Neofolks, we believe in <span style={{ color: "rgba(255,255,255,0.85)" }}>Education Beyond Books</span> —
                  Navrachana University's core ethos of holistic development through workshops, seminars, and hands-on learning.
                </p>
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
                  Our mission is to bridge academic learning and real-world applications, emphasizing
                  industry connection, practical learning, and interdisciplinary collaboration.
                </p>
              </div>
            </div>
          </ParallaxSection>

          {/* Highlights — numbered divider grid, matches Index "What We Do" treatment */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "16px",
            overflow: "hidden",
          }}>
            {highlights.map((highlight, index) => (
              <ParallaxSection key={index} delay={index * 80}>
                <div style={{ background: "#000000", padding: "40px 32px", height: "100%", boxSizing: "border-box" }}>
                  <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "18px" }}>
                    {highlight.number}
                  </p>
                  <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "17px", fontWeight: 600, color: "#ffffff", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                    {highlight.title}
                  </h3>
                  <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "16px" }}>
                    {highlight.description}
                  </p>
                  <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
                    {highlight.metric}
                  </p>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* University Connection */}
      <section style={{ padding: "60px 48px", boxSizing: "border-box", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <ParallaxSection>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textAlign: "center", marginBottom: "12px" }}>
              Rooted In
            </p>
            <h2 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(28px, 4vw, 40px)", color: "#ffffff", textAlign: "center", marginBottom: "48px" }}>
              Our Connection to NUV
            </h2>
          </ParallaxSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="about-nuv-grid">
            <ParallaxSection delay={100}>
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px", padding: "32px", height: "100%", boxSizing: "border-box",
              }}>
                <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "16px", fontWeight: 600, color: "#ffffff", marginBottom: "16px" }}>
                  Education Beyond Books
                </h3>
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}>
                  Embracing NUV's philosophy of holistic development through hands-on workshops,
                  tech talks, and projects that prepare students for real-world challenges.
                </p>
              </div>
            </ParallaxSection>
            <ParallaxSection delay={200}>
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px", padding: "32px", height: "100%", boxSizing: "border-box",
              }}>
                <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "16px", fontWeight: 600, color: "#ffffff", marginBottom: "16px" }}>
                  Innovation &amp; Industry Focus
                </h3>
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}>
                  Aligned with NUV's commitment to industry connection, we facilitate
                  interdisciplinary collaboration and engagement with emerging technologies.
                </p>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* What We Focus On */}
      <section style={{ padding: "60px 48px", boxSizing: "border-box", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <ParallaxSection>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textAlign: "center", marginBottom: "12px" }}>
              Our Scope
            </p>
            <h2 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(28px, 4vw, 40px)", color: "#ffffff", textAlign: "center", marginBottom: "40px" }}>
              What We Focus On
            </h2>
          </ParallaxSection>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {focusAreas.map((focus, index) => (
              <ParallaxSection key={index} delay={index * 30}>
                <span
                  className="about-focus-chip"
                  style={{
                    display: "inline-block",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "75px",
                    padding: "10px 20px",
                    transition: "all 0.3s",
                  }}
                >
                  {focus}
                </span>
              </ParallaxSection>
            ))}
          </div>
          <style>{`
            .about-focus-chip:hover { border-color: rgba(168,85,247,0.4) !important; color: #ffffff !important; background: rgba(168,85,247,0.06) !important; }
            @media (max-width: 800px) {
              .about-nuv-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: "60px 48px 100px", boxSizing: "border-box", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <ParallaxSection>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textAlign: "center", marginBottom: "12px" }}>
              What Drives Us
            </p>
            <h2 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(28px, 4vw, 40px)", color: "#ffffff", textAlign: "center", marginBottom: "48px" }}>
              Our Core Values
            </h2>
          </ParallaxSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }} className="about-values-grid">
            {values.map((value, index) => (
              <ParallaxSection key={index} delay={index * 80}>
                <div style={{ background: "#000000", padding: "32px 24px", textAlign: "center", height: "100%", boxSizing: "border-box" }}>
                  <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", fontWeight: 600, color: "#ffffff", marginBottom: "10px" }}>
                    {value.title}
                  </h3>
                  <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                    {value.description}
                  </p>
                </div>
              </ParallaxSection>
            ))}
          </div>
          <style>{`
            @media (max-width: 800px) { .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;