import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

interface CustomerLogo {
  name: string;
  logo: React.ReactNode;
}

const AvalancheLogo = () => (
  <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: "32px", width: "auto" }}>
    <path d="M6 32L18 12L30 32H6Z" fill="#E84142" />
    <text x="36" y="29" fontFamily="inherit" fontWeight="600" fontSize="16" fill="white">avalanche</text>
  </svg>
);

const DUHacksLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{
      width: "36px", height: "36px", borderRadius: "6px", flexShrink: 0,
      background: "linear-gradient(135deg, #6d28d9 0%, #2563eb 50%, #0ea5e9 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ fontFamily: "monospace", fontSize: "9px", color: "white", fontWeight: 700 }}>{"</>"}</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
      <span style={{ fontSize: "11px", fontWeight: 700, color: "white", letterSpacing: "0.1em" }}>DU</span>
      <span style={{ fontSize: "11px", fontWeight: 700, color: "#fbbf24", letterSpacing: "0.1em" }}>HACKS</span>
    </div>
  </div>
);

const CursorLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "24px", height: "24px" }}>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5" />
      <path d="M8 8L16 12L8 16V8Z" fill="white" />
    </svg>
    <span style={{ fontSize: "18px", fontWeight: 700, color: "white", letterSpacing: "0.05em" }}>CURSOR</span>
  </div>
);

const IndiaBlockchainLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "36px", height: "36px", flexShrink: 0 }}>
      <circle cx="22" cy="22" r="20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="22" cy="22" r="13" stroke="#f59e0b" strokeWidth="1" />
      <text x="22" y="25" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#f59e0b">₿</text>
    </svg>
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
      <span style={{ fontSize: "10px", fontWeight: 700, color: "white", letterSpacing: "0.08em" }}>INDIA</span>
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#4ade80", letterSpacing: "0.04em" }}>BLOCKCHAIN</span>
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#4ade80", letterSpacing: "0.04em" }}>MONTH</span>
    </div>
  </div>
);

const ETHIndiaLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "20px", height: "30px" }}>
      <path d="M12 0L0 18L12 24V0Z" fill="#627EEA" />
      <path d="M12 0L24 18L12 24V0Z" fill="#8FA4EF" />
      <path d="M0 20.4L12 36L24 20.4L12 26.4L0 20.4Z" fill="#627EEA" />
    </svg>
    <span style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>ETHIndia</span>
  </div>
);

const SolanaLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "28px", height: "22px" }}>
      <path d="M5 18h22l-5 5H0l5-5ZM5 0h22l-5 5H0L5 0ZM27 9H5l5-5h22l-5 5Z" fill="url(#sol)" />
      <defs>
        <linearGradient id="sol" x1="0" y1="12" x2="32" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9945FF" />
          <stop offset="1" stopColor="#14F195" />
        </linearGradient>
      </defs>
    </svg>
    <span style={{ fontSize: "16px", fontWeight: 600, color: "white" }}>Solana</span>
  </div>
);

const DevfolioLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{
      width: "26px", height: "26px", borderRadius: "4px", flexShrink: 0,
      background: "linear-gradient(135deg,#6366f1,#a855f7)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ color: "white", fontWeight: 800, fontSize: "13px" }}>D</span>
    </div>
    <span style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>Devfolio</span>
  </div>
);

const GitHubLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: "22px", height: "22px" }}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
    <span style={{ fontSize: "16px", fontWeight: 600, color: "white" }}>GitHub</span>
  </div>
);

const customers: CustomerLogo[] = [
  { name: "Avalanche", logo: <AvalancheLogo /> },
  { name: "DU Hacks", logo: <DUHacksLogo /> },
  { name: "Cursor", logo: <CursorLogo /> },
  { name: "India Blockchain Month", logo: <IndiaBlockchainLogo /> },
  { name: "ETHIndia", logo: <ETHIndiaLogo /> },
  { name: "Solana", logo: <SolanaLogo /> },
  { name: "Devfolio", logo: <DevfolioLogo /> },
  { name: "GitHub", logo: <GitHubLogo /> },
];

const TrustedBySection = () => {
  return (
    <section className="bg-background pb-16 pt-16 md:pb-32" style={{ background: "#000000" }}>
      <div className="group relative m-auto max-w-5xl px-6" style={{ position: "relative" }}>
        {/* Hover overlay link */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0, transform: "scale(0.95)",
          transition: "opacity 0.5s, transform 0.5s",
        }}
          className="group-hover-overlay"
        >
          <Link
            to="/"
            style={{ display: "block", fontSize: "14px", color: "white", textDecoration: "none", transition: "opacity 0.15s" }}
          >
            <span>Meet Our Partners</span>
            <ChevronRight style={{ marginLeft: "4px", display: "inline-block", width: "12px", height: "12px" }} />
          </Link>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <h2 style={{
            fontFamily: "'Gambarino', serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "#ffffff",
            lineHeight: 1.1,
            margin: 0,
          }}>
            Trusted By &amp; Built With
          </h2>
        </div>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            ...transitionVariants,
          }}
          className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 transition-all duration-500 sm:grid-cols-4 sm:gap-x-16 sm:gap-y-14"
        >
          {customers.map((customer, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.8 }}>
              {customer.logo}
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
};

export default TrustedBySection;