import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Waves, Heart, CircleDot } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ocean/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow opacity-50" />
        
        {/* Floating Icons */}
        <div className="absolute top-1/3 left-[15%] animate-float opacity-30">
          <Leaf className="w-8 h-8 text-forest" />
        </div>
        <div className="absolute top-1/2 right-[20%] animate-float-delayed opacity-30">
          <Waves className="w-10 h-10 text-ocean" />
        </div>
        <div className="absolute bottom-1/3 left-[25%] animate-float opacity-30">
          <Heart className="w-6 h-6 text-earth" />
        </div>
        <div className="absolute top-[40%] right-[30%] animate-float-delayed opacity-30">
          <CircleDot className="w-7 h-7 text-gold" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <span className="text-sm text-muted-foreground">Regenerative Value Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Where{" "}
            <span className="text-gradient-primary italic">ethics</span>{" "}
            govern intelligence,
            <br />
            <span className="text-gradient-earth italic">capital</span>{" "}
            restores the world
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up font-sans" style={{ animationDelay: "0.2s" }}>
            Atlas Sanctum connects land, oceans, health, and circular economies into one coherent 
            regenerative framework—aligning global finance with long-term planetary flourishing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl">
              Explore the Platform
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" size="xl">
              Read the Vision
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-border/30 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "$2.1T", label: "Market Potential" },
              { value: "147+", label: "Partner Ecosystems" },
              { value: "12M", label: "Hectares Tracked" },
              { value: "∞", label: "Value Created" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl md:text-4xl text-gradient-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
