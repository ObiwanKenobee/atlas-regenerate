import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Leaf, MapPin, TrendingUp, DollarSign, Users, Droplets, TreePine, BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";

interface LandAsset {
  id: string;
  asset_name: string;
  asset_type: string;
  area_hectares: number;
  location: string;
  soil_health_score: number;
  biodiversity_index: number;
  carbon_stock: number;
}

const PractitionerDashboard = () => {
  const { user } = useAuth();
  // Mock data since land_assets and organization_members tables don't exist
  const landAssets: LandAsset[] = [
    { id: '1', asset_name: 'Green Valley Farm', asset_type: 'farmland', area_hectares: 125.5, location: 'Oregon, USA', soil_health_score: 7.8, biodiversity_index: 8.2, carbon_stock: 450 },
    { id: '2', asset_name: 'Riverside Forest', asset_type: 'forest', area_hectares: 85.2, location: 'Washington, USA', soil_health_score: 8.5, biodiversity_index: 9.1, carbon_stock: 680 },
    { id: '3', asset_name: 'Coastal Wetland Reserve', asset_type: 'wetland', area_hectares: 42.8, location: 'California, USA', soil_health_score: 7.2, biodiversity_index: 8.8, carbon_stock: 320 }
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [user]);

  // Mock data for visualization
  const soilHealthData = [
    { month: "Jan", health: 6.2, organic_matter: 3.1, ph: 6.8 },
    { month: "Feb", health: 6.4, organic_matter: 3.2, ph: 6.9 },
    { month: "Mar", health: 6.7, organic_matter: 3.4, ph: 7.0 },
    { month: "Apr", health: 7.1, organic_matter: 3.6, ph: 7.1 },
    { month: "May", health: 7.4, organic_matter: 3.8, ph: 7.2 },
    { month: "Jun", health: 7.8, organic_matter: 4.0, ph: 7.3 }
  ];

  const carbonData = [
    { name: "Sequestered", value: 450, color: "#2d9b6e" },
    { name: "Credits Sold", value: 320, color: "#3b8fa3" },
    { name: "Available", value: 130, color: "#b8860b" }
  ];

  const revenueStreams = [
    { source: "Carbon Credits", amount: 28500, growth: 15 },
    { source: "Crop Sales", amount: 85000, growth: 8 },
    { source: "Biodiversity Credits", amount: 12000, growth: 25 },
    { source: "Soil Health Premiums", amount: 6500, growth: 12 }
  ];

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "farmland": return Leaf;
      case "forest": return TreePine;
      case "wetland": return Droplets;
      default: return MapPin;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalArea = landAssets.reduce((sum, asset) => sum + asset.area_hectares, 0);
  const avgSoilHealth = landAssets.reduce((sum, asset) => sum + asset.soil_health_score, 0) / landAssets.length || 0;
  const totalCarbon = landAssets.reduce((sum, asset) => sum + asset.carbon_stock, 0);

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Regenerative Practitioner Dashboard</h1>
          <p className="text-muted-foreground">
            Track your land health, carbon impact, and regenerative revenue streams
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalArea.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Hectares Managed</p>
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
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{avgSoilHealth.toFixed(1)}/10</p>
                    <p className="text-sm text-muted-foreground">Avg Soil Health</p>
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
                    <TreePine className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalCarbon.toFixed(0)}</p>
                    <p className="text-sm text-muted-foreground">Tons CO₂ Stored</p>
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
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$132K</p>
                    <p className="text-sm text-muted-foreground">Annual Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="land-health" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="land-health">Land Health</TabsTrigger>
            <TabsTrigger value="carbon">Carbon Impact</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Streams</TabsTrigger>
            <TabsTrigger value="assets">Asset Portfolio</TabsTrigger>
          </TabsList>

          {/* Land Health Tab */}
          <TabsContent value="land-health" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Soil Health Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={soilHealthData}>
                      <defs>
                        <linearGradient id="health" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2d9b6e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2d9b6e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                      <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                      <YAxis stroke="hsl(45 10% 55%)" />
                      <Tooltip />
                      <Area type="monotone" dataKey="health" stroke="#2d9b6e" fill="url(#health)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Biodiversity Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">8.4/10</div>
                      <div className="text-sm text-muted-foreground">Overall Biodiversity Score</div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Native Species</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Pollinator Habitat</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Water Quality</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Carbon Impact Tab */}
          <TabsContent value="carbon" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Carbon Credit Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={carbonData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {carbonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} tons`, 'CO₂']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {carbonData.map((item) => (
                      <div key={item.name} className="text-center">
                        <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
                        <div className="text-sm font-medium">{item.value}</div>
                        <div className="text-xs text-muted-foreground">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Impact Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div>
                        <div className="font-medium">Soil Carbon Increase</div>
                        <div className="text-sm text-muted-foreground">+2.3 tons/hectare/year</div>
                      </div>
                      <Badge variant="default">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div>
                        <div className="font-medium">Biodiversity Improvement</div>
                        <div className="text-sm text-muted-foreground">+15% species diversity</div>
                      </div>
                      <Badge variant="default">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div>
                        <div className="font-medium">Water Quality Enhancement</div>
                        <div className="text-sm text-muted-foreground">-40% nutrient runoff</div>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Streams Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {revenueStreams.map((stream, index) => (
                <motion.div
                  key={stream.source}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{stream.source}</h3>
                        <Badge variant="outline" className="text-green-600">
                          +{stream.growth}%
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-2">
                        ${stream.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Annual revenue from {stream.source.toLowerCase()}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Revenue Growth Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { year: "2024", revenue: 132000 },
                    { year: "2025", revenue: 158000 },
                    { year: "2026", revenue: 189000 },
                    { year: "2027", revenue: 225000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                    <XAxis dataKey="year" stroke="hsl(45 10% 55%)" />
                    <YAxis stroke="hsl(45 10% 55%)" />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#2d9b6e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Asset Portfolio Tab */}
          <TabsContent value="assets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landAssets.map((asset) => {
                const Icon = getAssetIcon(asset.asset_type);
                return (
                  <Card key={asset.id} className="glass">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{asset.asset_name}</CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {asset.asset_type}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Area:</span>
                          <span className="font-medium">{asset.area_hectares} ha</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Soil Health:</span>
                          <span className="font-medium">{asset.soil_health_score}/10</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Carbon Stock:</span>
                          <span className="font-medium">{asset.carbon_stock} tons</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Biodiversity:</span>
                          <span className="font-medium">{asset.biodiversity_index}/10</span>
                        </div>
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PractitionerDashboard;