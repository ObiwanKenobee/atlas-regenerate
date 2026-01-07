import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Sprout, TrendingUp, DollarSign, Users, Target, 
  Calendar, Award, Bell, Plus, Eye, Edit 
} from 'lucide-react';

export default function PractitionerDashboardFlow() {
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Regenerative Transition Farm',
      status: 'active',
      progress: 65,
      funding: { raised: 45000, goal: 75000 },
      metrics: { soilHealth: 78, carbonSequestered: 12.5, biodiversity: 85 },
      nextMilestone: 'Soil testing results',
      daysToMilestone: 5
    },
    {
      id: '2',
      name: 'Community Garden Network',
      status: 'planning',
      progress: 25,
      funding: { raised: 8000, goal: 25000 },
      metrics: { soilHealth: 45, carbonSequestered: 2.1, biodiversity: 60 },
      nextMilestone: 'Permit approval',
      daysToMilestone: 12
    }
  ]);

  const [notifications] = useState([
    { id: '1', type: 'funding', message: 'New investor interested in your project', time: '2 hours ago' },
    { id: '2', type: 'milestone', message: 'Soil health milestone achieved!', time: '1 day ago' },
    { id: '3', type: 'community', message: 'New knowledge sharing opportunity', time: '3 days ago' }
  ]);

  const [impactMetrics] = useState({
    totalCarbonSequestered: 14.6,
    soilHealthImprovement: 23,
    biodiversityIncrease: 18,
    communityMembers: 156,
    fundingReceived: 53000,
    projectsActive: 2
  });

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Practitioner Dashboard</h1>
            <p className="text-gray-600">Welcome back, Sarah! Track your regenerative impact.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications ({notifications.length})
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Impact Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Carbon Sequestered</p>
                  <p className="text-lg font-bold">{impactMetrics.totalCarbonSequestered} tCO₂</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Soil Health</p>
                  <p className="text-lg font-bold">+{impactMetrics.soilHealthImprovement}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Biodiversity</p>
                  <p className="text-lg font-bold">+{impactMetrics.biodiversityIncrease}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Community</p>
                  <p className="text-lg font-bold">{impactMetrics.communityMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Funding</p>
                  <p className="text-lg font-bold">${(impactMetrics.fundingReceived / 1000).toFixed(0)}k</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-xs text-gray-600">Active Projects</p>
                  <p className="text-lg font-bold">{impactMetrics.projectsActive}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="impact">Impact Tracking</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Projects</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Project Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Funding Progress</span>
                        <span>${project.funding.raised.toLocaleString()} / ${project.funding.goal.toLocaleString()}</span>
                      </div>
                      <Progress value={(project.funding.raised / project.funding.goal) * 100} />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-600">Soil Health</p>
                        <p className="font-semibold">{project.metrics.soilHealth}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Carbon</p>
                        <p className="font-semibold">{project.metrics.carbonSequestered} tCO₂</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Biodiversity</p>
                        <p className="font-semibold">{project.metrics.biodiversity}%</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">Next Milestone</p>
                          <p className="text-xs text-gray-600">{project.nextMilestone} in {project.daysToMilestone} days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Funding Tab */}
          <TabsContent value="funding" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Funding Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Raised</p>
                      <p className="text-2xl font-bold text-green-600">${impactMetrics.fundingReceived.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Investors</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                  <Button className="w-full">Apply for Additional Funding</Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Recent Funding Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Investment Received</p>
                        <p className="text-sm text-gray-600">Green Impact Fund</p>
                      </div>
                      <p className="font-bold text-green-600">+$15,000</p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Grant Approved</p>
                        <p className="text-sm text-gray-600">Regenerative Agriculture Initiative</p>
                      </div>
                      <p className="font-bold text-blue-600">+$25,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Impact Tracking Tab */}
          <TabsContent value="impact" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-600" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Carbon Sequestration</span>
                      <span>14.6 tCO₂</span>
                    </div>
                    <Progress value={73} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Soil Health</span>
                      <span>+23%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Water Conservation</span>
                      <span>2,400L saved</span>
                    </div>
                    <Progress value={65} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Social Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Jobs Created</span>
                      <span>8 positions</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Community Engagement</span>
                      <span>156 members</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Knowledge Sharing</span>
                      <span>24 sessions</span>
                    </div>
                    <Progress value={70} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Economic Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Revenue Generated</span>
                      <span>$42,000</span>
                    </div>
                    <Progress value={68} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cost Savings</span>
                      <span>$8,500</span>
                    </div>
                    <Progress value={55} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>ROI</span>
                      <span>12.5%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Knowledge Sharing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Soil Testing Workshop</h4>
                      <p className="text-sm text-gray-600">Share your soil testing methodology</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline">Agriculture</Badge>
                        <Button size="sm">Join Discussion</Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Carbon Credit Marketplace</h4>
                      <p className="text-sm text-gray-600">Learn about carbon credit opportunities</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline">Carbon</Badge>
                        <Button size="sm">Learn More</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Bell className="h-4 w-4 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserFlowLayout>
  );
}