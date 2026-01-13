import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, MapPin, Target, TrendingUp, DollarSign, Leaf, Droplets, TreePine } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  funding_goal: number;
  funding_raised: number;
  project_type: string;
  status: string;
  image_url: string;
  created_at: string;
}

interface ProjectMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  category: string;
  recorded_at: string;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Amazon Rainforest Restoration',
    description: 'A comprehensive reforestation project focused on restoring degraded areas of the Amazon rainforest through indigenous-led initiatives and agroforestry systems.',
    location: 'Amazonas, Brazil',
    latitude: -3.4653,
    longitude: -62.2159,
    funding_goal: 500000,
    funding_raised: 325000,
    project_type: 'forestry',
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
    created_at: '2024-01-15'
  },
  {
    id: '2',
    title: 'Coral Reef Regeneration',
    description: 'Marine ecosystem restoration focusing on coral nurseries and sustainable fishing practices in partnership with local communities.',
    location: 'Great Barrier Reef, Australia',
    latitude: -18.2871,
    longitude: 147.6992,
    funding_goal: 750000,
    funding_raised: 450000,
    project_type: 'marine',
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800',
    created_at: '2024-02-20'
  },
  {
    id: '3',
    title: 'Regenerative Farm Network',
    description: 'Transitioning conventional farms to regenerative practices, improving soil health, biodiversity, and farmer livelihoods.',
    location: 'Iowa, USA',
    latitude: 41.8780,
    longitude: -93.0977,
    funding_goal: 300000,
    funding_raised: 180000,
    project_type: 'agriculture',
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    created_at: '2024-03-10'
  }
];

const mockMetrics: Record<string, ProjectMetric[]> = {
  '1': [
    { id: '1', metric_name: 'Trees Planted', metric_value: 150000, metric_unit: 'trees', category: 'restoration', recorded_at: '2024-06-01' },
    { id: '2', metric_name: 'Carbon Sequestered', metric_value: 2500, metric_unit: 'tons CO2', category: 'climate', recorded_at: '2024-06-01' },
    { id: '3', metric_name: 'Biodiversity Index', metric_value: 78, metric_unit: 'score', category: 'biodiversity', recorded_at: '2024-06-01' },
    { id: '4', metric_name: 'Communities Engaged', metric_value: 12, metric_unit: 'communities', category: 'social', recorded_at: '2024-06-01' }
  ],
  '2': [
    { id: '1', metric_name: 'Coral Fragments Planted', metric_value: 25000, metric_unit: 'fragments', category: 'restoration', recorded_at: '2024-06-01' },
    { id: '2', metric_name: 'Reef Area Restored', metric_value: 15, metric_unit: 'hectares', category: 'restoration', recorded_at: '2024-06-01' },
    { id: '3', metric_name: 'Fish Species Returned', metric_value: 45, metric_unit: 'species', category: 'biodiversity', recorded_at: '2024-06-01' }
  ],
  '3': [
    { id: '1', metric_name: 'Farms Converted', metric_value: 28, metric_unit: 'farms', category: 'restoration', recorded_at: '2024-06-01' },
    { id: '2', metric_name: 'Soil Health Improvement', metric_value: 35, metric_unit: '%', category: 'soil', recorded_at: '2024-06-01' },
    { id: '3', metric_name: 'Chemical Reduction', metric_value: 80, metric_unit: '%', category: 'environment', recorded_at: '2024-06-01' }
  ]
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [metrics, setMetrics] = useState<ProjectMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentLoading, setInvestmentLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Use mock data
      const foundProject = mockProjects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
        setMetrics(mockMetrics[id] || []);
      }
      setLoading(false);
    }
  }, [id]);

  const handleInvestment = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
      toast.error("Please enter a valid investment amount");
      return;
    }

    setInvestmentLoading(true);
    // Simulate investment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Investment successful! Thank you for supporting regenerative impact.");
    setInvestmentAmount("");
    
    // Update local state
    if (project) {
      setProject({
        ...project,
        funding_raised: project.funding_raised + parseFloat(investmentAmount)
      });
    }
    
    setInvestmentLoading(false);
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case "agriculture": return <Leaf className="w-6 h-6" />;
      case "marine": return <Droplets className="w-6 h-6" />;
      case "forestry": return <TreePine className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Project not found</h1>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const fundingProgress = (project.funding_raised / project.funding_goal) * 100;

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-forest to-ocean flex items-center justify-center">
                  {getProjectIcon(project.project_type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="font-serif text-3xl">{project.title}</h1>
                    <Badge variant="secondary" className="capitalize">
                      {project.project_type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Project Image */}
              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Project Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Interactive map would be displayed here
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Coordinates: {project.latitude}, {project.longitude}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Impact Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Impact Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {metrics.map((metric) => (
                      <div key={metric.id} className="p-4 rounded-lg bg-muted/20">
                        <h4 className="font-medium mb-2">{metric.metric_name}</h4>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-primary">
                            {metric.metric_value.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {metric.metric_unit}
                          </span>
                        </div>
                        <Badge variant="outline" className="mt-2 capitalize">
                          {metric.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Funding Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Raised</span>
                      <span>{fundingProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={fundingProgress} className="h-3" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Raised:</span>
                      <span className="font-medium">
                        ${project.funding_raised.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goal:</span>
                      <span className="font-medium">
                        ${project.funding_goal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Investment Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Support This Project
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {[25, 50, 100, 250].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setInvestmentAmount(amount.toString())}
                        className="h-10"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount">Custom Amount</Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      min="1"
                      step="0.01"
                    />
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        variant="hero"
                        disabled={!investmentAmount || parseFloat(investmentAmount) <= 0}
                      >
                        Invest Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Investment</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>
                          You are about to invest <strong>${investmentAmount}</strong> in{" "}
                          <strong>{project.title}</strong>.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This investment will support regenerative impact and help achieve
                          the project's environmental goals.
                        </p>
                        <Button
                          onClick={handleInvestment}
                          disabled={investmentLoading}
                          className="w-full"
                          variant="hero"
                        >
                          {investmentLoading ? "Processing..." : "Confirm Investment"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <p className="text-xs text-muted-foreground text-center">
                    Your investment supports verified regenerative projects
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;