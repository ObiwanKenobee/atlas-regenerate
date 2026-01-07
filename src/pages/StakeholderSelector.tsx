import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, TrendingUp, Users, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stakeholderTypes = [
  {
    id: "practitioner",
    title: "Regenerative Practitioners",
    description: "Farmers, land stewards, and community leaders seeking fair value for real-world impact and measurable restoration.",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-50",
    features: ["Land Health Tracking", "Carbon Credit Management", "Revenue Stream Analytics", "Biodiversity Monitoring"],
    route: "/practitioner",
    metrics: ["1,250+ Hectares Managed", "450 Tons CO₂ Sequestered", "$132K Annual Revenue"]
  },
  {
    id: "investor",
    title: "Investors & Institutions",
    description: "Forward-thinking capital seeking credible, large-scale impact opportunities with transparent, auditable returns.",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    features: ["Portfolio Performance", "Risk Analysis", "Impact Metrics", "Deal Flow Management"],
    route: "/investor",
    metrics: ["$25M Assets Under Management", "28.5% Portfolio Returns", "9.2/10 Impact Score"]
  },
  {
    id: "government",
    title: "Governments & NGOs",
    description: "Organizations needing transparent, data-driven tools for sustainability initiatives and development programs.",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    features: ["Program Tracking", "Policy Impact Analysis", "SDG Progress Monitoring", "Beneficiary Metrics"],
    route: "/government",
    metrics: ["203K Beneficiaries Reached", "13 Active Programs", "83% SDG Progress"]
  },
  {
    id: "builder",
    title: "Builders & Researchers",
    description: "Scientists, developers, and innovators contributing to ethical AI, climate tech, and regenerative science.",
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    features: ["Research Pipeline", "Innovation Metrics", "Collaboration Network", "Impact Scaling"],
    route: "/builder",
    metrics: ["23 Active Projects", "28 Publications", "5 Patents Filed"]
  }
];

const StakeholderSelector = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (stakeholder: typeof stakeholderTypes[0]) => {
    setSelectedType(stakeholder.id);
    setTimeout(() => {
      navigate(stakeholder.route);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl mb-4">Choose Your Dashboard</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your stakeholder type to access your dedicated enterprise dashboard with tailored features and metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stakeholderTypes.map((stakeholder, index) => {
            const Icon = stakeholder.icon;
            const isSelected = selectedType === stakeholder.id;
            
            return (
              <motion.div
                key={stakeholder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`transform transition-all duration-300 ${isSelected ? "scale-105" : "hover:scale-102"}`}
              >
                <Card 
                  className={`glass cursor-pointer h-full ${isSelected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-lg"}`}
                  onClick={() => handleSelect(stakeholder)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-full ${stakeholder.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 ${stakeholder.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-serif mb-2">{stakeholder.title}</CardTitle>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {stakeholder.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Key Metrics */}
                    <div>
                      <h4 className="font-medium mb-3 text-sm">Key Metrics</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {stakeholder.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-sm text-muted-foreground">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-medium mb-3 text-sm">Dashboard Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {stakeholder.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <Button 
                        className="w-full group" 
                        variant={isSelected ? "hero" : "default"}
                        disabled={isSelected}
                      >
                        {isSelected ? (
                          "Loading Dashboard..."
                        ) : (
                          <>
                            Access Dashboard
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl mb-4">Enterprise-Grade Analytics</h2>
            <p className="text-muted-foreground mb-6">
              Each dashboard is specifically designed for your stakeholder type, providing relevant metrics, 
              tools, and insights to maximize your regenerative impact and returns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">Real-Time</div>
                <div className="text-sm text-muted-foreground">Data Updates</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">Verified</div>
                <div className="text-sm text-muted-foreground">Impact Metrics</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">Secure</div>
                <div className="text-sm text-muted-foreground">Enterprise Platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderSelector;