import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Leaf, TrendingUp, Shield, Zap, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Practitioner",
      description: "For regenerative farmers and land stewards",
      monthlyPrice: 49,
      annualPrice: 470,
      icon: Leaf,
      features: [
        "Land health monitoring dashboard",
        "Carbon sequestration tracking",
        "Biodiversity index measurement",
        "Basic impact verification",
        "Revenue tracking tools",
        "Community forum access",
        "Email support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      description: "For growing regenerative operations",
      monthlyPrice: 149,
      annualPrice: 1430,
      icon: TrendingUp,
      features: [
        "Everything in Practitioner",
        "Advanced AI-powered analytics",
        "Multi-site management",
        "Carbon credit marketplace access",
        "Investor-ready reports",
        "API access",
        "Priority support",
        "Custom integrations",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For institutional investors & governments",
      monthlyPrice: 499,
      annualPrice: 4790,
      icon: Shield,
      features: [
        "Everything in Professional",
        "Portfolio-wide impact tracking",
        "Due diligence automation",
        "Regulatory compliance reports",
        "White-label options",
        "Dedicated account manager",
        "SLA guarantees",
        "Custom AI models",
        "On-premise deployment options",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const features = [
    { icon: Zap, title: "Real-Time Monitoring", description: "AI-powered sensors and satellite data for continuous impact measurement" },
    { icon: Shield, title: "Verified Impact", description: "Third-party audited carbon and biodiversity credits you can trust" },
    { icon: Users, title: "Community Driven", description: "Connect with a global network of regenerative practitioners" },
    { icon: Globe, title: "Global Scale", description: "Track and verify impact across any geography or ecosystem type" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm">
              Transparent Pricing
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Invest in <span className="text-gradient-primary">Regeneration</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Choose the plan that matches your regenerative journey. All plans include a 14-day free trial.
            </p>
            
            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!annual ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
              <Switch checked={annual} onCheckedChange={setAnnual} />
              <span className={`text-sm ${annual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </span>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = annual ? plan.annualPrice : plan.monthlyPrice;
              const period = annual ? "/year" : "/month";
              
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : 'glass'}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="pt-4">
                        <span className="text-4xl font-bold">${price}</span>
                        <span className="text-muted-foreground">{period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                        variant={plan.popular ? 'default' : 'outline'}
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Why Choose Atlas Sanctum?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is built on cutting-edge technology and deep expertise in regenerative systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="glass h-full text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ or CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center glass rounded-2xl p-8 md:p-12"
          >
            <h2 className="font-serif text-2xl md:text-3xl mb-4">Ready to Start Your Regenerative Journey?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of practitioners, investors, and organizations building a regenerative future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">Start Free Trial</Button>
              <Button size="lg" variant="outline" className="px-8">Talk to Sales</Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
