import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import ParallaxSection from "@/components/ParallaxSection";

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#ffffff",
  fontFamily: "Inter, system-ui, sans-serif",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  marginBottom: "8px",
  display: "block",
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormData({ name: "", email: "", subject: "", message: "" });
    toast({ title: "Message Sent!", description: "We'll get back to you soon." });
    setIsSubmitting(false);
  };

  const contactMethods = [
    { title: "Email", value: "neofolks@nuvstudents.edu", href: "mailto:neofolks@nuvstudents.edu" },
    { title: "LinkedIn", value: "NeoFolks Community", href: "https://linkedin.com/company/neofolks-nuv" },
    { title: "Instagram", value: "@neofolks", href: "https://www.instagram.com/neofolks/" },
    { title: "GitHub", value: "github.com/neofolks-nuv", href: "https://github.com/neofolks-nuv" }
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
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "16px" }}>Reach Out</p>
            <h1 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(48px, 7vw, 96px)", color: "#ffffff", margin: "0 0 20px 0", lineHeight: 1 }}>Get In Touch</h1>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              Have questions? Want to join or collaborate? We'd love to hear from you.
            </p>
          </ParallaxSection>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: "20px 48px 100px", boxSizing: "border-box", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "56px", alignItems: "start" }} className="contact-grid">
          <style>{`
            @media (max-width: 900px) {
              .contact-grid { grid-template-columns: 1fr !important; }
            }
            @media (max-width: 480px) {
              .contact-form-card { padding: 24px !important; }
              .contact-name-email-grid { grid-template-columns: 1fr !important; }
            }
            .contact-input:focus-visible { outline: none !important; border-color: rgba(168,85,247,0.5) !important; box-shadow: 0 0 0 3px rgba(168,85,247,0.1) !important; }
            .contact-method-row:hover .contact-method-bar { background: rgba(168,85,247,0.7) !important; width: 24px !important; }
            .contact-method-row:hover .contact-method-value { color: #ffffff !important; }
          `}</style>

          {/* Left — Contact Methods */}
          <div>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "24px" }}>
              Ways To Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {contactMethods.map((method, index) => (
                <ParallaxSection key={index} delay={index * 80}>
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method-row"
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "16px 8px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      textDecoration: "none",
                    }}
                  >
                    <span className="contact-method-bar" style={{
                      width: "16px", height: "1px", flexShrink: 0,
                      background: "rgba(255,255,255,0.2)",
                      transition: "all 0.3s",
                    }} />
                    <div>
                      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "4px" }}>
                        {method.title}
                      </p>
                      <span className="contact-method-value" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.7)", transition: "color 0.3s" }}>
                        {method.value}
                      </span>
                    </div>
                  </a>
                </ParallaxSection>
              ))}
              <ParallaxSection delay={400}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 8px" }}>
                  <span style={{ width: "16px", height: "1px", flexShrink: 0, background: "rgba(168,85,247,0.4)" }} />
                  <div>
                    <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "4px" }}>
                      Location
                    </p>
                    <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                      Navrachana University, Vadodara
                    </span>
                  </div>
                </div>
              </ParallaxSection>
            </div>
          </div>

          {/* Right — Message Form */}
          <ParallaxSection delay={200}>
            <div className="contact-form-card" style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "36px",
              boxSizing: "border-box",
            }}>
              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "10px" }}>
                Send A Message
              </p>
              <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "22px", fontWeight: 600, color: "#ffffff", marginBottom: "24px", letterSpacing: "-0.01em" }}>
                We'll get back to you soon
              </h3>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div className="contact-name-email-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <Label style={labelStyle}>Name *</Label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} className="contact-input h-10 text-sm" style={inputStyle} required />
                  </div>
                  <div>
                    <Label style={labelStyle}>Email *</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} className="contact-input h-10 text-sm" style={inputStyle} required />
                  </div>
                </div>
                <div>
                  <Label style={labelStyle}>Subject</Label>
                  <Input name="subject" value={formData.subject} onChange={handleInputChange} className="contact-input h-10 text-sm" style={inputStyle} />
                </div>
                <div>
                  <Label style={labelStyle}>Message *</Label>
                  <Textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className="contact-input text-sm" style={inputStyle} required />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#000000",
                    background: "#ffffff",
                    border: "none",
                    borderRadius: "75px",
                    padding: "14px 32px",
                    cursor: isSubmitting ? "default" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "6px",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </ParallaxSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;