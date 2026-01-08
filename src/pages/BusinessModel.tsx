import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Recycle, Leaf, Target, Zap } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

// Mock data for revenue streams
const mockRevenueStreams = [
  { id: '1', stream_name: 'Transaction Fees', stream_type: 'transaction_fee', revenue_model: 'percentage', rate: 2.5, description: 'Fee on all value exchanges', is_active: true },
  { id: '2', stream_name: 'Premium Subscriptions', stream_type: 'subscription', revenue_model: 'flat_rate', rate: 99, description: 'Monthly access to advanced features', is_active: true },
  { id: '3', stream_name: 'Carbon Credit Sales', stream_type: 'carbon_credits', revenue_model: 'percentage', rate: 5, description: 'Commission on carbon credit trades', is_active: true },
  { id: '4', stream_name: 'Impact Bonds', stream_type: 'impact_bonds', revenue_model: 'percentage', rate: 1.5, description: 'Fee on impact bond issuance', is_active: true },
];

const BusinessModel = () => {
  const [revenueStreams] = useState(mockRevenueStreams);

  const revenueData = [
    { name: "Transaction Fees", value: 45, amount: 125000 },
    { name: "Subscriptions", value: 25, amount: 75000 },
    { name: "Carbon Credits", value: 20, amount: 60000 },
    { name: "Impact Bonds", value: 10, amount: 30000 }
  ];

  const circularityData = [
    { month: "Jan", efficiency: 65, regeneration: 70, waste_reduction: 60 },
    { month: "Feb", efficiency: 68, regeneration: 72, waste_reduction: 65 },
    { month: "Mar", efficiency: 72, regeneration: 75, waste_reduction: 70 },
    { month: "Apr", efficiency: 75, regeneration: 78, waste_reduction: 73 },
    { month: "May", efficiency: 78, regeneration: 80, waste_reduction: 76 },
    { month: "Jun", efficiency: 82, regeneration: 85, waste_reduction: 80 }
  ];

  const sustainabilityMetrics = [
    { name: "Carbon Negative", value: 95, color: "hsl(var(--primary))" },
    { name: "Waste Circular", value: 88, color: "hsl(var(--accent))" },
    { name: "Resource Efficient", value: 92, color: "hsl(var(--secondary))" },
    { name: "Social Impact", value: 85, color: "hsl(var(--muted))" }
  ];

  const getStreamIcon = (type: string) => {
    switch (type) {
      case "transaction_fee": return DollarSign;
      case "subscription": return TrendingUp;
      case "carbon_credits": return Leaf;
      case "impact_bonds": return Target;
      default: return Zap;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Circular Business Model</h1>
          <p className="text-muted-foreground">
            Sustainable revenue streams driving regenerative impact
          </p>
        </div>

        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue Streams</TabsTrigger>
            <TabsTrigger value="circular">Circular Economy</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {revenueStreams.map((stream) => {
                const Icon = getStreamIcon(stream.stream_type);
                return (
                  <Card key={stream.id} className="glass">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{stream.stream_name}</CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {stream.revenue_model}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary mb-2">
                        {stream.revenue_model === 'percentage' ? `${stream.rate}%` : `$${stream.rate}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stream.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Revenue Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={revenueData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 90 + 158}, 64%, 40%)`} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {revenueData.map((item, index) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: `hsl(${index * 90 + 158}, 64%, 40%)` }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Monthly Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={circularityData}>
                      <defs>
                        <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="efficiency"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#revenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="circular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Recycle className="w-5 h-5" />
                    Waste Reduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-primary">75%</div>
                    <Progress value={75} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Target: 50% reduction from baseline
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Resource Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-primary">82%</div>
                    <Progress value={82} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Circular resource utilization rate
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Regeneration Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-primary">85%</div>
                    <Progress value={85} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Ecosystem regeneration progress
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Circularity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={circularityData}>
                    <defs>
                      <linearGradient id="efficiency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="regeneration" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Area type="monotone" dataKey="efficiency" stackId="1" stroke="hsl(var(--primary))" fill="url(#efficiency)" />
                    <Area type="monotone" dataKey="regeneration" stackId="2" stroke="hsl(var(--accent))" fill="url(#regeneration)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sustainabilityMetrics.map((metric) => (
                <Card key={metric.name} className="glass">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="text-3xl font-bold text-primary">
                        {metric.value}%
                      </div>
                      <div className="text-sm font-medium">{metric.name}</div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Carbon Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">-2,150</div>
                      <div className="text-sm text-muted-foreground">Tons CO₂ Sequestered</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">1,250</div>
                        <div className="text-xs text-muted-foreground">Credits Generated</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">$31,250</div>
                        <div className="text-xs text-muted-foreground">Credit Value</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Impact Multiplier</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { name: "Direct", value: 100 },
                      { name: "Indirect", value: 250 },
                      { name: "Induced", value: 180 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">285%</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Return on regenerative investment
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Impact Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">9.2/10</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Verified impact rating
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Scalability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">High</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Growth potential assessment
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Business Model Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { metric: "Revenue Growth", value: 85 },
                    { metric: "Customer Retention", value: 92 },
                    { metric: "Market Penetration", value: 45 },
                    { metric: "Operational Efficiency", value: 78 }
                  ].map((item) => (
                    <div key={item.metric} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.metric}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessModel;
