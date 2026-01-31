import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Users, Target, Globe, BarChart3, TrendingUp, MapPin, Award } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { motion } from "framer-motion";

interface SustainabilityProgram {
  id: string;
  program_name: string;
  program_type: string;
  budget: number;
  target_beneficiaries: number;
  geographic_scope: string;
  sdg_alignment: number[];
}

const GovernmentDashboard = () => {
  const { user } = useAuth();
  // Mock data since sustainability_programs and organization_members tables don't exist
  const programs: SustainabilityProgram[] = [
    { id: '1', program_name: 'National Reforestation Initiative', program_type: 'environmental', budget: 15000000, target_beneficiaries: 250000, geographic_scope: 'national', sdg_alignment: [13, 15] },
    { id: '2', program_name: 'Clean Water Access Program', program_type: 'infrastructure', budget: 8500000, target_beneficiaries: 180000, geographic_scope: 'regional', sdg_alignment: [6, 3] },
    { id: '3', program_name: 'Sustainable Agriculture Support', program_type: 'agriculture', budget: 12000000, target_beneficiaries: 95000, geographic_scope: 'national', sdg_alignment: [2, 12, 13] }
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [user]);

  // Mock data for visualization
  const sdgProgress = [
    { goal: "SDG 1", name: "No Poverty", progress: 78, target: 85 },
    { goal: "SDG 2", name: "Zero Hunger", progress: 65, target: 80 },
    { goal: "SDG 6", name: "Clean Water", progress: 82, target: 90 },
    { goal: "SDG 7", name: "Clean Energy", progress: 71, target: 85 },
    { goal: "SDG 13", name: "Climate Action", progress: 88, target: 95 },
    { goal: "SDG 15", name: "Life on Land", progress: 74, target: 85 }
  ];

  const policyImpact = [
    { month: "Jan", beneficiaries: 125000, budget_utilized: 2.1, programs_active: 8 },
    { month: "Feb", beneficiaries: 138000, budget_utilized: 2.4, programs_active: 9 },
    { month: "Mar", beneficiaries: 152000, budget_utilized: 2.8, programs_active: 10 },
    { month: "Apr", beneficiaries: 167000, budget_utilized: 3.2, programs_active: 11 },
    { month: "May", beneficiaries: 185000, budget_utilized: 3.7, programs_active: 12 },
    { month: "Jun", beneficiaries: 203000, budget_utilized: 4.1, programs_active: 13 }
  ];

  const programTypes = [
    { type: "Policy Implementation", count: 8, budget: 15200000, effectiveness: 85 },
    { type: "Community Development", count: 12, budget: 8900000, effectiveness: 78 },
    { type: "Environmental Monitoring", count: 6, budget: 5400000, effectiveness: 92 },
    { type: "Research & Innovation", count: 4, budget: 3200000, effectiveness: 88 }
  ];

  const regionalImpact = [
    { region: "Northern Region", population: 2500000, programs: 8, impact_score: 8.2 },
    { region: "Central Region", population: 3200000, programs: 12, impact_score: 7.8 },
    { region: "Southern Region", population: 1800000, programs: 6, impact_score: 8.5 },
    { region: "Coastal Region", population: 2100000, programs: 9, impact_score: 8.0 }
  ];

  const radarData = [
    { subject: "Poverty Reduction", A: 78, fullMark: 100 },
    { subject: "Food Security", A: 65, fullMark: 100 },
    { subject: "Clean Water", A: 82, fullMark: 100 },
    { subject: "Clean Energy", A: 71, fullMark: 100 },
    { subject: "Climate Action", A: 88, fullMark: 100 },
    { subject: "Biodiversity", A: 74, fullMark: 100 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalBudget = programs.reduce((sum, p) => sum + p.budget, 0);
  const totalBeneficiaries = programs.reduce((sum, p) => sum + p.target_beneficiaries, 0);
  const activePrograms = programs.length;

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Government & NGO Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor sustainability programs, policy impact, and SDG progress
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activePrograms}</p>
                    <p className="text-sm text-muted-foreground">Active Programs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{(totalBeneficiaries / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">Beneficiaries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${(totalBudget / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">83%</p>
                    <p className="text-sm text-muted-foreground">SDG Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="programs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="sdg">SDG Progress</TabsTrigger>
            <TabsTrigger value="impact">Policy Impact</TabsTrigger>
            <TabsTrigger value="regional">Regional Data</TabsTrigger>
          </TabsList>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programTypes.map((program, index) => (
                <motion.div
                  key={program.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{program.type}</h3>
                        <Badge variant="outline">
                          {program.effectiveness}% Effective
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Programs:</span>
                          <span className="font-medium">{program.count}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Budget:</span>
                          <span className="font-medium">${(program.budget / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Effectiveness:</span>
                            <span>{program.effectiveness}%</span>
                          </div>
                          <Progress value={program.effectiveness} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Program Impact Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={policyImpact}>
                    <defs>
                      <linearGradient id="beneficiaries" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2d9b6e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2d9b6e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                    <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                    <YAxis stroke="hsl(45 10% 55%)" />
                    <Tooltip formatter={(value, name) => [
                      name === 'beneficiaries' ? `${Number(value).toLocaleString()}` : value,
                      name === 'beneficiaries' ? 'Beneficiaries' : name
                    ]} />
                    <Area type="monotone" dataKey="beneficiaries" stroke="#2d9b6e" fill="url(#beneficiaries)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SDG Progress Tab */}
          <TabsContent value="sdg" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>SDG Achievement Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sdgProgress.map((sdg) => (
                      <div key={sdg.goal} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{sdg.goal}: {sdg.name}</span>
                          <span>{sdg.progress}% / {sdg.target}%</span>
                        </div>
                        <Progress value={sdg.progress} className="h-3" />
                        <div className="text-xs text-muted-foreground">
                          Target: {sdg.target}% by 2030
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>SDG Performance Radar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(160 20% 15%)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "hsl(45 10% 55%)" }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(45 10% 55%)" }} />
                      <Radar name="Progress" dataKey="A" stroke="#2d9b6e" fill="#2d9b6e" fillOpacity={0.3} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">6/17</div>
                  <div className="text-sm text-muted-foreground">SDGs On Track</div>
                  <Badge variant="default" className="mt-2">Good Progress</Badge>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">76%</div>
                  <div className="text-sm text-muted-foreground">Avg Progress</div>
                  <Badge variant="outline" className="mt-2">Above Target</Badge>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2030</div>
                  <div className="text-sm text-muted-foreground">Target Year</div>
                  <Badge variant="secondary" className="mt-2">7 Years Left</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Policy Impact Tab */}
          <TabsContent value="impact" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Budget Utilization vs Beneficiary Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={policyImpact}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                    <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                    <YAxis yAxisId="left" stroke="hsl(45 10% 55%)" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(45 10% 55%)" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="budget_utilized" fill="#3b8fa3" name="Budget (M$)" />
                    <Bar yAxisId="right" dataKey="programs_active" fill="#2d9b6e" name="Active Programs" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Policy Effectiveness Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "Implementation Rate", value: 87, target: 90 },
                      { metric: "Stakeholder Satisfaction", value: 82, target: 85 },
                      { metric: "Cost Efficiency", value: 91, target: 80 },
                      { metric: "Timeline Adherence", value: 78, target: 85 }
                    ].map((item) => (
                      <div key={item.metric} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.metric}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Target: {item.target}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Impact Multipliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/20">
                      <div className="text-2xl font-bold text-primary">3.2x</div>
                      <div className="text-sm text-muted-foreground">Economic Multiplier</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Every $1 invested generates $3.20 in economic activity
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/20">
                      <div className="text-2xl font-bold text-primary">2.8x</div>
                      <div className="text-sm text-muted-foreground">Social Impact Multiplier</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Each direct beneficiary influences 2.8 additional people
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/20">
                      <div className="text-2xl font-bold text-primary">4.1x</div>
                      <div className="text-sm text-muted-foreground">Environmental Multiplier</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Direct environmental benefits create 4.1x indirect benefits
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Regional Data Tab */}
          <TabsContent value="regional" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regionalImpact.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {region.region}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Population:</span>
                          <span className="font-medium">{(region.population / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Active Programs:</span>
                          <span className="font-medium">{region.programs}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Impact Score:</span>
                            <span className="font-medium">{region.impact_score}/10</span>
                          </div>
                          <Progress value={region.impact_score * 10} className="h-2" />
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          View Regional Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentDashboard;