import { Leaf, Scale, Brain, BookOpen } from "lucide-react";

const VisionSection = () => {
  const pillars = [
    {
      icon: Scale,
      title: "Purpose-Governed by Design",
      description:
        "Every action filtered through ethical governance grounded in stewardship, preservation of life, and intergenerational responsibility. Profit is treated as a tool, not the goal.",
      color: "forest",
    },
    {
      icon: Leaf,
      title: "Regenerative Value Exchange",
      description:
        "Exchange of regenerative assets—carbon restoration, ecosystem recovery, cultural preservation—through living smart contracts that adapt to real-world impact.",
      color: "ocean",
    },
    {
      icon: Brain,
      title: "Reality-Linked Intelligence",
      description:
        "AI-powered oracles ingest data from satellites, sensors, and partners to continuously measure soil health, ocean vitality, and human outcomes.",
      color: "earth",
    },
    {
      icon: BookOpen,
      title: "From Stories to Systems",
      description:
        "Beyond markets, we capture and share knowledge—impact stories, scientific findings, and cultural wisdom—so regeneration compounds socially and economically.",
      color: "gold",
    },
  ];

  const colorClasses = {
    forest: "from-forest to-forest/50 text-forest",
    ocean: "from-ocean to-ocean/50 text-ocean",
    earth: "from-earth to-earth/50 text-earth",
    gold: "from-gold to-gold/50 text-gold",
  };

  return (
    <section id="vision" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-forest-deep/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            What Makes Us Different
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
            Regeneration as{" "}
            <span className="text-gradient-primary italic">Core Infrastructure</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Atlas Sanctum exists to answer a demanding question: How do we build systems 
            that grow value while healing the world that sustains them?
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                  colorClasses[pillar.color as keyof typeof colorClasses]
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <pillar.icon className="w-7 h-7 text-background" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl mb-4 text-foreground">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>

              {/* Hover Glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                  colorClasses[pillar.color as keyof typeof colorClasses]
                } opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
