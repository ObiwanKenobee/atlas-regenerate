import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import EcosystemSection from "@/components/EcosystemSection";
import StakeholdersSection from "@/components/StakeholdersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <VisionSection />
      <EcosystemSection />
      <StakeholdersSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
