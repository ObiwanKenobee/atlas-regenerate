import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MapPin, Upload, Users, FileText, CheckCircle, AlertCircle } from "lucide-react";
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
    try {
      // Create restoration project
      const { data: project, error: projectError } = await supabase
        .from("restoration_projects")
        .insert({
          practitioner_id: user.id,
          project_name: projectData.project_name,
          project_type: projectData.project_type,
          total_area: parseFloat(projectData.total_area),
          location_description: projectData.location_description,
          registration_status: "submitted"
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Add project boundaries
      if (boundaries.geometry) {
        await supabase.from("project_boundaries").insert({
          project_id: project.id,
          boundary_name: "Main Project Area",
          geometry: JSON.parse(boundaries.geometry),
          area_hectares: parseFloat(boundaries.area_hectares),
          verification_method: boundaries.verification_method
        });
      }

      // Add baseline assessments
      for (const assessment of assessments) {
        if (assessment.assessment_type) {
          await supabase.from("baseline_assessments").insert({
            project_id: project.id,
            assessment_type: assessment.assessment_type,
            baseline_value: parseFloat(assessment.baseline_value),
            measurement_unit: assessment.measurement_unit,
            assessment_method: assessment.assessment_method,
            assessor_name: assessment.assessor_name,
            assessment_date: new Date().toISOString().split('T')[0]
          });
        }
      }

      // Add land use history
      if (landUseHistory.land_use_type) {
        await supabase.from("land_use_history").insert({
          project_id: project.id,
          period_start: landUseHistory.period_start,
          period_end: landUseHistory.period_end,
          land_use_type: landUseHistory.land_use_type,
          management_practices: landUseHistory.management_practices,
          documentation_source: landUseHistory.documentation_source
        });
      }

      // Add community stakeholders
      for (const stakeholder of stakeholders) {
        if (stakeholder.stakeholder_name) {
          await supabase.from("community_stakeholders").insert({
            project_id: project.id,
            stakeholder_name: stakeholder.stakeholder_name,
            stakeholder_type: stakeholder.stakeholder_type,
            role_in_project: stakeholder.role_in_project,
            engagement_level: stakeholder.engagement_level
          });
        }
      }

      toast.success("Project registered successfully! It will be reviewed for verification.");
      
      // Reset form
      setCurrentStep(0);
      setProjectData({ project_name: "", project_type: "", total_area: "", location_description: "" });
      
    } catch (error) {
      console.error("Error registering project:", error);
      toast.error("Failed to register project. Please try again.");
    } finally {
      setLoading(false);
    }
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

        <Tabs value={currentStep.toString()} className="space-y-6">
          {/* Step 1: Project Details */}
          <TabsContent value="0">
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 2: Geospatial Boundaries */}
          <TabsContent value="1">
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 3: Baseline Assessment */}
          <TabsContent value="2">
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
                          placeholder="e.g., tons CO2/ha, pH, index score"
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
                          placeholder="e.g., field_sampling, remote_sensing"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Assessor Name & Credentials</Label>
                      <Input
                        value={assessment.assessor_name}
                        onChange={(e) => {
                          const newAssessments = [...assessments];
                          newAssessments[index].assessor_name = e.target.value;
                          setAssessments(newAssessments);
                        }}
                        placeholder="Name and professional credentials of assessor"
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 4: Land Use History */}
          <TabsContent value="3">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Historical Land Use Documentation</CardTitle>
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
                  <Label htmlFor="land_use_type">Historical Land Use</Label>
                  <Select value={landUseHistory.land_use_type} onValueChange={(value) => setLandUseHistory({...landUseHistory, land_use_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select historical land use" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="grazing">Livestock Grazing</SelectItem>
                      <SelectItem value="forestry">Forestry</SelectItem>
                      <SelectItem value="urban">Urban Development</SelectItem>
                      <SelectItem value="degraded">Degraded Land</SelectItem>
                      <SelectItem value="natural">Natural/Undisturbed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="management_practices">Management Practices</Label>
                  <Textarea
                    id="management_practices"
                    value={landUseHistory.management_practices}
                    onChange={(e) => setLandUseHistory({...landUseHistory, management_practices: e.target.value})}
                    placeholder="Describe historical management practices, inputs used, disturbance events, etc."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documentation_source">Documentation Source</Label>
                  <Select value={landUseHistory.documentation_source} onValueChange={(value) => setLandUseHistory({...landUseHistory, documentation_source: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select documentation source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="satellite_imagery">Satellite Imagery</SelectItem>
                      <SelectItem value="historical_records">Historical Records</SelectItem>
                      <SelectItem value="local_knowledge">Local Knowledge</SelectItem>
                      <SelectItem value="government_data">Government Data</SelectItem>
                      <SelectItem value="aerial_photos">Aerial Photography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 5: Community Stakeholders */}
          <TabsContent value="4">
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Community Stakeholder Mapping</CardTitle>
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
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Stakeholder #{index + 1}</h4>
                      <Badge variant="outline">Community Engagement</Badge>
                    </div>
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
                          placeholder="Name or organization"
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
                            <SelectItem value="indigenous_community">Indigenous Community</SelectItem>
                            <SelectItem value="local_farmer">Local Farmer</SelectItem>
                            <SelectItem value="cooperative">Cooperative</SelectItem>
                            <SelectItem value="government">Government Agency</SelectItem>
                            <SelectItem value="ngo">NGO/Non-profit</SelectItem>
                            <SelectItem value="research_institution">Research Institution</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Role in Project</Label>
                        <Select value={stakeholder.role_in_project} onValueChange={(value) => {
                          const newStakeholders = [...stakeholders];
                          newStakeholders[index].role_in_project = value;
                          setStakeholders(newStakeholders);
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="landowner">Landowner</SelectItem>
                            <SelectItem value="manager">Project Manager</SelectItem>
                            <SelectItem value="beneficiary">Beneficiary</SelectItem>
                            <SelectItem value="advisor">Technical Advisor</SelectItem>
                            <SelectItem value="monitor">Monitor/Verifier</SelectItem>
                            <SelectItem value="funder">Funder/Investor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Engagement Level</Label>
                        <Select value={stakeholder.engagement_level} onValueChange={(value) => {
                          const newStakeholders = [...stakeholders];
                          newStakeholders[index].engagement_level = value;
                          setStakeholders(newStakeholders);
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select engagement level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High - Active participation</SelectItem>
                            <SelectItem value="medium">Medium - Regular consultation</SelectItem>
                            <SelectItem value="low">Low - Informed/Aware</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="hero"
            >
              {loading ? "Submitting..." : "Submit for Verification"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectRegistration;