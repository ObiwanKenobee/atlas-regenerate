import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, Home, Users, TrendingUp, Waves, Heart, Recycle, 
  Sprout, Brain, Network, Shield, ArrowRightLeft, Target,
  Activity, FileText, DollarSign, Award, Lightbulb
} from 'lucide-react';

const navigationSections = [
  {
    title: 'Core Platform',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: Home, description: 'Overview & Analytics' },
      { name: 'Projects', path: '/', icon: Target, description: 'Regenerative Projects' },
      { name: 'How It Works', path: '/how-it-works', icon: Lightbulb, description: 'Platform Guide' },
    ]
  },
  {
    title: 'Regenerative Systems',
    items: [
      { name: 'Agriculture', path: '/agriculture', icon: Sprout, description: 'Soil & Carbon' },
      { name: 'Blue Economy', path: '/ocean', icon: Waves, description: 'Ocean Vitality' },
      { name: 'Human Health', path: '/health', icon: Heart, description: 'Community Wellbeing' },
      { name: 'Circular Economy', path: '/circular', icon: Recycle, description: 'Waste to Value' },
    ]
  },
  {
    title: 'Intelligence & Governance',
    items: [
      { name: 'AI Intelligence', path: '/intelligence', icon: Brain, description: 'Reality-Linked Data' },
      { name: 'Ethical Governance', path: '/governance', icon: Shield, description: 'Democratic Decisions' },
      { name: 'Impact Measurement', path: '/impact', icon: Activity, description: 'Continuous Tracking' },
      { name: 'Purpose Design', path: '/purpose', icon: Target, description: 'Values-Driven' },
    ]
  },
  {
    title: 'Markets & Exchange',
    items: [
      { name: 'Investment Marketplace', path: '/invest', icon: TrendingUp, description: 'Verified Ventures' },
      { name: 'Value Exchange', path: '/marketplace', icon: DollarSign, description: 'Asset Trading' },
      { name: 'Regenerative Exchange', path: '/exchange', icon: ArrowRightLeft, description: 'Living Contracts' },
      { name: 'Smart Contracts', path: '/contracts', icon: FileText, description: 'Adaptive Agreements' },
    ]
  },
  {
    title: 'Knowledge & Enterprise',
    items: [
      { name: 'Knowledge Platform', path: '/knowledge', icon: Network, description: 'Stories to Systems' },
      { name: 'Real-Time Monitoring', path: '/monitoring', icon: Activity, description: 'AI Oracles' },
      { name: 'Enterprise Dashboards', path: '/enterprise', icon: Users, description: 'Stakeholder Views' },
      { name: 'Business Model', path: '/business-model', icon: Award, description: 'Circular Revenue' },
    ]
  },
  {
    title: 'Admin & Management',
    items: [
      { name: 'Admin Panel', path: '/admin', icon: Shield, description: 'System Management' },
      { name: 'Project Registration', path: '/register-project', icon: Target, description: 'New Projects' },
      { name: 'Project Verification', path: '/verify-projects', icon: Award, description: 'Quality Assurance' },
      { name: 'Subscription Plans', path: '/pricing', icon: DollarSign, description: 'Platform Access' },
    ]
  }
];

export default function EcosystemNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const NavigationContent = () => (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Network className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Atlas Sanctum</h2>
          <p className="text-xs text-gray-500">Regenerative Ecosystem</p>
        </div>
      </div>

      {navigationSections.map((section) => (
        <div key={section.title} className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {section.title}
          </h3>
          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                  </div>
                  {isActive && (
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      Active
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <div className="pt-4 border-t mt-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            Regenerative Impact
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every action creates positive environmental and social outcomes
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-md">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-80 overflow-y-auto p-0">
          <NavigationContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 overflow-y-auto z-40">
        <NavigationContent />
      </div>
    </>
  );
}