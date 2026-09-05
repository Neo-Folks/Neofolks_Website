import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import ParallaxSection from "@/components/ParallaxSection";
import { CurvedTimeline, type CurvedTimelineItem } from "@/components/ui/curved-timeline";

import event1Img from "@/assets/events/event-1.jpg";
import event2Img from "@/assets/events/event-2.jpg";
import event3Img from "@/assets/events/event-3.jpg";
import event4Img from "@/assets/events/event-4.jpg";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "Workshop" | "Seminar" | "Hackathon" | "Competition" | "Social";
  status: "Upcoming" | "Registration Open" | "Past";
  attendees?: number;
  maxAttendees?: number;
  tags: string[];
  image?: string;
}

// ── Shared typography, matching the Team page exactly ──
const eyebrowStyle: React.CSSProperties = {
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.28)",
  marginBottom: "16px",
};

const h1Style: React.CSSProperties = {
  fontFamily: "'Gambarino', serif",
  fontSize: "clamp(48px, 7vw, 96px)",
  color: "#ffffff",
  margin: "0 0 20px 0",
  lineHeight: 1,
};

const subtitleStyle: React.CSSProperties = {
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "15px",
  color: "rgba(255,255,255,0.4)",
  maxWidth: "480px",
  margin: "0 auto",
  lineHeight: 1.7,
};

const sectionEyebrowStyle: React.CSSProperties = {
  ...eyebrowStyle,
  marginBottom: "12px",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "'Gambarino', serif",
  fontSize: "clamp(28px, 4vw, 40px)",
  color: "#ffffff",
  margin: "0 0 12px 0",
  lineHeight: 1.1,
};

const sectionSubtitleStyle: React.CSSProperties = {
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "13px",
  color: "rgba(255,255,255,0.4)",
  maxWidth: "460px",
  margin: "0 auto",
  lineHeight: 1.7,
};

const Events = () => {
  const pastEvents: Event[] = [
    {
      id: "python-basics",
      title: "Python Programming Basics",
      description: "Introduction to Python covering syntax, data structures, and algorithms.",
      date: "2024-01-20",
      time: "2:00 PM - 4:00 PM",
      location: "Computer Lab 2, NUV",
      type: "Workshop",
      status: "Past",
      attendees: 35,
      maxAttendees: 35,
      tags: ["Python", "Programming"],
      image: event1Img
    },
    {
      id: "tech-talk-startup",
      title: "Building Tech Startups",
      description: "Inspiring alumni talk on entrepreneurship and building successful startups.",
      date: "2024-01-15",
      time: "4:00 PM - 5:30 PM",
      location: "Seminar Hall, NUV",
      type: "Seminar",
      status: "Past",
      attendees: 80,
      maxAttendees: 80,
      tags: ["Entrepreneurship", "Startup"],
      image: event2Img
    },
    {
      id: "web-dev-bootcamp",
      title: "Web Development Bootcamp",
      description: "Intensive 3-day bootcamp covering HTML, CSS, JavaScript, and React.",
      date: "2023-12-10",
      time: "10:00 AM - 4:00 PM",
      location: "Innovation Center, NUV",
      type: "Workshop",
      status: "Past",
      attendees: 45,
      maxAttendees: 50,
      tags: ["Web Dev", "React", "JavaScript"],
      image: event3Img
    },
    {
      id: "winter-hackathon",
      title: "Winter Code Hackathon",
      description: "24-hour coding marathon with innovative campus solutions.",
      date: "2023-12-01",
      time: "6:00 PM - 6:00 PM (+1 day)",
      location: "Computer Labs, NUV",
      type: "Hackathon",
      status: "Past",
      attendees: 60,
      maxAttendees: 80,
      tags: ["Hackathon", "Innovation"],
      image: event4Img
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Chronological journey through our past events for the curved timeline
  const journeyItems: CurvedTimelineItem[] = [...pastEvents]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((event) => ({
      id: event.id,
      date: formatDate(event.date),
      title: event.title,
      description: event.description,
      badge: event.type,
      meta: event.location,
      image: event.image,
    }));

  const eventCategories = [
    { title: "Technical Workshops", desc: "Hands-on coding sessions" },
    { title: "Industry Seminars", desc: "Expert talks & guidance" },
    { title: "Competitions", desc: "Hackathons & contests" },
    { title: "Community Events", desc: "Networking sessions" }
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
            <p style={eyebrowStyle}>What's Happening</p>
            <h1 style={h1Style}>Events & Activities</h1>
            <p style={subtitleStyle}>
              Join us for exciting workshops, seminars, hackathons, and community events.
            </p>
          </ParallaxSection>
        </div>
      </section>

      {/* Event Categories */}
      <section style={{ padding: "40px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ParallaxSection>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <h2 style={{ ...sectionHeadingStyle, fontSize: "clamp(22px, 3vw, 30px)" }}>What We Run</h2>
            </div>
          </ParallaxSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {eventCategories.map((cat, index) => (
              <ParallaxSection key={index} delay={index * 60}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <span style={{
                    width: "20px", height: "1px",
                    background: "rgba(168,85,247,0.5)",
                    marginBottom: "16px",
                  }} />
                  <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "4px" }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.05em", color: "rgba(255,255,255,0.35)" }}>
                    {cat.desc}
                  </p>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Event Journey - curved timeline */}
      <section style={{ padding: "20px 48px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ParallaxSection>
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <p style={sectionEyebrowStyle}>The Story So Far</p>
              <h2 style={sectionHeadingStyle}>Our Event Journey</h2>
              <p style={{ ...sectionSubtitleStyle, margin: "0 auto" }}>
                A look back at the milestones behind Neofolks.
              </p>
            </div>
          </ParallaxSection>
          <CurvedTimeline items={journeyItems} />
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: "20px 48px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <ParallaxSection>
            <div style={{
              maxWidth: "480px", margin: "0 auto", padding: "36px 32px",
              borderRadius: "18px", border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}>
              <h2 style={{ ...sectionHeadingStyle, fontSize: "clamp(20px, 3vw, 26px)", marginBottom: "10px" }}>
                Stay Updated
              </h2>
              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "24px" }}>
                Don't miss out on exciting learning opportunities and events.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  className="rounded-full bg-white text-black text-xs font-semibold px-6 hover:bg-white/85 transition-colors"
                >
                  <a href="/join">Join Neofolks</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-transparent text-white text-xs hover:border-white/40 hover:bg-white/5 transition-colors"
                >
                  <a href="https://www.instagram.com/neofolks/" target="_blank" rel="noopener noreferrer">
                    Follow Updates
                  </a>
                </Button>
              </div>
            </div>
          </ParallaxSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;