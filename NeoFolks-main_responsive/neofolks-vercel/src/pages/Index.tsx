import { Link } from "react-router-dom";
import { Code, Database, Cpu, Palette, Terminal, Cloud, Shield, Smartphone } from "lucide-react";
import Footer from "@/components/Footer";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns";
import { motion } from "motion/react";
import TrustedBySection from "@/components/TrustedBySection";

const testimonialsData: Testimonial[] = [
  {
    text: "NeoFolks truly embodies its motto — it's not your average college club. From the first glance at any content piece this community puts out, it screams quality. Really liked the young and enthusiastic team pushing this to newer heights!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Ashish Verma",
    role: "Full Stack Developer",
    company: "@ Technoid Productions",
  },
  {
    text: "NeoFolks keeps all your event certificates in one place with a variety of designs, making certificate management a breeze. It's an amazing platform and a good community to collaborate.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Aditya Kumar",
    role: "Frontend Developer & UI/UX Designer",
    company: "@ HealthBridge Solutions",
  },
  {
    text: "NeoFolks is just the right place for creative minds and tech geeks to find their community of like-minded people and build an amazing network. Their events are incredibly insightful and conducted in a friendly, fun atmosphere.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Kabir Brahmbhatt",
    role: "Vice President Public Relations",
    company: "@ Vadodara Toastmasters",
  },
  {
    text: "A wonderful team of highly talented individuals. We were glad to have NeoFolks as our partners. The experience they provided to participants with their expertise and friendliness is very remarkable.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Venish Sureliya",
    role: "Graphic Designer",
    company: "@ Influencers & Sports Teams",
  },
  {
    text: "Working with NeoFolks has been an exceptional experience. The team they've assembled is truly outstanding, bringing together diverse skills in development, marketing, and UI design.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Parshva Shah",
    role: "Managing Director",
    company: "@ Media Private Limited",
  },
  {
    text: "I joined NeoFolks and learned a lot. I've been part of this community and look forward to more events, people, and community-driven experiences. Highly recommend joining!",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "Rohan Mehta",
    role: "Computer Science Student",
    company: "@ Navrachana University",
  },
  {
    text: "The hackathons and workshops organized by NeoFolks are top-notch. Each session is well-structured and leaves you with practical skills you can immediately apply.",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    name: "Priya Nair",
    role: "AI/ML Researcher",
    company: "@ IIT Gandhinagar",
  },
  {
    text: "What sets NeoFolks apart is the genuine passion the organizers bring to every event. It never feels corporate — it feels like a community of builders helping each other grow.",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    name: "Siddharth Joshi",
    role: "Cloud Engineer",
    company: "@ Infosys",
  },
  {
    text: "NeoFolks introduced me to people who became my mentors, collaborators, and friends. The community is warm, inclusive, and deeply committed to learning.",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    name: "Ananya Pillai",
    role: "UI/UX Designer",
    company: "@ Razorpay",
  },
];

const firstColumn = testimonialsData.slice(0, 3);
const secondColumn = testimonialsData.slice(3, 6);
const thirdColumn = testimonialsData.slice(6, 9);

const orbitalTechData = [
  {
    id: 1, title: "Web Dev", date: "Active",
    content: "Building responsive, performant web applications with modern frameworks and best practices.",
    category: "Development", icon: Code, relatedIds: [2, 7], status: "completed" as const, energy: 95,
  },
  {
    id: 2, title: "Mobile", date: "Active",
    content: "Crafting native and cross-platform mobile experiences for iOS and Android.",
    category: "Development", icon: Smartphone, relatedIds: [1, 3], status: "completed" as const, energy: 85,
  },
  {
    id: 3, title: "Data Science", date: "Active",
    content: "Exploring data analysis, visualization, and statistical modelling to uncover insights.",
    category: "Data", icon: Database, relatedIds: [4, 2], status: "in-progress" as const, energy: 78,
  },
  {
    id: 4, title: "AI/ML", date: "Active",
    content: "Building intelligent systems with machine learning, deep learning, and LLMs.",
    category: "AI", icon: Cpu, relatedIds: [3, 5], status: "in-progress" as const, energy: 90,
  },
  {
    id: 5, title: "Cloud", date: "Active",
    content: "Deploying scalable infrastructure on AWS, GCP and Azure with DevOps practices.",
    category: "Infrastructure", icon: Cloud, relatedIds: [4, 8], status: "completed" as const, energy: 72,
  },
  {
    id: 6, title: "Security", date: "Growing",
    content: "Learning ethical hacking, secure coding, and cybersecurity fundamentals.",
    category: "Security", icon: Shield, relatedIds: [5, 1], status: "in-progress" as const, energy: 65,
  },
  {
    id: 7, title: "UI/UX", date: "Active",
    content: "Designing intuitive user interfaces with a focus on accessibility and aesthetics.",
    category: "Design", icon: Palette, relatedIds: [1, 8], status: "completed" as const, energy: 80,
  },
  {
    id: 8, title: "DevOps", date: "Growing",
    content: "Automating CI/CD pipelines, containerisation, and infrastructure as code.",
    category: "Operations", icon: Terminal, relatedIds: [5, 6], status: "in-progress" as const, energy: 70,
  },
];

