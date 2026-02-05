import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Users, Mail, BarChart3, Shield, Plus, Edit, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  organization: string;
  role: string;
  created_at: string;
}

interface WaitlistEntry {
  id: string;
  email: string;
  organization: string;
  stakeholder_type: string;
  created_at: string;
}

interface Project {
  id: string;
  project_name: string;
  description: string;
  location: any;
  funding_goal: number;
  funding_raised: number;
  project_type: string;
  status: string;
  created_at: string;
}

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // New project form state
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    funding_goal: "",
    project_type: "agriculture",
    image_url: "/placeholder.svg"
  });

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data?.role !== 'admin') {
        toast.error("Access denied. Admin privileges required.");
        navigate("/dashboard");
        return;
      }
      
      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch profiles (without the users join since auth.users is not accessible via the client)
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      // Map profiles with placeholder email from user_id
      const mappedProfiles = (profilesData || []).map(p => ({
        ...p,
        email: p.full_name ? `${p.full_name.toLowerCase().replace(/\s+/g, '.')}@example.com` : 'N/A'
      }));

      // Fetch waitlist
      const { data: waitlistData, error: waitlistError } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      if (waitlistError) throw waitlistError;

      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (projectsError) throw projectsError;

      setProfiles(mappedProfiles);
      setWaitlist(waitlistData || []);
      setProjects(projectsData || []);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Failed to load admin data");
    }
  };

  const toggleAdminStatus = async (profileId: string, currentStatus: boolean) => {
    try {
      const newRole = currentStatus ? 'practitioner' : 'admin';
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", profileId);

      if (error) throw error;
      
      toast.success(`Admin status ${newRole === 'admin' ? "granted" : "revoked"} successfully`);
      fetchData();
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast.error("Failed to update admin status");
    }
  };

  const deleteWaitlistEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from("waitlist")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Waitlist entry deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting waitlist entry:", error);
      toast.error("Failed to delete waitlist entry");
    }
  };

  const createProject = async () => {
    try {
      const { error } = await supabase
        .from("projects")
        .insert([{
          project_name: newProject.title,
          owner_id: user?.id,
          description: newProject.description,
          location: { address: newProject.location, lat: parseFloat(newProject.latitude) || null, lng: parseFloat(newProject.longitude) || null },
          funding_goal: parseFloat(newProject.funding_goal) || 0,
          project_type: newProject.project_type,
          status: "active"
        }]);

      if (error) throw error;
      
      toast.success("Project created successfully");
      setNewProject({
        title: "",
        description: "",
        location: "",
        latitude: "",
        longitude: "",
        funding_goal: "",
        project_type: "agriculture",
        image_url: "/placeholder.svg"
      });
      fetchData();
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-4xl mb-2">Admin Panel</h1>
              <p className="text-muted-foreground">
                Manage users, projects, and platform data
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="waitlist" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Waitlist
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Metrics
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="glass">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell>{profile.full_name || "N/A"}</TableCell>
                        <TableCell>{profile.email || "N/A"}</TableCell>
                        <TableCell>{profile.organization || "N/A"}</TableCell>
                        <TableCell>{profile.role || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant={profile.role === 'admin' ? "default" : "secondary"}>
                            {profile.role === 'admin' ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleAdminStatus(profile.id, profile.role === 'admin')}
                          >
                            {profile.role === 'admin' ? "Revoke Admin" : "Grant Admin"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Waitlist Tab */}
          <TabsContent value="waitlist">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Waitlist Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waitlist.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.email}</TableCell>
                        <TableCell>{entry.organization || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {entry.stakeholder_type || "N/A"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(entry.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteWaitlistEntry(entry.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Project Management</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newProject.title}
                            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={newProject.location}
                            onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                          />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProject.description}
                            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="latitude">Latitude</Label>
                          <Input
                            id="latitude"
                            type="number"
                            step="any"
                            value={newProject.latitude}
                            onChange={(e) => setNewProject({...newProject, latitude: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="longitude">Longitude</Label>
                          <Input
                            id="longitude"
                            type="number"
                            step="any"
                            value={newProject.longitude}
                            onChange={(e) => setNewProject({...newProject, longitude: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="funding_goal">Funding Goal ($)</Label>
                          <Input
                            id="funding_goal"
                            type="number"
                            value={newProject.funding_goal}
                            onChange={(e) => setNewProject({...newProject, funding_goal: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project_type">Project Type</Label>
                          <Select
                            value={newProject.project_type}
                            onValueChange={(value) => setNewProject({...newProject, project_type: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="agriculture">Agriculture</SelectItem>
                              <SelectItem value="marine">Marine</SelectItem>
                              <SelectItem value="forestry">Forestry</SelectItem>
                              <SelectItem value="renewable">Renewable Energy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Button onClick={createProject} className="w-full">
                            Create Project
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Funding</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.project_name}</TableCell>
                        <TableCell>{typeof project.location === 'object' ? (project.location?.address || 'N/A') : project.location || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {project.project_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          ${project.funding_raised.toLocaleString()} / ${project.funding_goal.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={project.status === "active" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/project/${project.id}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Platform Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-lg bg-muted/20">
                    <h3 className="font-medium mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-primary">{profiles.length}</p>
                  </div>
                  <div className="p-6 rounded-lg bg-muted/20">
                    <h3 className="font-medium mb-2">Active Projects</h3>
                    <p className="text-3xl font-bold text-primary">
                      {projects.filter(p => p.status === "active").length}
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-muted/20">
                    <h3 className="font-medium mb-2">Waitlist Entries</h3>
                    <p className="text-3xl font-bold text-primary">{waitlist.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;