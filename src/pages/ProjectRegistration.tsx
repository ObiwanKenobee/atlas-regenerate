import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { MapPin, Upload, Users, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ProjectData {
  project_name: string;
  project_type: string;
  total_area: string;
  location_description: string;
}

interface BaselineAssessment {
  assessment_type: string;
  baseline_value: string;
  measurement_unit: string;
  assessment_method: string;
  assessor_name: string;
}

interface Stakeholder {
  stakeholder_name: string;
  stakeholder_type: string;
  role_in_project: string;
  engagement_level: string;
}

const ProjectRegistration = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [projectData, setProjectData] = useState<ProjectData>({
    project_name: "",
    project_type: "",
    total_area: "",
    location_description: ""
  });

  const [boundaries, setBoundaries] = useState({
    geometry: "",
    verification_method: "",
    area_hectares: ""
  });

  const [assessments, setAssessments] = useState<BaselineAssessment[]>([{
    assessment_type: "",
    baseline_value: "",
    measurement_unit: "",
    assessment_method: "",
    assessor_name: ""
  }]);

  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([{
    stakeholder_name: "",
    stakeholder_type: "",
    role_in_project: "",
    engagement_level: ""
  }]);

  const [landUseHistory, setLandUseHistory] = useState({
    period_start: "",
    period_end: "",
    land_use_type: "",
    management_practices: "",
    documentation_source: ""
  });

  const steps = [
    { title: "Project Details", icon: FileText },
    { title: "Geospatial Boundaries", icon: MapPin },
    { title: "Baseline Assessment", icon: CheckCircle },
    { title: "Land Use History", icon: FileText },
    { title: "Community Stakeholders", icon: Users }
  ];

  const projectTypes = [
    { value: "carbon_sequestration", label: "Carbon Sequestration" },
    { value: "soil_restoration", label: "Soil Restoration" },
    { value: "marine_protection", label: "Marine Protection" },
    { value: "biodiversity_conservation", label: "Biodiversity Conservation" },
    { value: "watershed_restoration", label: "Watershed Restoration" }
  ];

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to register a project");
      return;
    }

    setLoading(true);
    
    // Simulate project registration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Project registered successfully! It will be reviewed for verification.");
    
    // Reset form
    setCurrentStep(0);
    setProjectData({ project_name: "", project_type: "", total_area: "", location_description: "" });
    setLoading(false);
  };

  const addAssessment = () => {
    setAssessments([...assessments, {
      assessment_type: "",
      baseline_value: "",
      measurement_unit: "",
      assessment_method: "",
      assessor_name: ""
    }]);
  };

  const addStakeholder = () => {
    setStakeholders([...stakeholders, {
      stakeholder_name: "",
      stakeholder_type: "",
      role_in_project: "",
      engagement_level: ""
    }]);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Register Restoration Project</h1>
          <p className="text-muted-foreground">
            Document your regenerative project with verified boundaries, baseline data, and community engagement
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="glass mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Registration Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted ? "bg-primary text-primary-foreground" :
                      isActive ? "bg-primary/20 text-primary border-2 border-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-center">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Project Details */}
        {currentStep === 0 && (
          <Card className="glass">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project_name">Project Name</Label>
                  <Input
                    id="project_name"
                    value={projectData.project_name}
                    onChange={(e) => setProjectData({...projectData, project_name: e.target.value})}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_type">Project Type</Label>
                  <Select value={projectData.project_type} onValueChange={(value) => setProjectData({...projectData, project_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="total_area">Total Area (hectares)</Label>
                <Input
                  id="total_area"
                  type="number"
                  step="0.1"
                  value={projectData.total_area}
                  onChange={(e) => setProjectData({...projectData, total_area: e.target.value})}
                  placeholder="Enter total area"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location_description">Location Description</Label>
                <Textarea
                  id="location_description"
                  value={projectData.location_description}
                  onChange={(e) => setProjectData({...projectData, location_description: e.target.value})}
                  placeholder="Describe the project location, including geographic features, climate, and accessibility"
                  rows={4}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep(1)}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Geospatial Boundaries */}
        {currentStep === 1 && (
          <Card className="glass">
            <CardHeader>
              <CardTitle>Geospatial Boundaries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/20 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h3 className="font-medium">Project Boundary Mapping</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload GPS coordinates, KML files, or use our interactive map to define project boundaries.
                </p>
                <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Interactive map would be displayed here</p>
                    <Button variant="outline" className="mt-2">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Boundary File
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="verification_method">Verification Method</Label>
                  <Select value={boundaries.verification_method} onValueChange={(value) => setBoundaries({...boundaries, verification_method: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="satellite">Satellite Imagery</SelectItem>
                      <SelectItem value="drone">Drone Survey</SelectItem>
                      <SelectItem value="gps">GPS Ground Survey</SelectItem>
                      <SelectItem value="lidar">LiDAR Mapping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area_hectares">Verified Area (hectares)</Label>
                  <Input
                    id="area_hectares"
                    type="number"
                    step="0.01"
                    value={boundaries.area_hectares}
                    onChange={(e) => setBoundaries({...boundaries, area_hectares: e.target.value})}
                    placeholder="Calculated from boundaries"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(0)}>Previous</Button>
                <Button onClick={() => setCurrentStep(2)}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Baseline Assessment */}
        {currentStep === 2 && (
          <Card className="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Baseline Ecosystem Health Assessment</CardTitle>
                <Button onClick={addAssessment} variant="outline" size="sm">
                  Add Assessment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {assessments.map((assessment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-lg space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Assessment #{index + 1}</h4>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Assessment Type</Label>
                      <Select value={assessment.assessment_type} onValueChange={(value) => {
                        const newAssessments = [...assessments];
                        newAssessments[index].assessment_type = value;
                        setAssessments(newAssessments);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assessment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="soil_health">Soil Health</SelectItem>
                          <SelectItem value="carbon_stock">Carbon Stock</SelectItem>
                          <SelectItem value="biodiversity">Biodiversity Index</SelectItem>
                          <SelectItem value="water_quality">Water Quality</SelectItem>
                          <SelectItem value="vegetation_cover">Vegetation Cover</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Baseline Value</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={assessment.baseline_value}
                        onChange={(e) => {
                          const newAssessments = [...assessments];
                          newAssessments[index].baseline_value = e.target.value;
                          setAssessments(newAssessments);
                        }}
                        placeholder="Enter baseline value"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Measurement Unit</Label>
                      <Input
                        value={assessment.measurement_unit}
                        onChange={(e) => {
                          const newAssessments = [...assessments];
                          newAssessments[index].measurement_unit = e.target.value;
                          setAssessments(newAssessments);
                        }}
                        placeholder="e.g., tons/ha, score, %"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Assessment Method</Label>
                      <Input
                        value={assessment.assessment_method}
                        onChange={(e) => {
                          const newAssessments = [...assessments];
                          newAssessments[index].assessment_method = e.target.value;
                          setAssessments(newAssessments);
                        }}
                        placeholder="e.g., Lab analysis, Field survey"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>Previous</Button>
                <Button onClick={() => setCurrentStep(3)}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Land Use History */}
        {currentStep === 3 && (
          <Card className="glass">
            <CardHeader>
              <CardTitle>Land Use History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="period_start">Period Start</Label>
                  <Input
                    id="period_start"
                    type="date"
                    value={landUseHistory.period_start}
                    onChange={(e) => setLandUseHistory({...landUseHistory, period_start: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period_end">Period End</Label>
                  <Input
                    id="period_end"
                    type="date"
                    value={landUseHistory.period_end}
                    onChange={(e) => setLandUseHistory({...landUseHistory, period_end: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="land_use_type">Land Use Type</Label>
                <Select value={landUseHistory.land_use_type} onValueChange={(value) => setLandUseHistory({...landUseHistory, land_use_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select land use type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="forestry">Forestry</SelectItem>
                    <SelectItem value="grazing">Grazing</SelectItem>
                    <SelectItem value="fallow">Fallow</SelectItem>
                    <SelectItem value="degraded">Degraded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="management_practices">Management Practices</Label>
                <Textarea
                  id="management_practices"
                  value={landUseHistory.management_practices}
                  onChange={(e) => setLandUseHistory({...landUseHistory, management_practices: e.target.value})}
                  placeholder="Describe past management practices"
                  rows={3}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>Previous</Button>
                <Button onClick={() => setCurrentStep(4)}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Community Stakeholders */}
        {currentStep === 4 && (
          <Card className="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Community Stakeholders</CardTitle>
                <Button onClick={addStakeholder} variant="outline" size="sm">
                  Add Stakeholder
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {stakeholders.map((stakeholder, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-lg space-y-4"
                >
                  <h4 className="font-medium">Stakeholder #{index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Stakeholder Name</Label>
                      <Input
                        value={stakeholder.stakeholder_name}
                        onChange={(e) => {
                          const newStakeholders = [...stakeholders];
                          newStakeholders[index].stakeholder_name = e.target.value;
                          setStakeholders(newStakeholders);
                        }}
                        placeholder="Enter stakeholder name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Stakeholder Type</Label>
                      <Select value={stakeholder.stakeholder_type} onValueChange={(value) => {
                        const newStakeholders = [...stakeholders];
                        newStakeholders[index].stakeholder_type = value;
                        setStakeholders(newStakeholders);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="community">Community</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Role in Project</Label>
                      <Input
                        value={stakeholder.role_in_project}
                        onChange={(e) => {
                          const newStakeholders = [...stakeholders];
                          newStakeholders[index].role_in_project = e.target.value;
                          setStakeholders(newStakeholders);
                        }}
                        placeholder="Describe their role"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Engagement Level</Label>
                      <Select value={stakeholder.engagement_level} onValueChange={(value) => {
                        const newStakeholders = [...stakeholders];
                        newStakeholders[index].engagement_level = value;
                        setStakeholders(newStakeholders);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>Previous</Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting..." : "Submit Registration"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectRegistration;