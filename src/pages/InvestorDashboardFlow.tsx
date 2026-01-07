import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  TrendingUp, DollarSign, Target, BarChart3, Award, 
  Eye, Plus, ArrowUpRight, ArrowDownRight, Activity 
} from 'lucide-react';

export default function InvestorDashboardFlow() {
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Investment Portfolio</h1>
            <p className="text-gray-600">Track your regenerative impact investments</p>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Investment
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Total Invested</p>
                  <p className="text-lg font-bold">${(totalInvested / 1000).toFixed(0)}k</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Current Value</p>
                  <p className="text-lg font-bold">${(totalCurrentValue / 1000).toFixed(0)}k</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Total Return</p>
                  <p className="text-lg font-bold text-green-600">+{totalReturn.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Carbon Offset</p>
                  <p className="text-lg font-bold">{totalCarbonOffset.toFixed(0)} tCO₂</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Jobs Created</p>
                  <p className="text-lg font-bold">{totalJobsCreated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="portfolio" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="impact">Impact Report</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Investments</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export Report</Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Investment
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {portfolio.map((investment) => (
                <Card key={investment.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{investment.name}</h3>
                          <Badge variant="outline">{investment.type}</Badge>
                          <Badge 
                            className={
                              investment.status === 'outperforming' ? 'bg-green-100 text-green-800' :
                              investment.status === 'performing' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {investment.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Invested</p>
                            <p className="font-semibold">${investment.invested.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Current Value</p>
                            <p className="font-semibold">${investment.currentValue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Return</p>
                            <p className={`font-semibold flex items-center gap-1 ${
                              investment.return >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {investment.return >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                              {investment.return >= 0 ? '+' : ''}{investment.return.toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Impact Score</p>
                            <p className="font-semibold text-blue-600">{investment.impactScore}/100</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Carbon Offset</p>
                          <p className="font-semibold text-green-600">{investment.carbonOffset} tCO₂</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Jobs Created</p>
                          <p className="font-semibold text-blue-600">{investment.jobsCreated}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Investment Opportunities</h2>
              <Button variant="outline" size="sm">Filter & Sort</Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{opportunity.name}</CardTitle>
                        <Badge variant="outline">{opportunity.type}</Badge>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Expected Return</p>
                        <p className="font-semibold text-green-600">{opportunity.expectedReturn}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Impact Score</p>
                        <p className="font-semibold text-blue-600">{opportunity.impactScore}/100</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Min Investment</p>
                        <p className="font-semibold">${opportunity.minInvestment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Timeline</p>
                        <p className="font-semibold">{opportunity.timeline}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Funding Progress</span>
                        <span>{((opportunity.fundingRaised / opportunity.fundingGoal) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(opportunity.fundingRaised / opportunity.fundingGoal) * 100} />
                      <p className="text-xs text-gray-500 mt-1">
                        ${opportunity.fundingRaised.toLocaleString()} of ${opportunity.fundingGoal.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1">
                        Invest Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Impact Report Tab */}
          <TabsContent value="impact" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{totalCarbonOffset.toFixed(0)} tCO₂</p>
                    <p className="text-sm text-gray-600">Total Carbon Offset</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Soil Health Improvement</span>
                        <span>+28%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Biodiversity Conservation</span>
                        <span>+35%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Water Conservation</span>
                        <span>12,500L saved</span>
                      </div>
                      <Progress value={78} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Social Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{totalJobsCreated}</p>
                    <p className="text-sm text-gray-600">Jobs Created</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Community Members Impacted</span>
                        <span>2,450</span>
                      </div>
                      <Progress value={88} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Training Programs</span>
                        <span>18 completed</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Local Economic Growth</span>
                        <span>+15%</span>
                      </div>
                      <Progress value={82} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Impact Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Carbon Sequestration Milestone</p>
                      <p className="text-sm text-gray-600">Achieved 100 tCO₂ offset across portfolio</p>
                    </div>
                    <p className="text-sm text-gray-500">2 weeks ago</p>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Community Impact Achievement</p>
                      <p className="text-sm text-gray-600">25 new jobs created in rural communities</p>
                    </div>
                    <p className="text-sm text-gray-500">1 month ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Portfolio Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Portfolio Return</span>
                      <span className="font-bold text-green-600">+{totalReturn.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Best Performing Investment</span>
                      <span className="font-bold">Circular Waste Hub (+10.0%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Impact Score</span>
                      <span className="font-bold text-blue-600">93/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Risk-Adjusted Return</span>
                      <span className="font-bold">8.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-600" />
                    Investment Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Agriculture</span>
                        <span>16.7%</span>
                      </div>
                      <Progress value={16.7} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Blue Economy</span>
                        <span>33.3%</span>
                      </div>
                      <Progress value={33.3} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Circular Economy</span>
                        <span>50.0%</span>
                      </div>
                      <Progress value={50.0} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserFlowLayout>
  );
}