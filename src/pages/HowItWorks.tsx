import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import {
  Leaf, Satellite, Brain, Shield, Coins, ArrowRight,
  Database, BarChart3, Users, Globe, Check
} from "lucide-react";
import ecosystemImage from "@/assets/ecosystem-network.jpg";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Leaf,
      title: "Register Regenerative Assets",
      description:
        "Farmers, land stewards, and ocean guardians register their restoration projects on the platform. Each asset—whether carbon sequestration, soil restoration, or marine protection—is documented with baseline data.",
      details: [
        "Geospatial verification of project boundaries",
        "Baseline ecosystem health assessment",
        "Historical land use documentation",
        "Community stakeholder mapping",
      ],
    },
    {
      number: "02",
      icon: Satellite,
      title: "Reality-Linked Verification",
      description:
        "AI-powered oracles continuously monitor projects using satellite imagery, IoT sensors, and partner data streams. This creates an auditable, real-time record of ecological improvement.",
      details: [
        "Satellite monitoring every 5 days",
        "Soil health sensor networks",
        "Biodiversity acoustic analysis",
        "Water quality tracking",
      ],
    },
    {
      number: "03",
      icon: Brain,
      title: "Ethical AI Governance",
      description:
        "Every transaction and decision passes through our ethical governance layer. Purpose-driven algorithms ensure alignment with regenerative principles and intergenerational responsibility.",
      details: [
        "Transparent decision rationale",
        "Community voting mechanisms",
        "Stewardship score assessment",
        "Impact additionality verification",
      ],
    },
    {
      number: "04",
      icon: Shield,
      title: "Smart Contract Issuance",
      description:
        "Living smart contracts are created that adapt to real-world impact. These contracts define value flows, stakeholder shares, and performance milestones tied to verified outcomes.",
      details: [
        "Dynamic value adjustment",
        "Milestone-based releases",
        "Multi-party agreements",
        "Dispute resolution protocols",
      ],
    },
    {
      number: "05",
      icon: Coins,
      title: "Value Exchange & Investment",
      description:
        "Investors and institutions access a curated marketplace of verified regenerative assets. Capital flows directly to practitioners, with transparent fee structures and impact reporting.",
      details: [
        "Direct practitioner payments",
        "Institutional-grade reporting",
        "Portfolio diversification tools",
        "Secondary market liquidity",
      ],
    },
    {
      number: "06",
      icon: BarChart3,
      title: "Continuous Impact Measurement",
      description:
        "The platform provides ongoing measurement and reporting of ecological and social outcomes. Stakeholders can track their portfolio's real-world impact in real-time.",
      details: [
        "Real-time impact dashboards",
        "Quarterly audit reports",
        "Third-party verification",
        "Impact certification badges",
      ],
    },
  ];

  const techStack = [
    { icon: Satellite, title: "Satellite Intelligence", description: "Multi-spectral analysis of ecosystem health" },
    { icon: Brain, title: "AI Oracles", description: "Machine learning for impact verification" },
    { icon: Database, title: "Distributed Ledger", description: "Immutable record of all transactions" },
    { icon: Shield, title: "Ethical Governance", description: "Purpose-driven decision framework" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ocean/15 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                The Regenerative Value Exchange
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
            >
              How{" "}
              <span className="text-gradient-primary italic">Atlas Sanctum</span>{" "}
              Works
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              A step-by-step guide to how we connect regenerative practitioners
              with impact capital through verifiable, ethical infrastructure.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.1}>
                <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 mb-20`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl font-serif text-gradient-primary opacity-50">
                        {step.number}
                      </span>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>

                    <h3 className="font-serif text-3xl mb-4">{step.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <div className="glass rounded-2xl p-8 h-full flex items-center justify-center min-h-[300px]">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-forest to-ocean opacity-20 blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <step.icon className="w-24 h-24 text-primary relative z-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-forest-deep/10 to-background" />

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Technology Stack
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6">
              Built on{" "}
              <span className="text-gradient-primary italic">Trusted Infrastructure</span>
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {techStack.map((tech) => (
              <StaggerItem key={tech.title}>
                <div className="glass rounded-xl p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                    <tech.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-serif text-xl mb-2">{tech.title}</h4>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Ecosystem Image */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={ecosystemImage}
                alt="Atlas Sanctum Ecosystem Network"
                className="w-full h-auto"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the regenerative value exchange and start building impact today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" onClick={() => window.location.href = "/auth"}>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="hero-outline" size="xl" onClick={() => window.location.href = "/"}>
                Back to Home
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HowItWorks;
