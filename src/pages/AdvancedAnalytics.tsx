import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  BarChart3, TrendingUp, Globe, Zap, Download, 
  Filter, Calendar, Target, Users, Leaf 
} from 'lucide-react';

export default function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [metrics] = useState({
    totalImpact: { carbon: 2150, biodiversity: 15, water: 25, jobs: 500 },
    revenue: { total: 850000, growth: 300, streams: 6 },
    users: { active: 10000, retention: 85, growth: 45 },
    projects: { total: 127, verified: 98, success: 92 }
  });

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Advanced Analytics</h1>
            <p className="text-gray-600">Enterprise-grade insights and data intelligence</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Carbon Sequestered</p>
                  <p className="text-2xl font-bold">{metrics.totalImpact.carbon}+ tCO₂</p>
                </div>
                <Leaf className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Platform Revenue</p>
                  <p className="text-2xl font-bold">${(metrics.revenue.total / 1000).toFixed(0)}K</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Active Users</p>
                  <p className="text-2xl font-bold">{(metrics.users.active / 1000).toFixed(0)}K</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Jobs Created</p>
                  <p className="text-2xl font-bold">{metrics.totalImpact.jobs}+</p>
                </div>
                <Target className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="impact" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="impact">Impact Analytics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Intelligence</TabsTrigger>
            <TabsTrigger value="users">User Insights</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="impact" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Carbon Sequestration</span>
                      <Badge className="bg-green-100 text-green-800">+18% MoM</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Biodiversity Index</span>
                      <Badge className="bg-blue-100 text-blue-800">+15% YoY</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Water Quality</span>
                      <Badge className="bg-cyan-100 text-cyan-800">+25% YoY</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Impact Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Communities Served</span>
                      <span className="font-bold">50+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Income Improvement</span>
                      <span className="font-bold text-green-600">+35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Gender Equity</span>
                      <span className="font-bold">45% Women</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Streams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Transaction Fees</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Subscriptions</span>
                      <span className="font-bold">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Carbon Trading</span>
                      <span className="font-bold">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Other</span>
                      <span className="font-bold">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Unit Economics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">CAC</span>
                      <span className="font-bold">$45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">LTV</span>
                      <span className="font-bold">$385</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">LTV/CAC</span>
                      <span className="font-bold text-green-600">8.6x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Gross Margin</span>
                      <span className="font-bold">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">YoY Growth</span>
                      <span className="font-bold text-green-600">300%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">MRR</span>
                      <span className="font-bold">$71K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Churn Rate</span>
                      <span className="font-bold">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">NPS Score</span>
                      <span className="font-bold">72</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Segmentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Practitioners</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div className="w-12 h-2 bg-green-500 rounded"></div>
                        </div>
                        <span className="text-sm">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Investors</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div className="w-6 h-2 bg-blue-500 rounded"></div>
                        </div>
                        <span className="text-sm">30%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Organizations</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div className="w-2 h-2 bg-purple-500 rounded"></div>
                        </div>
                        <span className="text-sm">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="font-bold">2,850</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Session Duration</span>
                      <span className="font-bold">12m 34s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Feature Adoption</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Retention (30d)</span>
                      <span className="font-bold text-green-600">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  AI-Powered Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Revenue Forecast</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Next Quarter</span>
                        <span className="font-bold">$1.2M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Year End</span>
                        <span className="font-bold">$2.1M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Confidence</span>
                        <Badge className="bg-green-100 text-green-800">94%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Impact Projections</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Carbon by EOY</span>
                        <span className="font-bold">5,200 tCO₂</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Jobs Created</span>
                        <span className="font-bold">1,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Model Accuracy</span>
                        <Badge className="bg-blue-100 text-blue-800">91%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UserFlowLayout>
  );
}