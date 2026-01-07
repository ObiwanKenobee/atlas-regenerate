import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Zap, BookOpen, Users, Award, TrendingUp, GitBranch, Lightbulb, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, LineChart, Line } from "recharts";
import { motion } from "framer-motion";

interface ResearchProject {
  id: string;
  project_name: string;
  research_area: string;
  funding_status: string;
  publication_count: number;
  patent_count: number;
  open_source: boolean;
}

const BuilderDashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuilderData();
  }, [user]);

  const fetchBuilderData = async () => {
    try {
      const { data: memberData } = await supabase
        .from("organization_members")
        .select(`
          organization_id,
          organizations!inner(*)
        `)
        .eq("user_id", user?.id)
        .eq("organizations.stakeholder_type", "builder")
        .single();

      if (memberData) {
        const { data: projectData } = await supabase
          .from("research_projects")
          .select("*")
          .eq("organization_id", memberData.organization_id);
        
        setProjects(projectData || []);
      }
    } catch (error) {
      console.error("Error fetching builder data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for visualization
  const researchPipeline = [
    { stage: "Ideation", projects: 15, funding: 250000 },
    { stage: "Proof of Concept", projects: 8, funding: 1200000 },
    { stage: "Development", projects: 5, funding: 3500000 },
    { stage: "Testing", projects: 3, funding: 2800000 },
    { stage: "Deployment", projects: 2, funding: 5200000 }
  ];

  const innovationMetrics = [
    { month: "Jan", publications: 12, patents: 2, citations: 145, collaborations: 8 },
    { month: "Feb", publications: 15, patents: 3, citations: 168, collaborations: 10 },
    { month: "Mar", publications: 18, patents: 2, citations: 192, collaborations: 12 },
    { month: "Apr", publications: 22, patents: 4, citations: 218, collaborations: 14 },
    { month: "May", publications: 25, patents: 3, citations: 245, collaborations: 16 },
    { month: "Jun", publications: 28, patents: 5, citations: 278, collaborations: 18 }
  ];

  const researchAreas = [
    { area: "Climate AI", projects: 8, impact_score: 9.2, funding: 4200000, publications: 24 },
    { area: "Regenerative Science", projects: 6, impact_score: 8.8, funding: 3100000, publications: 18 },
    { area: "Carbon Tech", projects: 5, impact_score: 8.5, funding: 2800000, publications: 15 },
    { area: "Biodiversity Tech", projects: 4, impact_score: 8.1, funding: 1900000, publications: 12 }
  ];

  const collaborationNetwork = [
    { institution: "MIT Climate Lab", projects: 5, publications: 12, impact: 9.1 },
    { institution: "Stanford Woods Institute", projects: 4, publications: 8, impact: 8.7 },
    { institution: "Oxford Climate Institute", projects: 3, publications: 6, impact: 8.9 },
    { institution: "ETH Zurich Sustainability", projects: 6, publications: 14, impact: 9.0 },
    { institution: "UC Berkeley Energy Lab", projects: 2, publications: 4, impact: 8.3 }
  ];

  const impactScaling = [
    { technology: "Carbon Capture AI", readiness: 8, market_size: 15000, adoption_rate: 25 },
    { technology: "Soil Health Sensors", readiness: 9, market_size: 8000, adoption_rate: 45 },
    { technology: "Biodiversity Monitoring", readiness: 7, market_size: 5000, adoption_rate: 15 },
    { technology: "Climate Prediction Models", readiness: 9, market_size: 12000, adoption_rate: 35 }
  ];

  const getAreaIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case "ai": return Zap;
      case "climate_tech": return Globe;
      case "regenerative_science": return Lightbulb;
      default: return BookOpen;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalProjects = projects.length;
  const totalPublications = projects.reduce((sum, p) => sum + p.publication_count, 0);
  const totalPatents = projects.reduce((sum, p) => sum + p.patent_count, 0);
  const openSourceProjects = projects.filter(p => p.open_source).length;

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Builders & Researchers Dashboard</h1>
          <p className="text-muted-foreground">
            Track research pipeline, innovation metrics, and collaborative impact
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalProjects}</p>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
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
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalPublications}</p>
                    <p className="text-sm text-muted-foreground">Publications</p>
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
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalPatents}</p>
                    <p className="text-sm text-muted-foreground">Patents Filed</p>
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
                    <GitBranch className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{openSourceProjects}</p>
                    <p className="text-sm text-muted-foreground">Open Source</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="pipeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pipeline">Research Pipeline</TabsTrigger>
            <TabsTrigger value="innovation">Innovation Metrics</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="impact">Impact Scaling</TabsTrigger>
          </TabsList>

          {/* Research Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Research & Development Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={researchPipeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                    <XAxis dataKey="stage" stroke="hsl(45 10% 55%)" />
                    <YAxis yAxisId="left" stroke="hsl(45 10% 55%)" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(45 10% 55%)" />
                    <Tooltip formatter={(value, name) => [
                      name === 'funding' ? `$${(Number(value) / 1000000).toFixed(1)}M` : value,
                      name === 'funding' ? 'Funding' : 'Projects'
                    ]} />
                    <Bar yAxisId="left" dataKey="projects" fill="#2d9b6e" name="Projects" />
                    <Bar yAxisId="right" dataKey="funding" fill="#3b8fa3" name="Funding" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={area.area}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{area.area}</h3>
                          <Badge variant="outline">{area.projects} projects</Badge>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Impact Score:</span>
                          <span className="font-medium">{area.impact_score}/10</span>
                        </div>
                        <Progress value={area.impact_score * 10} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>Funding:</span>
                          <span className="font-medium">${(area.funding / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Publications:</span>
                          <span className="font-medium">{area.publications}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Innovation Metrics Tab */}
          <TabsContent value="innovation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Publication & Patent Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={innovationMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                      <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                      <YAxis stroke="hsl(45 10% 55%)" />
                      <Tooltip />
                      <Line type="monotone" dataKey="publications" stroke="#2d9b6e" strokeWidth={3} name="Publications" />
                      <Line type="monotone" dataKey="patents" stroke="#3b8fa3" strokeWidth={3} name="Patents" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Citation Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={innovationMetrics}>
                      <defs>
                        <linearGradient id="citations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#b8860b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#b8860b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                      <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                      <YAxis stroke="hsl(45 10% 55%)" />
                      <Tooltip />
                      <Area type="monotone" dataKey="citations" stroke="#b8860b" fill="url(#citations)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">278</div>
                  <div className="text-sm text-muted-foreground">Total Citations</div>
                  <Badge variant="default" className="mt-2">High Impact</Badge>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4.2</div>
                  <div className="text-sm text-muted-foreground">H-Index</div>
                  <Badge variant="outline" className="mt-2">Growing</Badge>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">85%</div>
                  <div className="text-sm text-muted-foreground">Open Access</div>
                  <Badge variant="default" className="mt-2">Excellent</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Collaboration Tab */}
          <TabsContent value="collaboration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collaborationNetwork.map((collab, index) => (
                <motion.div
                  key={collab.institution}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        {collab.institution}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Joint Projects:</span>
                          <span className="font-medium">{collab.projects}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Co-Publications:</span>
                          <span className="font-medium">{collab.publications}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Impact Score:</span>
                            <span className="font-medium">{collab.impact}/10</span>
                          </div>
                          <Progress value={collab.impact * 10} className="h-2" />
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          View Collaboration
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Collaboration Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={innovationMetrics}>
                    <defs>
                      <linearGradient id="collaborations" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2d9b6e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2d9b6e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                    <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                    <YAxis stroke="hsl(45 10% 55%)" />
                    <Tooltip />
                    <Area type="monotone" dataKey="collaborations" stroke="#2d9b6e" fill="url(#collaborations)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Scaling Tab */}
          <TabsContent value="impact" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Technology Readiness vs Market Adoption</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart data={impactScaling}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                    <XAxis dataKey="readiness" stroke="hsl(45 10% 55%)" name="Technology Readiness" />
                    <YAxis dataKey="adoption_rate" stroke="hsl(45 10% 55%)" name="Adoption Rate %" />
                    <Tooltip formatter={(value, name, props) => [
                      name === 'market_size' ? `$${value}M` : `${value}${name === 'adoption_rate' ? '%' : ''}`,
                      name === 'market_size' ? 'Market Size' : name === 'adoption_rate' ? 'Adoption Rate' : 'Readiness Level'
                    ]} />
                    <Scatter dataKey="adoption_rate" fill="#2d9b6e" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {impactScaling.map((tech, index) => (
                <motion.div
                  key={tech.technology}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{tech.technology}</h3>
                        <Badge variant={tech.readiness >= 8 ? "default" : "outline"}>
                          TRL {tech.readiness}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Market Size:</span>
                          <span className="font-medium">${tech.market_size}M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Adoption Rate:</span>
                          <span className="font-medium">{tech.adoption_rate}%</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Readiness:</span>
                            <span>{tech.readiness}/10</span>
                          </div>
                          <Progress value={tech.readiness * 10} className="h-2" />
                        </div>
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

export default BuilderDashboard;