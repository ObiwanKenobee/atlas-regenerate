import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, Leaf, Users, TrendingUp, Shield, Brain, 
  Waves, Heart, Recycle, Network, Target, Globe, Zap,
  Sprout, Activity, Award, FileText, DollarSign
} from 'lucide-react';

const ecosystemHighlights = [
  {
    icon: Sprout,
    title: 'Regenerative Agriculture',
    description: 'Soil restoration and carbon sequestration across 156 farms',
    metric: '2.3k tCO₂ sequestered',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Waves,
    title: 'Blue Economy',
    description: 'Ocean vitality and marine ecosystem restoration',
    metric: '89 marine projects',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Heart,
    title: 'Human Health',
    description: 'Community wellbeing across 234 communities',
    metric: '1.2M people impacted',
    color: 'from-red-500 to-pink-600'
  },
  {
    icon: Recycle,
    title: 'Circular Bioeconomy',
    description: 'Waste to value transformation',
    metric: '45k kg waste processed',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    icon: Brain,
    title: 'AI Intelligence',
    description: 'Reality-linked monitoring with 4 AI oracles',
    metric: '2.1M data points',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    icon: TrendingUp,
    title: 'Impact Marketplaces',
    description: 'Verified regenerative venture investments',
    metric: '$12.4M invested',
    color: 'from-emerald-500 to-teal-600'
  }
];

const platformFeatures = [
  {
    icon: Shield,
    title: 'Ethical AI Governance',
    description: 'Democratic decision-making with transparent AI rationale'
  },
  {
    icon: Network,
    title: 'Knowledge Platform',
    description: 'Stories to systems - collective regenerative wisdom'
  },
  {
    icon: Activity,
    title: 'Impact Measurement',
    description: 'Continuous tracking of ecological and social outcomes'
  },
  {
    icon: FileText,
    title: 'Smart Contracts',
    description: 'Living contracts that adapt to real-world impact'
  }
];

export default function EnhancedIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Network className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Atlas Sanctum</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/ecosystem">
                <Button variant="outline">Explore Ecosystem</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              🌍 Regenerative Ecosystem Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Regenerative
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Future
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A comprehensive ecosystem connecting regenerative agriculture, blue economy, 
              human health, and circular bioeconomy through AI-powered intelligence and 
              ethical governance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/ecosystem">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Globe className="h-5 w-5 mr-2" />
                Explore Ecosystem
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/invest">
              <Button size="lg" variant="outline">
                <TrendingUp className="h-5 w-5 mr-2" />
                Start Investing
              </Button>
            </Link>
          </div>

          {/* Global Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">45.2k</div>
              <div className="text-sm text-gray-600">tCO₂ Sequestered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">2.1M</div>
              <div className="text-sm text-gray-600">People Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">$127M</div>
              <div className="text-sm text-gray-600">Investment Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Integrated Regenerative Systems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six interconnected systems working together to create positive environmental, 
              social, and economic outcomes at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystemHighlights.map((system, index) => {
              const Icon = system.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${system.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {system.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {system.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-sm">
                        {system.metric}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by Ethical AI & Democratic Governance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology guided by regenerative principles and community wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Join the Regenerative Revolution
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're a practitioner, investor, researcher, or community leader, 
              there's a place for you in our regenerative ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-project">
                <Button size="lg" variant="secondary">
                  <Target className="h-5 w-5 mr-2" />
                  Register Your Project
                </Button>
              </Link>
              <Link to="/invest">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Start Investing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Network className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Atlas Sanctum</span>
              </div>
              <p className="text-gray-400 text-sm">
                Regenerative systems for planetary and human wellbeing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Ecosystem</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/agriculture" className="block hover:text-white">Agriculture</Link>
                <Link to="/ocean" className="block hover:text-white">Blue Economy</Link>
                <Link to="/health" className="block hover:text-white">Human Health</Link>
                <Link to="/circular" className="block hover:text-white">Circular Economy</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/intelligence" className="block hover:text-white">AI Intelligence</Link>
                <Link to="/governance" className="block hover:text-white">Governance</Link>
                <Link to="/knowledge" className="block hover:text-white">Knowledge</Link>
                <Link to="/invest" className="block hover:text-white">Invest</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Get Started</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/register-project" className="block hover:text-white">Register Project</Link>
                <Link to="/how-it-works" className="block hover:text-white">How It Works</Link>
                <Link to="/pricing" className="block hover:text-white">Pricing</Link>
                <Link to="/auth" className="block hover:text-white">Sign Up</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Atlas Sanctum. Building regenerative futures together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}