import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Code, Database, Zap, Shield, Copy, 
  Play, Book, Key, DollarSign, BarChart3 
} from 'lucide-react';

const apiEndpoints = [
  {
    id: '1',
    name: 'Impact Metrics API',
    description: 'Real-time environmental and social impact data',
    endpoint: '/api/v1/impact/metrics',
    method: 'GET',
    price: 500,
    calls: '10,000/month',
    category: 'Impact Data',
    features: ['Carbon sequestration', 'Biodiversity indices', 'Social outcomes']
  },
  {
    id: '2',
    name: 'Project Analytics API',
    description: 'Comprehensive project performance analytics',
    endpoint: '/api/v1/projects/analytics',
    method: 'GET',
    price: 750,
    calls: '5,000/month',
    category: 'Analytics',
    features: ['ROI calculations', 'Risk assessments', 'Performance trends']
  },
  {
    id: '3',
    name: 'Carbon Credit API',
    description: 'Live carbon credit pricing and trading data',
    endpoint: '/api/v1/carbon/credits',
    method: 'GET',
    price: 1200,
    calls: '25,000/month',
    category: 'Trading',
    features: ['Real-time pricing', 'Market depth', 'Trading history']
  }
];

export default function APIMarketplace() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [apiKey, setApiKey] = useState('sk_live_...');

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">API Marketplace</h1>
            <p className="text-gray-600">Enterprise data access and integration services</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Book className="h-4 w-4 mr-2" />
              Documentation
            </Button>
            <Button size="sm">
              <Key className="h-4 w-4 mr-2" />
              Get API Key
            </Button>
          </div>
        </div>

        {/* API Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">API Endpoints</p>
                  <p className="text-lg font-bold">15+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-xs text-gray-600">Uptime</p>
                  <p className="text-lg font-bold">99.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">API Calls/Month</p>
                  <p className="text-lg font-bold">2.1M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Revenue/Month</p>
                  <p className="text-lg font-bold">$25.5K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="endpoints" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {apiEndpoints.map((api) => (
                <Card key={api.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{api.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{api.description}</p>
                      </div>
                      <Badge variant="outline">{api.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">{api.method}</Badge>
                          <code className="text-green-400 text-sm">{api.endpoint}</code>
                        </div>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Price</p>
                        <p className="font-bold text-green-600">${api.price}/month</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rate Limit</p>
                        <p className="font-semibold">{api.calls}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Features</p>
                      <div className="flex flex-wrap gap-1">
                        {api.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Try API
                      </Button>
                      <Button size="sm" className="flex-1">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="text-3xl font-bold">$99<span className="text-lg text-gray-600">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">5,000 API calls/month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Basic impact metrics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Email support</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20 border-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Professional</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
                  </div>
                  <div className="text-3xl font-bold">$500<span className="text-lg text-gray-600">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">50,000 API calls/month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Full analytics suite</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Custom integrations</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="text-3xl font-bold">Custom</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Unlimited API calls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">White-label options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Dedicated support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">SLA guarantees</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Quick Start Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-green-400 text-sm font-mono">
                      <div># Install the SDK</div>
                      <div>npm install @atlas-sanctum/api</div>
                      <br />
                      <div># Initialize client</div>
                      <div>const client = new AtlasAPI('{'{apiKey}'}')</div>
                      <br />
                      <div># Get impact metrics</div>
                      <div>const metrics = await client.impact.getMetrics()</div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Code className="h-4 w-4 mr-2" />
                    View Full Documentation
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>API Key Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Your API Key</label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        value={apiKey} 
                        readOnly 
                        className="font-mono text-sm"
                      />
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Usage this month</span>
                      <span className="font-semibold">12,450 / 50,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total API Calls</span>
                      <span className="font-bold">2.1M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Subscribers</span>
                      <span className="font-bold">340</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly Revenue</span>
                      <span className="font-bold text-green-600">$25,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Growth Rate</span>
                      <span className="font-bold text-blue-600">+45% MoM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Popular Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">/api/v1/impact/metrics</span>
                      <Badge variant="secondary">45%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">/api/v1/carbon/credits</span>
                      <Badge variant="secondary">30%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">/api/v1/projects/analytics</span>
                      <Badge variant="secondary">25%</Badge>
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