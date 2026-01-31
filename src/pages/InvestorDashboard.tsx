import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { TrendingUp, DollarSign, Target, BarChart3, PieChart, Shield, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from "recharts";
import { motion } from "framer-motion";

interface InvestmentPortfolio {
  id: string;
  portfolio_name: string;
  total_committed: number;
  total_deployed: number;
  target_sectors: string[];
  risk_profile: string;
  impact_thesis: string;
}

const InvestorDashboard = () => {
  const { user } = useAuth();
  // Mock data since investment_portfolios and organization_members tables don't exist
  const portfolios: InvestmentPortfolio[] = [
    { id: '1', portfolio_name: 'Regenerative Impact Fund', total_committed: 25000000, total_deployed: 18500000, target_sectors: ['agriculture', 'forestry'], risk_profile: 'moderate', impact_thesis: 'Investing in land-based carbon sequestration' },
    { id: '2', portfolio_name: 'Blue Economy Portfolio', total_committed: 12000000, total_deployed: 8200000, target_sectors: ['marine', 'aquaculture'], risk_profile: 'moderate-high', impact_thesis: 'Supporting ocean restoration and sustainable fishing' }
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [user]);

  // Mock data for visualization
  const portfolioPerformance = [
    { month: "Jan", returns: 8.2, benchmark: 6.5, impact_score: 7.8 },
    { month: "Feb", returns: 12.1, benchmark: 7.2, impact_score: 8.1 },
    { month: "Mar", returns: 15.3, benchmark: 8.1, impact_score: 8.4 },
    { month: "Apr", returns: 18.7, benchmark: 9.3, impact_score: 8.7 },
    { month: "May", returns: 22.4, benchmark: 10.8, impact_score: 9.0 },
    { month: "Jun", returns: 28.5, benchmark: 12.1, impact_score: 9.2 }
  ];

  const sectorAllocation = [
    { sector: "Regenerative Agriculture", allocation: 35, value: 8750000, projects: 12 },
    { sector: "Forest Restoration", allocation: 25, value: 6250000, projects: 8 },
    { sector: "Marine Conservation", allocation: 20, value: 5000000, projects: 6 },
    { sector: "Renewable Energy", allocation: 15, value: 3750000, projects: 5 },
    { sector: "Circular Economy", allocation: 5, value: 1250000, projects: 2 }
  ];

  const riskMetrics = [
    { metric: "Portfolio Beta", value: 0.85, benchmark: 1.0, status: "low" },
    { metric: "Sharpe Ratio", value: 2.34, benchmark: 1.5, status: "high" },
    { metric: "Max Drawdown", value: -8.2, benchmark: -15.0, status: "low" },
    { metric: "ESG Score", value: 9.2, benchmark: 7.5, status: "high" }
  ];

  const dealFlow = [
    { name: "Ocean Kelp Farms", sector: "Marine", stage: "Series A", amount: 2500000, impact_score: 9.1, risk: "Medium" },
    { name: "Soil Carbon Initiative", sector: "Agriculture", stage: "Seed", amount: 850000, impact_score: 8.8, risk: "Low" },
    { name: "Forest Tech Solutions", sector: "Forestry", stage: "Series B", amount: 5200000, impact_score: 8.5, risk: "Medium" },
    { name: "Circular Materials Co", sector: "Circular Economy", stage: "Growth", amount: 12000000, impact_score: 7.9, risk: "High" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalCommitted = portfolios.reduce((sum, p) => sum + p.total_committed, 0);
  const totalDeployed = portfolios.reduce((sum, p) => sum + p.total_deployed, 0);
  const deploymentRate = totalCommitted > 0 ? (totalDeployed / totalCommitted) * 100 : 0;

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Investor Dashboard</h1>
          <p className="text-muted-foreground">
            Track portfolio performance, impact metrics, and regenerative investment opportunities
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${(totalCommitted / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-muted-foreground">Total Committed</p>
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
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">28.5%</p>
                    <p className="text-sm text-muted-foreground">Portfolio Returns</p>
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
                    <p className="text-2xl font-bold">9.2/10</p>
                    <p className="text-sm text-muted-foreground">Impact Score</p>
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
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{deploymentRate.toFixed(0)}%</p>
                    <p className="text-sm text-muted-foreground">Capital Deployed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="deals">Deal Flow</TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Portfolio Performance vs Benchmark</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                      <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                      <YAxis stroke="hsl(45 10% 55%)" />
                      <Tooltip />
                      <Line type="monotone" dataKey="returns" stroke="#2d9b6e" strokeWidth={3} name="Portfolio" />
                      <Line type="monotone" dataKey="benchmark" stroke="#3b8fa3" strokeWidth={2} strokeDasharray="5 5" name="Benchmark" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Impact Score Progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={portfolioPerformance}>
                      <defs>
                        <linearGradient id="impact" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#b8860b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#b8860b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                      <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                      <YAxis stroke="hsl(45 10% 55%)" domain={[7, 10]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="impact_score" stroke="#b8860b" fill="url(#impact)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2.34</div>
                  <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                  <Badge variant="default" className="mt-2">Excellent</Badge>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">-8.2%</div>
                  <div className="text-sm text-muted-foreground">Max Drawdown</div>
                  <Badge variant="outline" className="mt-2">Low Risk</Badge>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">156%</div>
                  <div className="text-sm text-muted-foreground">Alpha Generation</div>
                  <Badge variant="default" className="mt-2">Outperforming</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Sector Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sectorAllocation.map((sector, index) => (
                      <div key={sector.sector} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{sector.sector}</span>
                          <span className="font-medium">{sector.allocation}%</span>
                        </div>
                        <Progress value={sector.allocation} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>${(sector.value / 1000000).toFixed(1)}M</span>
                          <span>{sector.projects} projects</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: "North America", allocation: 40, value: 10000000 },
                      { region: "Europe", allocation: 25, value: 6250000 },
                      { region: "Latin America", allocation: 20, value: 5000000 },
                      { region: "Asia-Pacific", allocation: 10, value: 2500000 },
                      { region: "Africa", allocation: 5, value: 1250000 }
                    ].map((region) => (
                      <div key={region.region} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{region.region}</span>
                          <span className="font-medium">{region.allocation}%</span>
                        </div>
                        <Progress value={region.allocation} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          ${(region.value / 1000000).toFixed(1)}M deployed
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskMetrics.map((metric, index) => (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{metric.metric}</h3>
                        <Badge variant={metric.status === "high" ? "default" : "outline"}>
                          {metric.status === "high" ? "Strong" : "Low Risk"}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Benchmark: {metric.benchmark}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Risk-Return Scatter</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={[
                    { risk: 8, return: 28, name: "Portfolio" },
                    { risk: 12, return: 15, name: "Market" },
                    { risk: 6, return: 22, name: "Regenerative Index" },
                    { risk: 15, return: 18, name: "Traditional ESG" }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                    <XAxis dataKey="risk" stroke="hsl(45 10% 55%)" name="Risk" />
                    <YAxis dataKey="return" stroke="hsl(45 10% 55%)" name="Return" />
                    <Tooltip />
                    <Scatter dataKey="return" fill="#2d9b6e" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deal Flow Tab */}
          <TabsContent value="deals" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {dealFlow.map((deal, index) => (
                <motion.div
                  key={deal.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-medium text-lg">{deal.name}</h3>
                            <Badge variant="outline">{deal.stage}</Badge>
                            <Badge variant={deal.risk === "Low" ? "default" : deal.risk === "Medium" ? "secondary" : "destructive"}>
                              {deal.risk} Risk
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>Sector: {deal.sector}</span>
                            <span>Amount: ${(deal.amount / 1000000).toFixed(1)}M</span>
                            <span>Impact Score: {deal.impact_score}/10</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Review</Button>
                          <Button variant="default" size="sm">Invest</Button>
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

export default InvestorDashboard;