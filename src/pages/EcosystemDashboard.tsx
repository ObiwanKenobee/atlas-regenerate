import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, Users, Leaf, Waves, Heart, Recycle, Brain, 
  Shield, Target, Activity, Network, ArrowRightLeft, DollarSign,
  Sprout, Award, FileText, Globe, Zap
} from 'lucide-react';

const ecosystemModules = [
  {
    name: 'Regenerative Agriculture',
    path: '/agriculture',
    icon: Sprout,
    color: 'from-green-500 to-green-600',
    description: 'Soil restoration, carbon sequestration, and sustainable farming practices',
    metrics: { farms: 156, carbonSequestered: '2.3k tC', soilHealth: '87%' },
    status: 'active'
  },
  {
    name: 'Blue Economy',
    path: '/ocean',
    icon: Waves,
    color: 'from-blue-500 to-cyan-600',
    description: 'Ocean vitality, marine ecosystems, and sustainable aquaculture',
    metrics: { projects: 89, oceanHealth: '82%', aquaculture: '1.2M kg' },
    status: 'active'
  },
  {
    name: 'Human Health',
    path: '/health',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    description: 'Community wellbeing, healthcare access, and preventive health outcomes',
    metrics: { communities: 234, population: '1.2M', healthImprovement: '+23%' },
    status: 'active'
  },
  {
    name: 'Circular Bioeconomy',
    path: '/circular',
    icon: Recycle,
    color: 'from-purple-500 to-indigo-600',
    description: 'Waste reduction, material reuse, and regenerative supply chains',
    metrics: { enterprises: 78, wasteProcessed: '45k kg', circularityScore: '91%' },
    status: 'active'
  },
  {
    name: 'Reality-Linked Intelligence',
    path: '/intelligence',
    icon: Brain,
    color: 'from-indigo-500 to-purple-600',
    description: 'AI-powered oracles for continuous environmental and social monitoring',
    metrics: { oracles: 4, dataPoints: '2.1M', confidence: '94%' },
    status: 'active'
  },
  {
    name: 'Impact Marketplaces',
    path: '/invest',
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-600',
    description: 'Invest in verified regenerative ventures with transparent impact tracking',
    metrics: { ventures: 67, invested: '$12.4M', avgReturn: '8.2%' },
    status: 'active'
  },
  {
    name: 'Ethical AI Governance',
    path: '/governance',
    icon: Shield,
    color: 'from-orange-500 to-red-600',
    description: 'Transparent, democratic decision systems with community oversight',
    metrics: { decisions: 342, votes: 1567, ethicalScore: '96%' },
    status: 'active'
  },
  {
    name: 'Knowledge Platform',
    path: '/knowledge',
    icon: Network,
    color: 'from-teal-500 to-green-600',
    description: 'Stories to systems - capturing and sharing regenerative knowledge',
    metrics: { assets: 1234, stories: 456, synthesis: 89 },
    status: 'active'
  }
];

const globalMetrics = [
  { label: 'Total Projects', value: '1,247', icon: Target, change: '+12%' },
  { label: 'Carbon Sequestered', value: '45.2k tCO₂', icon: Leaf, change: '+18%' },
  { label: 'Communities Impacted', value: '2.1M', icon: Users, change: '+25%' },
  { label: 'Investment Volume', value: '$127M', icon: DollarSign, change: '+34%' },
  { label: 'Regenerative Score', value: '94%', icon: Activity, change: '+5%' },
  { label: 'Ecosystem Health', value: '89%', icon: Globe, change: '+8%' }
];

export default function EcosystemDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading ecosystem data
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Network className="h-8 w-8 text-white" />
          </div>
          <p className="text-lg font-semibold text-gray-700">Loading Regenerative Ecosystem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="md:ml-80 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Network className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Atlas Sanctum Ecosystem</h1>
              <p className="text-gray-600">Regenerative systems for planetary and human wellbeing</p>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {globalMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-xs text-gray-600">{metric.label}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {metric.change}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ecosystem Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ecosystemModules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.name} className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant={module.status === 'active' ? 'default' : 'secondary'}>
                      {module.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                    {module.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {module.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {Object.entries(module.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={module.path}>
                    <Button className="w-full group-hover:bg-green-600 transition-colors">
                      <Zap className="h-4 w-4 mr-2" />
                      Explore System
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/register-project">
            <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Register Project</h3>
                <p className="text-sm text-gray-600">Start your regenerative journey</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/invest">
            <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Invest in Impact</h3>
                <p className="text-sm text-gray-600">Fund regenerative ventures</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/knowledge">
            <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Network className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Share Knowledge</h3>
                <p className="text-sm text-gray-600">Contribute to collective wisdom</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/governance">
            <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold">Participate in Governance</h3>
                <p className="text-sm text-gray-600">Shape the future together</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* System Status */}
        <div className="mt-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Ecosystem Health Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Environmental Impact</p>
                  <Progress value={94} className="mb-1" />
                  <p className="text-xs text-gray-500">94% positive impact</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Social Outcomes</p>
                  <Progress value={89} className="mb-1" />
                  <p className="text-xs text-gray-500">89% community benefit</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Economic Viability</p>
                  <Progress value={87} className="mb-1" />
                  <p className="text-xs text-gray-500">87% sustainable returns</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">System Resilience</p>
                  <Progress value={92} className="mb-1" />
                  <p className="text-xs text-gray-500">92% adaptive capacity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}