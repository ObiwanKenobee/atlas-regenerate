import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Building2, Landmark, Beaker, 
  ArrowRight, ArrowLeft, Check, Leaf 
} from "lucide-react";

const stakeholderTypes = [
  {
    id: "practitioner",
    icon: Users,
    title: "Regenerative Practitioner",
    description: "Farmers, land stewards, and community leaders",
  },
  {
    id: "investor",
    icon: Building2,
    title: "Investor / Institution",
    description: "Impact investors and financial institutions",
  },
  {
    id: "government",
    icon: Landmark,
    title: "Government / NGO",
    description: "Public sector and non-profit organizations",
  },
  {
    id: "builder",
    icon: Beaker,
    title: "Builder / Researcher",
    description: "Scientists, developers, and innovators",
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleComplete = async () => {
    if (!user) return;
    
    setLoading(true);
    
    const { error } = await supabase
      .from("profiles")
      .update({
        role: selectedRole,
        organization,
        bio,
        onboarding_completed: true,
      })
      .eq("user_id", user.id);

    if (!error) {
      navigate("/dashboard");
    }
    
    setLoading(false);
  };

  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ocean/15 rounded-full blur-3xl animate-float-delayed" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forest to-ocean flex items-center justify-center">
              <Leaf className="w-6 h-6 text-background" />
            </div>
            <span className="font-serif text-2xl text-foreground">Atlas Sanctum</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i + 1 <= step ? "w-12 bg-primary" : "w-8 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl mb-2">What's Your Role?</h2>
                  <p className="text-muted-foreground">
                    Help us personalize your experience
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stakeholderTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedRole(type.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                        selectedRole === type.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-muted/30"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedRole === type.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <type.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{type.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                        {selectedRole === type.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl mb-2">Tell Us About You</h2>
                  <p className="text-muted-foreground">
                    This helps us connect you with relevant opportunities
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization (Optional)</Label>
                    <Input
                      id="organization"
                      placeholder="Your organization or company"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="h-12 bg-muted/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your regenerative work or interests..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[120px] bg-muted/50"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-forest to-ocean flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-background" />
                </div>

                <h2 className="font-serif text-3xl mb-2">You're All Set!</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Welcome to Atlas Sanctum. You're now part of a global community 
                  building regenerative infrastructure for the future.
                </p>

                <div className="pt-4">
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={handleComplete}
                    disabled={loading}
                  >
                    {loading ? "Setting up..." : "Enter Dashboard"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step < 3 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className={step === 1 ? "opacity-0" : ""}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                variant="hero"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !selectedRole}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
