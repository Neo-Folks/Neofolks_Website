import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { GradientPixelGrid } from "@/components/ui/gradient-pixel-grid";
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Every route change should start the new page at the top, instead of
// keeping the scroll position from whatever page the user was previously on.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}

function AppInner() {
  const location = useLocation();
  // Team and Events share the same flat-black background treatment
  // (no animated gradient pixel grid behind them).
  const useFlatBackground = location.pathname === "/team" || location.pathname === "/events";

  return (
    <>
      <ScrollToTop />
      {/* Global fixed gradient pixel grid */}
      {!useFlatBackground && (
        <div style={{ position: "fixed", inset: 0, zIndex: -1, overflow: "hidden", lineHeight: 0, width: "100%", height: "100%" }}>
          <GradientPixelGrid
            gridCols={40}
            gridRows={25}
            maxElevation={12}
            elevationSmoothing={0.2}
            backgroundColor="#08050F"
            gapRatio={0.05}
            darken={0.6}
            borderColor="#ffffff"
            borderOpacity={0.06}
            className="w-full h-full"
            color1="#100A1E"
            color2="#21153D"
            color3="#7649DF"
            speed={0.4}
          />
        </div>
      )}
      <div style={{ background: useFlatBackground ? "#000000" : "transparent" }}>
        <Navigation />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join" element={<Join />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;