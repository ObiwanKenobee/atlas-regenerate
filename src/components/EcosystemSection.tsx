import { Sprout, Droplets, Heart, RefreshCw, Shield, Zap } from "lucide-react";

const EcosystemSection = () => {
  const ecosystemLayers = [
    {
      icon: Sprout,
      title: "Regenerative Agriculture",
      description: "Soil restoration, carbon sequestration, and sustainable farming practices.",
    },
    {
      icon: Droplets,
      title: "Blue Economy",
      description: "Ocean vitality, marine ecosystems, and sustainable aquaculture.",
    },
    {
      icon: Heart,
      title: "Human Health",
      description: "Community wellbeing, healthcare access, and preventive health outcomes.",
    },
    {
      icon: RefreshCw,
      title: "Circular Bioeconomy",
      description: "Waste reduction, material reuse, and regenerative supply chains.",
    },
  ];

  const capabilities = [
    {
      icon: Shield,
      title: "Ethical AI Governance",
      description: "Transparent, democratic decision systems",
    },
    {
      icon: Zap,
      title: "Impact Marketplaces",
      description: "Invest in verified regenerative ventures",
    },
  ];

  return (
    <section id="ecosystem" className="py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ocean/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            The Ecosystem
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
            Four Domains,{" "}
            <span className="text-gradient-primary italic">One Framework</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A multi-layered ecosystem connecting land, oceans, health, and circular 
            economies into coherent regenerative infrastructure.
          </p>
        </div>

        {/* Main Ecosystem Visualization */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-forest to-ocean shadow-glow z-20 flex items-center justify-center">
            <div className="text-center">
              <span className="font-serif text-lg md:text-xl text-background font-medium">Atlas</span>
              <span className="block font-serif text-xs md:text-sm text-background/80">Sanctum</span>
            </div>
          </div>

          {/* Connecting Lines (visible on larger screens) */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
            <svg className="w-full h-full" viewBox="0 0 500 500">
              <circle
                cx="250"
                cy="250"
                r="180"
                fill="none"
                stroke="hsl(160 20% 15%)"
                strokeWidth="1"
                strokeDasharray="8 8"
              />
            </svg>
          </div>

          {/* Ecosystem Cards */}
          <div className="grid grid-cols-2 gap-6 md:gap-12 lg:gap-20">
            {ecosystemLayers.map((layer, index) => (
              <div
                key={layer.title}
                className={`${
                  index % 2 === 0 ? "lg:justify-self-end" : "lg:justify-self-start"
                } ${index < 2 ? "lg:mb-8" : "lg:mt-8"}`}
              >
                <div className="glass rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group max-w-xs">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <layer.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">{layer.title}</h3>
                  <p className="text-sm text-muted-foreground">{layer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Capabilities */}
        <div className="mt-20 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="flex items-start gap-4 p-6 rounded-xl bg-muted/30 border border-border/50"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-earth/20 to-gold/20 flex items-center justify-center flex-shrink-0">
                <cap.icon className="w-5 h-5 text-earth" />
              </div>
              <div>
                <h4 className="font-medium mb-1">{cap.title}</h4>
                <p className="text-sm text-muted-foreground">{cap.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
