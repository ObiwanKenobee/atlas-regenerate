import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useSubscriptionTiers, useUserSubscription } from "@/hooks/useProjects";
import { supabase } from "@/integrations/supabase/client";
import { Check, Crown, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const SubscriptionPlans = () => {
  const { user } = useAuth();
  const { tiers, loading: tiersLoading } = useSubscriptionTiers();
  const { subscription, loading: subLoading } = useUserSubscription();
  const [upgrading, setUpgrading] = useState(false);

  const handleSubscribe = async (tierId: string, tierName: string) => {
    if (!user) {
      toast.error("Please sign in to subscribe");
      return;
    }

    setUpgrading(true);
    try {
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const { error } = await supabase
        .from("user_subscriptions")
        .upsert({
          user_id: user.id,
          tier_id: tierId,
          start_date: startDate,
          end_date: endDate,
          is_active: true,
          payment_status: "active",
        }, {
          onConflict: "user_id",
        });

      if (error) throw error;

      toast.success(`Successfully subscribed to ${tierName}!`);
      window.location.reload();
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setUpgrading(false);
    }
  };

  const getTierIcon = (tierName: string) => {
    switch (tierName.toLowerCase()) {
      case "basic": return Zap;
      case "pro": return Star;
      case "enterprise": return Crown;
      default: return Zap;
    }
  };

  const getTierColor = (tierName: string) => {
    switch (tierName.toLowerCase()) {
      case "basic": return "text-muted-foreground";
      case "pro": return "text-primary";
      case "enterprise": return "text-gold";
      default: return "text-muted-foreground";
    }
  };

  if (tiersLoading || subLoading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentTier = subscription?.tier_id 
    ? tiers.find(t => t.id === subscription.tier_id) 
    : null;

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl mb-4">Choose Your Impact Level</h1>
          <p className="text-muted-foreground text-lg">
            Scale your regenerative impact with the right tools and features
          </p>
          {currentTier && (
            <Badge variant="outline" className="mt-4">
              Current Plan: {currentTier.tier_name}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => {
            const Icon = getTierIcon(tier.tier_name);
            const isCurrentPlan = subscription?.tier_id === tier.id;
            const isPro = tier.tier_name.toLowerCase() === "pro";
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${isPro ? "scale-105" : ""}`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`glass h-full ${isPro ? "border-primary shadow-lg" : ""} ${isCurrentPlan ? "ring-2 ring-primary" : ""}`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-forest to-ocean flex items-center justify-center mb-4 ${getTierColor(tier.tier_name)}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-serif">{tier.tier_name}</CardTitle>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold">
                        ${tier.monthly_price}
                        <span className="text-lg font-normal text-muted-foreground">/month</span>
                      </div>
                      {tier.annual_price > 0 && (
                        <div className="text-sm text-muted-foreground">
                          or ${tier.annual_price}/year (save ${(tier.monthly_price * 12 - tier.annual_price).toFixed(0)})
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {(tier.features || []).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm capitalize">{feature.replace(/_/g, " ")}</span>
                        </div>
                      ))}
                      
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">
                          {tier.max_projects === -1 || tier.max_projects === null ? "Unlimited projects" : `Up to ${tier.max_projects} projects`}
                        </span>
                      </div>
                      
                      {tier.analytics_access && (
                        <div className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">Advanced analytics</span>
                        </div>
                      )}
                      
                      {tier.priority_support && (
                        <div className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">Priority support</span>
                        </div>
                      )}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          variant={isPro ? "hero" : isCurrentPlan ? "outline" : "default"}
                          disabled={isCurrentPlan}
                        >
                          {isCurrentPlan ? "Current Plan" : `Choose ${tier.tier_name}`}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Subscription</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p>
                            You are about to subscribe to the <strong>{tier.tier_name}</strong> plan
                            for <strong>${tier.monthly_price}/month</strong>.
                          </p>
                          <div className="bg-muted/20 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">What you'll get:</h4>
                            <ul className="space-y-1 text-sm">
                              {(tier.features || []).map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-primary" />
                                  <span className="capitalize">{feature.replace(/_/g, " ")}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Button
                            onClick={() => handleSubscribe(tier.id, tier.tier_name)}
                            disabled={upgrading}
                            className="w-full"
                            variant="hero"
                          >
                            {upgrading ? "Processing..." : "Confirm Subscription"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center">
          <h2 className="font-serif text-3xl mb-8">Why Choose Atlas Sanctum?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl">Verified Impact</h3>
              <p className="text-muted-foreground">
                All projects undergo rigorous verification to ensure real, measurable regenerative impact.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl">Circular Returns</h3>
              <p className="text-muted-foreground">
                Generate sustainable returns while contributing to ecosystem regeneration and carbon sequestration.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Crown className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl">Global Network</h3>
              <p className="text-muted-foreground">
                Connect with a worldwide community of regenerative practitioners and impact investors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
