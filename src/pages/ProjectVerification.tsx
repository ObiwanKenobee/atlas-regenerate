import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { MapPin, CheckCircle, XCircle, Clock, FileText, Users, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface RestorationProject {
  id: string;
  project_name: string;
  project_type: string;
  total_area: number;
  location_description: string;
  registration_status: string;
  created_at: string;
  practitioner_id: string;
}

interface ProjectDetails {
  project: RestorationProject;
  boundaries: any[];
  assessments: any[];
  stakeholders: any[];
  landUse: any[];
}

// Mock data
const mockProjects: RestorationProject[] = [
  { id: '1', project_name: 'Amazon Reforestation Initiative', project_type: 'carbon_sequestration', total_area: 500, location_description: 'Northern Amazon Basin, Brazil', registration_status: 'submitted', created_at: '2024-06-01', practitioner_id: '1' },
  { id: '2', project_name: 'Coastal Mangrove Restoration', project_type: 'marine_protection', total_area: 150, location_description: 'Sundarbans Delta, Bangladesh', registration_status: 'submitted', created_at: '2024-06-05', practitioner_id: '2' },
  { id: '3', project_name: 'Regenerative Agriculture Pilot', project_type: 'soil_restoration', total_area: 200, location_description: 'Central Valley, California', registration_status: 'verified', created_at: '2024-05-15', practitioner_id: '3' },
  { id: '4', project_name: 'Highland Forest Conservation', project_type: 'biodiversity_conservation', total_area: 800, location_description: 'Ethiopian Highlands', registration_status: 'active', created_at: '2024-04-20', practitioner_id: '4' },
  { id: '5', project_name: 'Wetland Ecosystem Revival', project_type: 'watershed_restoration', total_area: 300, location_description: 'Mississippi Delta, USA', registration_status: 'verified', created_at: '2024-05-28', practitioner_id: '5' }
];

const mockProjectDetails: Record<string, ProjectDetails> = {
  '1': {
    project: mockProjects[0],
    boundaries: [{ verification_method: 'satellite', area_hectares: 500 }],
    assessments: [
      { assessment_type: 'carbon_stock', baseline_value: 45, measurement_unit: 'tons/ha', assessment_method: 'Remote sensing', assessor_name: 'Dr. Maria Santos' },
      { assessment_type: 'biodiversity', baseline_value: 62, measurement_unit: 'score', assessment_method: 'Field survey', assessor_name: 'Dr. Carlos Rivera' }
    ],
    stakeholders: [
      { stakeholder_name: 'Indigenous Community Council', stakeholder_type: 'community', role_in_project: 'Primary stewards', engagement_level: 'high' },
      { stakeholder_name: 'Amazon Conservation NGO', stakeholder_type: 'ngo', role_in_project: 'Technical support', engagement_level: 'high' }
    ],
    landUse: [{ land_use_type: 'degraded', management_practices: 'Previously logged area' }]
  },
  '2': {
    project: mockProjects[1],
    boundaries: [{ verification_method: 'drone', area_hectares: 150 }],
    assessments: [
      { assessment_type: 'water_quality', baseline_value: 55, measurement_unit: 'score', assessment_method: 'Lab analysis', assessor_name: 'Dr. Akhtar Rahman' }
    ],
    stakeholders: [
      { stakeholder_name: 'Coastal Fishers Cooperative', stakeholder_type: 'community', role_in_project: 'Implementation partners', engagement_level: 'high' }
    ],
    landUse: [{ land_use_type: 'degraded', management_practices: 'Mangrove loss due to shrimp farming' }]
  }
};

const ProjectVerification = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<RestorationProject[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");

  const fetchProjectDetails = (projectId: string) => {
    const details = mockProjectDetails[projectId];
    if (details) {
      setSelectedProject(details);
    } else {
      // Create default details for projects without mock data
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setSelectedProject({
          project,
          boundaries: [],
          assessments: [],
          stakeholders: [],
          landUse: []
        });
      }
    }
  };

  const handleVerification = (projectId: string, status: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, registration_status: status } : p
    ));
    toast.success(`Project ${status === "verified" ? "approved" : "rejected"} successfully`);
    setVerificationNotes("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-yellow-100 text-yellow-800";
      case "verified": return "bg-green-100 text-green-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "carbon_sequestration": return "🌱";
      case "soil_restoration": return "🌾";
      case "marine_protection": return "🌊";
      case "biodiversity_conservation": return "🦋";
      case "watershed_restoration": return "💧";
      default: return "🌍";
    }
  };

  const pendingProjects = projects.filter(p => p.registration_status === "submitted");
  const verifiedProjects = projects.filter(p => p.registration_status === "verified");
  const activeProjects = projects.filter(p => p.registration_status === "active");

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Project Verification Dashboard</h1>
          <p className="text-muted-foreground">
            Review and verify restoration project registrations with geospatial and baseline data
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingProjects.length}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{verifiedProjects.length}</p>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeProjects.length}</p>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Review ({pendingProjects.length})</TabsTrigger>
            <TabsTrigger value="verified">Verified ({verifiedProjects.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
          </TabsList>

          {/* Pending Projects */}
          <TabsContent value="pending" className="space-y-4">
            {pendingProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">
                          {getProjectTypeIcon(project.project_type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{project.project_name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="capitalize">{project.project_type.replace("_", " ")}</span>
                            <span>{project.total_area} hectares</span>
                            <span>Submitted {new Date(project.created_at).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {project.location_description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(project.registration_status)}>
                          {project.registration_status}
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fetchProjectDetails(project.id)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Project Verification Review</DialogTitle>
                            </DialogHeader>
                            {selectedProject && (
                              <div className="space-y-6">
                                {/* Project Overview */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Project Overview</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="font-medium">Name:</span> {selectedProject.project.project_name}
                                      </div>
                                      <div>
                                        <span className="font-medium">Type:</span> {selectedProject.project.project_type}
                                      </div>
                                      <div>
                                        <span className="font-medium">Area:</span> {selectedProject.project.total_area} ha
                                      </div>
                                      <div>
                                        <span className="font-medium">Status:</span> {selectedProject.project.registration_status}
                                      </div>
                                    </div>
                                    <div className="mt-4">
                                      <span className="font-medium">Location:</span>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {selectedProject.project.location_description}
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Geospatial Boundaries */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Geospatial Verification</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    {selectedProject.boundaries.length > 0 ? (
                                      <div className="space-y-3">
                                        {selectedProject.boundaries.map((boundary, idx) => (
                                          <div key={idx} className="p-3 bg-muted/20 rounded-lg">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                              <div>
                                                <span className="font-medium">Verification Method:</span> {boundary.verification_method}
                                              </div>
                                              <div>
                                                <span className="font-medium">Area:</span> {boundary.area_hectares} ha
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground">No boundary data provided</p>
                                    )}
                                  </CardContent>
                                </Card>

                                {/* Baseline Assessments */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Baseline Assessments</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    {selectedProject.assessments.length > 0 ? (
                                      <div className="space-y-3">
                                        {selectedProject.assessments.map((assessment, idx) => (
                                          <div key={idx} className="p-3 bg-muted/20 rounded-lg">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                              <div>
                                                <span className="font-medium">Type:</span> {assessment.assessment_type}
                                              </div>
                                              <div>
                                                <span className="font-medium">Value:</span> {assessment.baseline_value} {assessment.measurement_unit}
                                              </div>
                                              <div>
                                                <span className="font-medium">Method:</span> {assessment.assessment_method}
                                              </div>
                                              <div>
                                                <span className="font-medium">Assessor:</span> {assessment.assessor_name}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground">No baseline assessments provided</p>
                                    )}
                                  </CardContent>
                                </Card>

                                {/* Community Stakeholders */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Community Stakeholders</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    {selectedProject.stakeholders.length > 0 ? (
                                      <div className="space-y-3">
                                        {selectedProject.stakeholders.map((stakeholder, idx) => (
                                          <div key={idx} className="p-3 bg-muted/20 rounded-lg">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                              <div>
                                                <span className="font-medium">Name:</span> {stakeholder.stakeholder_name}
                                              </div>
                                              <div>
                                                <span className="font-medium">Type:</span> {stakeholder.stakeholder_type}
                                              </div>
                                              <div>
                                                <span className="font-medium">Role:</span> {stakeholder.role_in_project}
                                              </div>
                                              <div>
                                                <span className="font-medium">Engagement:</span> {stakeholder.engagement_level}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground">No stakeholder data provided</p>
                                    )}
                                  </CardContent>
                                </Card>

                                {/* Verification Notes */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Verification Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <Textarea
                                      value={verificationNotes}
                                      onChange={(e) => setVerificationNotes(e.target.value)}
                                      placeholder="Add verification notes or feedback..."
                                      rows={4}
                                    />
                                    <div className="flex gap-3">
                                      <Button
                                        variant="outline"
                                        className="flex-1 border-red-200 hover:bg-red-50 text-red-700"
                                        onClick={() => handleVerification(selectedProject.project.id, "rejected")}
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject
                                      </Button>
                                      <Button
                                        className="flex-1"
                                        onClick={() => handleVerification(selectedProject.project.id, "verified")}
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approve
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {pendingProjects.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No pending projects to review
              </div>
            )}
          </TabsContent>

          {/* Verified Projects */}
          <TabsContent value="verified" className="space-y-4">
            {verifiedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{getProjectTypeIcon(project.project_type)}</div>
                        <div>
                          <h3 className="font-medium text-lg">{project.project_name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="capitalize">{project.project_type.replace("_", " ")}</span>
                            <span>{project.total_area} hectares</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(project.registration_status)}>
                        {project.registration_status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Active Projects */}
          <TabsContent value="active" className="space-y-4">
            {activeProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{getProjectTypeIcon(project.project_type)}</div>
                        <div>
                          <h3 className="font-medium text-lg">{project.project_name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="capitalize">{project.project_type.replace("_", " ")}</span>
                            <span>{project.total_area} hectares</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(project.registration_status)}>
                        {project.registration_status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectVerification;