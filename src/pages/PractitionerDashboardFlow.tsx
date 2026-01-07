import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Sprout, TrendingUp, DollarSign, Users, Target, 
  Calendar, Award, Bell, Plus, Eye, Edit, MapPin,
  Activity, BarChart3, Droplets, Bug, Leaf
} from 'lucide-react';

export default function PractitionerDashboardFlow() {
  // Key Metrics Data for Regenerative Practitioners
  const keyMetrics = {
    hectaresManaged: 1250,
    co2Sequestered: 450,
    annualRevenue: 132000,
    biodiversityIndex: 8.7
  };
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Regenerative Transition Farm',
      status: 'active',
      progress: 65,
      funding: { raised: 45000, goal: 75000 },
      metrics: { soilHealth: 78, carbonSequestered: 12.5, biodiversity: 85 },
      nextMilestone: 'Soil testing results',
      daysToMilestone: 5
    },
    {
      id: '2',
      name: 'Community Garden Network',
      status: 'planning',
      progress: 25,
      funding: { raised: 8000, goal: 25000 },
      metrics: { soilHealth: 45, carbonSequestered: 2.1, biodiversity: 60 },
      nextMilestone: 'Permit approval',
      daysToMilestone: 12
    }
  ]);

  const [notifications] = useState([
    { id: '1', type: 'funding', message: 'New investor interested in your project', time: '2 hours ago' },
    { id: '2', type: 'milestone', message: 'Soil health milestone achieved!', time: '1 day ago' },
    { id: '3', type: 'community', message: 'New knowledge sharing opportunity', time: '3 days ago' }
  ]);

  const [impactMetrics] = useState({
    totalCarbonSequestered: keyMetrics.co2Sequestered,
    soilHealthImprovement: 23,
    biodiversityIncrease: 18,
    communityMembers: 156,
    fundingReceived: keyMetrics.annualRevenue,
    projectsActive: 2
  });

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Regenerative Practitioner Dashboard</h1>
            <p className="text-gray-600">Fair value for real-world impact and measurable restoration</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications ({notifications.length})
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Key Metrics - Dashboard Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Hectares Managed</p>
                  <p className="text-lg font-bold">{keyMetrics.hectaresManaged.toLocaleString()}+</p>
                  <p className="text-xs text-green-600">+125 this quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">CO₂ Sequestered</p>
                  <p className="text-lg font-bold">{keyMetrics.co2Sequestered} Tons</p>
                  <p className="text-xs text-blue-600">+45 tons this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Annual Revenue</p>
                  <p className="text-lg font-bold">${(keyMetrics.annualRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-purple-600">+18% this year</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Biodiversity Index</p>
                  <p className="text-lg font-bold">{keyMetrics.biodiversityIndex}</p>
                  <p className="text-xs text-orange-600">+0.4 this season</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="land-health" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="land-health">Land Health</TabsTrigger>
            <TabsTrigger value="carbon-credits">Carbon Credits</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
            <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
          </TabsList>

          {/* Land Health Tracking Tab */}
          <TabsContent value="land-health" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Soil Health Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">6.8</div>
                      <div className="text-xs text-gray-600">pH Level</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">4.2%</div>
                      <div className="text-xs text-gray-600">Organic Matter</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-700">85</div>
                      <div className="text-xs text-gray-600">Nutrient Index</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-700">92%</div>
                      <div className="text-xs text-gray-600">Microbial Activity</div>
                    </div>
                  </div>
                  <Button className="w-full">View Detailed Soil Report</Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    Water Quality Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Nitrate Levels</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Optimal</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Phosphorus</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dissolved Oxygen</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Excellent</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Turbidity</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Clear</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Schedule Water Testing</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Carbon Credit Management Tab */}
          <TabsContent value="carbon-credits" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    Carbon Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700">{keyMetrics.co2Sequestered}</div>
                    <div className="text-sm text-gray-600">Total Tons Sequestered</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Available Credits</span>
                      <span className="font-medium">285 tons</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sold Credits</span>
                      <span className="font-medium">165 tons</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current Price</span>
                      <span className="font-medium text-green-600">$45/ton</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Market Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month</span>
                      <span className="text-green-600 font-medium">+12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Market Trend</span>
                      <Badge className="bg-green-100 text-green-800">Bullish</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Demand Score</span>
                      <span className="font-medium">8.5/10</span>
                    </div>
                  </div>
                  <Button className="w-full">Sell Credits</Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Verra Standard</span>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Gold Standard</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Next Audit</span>
                      <span className="text-sm text-gray-600">Mar 2024</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Request Verification</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Stream Analytics Tab */}
          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Revenue Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Carbon Credits</span>
                      <div className="text-right">
                        <div className="font-bold text-green-700">$48,000</div>
                        <div className="text-xs text-gray-600">36% of total</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Regenerative Products</span>
                      <div className="text-right">
                        <div className="font-bold text-blue-700">$52,000</div>
                        <div className="text-xs text-gray-600">39% of total</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Impact Bonds</span>
                      <div className="text-right">
                        <div className="font-bold text-purple-700">$32,000</div>
                        <div className="text-xs text-gray-600">25% of total</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Profitability Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-700">285%</div>
                      <div className="text-xs text-gray-600">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-700">$106</div>
                      <div className="text-xs text-gray-600">Revenue/Hectare</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-700">68%</div>
                      <div className="text-xs text-gray-600">Profit Margin</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-700">+18%</div>
                      <div className="text-xs text-gray-600">YoY Growth</div>
                    </div>
                  </div>
                  <Button className="w-full">Download Financial Report</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Biodiversity Monitoring Tab */}
          <TabsContent value="biodiversity" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5 text-green-600" />
                    Species Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-700">{keyMetrics.biodiversityIndex}</div>
                    <div className="text-sm text-gray-600">Biodiversity Index Score</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Native Species</span>
                      <span className="font-medium text-green-600">127 species</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pollinator Population</span>
                      <span className="font-medium text-blue-600">+23% increase</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bird Species</span>
                      <span className="font-medium text-purple-600">45 species</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Invasive Species</span>
                      <span className="font-medium text-orange-600">-15% reduction</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-blue-600" />
                    Habitat Quality
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Forest Canopy Cover</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Wetland Health</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Wildlife Corridors</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Schedule Habitat Survey</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserFlowLayout>
  );
}