import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Globe, Shield, Brain, Database, Zap, Network,
  Lock, Users, Leaf, TrendingUp, Activity, Server
} from 'lucide-react';

export default function CivilizationalArchitecture() {
  const architectureLayers = [
    {
      name: "Decentralized Infrastructure",
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      components: [
        "Multi-Cloud Mesh (AWS, GCP, Azure)",
        "10,000+ Edge Nodes",
        "Quantum-Resistant Cryptography",
        "Byzantine Fault Tolerance"
      ],
      metrics: { uptime: "99.99%", nodes: "10,000+", regions: "100+" }
    },
    {
      name: "Blockchain & Protocol Layer",
      icon: <Network className="h-6 w-6 text-purple-600" />,
      components: [
        "Proof-of-Regeneration Consensus",
        "Living Smart Contracts",
        "Anti-Gaming Economics",
        "Democratic Governance"
      ],
      metrics: { tps: "1M+", validators: "1,000+", governance: "96%" }
    },
    {
      name: "AI & Data Intelligence",
      icon: <Brain className="h-6 w-6 text-green-600" />,
      components: [
        "Planetary AI Oracles",
        "Federated Learning Network",
        "Forecasting Systems",
        "Reality-Linked Intelligence"
      ],
      metrics: { accuracy: "94%", dataPoints: "2.1M", confidence: "92%" }
    },
    {
      name: "Data Infrastructure",
      icon: <Database className="h-6 w-6 text-orange-600" />,
      components: [
        "Exabyte Storage Network",
        "Real-Time Ingestion",
        "Verifiable Computing",
        "Temporal Consistency"
      ],
      metrics: { storage: "Exabyte", ingestion: "10M/sec", verification: "99.9%" }
    },
    {
      name: "IoT & Sensing Layer",
      icon: <Activity className="h-6 w-6 text-red-600" />,
      components: [
        "Satellite Integration",
        "IoT Sensor Networks",
        "Geospatial Processing",
        "Remote Sensing"
      ],
      metrics: { sensors: "1M+", satellites: "50+", coverage: "Global" }
    },
    {
      name: "Security & Privacy",
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      components: [
        "Zero-Trust Architecture",
        "Privacy-Preserving Verification",
        "Adversarial Resilience",
        "Quantum Security"
      ],
      metrics: { breaches: "0", privacy: "100%", resilience: "99.9%" }
    }
  ];

  const regenerativeFeatures = [
    {
      title: "Regenerative Value Exchange",
      description: "AI-powered oracles with living smart contracts",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      metrics: ["$12.4M Invested", "8.2% Avg Return", "67 Ventures"]
    },
    {
      title: "Democratic Governance",
      description: "Quadratic voting with community oversight",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      metrics: ["342 Decisions", "1,567 Votes", "96% Ethical Score"]
    },
    {
      title: "Impact Verification",
      description: "Multi-source verification with confidence scoring",
      icon: <Leaf className="h-5 w-5 text-green-600" />,
      metrics: ["2.3k tC Sequestered", "87% Soil Health", "94% Confidence"]
    },
    {
      title: "Planetary Monitoring",
      description: "Real-time environmental and social tracking",
      icon: <Globe className="h-5 w-5 text-purple-600" />,
      metrics: ["156 Farms", "234 Communities", "1.2M People"]
    }
  ];

  return (
    <UserFlowLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Civilizational Operating Layer</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Decentralized, regenerative platform operating at planetary scale with ethics and 
            regenerative incentives encoded directly into protocols
          </p>
        </div>

        {/* Architecture Overview */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-6 w-6 text-blue-600" />
              System Architecture Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">99.99%</div>
                <div className="text-sm text-gray-600">System Uptime</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">10M+</div>
                <div className="text-sm text-gray-600">Data Points/Second</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1M+</div>
                <div className="text-sm text-gray-600">Transactions/Second</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Architecture Layers */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Architecture Layers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {architectureLayers.map((layer, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {layer.icon}
                    <span>{layer.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {layer.components.map((component, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{component}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    {Object.entries(layer.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm font-bold">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regenerative Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Regenerative Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regenerativeFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {feature.icon}
                    <span>{feature.title}</span>
                  </CardTitle>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {feature.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold">{metric}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Principles */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle>Civilizational Design Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Fault-Tolerant & Decentralized
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• No single point of failure</li>
                  <li>• Byzantine fault tolerance</li>
                  <li>• Multi-cloud resilience</li>
                  <li>• Edge computing network</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  Ethics-First Protocol Design
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Constitutional AI constraints</li>
                  <li>• Regenerative consensus</li>
                  <li>• Democratic governance</li>
                  <li>• Anti-capture mechanisms</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  Planetary-Scale Operations
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Exabyte data processing</li>
                  <li>• Real-time global monitoring</li>
                  <li>• Satellite integration</li>
                  <li>• IoT sensor networks</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  Evolvable & Resilient
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Decades-long operation</li>
                  <li>• Political resilience</li>
                  <li>• Technology agnostic</li>
                  <li>• Environmental adaptation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Status */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium">Phase 1: Foundation</div>
                  <div className="text-sm text-gray-600">Core infrastructure and basic protocols</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Months 1-18</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium">Phase 2: Scale</div>
                  <div className="text-sm text-gray-600">AI oracle network and global expansion</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Months 19-36</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <div className="font-medium">Phase 3: Maturation</div>
                  <div className="text-sm text-gray-600">Civilizational integration and autonomy</div>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Months 37-60</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserFlowLayout>
  );
}