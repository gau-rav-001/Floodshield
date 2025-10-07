import { Droplets } from "lucide-react";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Ripple Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="ripple-1"></div>
          <div className="ripple-2"></div>
          <div className="ripple-3"></div>
        </div>
        
        {/* Center Droplet */}
        <Droplets className="w-12 h-12 text-primary animate-bounce relative z-10" />
      </div>
      
      {/* Loading Text */}
      <p className="mt-6 text-lg text-muted-foreground animate-pulse">
        Analyzing environmental data...
      </p>
      
      {/* Rain Drops */}
      <div className="flex gap-2 mt-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;
