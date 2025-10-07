import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Waves, Droplets, Shield, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[hsl(210,100%,15%)] via-[hsl(200,95%,25%)] to-[hsl(195,100%,35%)]">
      {/* Animated Water Waves Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>

      {/* Animated Rain Drops */}
      <div className="rain-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Clouds */}
      <div className="clouds-container">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-24 h-24 text-white drop-shadow-glow animate-pulse-slow" />
              <Droplets className="w-12 h-12 text-primary-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* App Name with Gradient */}
          <h1 className="text-6xl md:text-8xl font-bold gradient-text-glow animate-glow">
            FloodShield
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light tracking-wide">
            Predict floods before they strike — Stay safe with AI-powered insights.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <div className="glass-pill">
              <Waves className="w-5 h-5" />
              <span>Real-time Analysis</span>
            </div>
            <div className="glass-pill">
              <Shield className="w-5 h-5" />
              <span>Advanced ML Model</span>
            </div>
            <div className="glass-pill">
              <Droplets className="w-5 h-5" />
              <span>3-Day Forecast</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              onClick={() => navigate("/predict")}
              size="lg"
              className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl group"
            >
              <Droplets className="mr-2 h-6 w-6 group-hover:animate-bounce" />
              Start Prediction
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-scroll"></div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">How FloodShield Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Data Collection</h3>
              <p className="text-white/80">
                Gather environmental data including rainfall, river levels, and geographical parameters.
              </p>
            </div>

            <div className="glass-card">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-white/80">
                Advanced machine learning algorithms process data using trained models to identify flood patterns.
              </p>
            </div>

            <div className="glass-card">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Prediction</h3>
              <p className="text-white/80">
                Get accurate flood risk predictions for the next 3 days with actionable safety alerts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-white/70 border-t border-white/10">
        <p>Developed by <strong className="text-white">Gaurav Kumbhare</strong> | Powered by FloodShield AI 🌐</p>
      </footer>
    </div>
  );
};

export default Landing;
