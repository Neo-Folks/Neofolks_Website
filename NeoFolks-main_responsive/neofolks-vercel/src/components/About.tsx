import { Users, TrendingUp, Code, Award } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Users,
      title: "Community Building",
      description: "Fostering an inclusive tech community at Navrachana University where students explore, learn, and innovate together.",
      metric: "Growing Community"
    },
    {
      icon: TrendingUp,
      title: "Industry Connection",
      description: "Bridging academic learning with real-world applications through workshops, seminars, and industry partnerships.",
      metric: "Industry Focus"
    },
    {
      icon: Code,
      title: "Technical Innovation",
      description: "Empowering students with cutting-edge technologies and hands-on learning experiences in the digital world.",
      metric: "Tech Excellence"
    }
  ];

  return (
    <section id="about" className="section-padding bg-card/20">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gradient-primary">
            About Neofolks
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Neofolks is the premier technology and community group at Navrachana University (NUV), 
            dedicated to fostering innovation, creativity, and collaboration among students passionate about technology.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="glass-card glass-card-hover rounded-2xl p-8 sm:p-12 mb-16">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <Award className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission & Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                At Neofolks, we believe in <strong>Education Beyond Books</strong> - Navrachana University's core ethos 
                of holistic development through extracurricular activities, seminars, and workshops. We provide a platform 
                for students to explore cutting-edge technologies, develop practical skills, and build meaningful connections 
                in the tech community.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to bridge the gap between academic learning and real-world applications, emphasizing 
                industry connection, application-based learning, and interdisciplinary collaboration - values that 
                align perfectly with Navrachana University's focus on innovation and practical education.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className="glass-card glass-card-hover rounded-xl p-8 text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <highlight.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {highlight.description}
              </p>
              
              <div className="text-sm font-medium text-accent">
                {highlight.metric}
              </div>
            </div>
          ))}
        </div>

        {/* University Connection */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">Our Connection to NUV</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-3 text-accent">Education Beyond Books</h4>
              <p className="text-muted-foreground leading-relaxed">
                Embracing Navrachana University's philosophy of holistic development, Neofolks extends 
                learning beyond traditional classroom boundaries through hands-on workshops, tech talks, 
                and collaborative projects that prepare students for real-world challenges.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-3 text-accent">Innovation & Industry Focus</h4>
              <p className="text-muted-foreground leading-relaxed">
                Aligned with NUV's commitment to industry connection and application-based learning, 
                we facilitate interdisciplinary collaboration, encourage innovative thinking, and 
                create pathways for students to engage with emerging technologies and industry trends.
              </p>
            </div>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">What We Focus On</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Web Development", "Mobile Apps", "Data Science", "AI/ML",
              "Cloud Computing", "Cybersecurity", "UI/UX Design", "Community Building"
            ].map((focus, index) => (
              <div 
                key={index}
                className="bg-muted/30 rounded-lg p-4 text-center hover:bg-muted/50 transition-colors duration-300"
              >
                <span className="font-medium">{focus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;