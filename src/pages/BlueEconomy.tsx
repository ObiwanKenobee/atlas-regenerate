import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Waves, Fish, Anchor, TreePine, TrendingUp } from 'lucide-react';

// Mock data for Blue Economy dashboard
const mockMarineProjects = [
  { id: '1', project_name: 'Pacific Coral Restoration', project_type: 'coral_restoration', ocean_region: 'Pacific Ocean', project_manager: 'Dr. Sarah Chen', start_date: '2024-01-15', stakeholder_communities: ['Fiji', 'Samoa', 'Tonga'] },
  { id: '2', project_name: 'Atlantic Marine Sanctuary', project_type: 'marine_protected_area', ocean_region: 'Atlantic Ocean', project_manager: 'James Wilson', start_date: '2024-03-01', stakeholder_communities: ['Bahamas', 'Bermuda'] },
  { id: '3', project_name: 'Sustainable Fishery Initiative', project_type: 'sustainable_fishery', ocean_region: 'Indian Ocean', project_manager: 'Arun Patel', start_date: '2024-02-20', stakeholder_communities: ['Maldives', 'Sri Lanka'] },
];

const mockOceanVitality = [
  { id: '1', water_temperature: 24.5, ph_level: 8.1, dissolved_oxygen: 7.2, chlorophyll_a: 0.45, ocean_health_score: 0.82, measured_at: '2024-12-01' },
  { id: '2', water_temperature: 22.8, ph_level: 8.05, dissolved_oxygen: 7.8, chlorophyll_a: 0.52, ocean_health_score: 0.78, measured_at: '2024-12-05' },
];

const mockBiodiversity = [
  { id: '1', species_category: 'fish', species_name: 'Blue Marlin', population_count: 12500, conservation_status: 'vulnerable', habitat_quality: 0.75, observed_at: '2024-12-01' },
  { id: '2', species_category: 'mammal', species_name: 'Humpback Whale', population_count: 8400, conservation_status: 'least_concern', habitat_quality: 0.85, observed_at: '2024-12-03' },
  { id: '3', species_category: 'reptile', species_name: 'Green Sea Turtle', population_count: 3200, conservation_status: 'endangered', habitat_quality: 0.65, observed_at: '2024-12-02' },
];

const mockCoralHealth = [
  { id: '1', coral_cover_percentage: 45.2, coral_diversity_index: 0.78, bleaching_severity: 0.15, resilience_score: 0.72, assessed_at: '2024-12-01' },
  { id: '2', coral_cover_percentage: 52.8, coral_diversity_index: 0.85, bleaching_severity: 0.08, resilience_score: 0.88, assessed_at: '2024-12-05' },
];

const mockAquaculture = [
  { id: '1', farm_name: 'Pacific Seaweed Farm', aquaculture_type: 'seaweed', species_cultivated: ['Kelp', 'Wakame'], current_production: 15000, environmental_impact_score: 0.92, sustainability_certifications: ['ASC', 'MSC'] },
  { id: '2', farm_name: 'Sustainable Shrimp Co', aquaculture_type: 'shrimp', species_cultivated: ['Pacific White Shrimp'], current_production: 8500, environmental_impact_score: 0.78, sustainability_certifications: ['BAP'] },
];

const mockBlueCarbon = [
  { id: '1', ecosystem_type: 'mangrove', ecosystem_area_hectares: 1250, carbon_sequestration_rate: 3.2, ecosystem_health_score: 0.85, measured_at: '2024-12-01' },
  { id: '2', ecosystem_type: 'seagrass', ecosystem_area_hectares: 890, carbon_sequestration_rate: 2.8, ecosystem_health_score: 0.78, measured_at: '2024-12-03' },
];

