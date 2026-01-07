import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  TrendingUp, DollarSign, Target, BarChart3, Award, 
  Eye, Plus, ArrowUpRight, ArrowDownRight, Activity,
  AlertTriangle, CheckCircle, FileText, Users, Calendar
} from 'lucide-react';

export default function InvestorDashboardFlow() {
  // Key Metrics Data for Investors & Institutions
  const keyMetrics = {
    assetsUnderManagement: 25000000, // $25M
    portfolioReturns: 28.5, // 28.5%
    impactScore: 9.2 // 9.2/10
  };
  const [portfolio] = useState([
    {
      id: '1',
      name: 'Regenerative Coffee Farm Transition',
      type: 'Agriculture',
      invested: 25000,
      currentValue: 27500,
      return: 10.0,
      impactScore: 94,
      status: 'performing',
      carbonOffset: 45.2,
      jobsCreated: 12
    },
    {
      id: '2',
      name: 'Ocean Kelp Forest Restoration',
      type: 'Blue Economy',
      invested: 50000,
      currentValue: 53750,
      return: 7.5,
      impactScore: 96,
      status: 'performing',
      carbonOffset: 120.8,
      jobsCreated: 8
    },
    {
      id: '3',
      name: 'Circular Waste Processing Hub',
      type: 'Circular Economy',
      invested: 75000,
      currentValue: 82500,
      return: 10.0,
      impactScore: 89,
      status: 'outperforming',
      carbonOffset: 200.5,
      jobsCreated: 25
    }
  ]);

  const [opportunities] = useState([
    {
      id: '4',
      name: 'Sustainable Aquaculture Initiative',
      type: 'Blue Economy',
      fundingGoal: 150000,
      fundingRaised: 95000,
      minInvestment: 5000,
      expectedReturn: 9.2,
      impactScore: 92,
      timeline: '4 years'
    },
    {
      id: '5',
      name: 'Urban Vertical Farm Network',
      type: 'Agriculture',
      fundingGoal: 200000,
      fundingRaised: 120000,
      minInvestment: 10000,
      expectedReturn: 11.5,
      impactScore: 88,
      timeline: '3 years'
    }
  ]);

  const totalInvested = portfolio.reduce((sum, inv) => sum + inv.invested, 0);
  const totalCurrentValue = portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturn = ((totalCurrentValue - totalInvested) / totalInvested) * 100;
  const totalCarbonOffset = portfolio.reduce((sum, inv) => sum + inv.carbonOffset, 0);
  const totalJobsCreated = portfolio.reduce((sum, inv) => sum + inv.jobsCreated, 0);

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Investor & Institution Dashboard</h1>
            <p className="text-gray-600">Forward-thinking capital seeking credible, large-scale impact opportunities</p>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Investment
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Assets Under Management</p>
                  <p className="text-lg font-bold">${(keyMetrics.assetsUnderManagement / 1000000).toFixed(0)}M</p>
                  <p className="text-xs text-green-600">+$3.2M this quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Portfolio Returns</p>
                  <p className="text-lg font-bold">{keyMetrics.portfolioReturns}%</p>
                  <p className="text-xs text-blue-600">+4.2% vs benchmark</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Impact Score</p>
                  <p className="text-lg font-bold">{keyMetrics.impactScore}/10</p>
                  <p className="text-xs text-purple-600">Top 5% globally</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="portfolio" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio Performance</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
            <TabsTrigger value="deals">Deal Flow</TabsTrigger>
          </TabsList>

          {/* Portfolio Performance Tab */}
          <TabsContent value="portfolio" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Asset Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Regenerative Agriculture</span>
                      <span className="text-sm text-green-600">35% ($8.75M)</span>
                    </div>
                    <Progress value={35} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Clean Energy</span>
                      <span className="text-sm text-blue-600">28% ($7.0M)</span>
                    </div>
                    <Progress value={28} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Ocean Restoration</span>
                      <span className="text-sm text-purple-600">20% ($5.0M)</span>
                    </div>
                    <Progress value={20} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Circular Economy</span>
                      <span className="text-sm text-orange-600">17% ($4.25M)</span>
                    </div>
                    <Progress value={17} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-700">{keyMetrics.portfolioReturns}%</div>
                      <div className="text-xs text-gray-600">Total Return</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-700">1.85</div>
                      <div className="text-xs text-gray-600">Sharpe Ratio</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-700">-8.2%</div>
                      <div className="text-xs text-gray-600">Max Drawdown</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-700">4.2%</div>
                      <div className="text-xs text-gray-600">Alpha</div>
                    </div>
                  </div>
                  <Button className="w-full">View Detailed Analytics</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risk" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Portfolio VaR (95%)</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Low Risk</Badge>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-xl font-bold text-red-700">$1.2M</div>
                      <div className="text-xs text-gray-600">Maximum 1-day loss</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Climate Risk</span>
                        <span className="text-green-600">Low (2.1/10)</span>
                      </div>
                      <Progress value={21} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Liquidity Risk</span>
                        <span className="text-yellow-600">Medium (4.5/10)</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Concentration Risk</span>
                        <span className="text-green-600">Low (3.2/10)</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Stress Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">Market Crash Scenario</span>
                        <span className="text-red-600 font-bold">-15.2%</span>
                      </div>
                      <p className="text-xs text-gray-600">30% market decline impact</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">Climate Event Scenario</span>
                        <span className="text-orange-600 font-bold">-8.7%</span>
                      </div>
                      <p className="text-xs text-gray-600">Extreme weather impact</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">Regulatory Change</span>
                        <span className="text-yellow-600 font-bold">-5.3%</span>
                      </div>
                      <p className="text-xs text-gray-600">Policy shift impact</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Run Custom Scenario</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Impact Metrics Tab */}
          <TabsContent value="impact" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Impact Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-700">{keyMetrics.impactScore}</div>
                    <div className="text-sm text-gray-600">Overall Impact Score</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Environmental Impact</span>
                      <span className="font-medium text-green-600">9.5/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Social Impact</span>
                      <span className="font-medium text-blue-600">8.8/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Governance Score</span>
                      <span className="font-medium text-purple-600">9.3/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    SDG Alignment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Climate Action (SDG 13)</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Life Below Water (SDG 14)</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Life on Land (SDG 15)</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Decent Work (SDG 8)</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    Impact Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Third-Party Verified</span>
                      <Badge className="bg-green-100 text-green-800">98.5%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Real-time Monitoring</span>
                      <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Audit Compliance</span>
                      <Badge className="bg-purple-100 text-purple-800">100%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Impact ROI</span>
                      <span className="font-medium text-green-600">3.2x</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">View Impact Report</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Deal Flow Management Tab */}
          <TabsContent value="deals" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Deal Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Sourcing</div>
                        <div className="text-xs text-gray-600">45 opportunities</div>
                      </div>
                      <div className="text-green-700 font-bold">$125M</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Due Diligence</div>
                        <div className="text-xs text-gray-600">12 deals</div>
                      </div>
                      <div className="text-blue-700 font-bold">$48M</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Investment Committee</div>
                        <div className="text-xs text-gray-600">5 deals</div>
                      </div>
                      <div className="text-purple-700 font-bold">$22M</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Term Sheet</div>
                        <div className="text-xs text-gray-600">3 deals</div>
                      </div>
                      <div className="text-orange-700 font-bold">$15M</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Recent Deal Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-sm">Ocean Kelp Restoration</div>
                          <div className="text-xs text-gray-600">Series A • $8M</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Closed</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>Completed 2 days ago</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-sm">Regenerative Cotton Farm</div>
                          <div className="text-xs text-gray-600">Growth • $12M</div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Due Diligence</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>Review in progress</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-sm">Carbon Capture Technology</div>
                          <div className="text-xs text-gray-600">Series B • $25M</div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Term Sheet</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>Negotiating terms</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">View All Deals</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserFlowLayout>
  );
}