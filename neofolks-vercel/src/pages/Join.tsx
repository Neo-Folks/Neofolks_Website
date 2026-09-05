import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "13px",
  fontWeight: 600,
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "4px",
};

const stepBadgeStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center",
  width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
  background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.35)",
  color: "rgba(168,85,247,0.9)", fontSize: "10px", fontWeight: 600,
};

const Join = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    year: "",
    interests: [] as string[],
    experience: "",
    motivation: "",
    agreeToTerms: false
  });

  const benefits = [
    { number: "01", title: "Skill Development", description: "Access to workshops and training" },
    { number: "02", title: "Community Network", description: "Connect with like-minded students" },
    { number: "03", title: "Exclusive Events", description: "Priority access to hackathons" },
    { number: "04", title: "Recognition", description: "Leadership opportunities" }
  ];

  const interestAreas = [
    "Web Development", "Mobile Apps", "Data Science", "AI/ML",
    "Cybersecurity", "Cloud Computing", "UI/UX Design", "DevOps",
    "Blockchain", "Game Dev", "IoT", "Leadership"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.course || !formData.year) {
      toast({ title: "Missing Information", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({ title: "Terms Required", description: "Please agree to the terms and conditions.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review and get back to you soon.",
      });

      setFormData({
        fullName: "", email: "", phone: "", course: "", year: "",
        interests: [], experience: "", motivation: "", agreeToTerms: false
      });
    } catch (error) {
      toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000000", position: "relative", zIndex: 0 }}>
      {/* Full black overlay to cover gradient grid */}
      <div style={{ position: "fixed", inset: 0, background: "#000000", zIndex: 0 }} />
      {/* Gradient at top — shows through transparent navbar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to bottom, rgba(88,28,235,0.15), transparent)", zIndex: 1, pointerEvents: "none" }} />

      <style>{`
        .join-input:focus-visible { outline: none !important; border-color: rgba(168,85,247,0.5) !important; box-shadow: 0 0 0 3px rgba(168,85,247,0.1) !important; }
        .join-submit-btn:hover { box-shadow: 0 8px 30px rgba(255,255,255,0.15); transform: translateY(-1px); }
        @media (max-width: 700px) {
          .join-benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .join-form-grid { grid-template-columns: 1fr !important; }
          .join-next-steps { grid-template-columns: 1fr !important; }
          .join-interests-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .join-form-card { padding: 24px !important; }
        }
        @media (max-width: 420px) {
          .join-benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Page Header */}
      <section style={{ paddingTop: "70px", paddingBottom: "30px", position: "relative", overflow: "hidden", zIndex: 1 }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <ParallaxSection>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "16px" }}>Become A Member</p>
            <h1 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(48px, 7vw, 96px)", color: "#ffffff", margin: "0 0 20px 0", lineHeight: 1 }}>Join Neofolks</h1>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              Ready to be part of NUV's most vibrant tech community? Join us on an exciting journey.
            </p>
          </ParallaxSection>
        </div>
      </section>

      {/* Membership Benefits */}
      <section style={{ padding: "20px 48px 40px", boxSizing: "border-box", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <ParallaxSection>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textAlign: "center", marginBottom: "12px" }}>
              The Perks
            </p>
            <h2 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(28px, 4vw, 40px)", color: "#ffffff", textAlign: "center", marginBottom: "40px" }}>
              Why Join?
            </h2>
          </ParallaxSection>
          <div className="join-benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }}>
            {benefits.map((benefit, index) => (
              <ParallaxSection key={index} delay={index * 60}>
                <div style={{ background: "#000000", padding: "32px 20px", textAlign: "center", height: "100%", boxSizing: "border-box" }}>
                  <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "14px" }}>
                    {benefit.number}
                  </p>
                  <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 600, color: "#ffffff", marginBottom: "6px" }}>
                    {benefit.title}
                  </h3>
                  <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                    {benefit.description}
                  </p>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section style={{ padding: "40px 48px", boxSizing: "border-box", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <ParallaxSection>
            <div className="join-form-card" style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "40px",
              boxSizing: "border-box",
            }}>
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "10px" }}>
                  Application
                </p>
                <h2 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "22px", fontWeight: 600, color: "#ffffff", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                  Membership Application
                </h2>
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  Fill out this form to join the Neofolks community.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                {/* Personal Information */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3 style={sectionLabelStyle}>
                    <span style={stepBadgeStyle}>1</span>
                    Personal Information
                  </h3>

                  <div className="join-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div>
                      <Label style={labelStyle} htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName" name="fullName" type="text"
                        value={formData.fullName} onChange={handleInputChange}
                        placeholder="Your full name" required
                        className="join-input h-10 text-sm" style={inputStyle}
                      />
                    </div>
                    <div>
                      <Label style={labelStyle} htmlFor="email">Email Address *</Label>
                      <Input
                        id="email" name="email" type="email"
                        value={formData.email} onChange={handleInputChange}
                        placeholder="your@email.com" required
                        className="join-input h-10 text-sm" style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <Label style={labelStyle} htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleInputChange}
                      placeholder="+91 12345 67890"
                      className="join-input h-10 text-sm" style={inputStyle}
                    />
                  </div>
                </div>

                {/* Academic Information */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3 style={sectionLabelStyle}>
                    <span style={stepBadgeStyle}>2</span>
                    Academic Information
                  </h3>

                  <div className="join-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div>
                      <Label style={labelStyle} htmlFor="course">Course/Program *</Label>
                      <Select value={formData.course} onValueChange={(value) => handleSelectChange("course", value)}>
                        <SelectTrigger className="h-10 text-sm" style={inputStyle}>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btech-cse">B.Tech Computer Science</SelectItem>
                          <SelectItem value="btech-it">B.Tech IT</SelectItem>
                          <SelectItem value="btech-ece">B.Tech ECE</SelectItem>
                          <SelectItem value="bca">BCA</SelectItem>
                          <SelectItem value="mca">MCA</SelectItem>
                          <SelectItem value="mtech">M.Tech</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label style={labelStyle} htmlFor="year">Current Year *</Label>
                      <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                        <SelectTrigger className="h-10 text-sm" style={inputStyle}>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st">1st Year</SelectItem>
                          <SelectItem value="2nd">2nd Year</SelectItem>
                          <SelectItem value="3rd">3rd Year</SelectItem>
                          <SelectItem value="4th">4th Year</SelectItem>
                          <SelectItem value="final">Final Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Technical Interests */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3 style={sectionLabelStyle}>
                    <span style={stepBadgeStyle}>3</span>
                    Technical Interests
                  </h3>

                  <div className="join-interests-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                    {interestAreas.map((interest) => (
                      <div key={interest} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={() => handleInterestToggle(interest)}
                          className="h-3.5 w-3.5"
                          style={{ borderColor: "rgba(255,255,255,0.25)" }}
                        />
                        <Label
                          htmlFor={interest}
                          style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.55)", cursor: "pointer", lineHeight: 1.3 }}
                        >
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience & Motivation */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3 style={sectionLabelStyle}>
                    <span style={stepBadgeStyle}>4</span>
                    Tell Us About Yourself
                  </h3>

                  <div>
                    <Label style={labelStyle} htmlFor="experience">Technical Experience</Label>
                    <Textarea
                      id="experience" name="experience"
                      value={formData.experience} onChange={handleInputChange}
                      placeholder="Programming languages, projects, skills..."
                      rows={2} className="join-input text-sm" style={inputStyle}
                    />
                  </div>

                  <div>
                    <Label style={labelStyle} htmlFor="motivation">Why do you want to join? *</Label>
                    <Textarea
                      id="motivation" name="motivation"
                      value={formData.motivation} onChange={handleInputChange}
                      placeholder="What motivates you to join our community?"
                      rows={2} className="join-input text-sm" style={inputStyle} required
                    />
                  </div>
                </div>

                {/* Terms */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                    className="h-3.5 w-3.5 mt-0.5"
                    style={{ borderColor: "rgba(255,255,255,0.25)" }}
                  />
                  <Label htmlFor="terms" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, cursor: "pointer" }}>
                    I agree to the terms and conditions of Neofolks membership and commit to active participation in community activities.
                  </Label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="join-submit-btn"
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
                    padding: "15px 32px",
                    cursor: isSubmitting ? "default" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    transition: "all 0.3s",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{ width: "14px", height: "14px", border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#000000", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </form>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Next Steps */}
      <section style={{ padding: "60px 48px 100px", boxSizing: "border-box", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <ParallaxSection>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textAlign: "center", marginBottom: "12px" }}>
              The Process
            </p>
            <h2 style={{ fontFamily: "'Gambarino', serif", fontSize: "clamp(28px, 4vw, 40px)", color: "#ffffff", textAlign: "center", marginBottom: "48px" }}>
              What Happens Next?
            </h2>
            <div className="join-next-steps" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden", maxWidth: "800px", margin: "0 auto" }}>
              {[
                { step: "01", title: "Application Review", desc: "We'll review within 3-5 days" },
                { step: "02", title: "Welcome Interview", desc: "Brief informal chat" },
                { step: "03", title: "Community Onboarding", desc: "Join orientation and start!" }
              ].map((item, index) => (
                <ParallaxSection key={index} delay={index * 100}>
                  <div style={{ background: "#000000", padding: "32px 24px", textAlign: "center", height: "100%", boxSizing: "border-box" }}>
                    <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "14px" }}>
                      {item.step}
                    </p>
                    <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>
                      {item.desc}
                    </p>
                  </div>
                </ParallaxSection>
              ))}
            </div>
          </ParallaxSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Join;