export default function BlueEconomy() {
  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'coral_restoration': return <TreePine className="h-4 w-4 text-orange-600" />;
      case 'marine_protected_area': return <Waves className="h-4 w-4 text-blue-600" />;
      case 'sustainable_fishery': return <Fish className="h-4 w-4 text-green-600" />;
      case 'aquaculture': return <Anchor className="h-4 w-4 text-purple-600" />;
      default: return <Waves className="h-4 w-4 text-gray-600" />;
    }
  };

  const getConservationStatusColor = (status: string) => {
    switch (status) {
      case 'least_concern': return 'bg-green-500';
      case 'vulnerable': return 'bg-yellow-500';
      case 'endangered': return 'bg-orange-500';
      case 'critically_endangered': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAverageOceanHealth = () => {
    return mockOceanVitality.reduce((sum, v) => sum + v.ocean_health_score, 0) / mockOceanVitality.length;
  };

  const getTotalAquacultureProduction = () => {
    return mockAquaculture.reduce((sum, farm) => sum + farm.current_production, 0);
  };

  const getTotalBlueCarbonSequestration = () => {
    return mockBlueCarbon.reduce((sum, eco) => sum + (eco.carbon_sequestration_rate * eco.ecosystem_area_hectares), 0);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Waves className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Blue Economy</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Marine Projects</p>
                <p className="text-2xl font-bold">{mockMarineProjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Ocean Health</p>
                <p className={`text-2xl font-bold ${getHealthScoreColor(getAverageOceanHealth())}`}>
                  {(getAverageOceanHealth() * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Fish className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Aquaculture Production</p>
                <p className="text-2xl font-bold">{(getTotalAquacultureProduction() / 1000).toFixed(1)}k kg</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm text-muted-foreground">Blue Carbon</p>
                <p className="text-2xl font-bold">{getTotalBlueCarbonSequestration().toFixed(0)} tC/yr</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Marine Projects</TabsTrigger>
          <TabsTrigger value="vitality">Ocean Vitality</TabsTrigger>
          <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
          <TabsTrigger value="coral">Coral Reefs</TabsTrigger>
          <TabsTrigger value="aquaculture">Aquaculture</TabsTrigger>
          <TabsTrigger value="carbon">Blue Carbon</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMarineProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getProjectTypeIcon(project.project_type)}
                    {project.project_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Project Type</p>
                      <p className="font-semibold capitalize">{project.project_type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ocean Region</p>
                      <p className="font-semibold">{project.ocean_region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Project Manager</p>
                      <p className="font-semibold">{project.project_manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Communities</p>
                      <p className="text-sm">{project.stakeholder_communities.length} communities involved</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Started: {new Date(project.start_date).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vitality" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockOceanVitality.map((vitality) => (
              <Card key={vitality.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5" />
                    Ocean Vitality Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Temperature</p>
                        <p className="font-semibold">{vitality.water_temperature.toFixed(1)}°C</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">pH Level</p>
                        <p className="font-semibold">{vitality.ph_level.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dissolved O₂</p>
                        <p className="font-semibold">{vitality.dissolved_oxygen.toFixed(1)} mg/L</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Chlorophyll-a</p>
                        <p className="font-semibold">{vitality.chlorophyll_a.toFixed(2)} mg/m³</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ocean Health Score</span>
                        <span className={getHealthScoreColor(vitality.ocean_health_score)}>
                          {(vitality.ocean_health_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={vitality.ocean_health_score * 100} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Measured: {new Date(vitality.measured_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="biodiversity" className="space-y-4">
          {mockBiodiversity.map((bio) => (
            <Card key={bio.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Fish className="h-5 w-5" />
                    {bio.species_name}
                  </CardTitle>
                  <Badge className={getConservationStatusColor(bio.conservation_status)}>
                    {bio.conservation_status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-semibold capitalize">{bio.species_category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Population Count</p>
                    <p className="font-semibold">{bio.population_count?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Habitat Quality</p>
                    <p className={`font-semibold ${getHealthScoreColor(bio.habitat_quality)}`}>
                      {(bio.habitat_quality * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Habitat Quality</span>
                    <span>{(bio.habitat_quality * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={bio.habitat_quality * 100} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Observed: {new Date(bio.observed_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="coral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCoralHealth.map((coral) => (
              <Card key={coral.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5" />
                    Coral Reef Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Coral Cover</p>
                        <p className="font-semibold">{coral.coral_cover_percentage.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Diversity Index</p>
                        <p className="font-semibold">{coral.coral_diversity_index.toFixed(3)}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Bleaching Severity</span>
                        <span className="text-red-600">{(coral.bleaching_severity * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={coral.bleaching_severity * 100} className="bg-red-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Resilience Score</span>
                        <span className={getHealthScoreColor(coral.resilience_score)}>
                          {(coral.resilience_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={coral.resilience_score * 100} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Assessed: {new Date(coral.assessed_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="aquaculture" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAquaculture.map((farm) => (
              <Card key={farm.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Anchor className="h-5 w-5" />
                    {farm.farm_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-semibold capitalize">{farm.aquaculture_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Species</p>
                      <p className="text-sm">{farm.species_cultivated.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Production</p>
                      <p className="font-semibold">{farm.current_production.toLocaleString()} kg</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Environmental Score</span>
                        <span className={getHealthScoreColor(farm.environmental_impact_score)}>
                          {(farm.environmental_impact_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={farm.environmental_impact_score * 100} />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {farm.sustainability_certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carbon" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBlueCarbon.map((eco) => (
              <Card key={eco.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5" />
                    {eco.ecosystem_type.charAt(0).toUpperCase() + eco.ecosystem_type.slice(1)} Ecosystem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Area</p>
                        <p className="font-semibold">{eco.ecosystem_area_hectares.toLocaleString()} ha</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Carbon Rate</p>
                        <p className="font-semibold">{eco.carbon_sequestration_rate} tC/ha/yr</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ecosystem Health</span>
                        <span className={getHealthScoreColor(eco.ecosystem_health_score)}>
                          {(eco.ecosystem_health_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={eco.ecosystem_health_score * 100} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Measured: {new Date(eco.measured_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
