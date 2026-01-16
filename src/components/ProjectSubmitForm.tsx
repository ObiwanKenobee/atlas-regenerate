import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Leaf, MapPin, DollarSign, Calendar, Globe, TreePine, Waves, Heart } from "lucide-react";
import { motion } from "framer-motion";

const PROJECT_TYPES = [
  { value: "regenerative", label: "Regenerative Agriculture", icon: Leaf },
  { value: "forestry", label: "Forest Restoration", icon: TreePine },
  { value: "marine", label: "Marine Conservation", icon: Waves },
  { value: "biodiversity", label: "Biodiversity Protection", icon: Heart },
  { value: "circular", label: "Circular Economy", icon: Globe },
];

const ProjectSubmitForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProject } = useProjects();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    project_type: "regenerative",
    total_area_hectares: "",
    funding_goal: "",
    start_date: "",
    location_country: "",
    location_region: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to submit a project");
      navigate("/auth");
      return;
    }

    if (!formData.project_name.trim()) {
      toast.error("Project name is required");
      return;
    }

    setLoading(true);

    const { error } = await createProject({
      project_name: formData.project_name,
      description: formData.description || null,
      project_type: formData.project_type,
      total_area_hectares: formData.total_area_hectares ? parseFloat(formData.total_area_hectares) : null,
      funding_goal: formData.funding_goal ? parseFloat(formData.funding_goal) : null,
      start_date: formData.start_date || null,
      location: formData.location_country ? {
        country: formData.location_country,
        region: formData.location_region,
      } : null,
      status: "draft",
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to create project");
    } else {
      toast.success("Project created successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-3xl">Submit Your Project</CardTitle>
              <CardDescription>
                Register your regenerative project to connect with investors and track impact
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Name */}
                <div className="space-y-2">
                  <Label htmlFor="project_name">Project Name *</Label>
                  <Input
                    id="project_name"
                    placeholder="Enter your project name"
                    value={formData.project_name}
                    onChange={(e) => handleChange("project_name", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <Label>Project Type *</Label>
                  <Select
                    value={formData.project_type}
                    onValueChange={(value) => handleChange("project_type", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map(({ value, label, icon: Icon }) => (
                        <SelectItem key={value} value={value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project, its goals, and expected impact..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location_country">Country</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location_country"
                        placeholder="Country"
                        value={formData.location_country}
                        onChange={(e) => handleChange("location_country", e.target.value)}
                        className="h-12 pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location_region">Region</Label>
                    <Input
                      id="location_region"
                      placeholder="State/Province"
                      value={formData.location_region}
                      onChange={(e) => handleChange("location_region", e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Area and Funding */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total_area_hectares">Total Area (hectares)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="total_area_hectares"
                        type="number"
                        placeholder="0"
                        value={formData.total_area_hectares}
                        onChange={(e) => handleChange("total_area_hectares", e.target.value)}
                        className="h-12 pl-10"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funding_goal">Funding Goal ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="funding_goal"
                        type="number"
                        placeholder="0"
                        value={formData.funding_goal}
                        onChange={(e) => handleChange("funding_goal", e.target.value)}
                        className="h-12 pl-10"
                        min="0"
                        step="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => handleChange("start_date", e.target.value)}
                      className="h-12 pl-10"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Project"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectSubmitForm;
