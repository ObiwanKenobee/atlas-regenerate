import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section id="join" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-forest/20 via-ocean/10 to-earth/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="glass rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Ready to Build the{" "}
              <span className="text-gradient-primary italic">Impact Economy</span>?
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Join the movement building infrastructure for a future where growth and 
              regeneration are no longer opposites, but the same equation.
            </p>

            {/* Email Signup */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button variant="hero" size="xl">
                Get Early Access
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Join 2,400+ pioneers already on the waitlist
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mt-20 text-center">
            <blockquote className="font-serif text-2xl md:text-3xl italic text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              "Infrastructure for a future where growth and regeneration are no longer 
              opposites, but the same equation."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
