import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email });

    if (insertError) {
      if (insertError.message.includes("duplicate")) {
        setError("You're already on the waitlist!");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } else {
      setSuccess(true);
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <section id="join" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-forest/20 via-ocean/10 to-earth/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto">
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
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 max-w-lg mx-auto"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <p className="text-foreground font-medium">
                    You're on the list! We'll be in touch soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-4"
                >
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-14 pl-12 pr-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button variant="hero" size="xl" type="submit" disabled={loading}>
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-destructive text-sm mt-2"
              >
                {error}
              </motion.p>
            )}

            {!success && (
              <p className="text-sm text-muted-foreground">
                Join 2,400+ pioneers already on the waitlist
              </p>
            )}
          </div>

          {/* Mission Statement */}
          <div className="mt-20 text-center">
            <blockquote className="font-serif text-2xl md:text-3xl italic text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              "Infrastructure for a future where growth and regeneration are no longer 
              opposites, but the same equation."
            </blockquote>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
