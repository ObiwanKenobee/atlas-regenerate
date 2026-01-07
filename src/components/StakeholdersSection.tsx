import { Users, Building2, Landmark, Beaker, ArrowRight } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const StakeholdersSection = () => {
  const stakeholders = [
    {
      icon: Users,
      title: "Regenerative Practitioners",
      description:
        "Farmers, land stewards, and community leaders seeking fair value for real-world impact and measurable restoration.",
      cta: "Join as Practitioner",
    },
    {
      icon: Building2,
      title: "Investors & Institutions",
      description:
        "Forward-thinking capital seeking credible, large-scale impact opportunities with transparent, auditable returns.",
      cta: "Explore Opportunities",
    },
    {
      icon: Landmark,
      title: "Governments & NGOs",
      description:
        "Organizations needing transparent, data-driven tools for sustainability initiatives and development programs.",
      cta: "Partner With Us",
    },
    {
      icon: Beaker,
      title: "Builders & Researchers",
      description:
        "Scientists, developers, and innovators contributing to ethical AI, climate tech, and regenerative science.",
      cta: "Build With Us",
    },
  ];

  return (
    <section id="stakeholders" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-earth/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-sm font-medium text-earth uppercase tracking-wider">
            Who It's For
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
            Uniting Those Who{" "}
            <span className="text-gradient-earth italic">Build the Future</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Atlas Sanctum connects diverse stakeholders committed to turning 
            restoration into a measurable, investable, and scalable reality.
          </p>
        </AnimatedSection>

        {/* Stakeholder Cards */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stakeholders.map((stakeholder) => (
            <StaggerItem key={stakeholder.title}>
              <div className="group relative glass rounded-2xl p-8 hover:border-earth/30 transition-all duration-500 overflow-hidden h-full">
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-earth/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-earth/20 to-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <stakeholder.icon className="w-7 h-7 text-earth" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl mb-4 text-foreground relative z-10">
                  {stakeholder.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                  {stakeholder.description}
                </p>

                {/* CTA */}
                <button 
                  onClick={() => window.location.href = "/auth"}
                  className="inline-flex items-center gap-2 text-earth hover:text-gold transition-colors duration-300 text-sm font-medium relative z-10 group/btn"
                >
                  {stakeholder.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default StakeholdersSection;