const features = [
  { title: "Technical Workshops", description: "Hands-on sessions covering web development, AI/ML, cloud computing, and emerging technologies." },
  { title: "Community Building", description: "A supportive network of tech enthusiasts who learn, grow, and innovate together." },
  { title: "Tech Events", description: "Hackathons, tech talks, coding competitions, and industry expert sessions." },
  { title: "Mentorship", description: "Guidance from experienced peers and industry professionals to accelerate growth." },
];

const Index = () => {
  return (
    <div style={{ background: "transparent" }}>

      {/* ── HERO — full viewport, no background, gradient pixel grid shows through ── */}
      <section style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Gradient overlay for text readability */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 50%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />
        {/* Centered title */}
        <div className="hero-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "-100px", position: "relative", zIndex: 1, padding: "0 20px", boxSizing: "border-box", maxWidth: "100%" }}>
          <div className="hero-title-row" style={{ display: "flex", alignItems: "center", gap: "0px", justifyContent: "center", marginLeft: "-60px" }}>
            <h1 className="hero-title" style={{
              fontFamily: "'Gambarino', serif",
              fontSize: "clamp(52px, 16vw, 200px)",
              color: "#ffffff",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              margin: 0,
              padding: 0,
              marginLeft: "140px",
              textAlign: "center",
              userSelect: "none",
            }}>
              NeoFolks
            </h1>
            <img
              src="/logo-icon.png"
              alt="NeoFolks Logo"
              className="hero-logo"
              style={{
                height: "clamp(60px, 18vw, 235px)",
                width: "auto",
                userSelect: "none",
                filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.5))",
                marginLeft: "calc(15px - 40px)",
                position: "relative",
                top: "10px",
                flexShrink: 0,
              }}
            />
          </div>
          <p style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.36,
            letterSpacing: "0.22em",
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: "28px",
            userSelect: "none",
            textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 4px 32px rgba(0,0,0,0.8)",
            maxWidth: "90vw",
          }}>
            The premier technology community at Navrachana University
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "48px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link to="/about" style={{
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
              Discover Our Journey
            </Link>
            <Link to="/join" style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#ffffff",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderRadius: "75px",
              padding: "14px 32px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              Join The Community
            </Link>
          </div>
        </div>

        {/* Bottom-left scroll indicator — circular badge like reference */}
        <div className="hero-scroll-badge" style={{
          position: "absolute",
          bottom: "36px",
          left: "48px",
          zIndex: 1,
        }}>
          <svg width="64" height="64" viewBox="0 0 64 64" style={{ animation: "spin 12s linear infinite" }}>
            <defs>
              <path id="circle" d="M 32,32 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0" />
            </defs>
            <text fontSize="7.5" fill="rgba(255,255,255,0.4)" letterSpacing="3.6" fontFamily="system-ui, sans-serif">
              <textPath href="#circle">SCROLL TO EXPLORE • SCROLL TO EXPLORE •</textPath>
            </text>
            <circle cx="32" cy="32" r="3" fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @media (max-width: 900px) {
            .hero-content { margin-top: -40px !important; }
            .hero-title-row { margin-left: 0 !important; }
            .hero-title { margin-left: 0 !important; }
            .hero-logo { margin-left: 4px !important; top: 0 !important; }
          }
          @media (max-width: 520px) {
            .hero-title-row { flex-direction: column !important; gap: 6px !important; }
            .hero-title { margin-left: 0 !important; }
            .hero-logo { margin-left: 0 !important; top: 0 !important; }
            .hero-scroll-badge { left: 20px !important; bottom: 20px !important; transform: scale(0.8); transform-origin: bottom left; }
          }
        `}</style>
      </section>

      {/* ── WHAT WE DO — full-bleed black ── */}
      <section className="what-we-do-section" style={{
        background: "#000000",
        padding: "100px 48px",
        boxSizing: "border-box",
        width: "100%",
      }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            marginBottom: "12px",
          }}>
            Our Activities
          </p>
          <h2 style={{
            fontFamily: "'Gambarino', serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "80px",
          }}>
            What We Do
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
          }}>
            {features.map((item, i) => (
              <div key={i} style={{ background: "#000000", padding: "48px 40px" }}>
                <p style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                  marginBottom: "20px",
                }}>
                  0{i + 1}
                </p>
                <h3 style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "#ffffff",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.36)",
                  lineHeight: 1.65,
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .what-we-do-section { padding: 64px 24px !important; }
          }
        `}</style>
      </section>

      {/* ── TECH FOCUS — orbital section ── */}
      <section style={{
        background: "#000000",
        padding: "0",
        boxSizing: "border-box",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
      }}>
        <div className="tech-focus-grid" style={{
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
        }}>
          {/* Left — text */}
          <div className="tech-focus-left" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "100px 64px",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              margin: "0 0 12px 0",
            }}>
              What We Focus On
            </p>
            <h2 style={{
              fontFamily: "'Gambarino', serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#ffffff",
              lineHeight: 1.1,
              margin: "0 0 32px 0",
            }}>
              Technologies<br />We Explore
            </h2>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "420px",
              margin: "0 0 28px 0",
            }}>
              At NeoFolks our primary focus is learning in public and via collaboration. We encourage
              cross-disciplinary partnerships between diverse fields so that people from various
              domains get to learn and create something new.
            </p>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1.7,
              maxWidth: "420px",
              margin: 0,
            }}>
              Continuous learning and development is our mission. Through regular events and
              workshops, we ensure that our members stay updated with new technologies and the
              latest trends.
            </p>
          </div>

          {/* Right — orbital timeline */}
          <div className="tech-focus-right" style={{ position: "relative", minHeight: "100vh" }}>
            <RadialOrbitalTimeline timelineData={orbitalTechData} />
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .tech-focus-grid { grid-template-columns: 1fr !important; min-height: auto !important; }
            .tech-focus-left { padding: 64px 24px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
            .tech-focus-right { min-height: 520px !important; }
          }
          @media (max-width: 480px) {
            .tech-focus-right { min-height: 420px !important; }
          }
        `}</style>
      </section>

      {/* ── TRUSTED BY & BUILT WITH ── */}
      <TrustedBySection />

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section" style={{
        background: "#000000",
        padding: "120px 48px",
        boxSizing: "border-box",
        width: "100%",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "72px" }}
          >
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              marginBottom: "12px",
            }}>
              Testimonials
            </p>
            <h2 style={{
              fontFamily: "'Gambarino', serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#ffffff",
              lineHeight: 1.1,
              margin: "0 0 16px 0",
            }}>
              What our community says
            </h2>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}>
              Checkout what others have to say about us.
            </p>
          </motion.div>

          {/* Scrolling columns */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            maxHeight: "720px",
            overflow: "hidden",
            maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          }}>
            <TestimonialsColumn testimonials={firstColumn} duration={18} className="testimonials-col" />
            <TestimonialsColumn testimonials={secondColumn} duration={22} className="testimonials-col hidden md:block" />
            <TestimonialsColumn testimonials={thirdColumn} duration={20} className="testimonials-col hidden lg:block" />
          </div>
        </div>
        <style>{`
          .testimonials-col { flex: 1 1 0%; min-width: 0; max-width: 320px; }
          @media (max-width: 768px) {
            .testimonials-section { padding: 72px 24px !important; }
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
};

export default Index;