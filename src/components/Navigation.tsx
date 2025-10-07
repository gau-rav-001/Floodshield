import { Link, useLocation } from "react-router-dom";
import { Shield, Home, Activity, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isLanding ? "bg-white/10 border-white/20" : "bg-background/95 border-border"
    }`}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className={`w-6 h-6 transition-colors ${
              isLanding ? "text-white" : "text-primary"
            } group-hover:scale-110 transition-transform`} />
            <span className={`text-xl font-bold ${
              isLanding ? "text-white" : "text-primary"
            }`}>
              FloodShield
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={isLanding ? "text-white hover:bg-white/20" : ""}
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className={isLanding ? "text-white hover:bg-white/20" : ""}
            >
              <Link to="/predict" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Predict</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (isLanding) {
                  scrollToAbout();
                } else {
                  window.location.href = "/#about";
                }
              }}
              className={isLanding ? "text-white hover:bg-white/20" : ""}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">About</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
