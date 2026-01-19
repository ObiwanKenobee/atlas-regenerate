import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Sprout, Waves, Heart, Recycle, Brain, TrendingUp, 
  Shield, BookOpen, ArrowRight, Activity
} from 'lucide-react';

interface SystemMetrics {
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics: Array<{
    label: string;
    value: string;
    color: string;
  }>;
  status: 'active' | 'developing';
  progress?: number;
}

export default function RegenerativeSystemsDashboard() {
  const systems: SystemMetrics[] = [
    {
      icon: <Sprout className="h-6 w-6 text-green-600" />,
      title: "Regenerative Agriculture",
      description: "Soil restoration, carbon sequestration, and sustainable farming practices",
      metrics: [
        { label: "Farms", value: "156", color: "text-green-600" },
        { label: "Carbon Sequestered", value: "2.3k tC", color: "text-blue-600" },
        { label: "Soil Health", value: "87%", color: "text-purple-600" }
      ],
      status: "active",
      progress: 87
    },
    {
      icon: <Waves className="h-6 w-6 text-blue-600" />,
      title: "Blue Economy",
      description: "Ocean vitality, marine ecosystems, and sustainable aquaculture",
      metrics: [
        { label: "Projects", value: "89", color: "text-blue-600" },
        { label: "Ocean Health", value: "82%", color: "text-green-600" },
        { label: "Aquaculture", value: "1.2M kg", color: "text-purple-600" }
      ],
      status: "active",
      progress: 82
    },
    {
      icon: <Heart className="h-6 w-6 text-red-600" />,
      title: "Human Health",
      description: "Community wellbeing, healthcare access, and preventive health outcomes",
      metrics: [
        { label: "Communities", value: "234", color: "text-red-600" },
        { label: "Population", value: "1.2M", color: "text-blue-600" },
        { label: "Health Improvement", value: "+23%", color: "text-green-600" }
      ],
      status: "active",
      progress: 78
    },
    {
      icon: <Recycle className="h-6 w-6 text-green-600" />,
      title: "Circular Bioeconomy",
      description: "Waste reduction, material reuse, and regenerative supply chains",
      metrics: [
        { label: "Enterprises", value: "78", color: "text-green-600" },
        { label: "Waste Processed", value: "45k kg", color: "text-blue-600" },
        { label: "Circularity Score", value: "91%", color: "text-purple-600" }
      ],
      status: "active",
      progress: 91
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      title: "Reality-Linked Intelligence",
      description: "AI-powered oracles for continuous environmental and social monitoring",
      metrics: [
        { label: "Oracles", value: "4", color: "text-purple-600" },
        { label: "Data Points", value: "2.1M", color: "text-blue-600" },
        { label: "Confidence", value: "94%", color: "text-green-600" }
      ],
      status: "active",
      progress: 94
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      title: "Impact Marketplaces",
      description: "Invest in verified regenerative ventures with transparent impact tracking",
      metrics: [
        { label: "Ventures", value: "67", color: "text-orange-600" },
        { label: "Invested", value: "$12.4M", color: "text-green-600" },
        { label: "Avg Return", value: "8.2%", color: "text-blue-600" }
      ],
      status: "active",
      progress: 85
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: "Ethical AI Governance",
      description: "Transparent, democratic decision systems with community oversight",
      metrics: [
        { label: "Decisions", value: "342", color: "text-indigo-600" },
        { label: "Votes", value: "1567", color: "text-blue-600" },
        { label: "Ethical Score", value: "96%", color: "text-green-600" }
      ],
      status: "active",
      progress: 96
    },
    {
      icon: <BookOpen className="h-6 w-6 text-amber-600" />,
      title: "Knowledge Platform",
      description: "Stories to systems - capturing and sharing regenerative knowledge",
      metrics: [
        { label: "Assets", value: "1234", color: "text-amber-600" },
        { label: "Stories", value: "456", color: "text-blue-600" },
        { label: "Synthesis", value: "89", color: "text-green-600" }
      ],
      status: "active",
      progress: 88
    }
  ];

  const totalMetrics = {
    totalProjects: 156 + 89 + 234 + 78 + 4 + 67 + 342 + 1234,
    totalInvestment: 12.4,
    avgSystemHealth: Math.round(systems.reduce((acc, sys) => acc + (sys.progress || 0), 0) / systems.length),
    activeUsers: 1.2
  };

  return (
    <UserFlowLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Regenerative Systems Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive ecosystem of interconnected regenerative systems driving planetary restoration and human wellbeing
          </p>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-green-700">{totalMetrics.totalProjects.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Investment</p>
                  <p className="text-2xl font-bold text-blue-700">${totalMetrics.totalInvestment}M</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">System Health</p>
                  <p className="text-2xl font-bold text-purple-700">{totalMetrics.avgSystemHealth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">People Reached</p>
                  <p className="text-2xl font-bold text-orange-700">{totalMetrics.activeUsers}M+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {systems.map((system, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {system.icon}
                    <div>
                      <CardTitle className="text-lg">{system.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{system.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={system.status === 'active' ? 'default' : 'secondary'}
                    className={system.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {system.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {system.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <p className="text-xs text-gray-600">{metric.label}</p>
                      <p className={`text-lg font-bold ${metric.color}`}>{metric.value}</p>
                    </div>
                  ))}
                </div>
                
                {/* Progress Bar */}
                {system.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>System Performance</span>
                      <span>{system.progress}%</span>
                    </div>
                    <Progress value={system.progress} className="h-2" />
                  </div>
                )}
                
                {/* Action Button */}
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    // Navigate to specific system
                    const systemRoutes: Record<string, string> = {
                      'Regenerative Agriculture': '/agriculture',
                      'Blue Economy': '/ocean',
                      'Human Health': '/health',
                      'Circular Bioeconomy': '/circular',
                      'Reality-Linked Intelligence': '/intelligence',
                      'Impact Marketplaces': '/invest',
                      'Ethical AI Governance': '/governance',
                      'Knowledge Platform': '/knowledge'
                    };
                    window.location.href = systemRoutes[system.title] || '/ecosystem';
                  }}
                >
                  Explore System
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Integration Overview */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              System Integration & Cross-Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Environmental Impact</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Carbon Sequestered</span>
                    <span className="font-medium text-green-600">2,300+ tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ocean Health</span>
                    <span className="font-medium text-blue-600">82% average</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Waste Processed</span>
                    <span className="font-medium text-purple-600">540k kg/year</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Social Impact</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Communities Served</span>
                    <span className="font-medium text-red-600">234+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">People Reached</span>
                    <span className="font-medium text-blue-600">1.2M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Knowledge Assets</span>
                    <span className="font-medium text-amber-600">1,234+</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserFlowLayout>
  );
}