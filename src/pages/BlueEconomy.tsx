import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Waves, Fish, Anchor, TreePine, AlertTriangle, Users, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MarineProject {
  id: string;
  project_name: string;
  project_type: string;
  ocean_region: string;
  project_manager: string;
  start_date: string;
  stakeholder_communities: string[];
  conservation_goals: any;
}

interface OceanVitalityMonitoring {
  id: string;
  marine_project_id: string;
  water_temperature: number;
  ph_level: number;
  dissolved_oxygen: number;
  chlorophyll_a: number;
  ocean_health_score: number;
  measured_at: string;
}

interface MarineBiodiversity {
  id: string;
  marine_project_id: string;
  species_category: string;
  species_name: string;
  population_count: number;
  conservation_status: string;
  habitat_quality: number;
  observed_at: string;
}

interface CoralReefHealth {
  id: string;
  marine_project_id: string;
  coral_cover_percentage: number;
  coral_diversity_index: number;
  bleaching_severity: number;
  resilience_score: number;
  assessed_at: string;
}

interface SustainableAquaculture {
  id: string;
  marine_project_id: string;
  farm_name: string;
  aquaculture_type: string;
  species_cultivated: string[];
  current_production: number;
  environmental_impact_score: number;
  sustainability_certifications: string[];
}

interface BlueCarbonEcosystem {
  id: string;
  marine_project_id: string;
  ecosystem_type: string;
  ecosystem_area_hectares: number;
  carbon_sequestration_rate: number;
  ecosystem_health_score: number;
  measured_at: string;
}

export default function BlueEconomy() {
  // Mock data since marine-specific tables don't exist yet
  const marineProjects: MarineProject[] = [
    { id: '1', project_name: 'Pacific Coral Restoration', project_type: 'coral_restoration', ocean_region: 'Pacific Ocean', project_manager: 'Dr. Marina Johnson', start_date: '2025-01-15', stakeholder_communities: ['Fiji Islands', 'Tonga'], conservation_goals: {} },
    { id: '2', project_name: 'North Sea Marine Protected Area', project_type: 'marine_protected_area', ocean_region: 'North Sea', project_manager: 'Prof. Erik Nielsen', start_date: '2024-06-01', stakeholder_communities: ['Coastal UK', 'Norway'], conservation_goals: {} },
    { id: '3', project_name: 'Sustainable Tuna Fishery', project_type: 'sustainable_fishery', ocean_region: 'Indian Ocean', project_manager: 'Dr. Priya Sharma', start_date: '2024-09-20', stakeholder_communities: ['Maldives', 'Sri Lanka'], conservation_goals: {} }
  ];

  const oceanVitality: OceanVitalityMonitoring[] = [
    { id: '1', marine_project_id: '1', water_temperature: 24.5, ph_level: 8.12, dissolved_oxygen: 7.2, chlorophyll_a: 0.45, ocean_health_score: 0.82, measured_at: '2026-01-30' },
    { id: '2', marine_project_id: '2', water_temperature: 12.8, ph_level: 8.08, dissolved_oxygen: 8.1, chlorophyll_a: 0.62, ocean_health_score: 0.78, measured_at: '2026-01-29' }
  ];

  const biodiversity: MarineBiodiversity[] = [
    { id: '1', marine_project_id: '1', species_category: 'fish', species_name: 'Blue Marlin', population_count: 1250, conservation_status: 'vulnerable', habitat_quality: 0.75, observed_at: '2026-01-28' },
    { id: '2', marine_project_id: '1', species_category: 'coral', species_name: 'Staghorn Coral', population_count: 3500, conservation_status: 'endangered', habitat_quality: 0.68, observed_at: '2026-01-27' },
    { id: '3', marine_project_id: '2', species_category: 'mammal', species_name: 'Harbor Seal', population_count: 850, conservation_status: 'least_concern', habitat_quality: 0.85, observed_at: '2026-01-26' }
  ];

  const coralHealth: CoralReefHealth[] = [
    { id: '1', marine_project_id: '1', coral_cover_percentage: 42.5, coral_diversity_index: 0.756, bleaching_severity: 0.15, resilience_score: 0.72, assessed_at: '2026-01-25' },
    { id: '2', marine_project_id: '2', coral_cover_percentage: 35.2, coral_diversity_index: 0.682, bleaching_severity: 0.22, resilience_score: 0.65, assessed_at: '2026-01-24' }
  ];

  const aquaculture: SustainableAquaculture[] = [
    { id: '1', marine_project_id: '1', farm_name: 'Pacific Pearl Farm', aquaculture_type: 'integrated', species_cultivated: ['Oysters', 'Seaweed'], current_production: 12500, environmental_impact_score: 0.88, sustainability_certifications: ['ASC', 'MSC'] },
    { id: '2', marine_project_id: '3', farm_name: 'Ocean Harvest Tuna', aquaculture_type: 'cage', species_cultivated: ['Bluefin Tuna'], current_production: 8500, environmental_impact_score: 0.72, sustainability_certifications: ['MSC'] }
  ];

  const blueCarbon: BlueCarbonEcosystem[] = [
    { id: '1', marine_project_id: '1', ecosystem_type: 'mangrove', ecosystem_area_hectares: 1250, carbon_sequestration_rate: 8.5, ecosystem_health_score: 0.82, measured_at: '2026-01-20' },
    { id: '2', marine_project_id: '2', ecosystem_type: 'seagrass', ecosystem_area_hectares: 850, carbon_sequestration_rate: 6.2, ecosystem_health_score: 0.78, measured_at: '2026-01-19' }
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'coral_restoration': return <TreePine className="h-4 w-4 text-orange-600" />;
      case 'marine_protected_area': return <Waves className="h-4 w-4 text-blue-600" />;
      case 'sustainable_fishery': return <Fish className="h-4 w-4 text-green-600" />;
      case 'aquaculture': return <Anchor className="h-4 w-4 text-purple-600" />;
      case 'seaweed_farming': return <TreePine className="h-4 w-4 text-teal-600" />;
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
    if (oceanVitality.length === 0) return 0;
    return oceanVitality.reduce((sum, v) => sum + v.ocean_health_score, 0) / oceanVitality.length;
  };

  const getTotalAquacultureProduction = () => {
    return aquaculture.reduce((sum, farm) => sum + farm.current_production, 0);
  };

  const getTotalBlueCarbonSequestration = () => {
    return blueCarbon.reduce((sum, ecosystem) => sum + (ecosystem.carbon_sequestration_rate * ecosystem.ecosystem_area_hectares), 0);
  };

  const getEndangeredSpeciesCount = () => {
    return biodiversity.filter(b => ['endangered', 'critically_endangered'].includes(b.conservation_status)).length;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading blue economy data...</div>;
  }

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
                <p className="text-sm text-gray-600">Marine Projects</p>
                <p className="text-2xl font-bold">{marineProjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Ocean Health</p>
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
                <p className="text-sm text-gray-600">Aquaculture Production</p>
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
                <p className="text-sm text-gray-600">Blue Carbon</p>
                <p className="text-2xl font-bold">{getTotalBlueCarbonSequestration().toFixed(1)} tC/yr</p>
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
            {marineProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getProjectTypeIcon(project.project_type)}
                      {project.project_name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Project Type</p>
                      <p className="font-semibold capitalize">{project.project_type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ocean Region</p>
                      <p className="font-semibold">{project.ocean_region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Project Manager</p>
                      <p className="font-semibold">{project.project_manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Communities</p>
                      <p className="text-sm">{project.stakeholder_communities.length} communities involved</p>
                    </div>
                    <p className="text-xs text-gray-500">
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
            {oceanVitality.map((vitality) => (
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
                        <p className="text-gray-600">Temperature</p>
                        <p className="font-semibold">{vitality.water_temperature.toFixed(1)}°C</p>
                      </div>
                      <div>
                        <p className="text-gray-600">pH Level</p>
                        <p className="font-semibold">{vitality.ph_level.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Dissolved O₂</p>
                        <p className="font-semibold">{vitality.dissolved_oxygen.toFixed(1)} mg/L</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Chlorophyll-a</p>
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
                    <p className="text-xs text-gray-500">
                      Measured: {new Date(vitality.measured_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="biodiversity" className="space-y-4">
          {biodiversity.map((bio) => (
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
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold capitalize">{bio.species_category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Population Count</p>
                    <p className="font-semibold">{bio.population_count?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Habitat Quality</p>
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
                <p className="text-xs text-gray-500 mt-2">
                  Observed: {new Date(bio.observed_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="coral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coralHealth.map((coral) => (
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
                        <p className="text-gray-600">Coral Cover</p>
                        <p className="font-semibold">{coral.coral_cover_percentage.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Diversity Index</p>
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
                    <p className="text-xs text-gray-500">
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
            {aquaculture.map((farm) => (
              <Card key={farm.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Anchor className="h-5 w-5" />
                      {farm.farm_name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-semibold capitalize">{farm.aquaculture_type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Production</p>
                      <p className="font-semibold">{(farm.current_production / 1000).toFixed(1)}k kg/year</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Species</p>
                      <div className="flex flex-wrap gap-1">
                        {farm.species_cultivated.slice(0, 3).map((species, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {species}
                          </Badge>
                        ))}
                        {farm.species_cultivated.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{farm.species_cultivated.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Environmental Impact</span>
                        <span className={farm.environmental_impact_score <= 0.3 ? 'text-green-600' : farm.environmental_impact_score <= 0.6 ? 'text-yellow-600' : 'text-red-600'}>
                          {(farm.environmental_impact_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={farm.environmental_impact_score * 100} />
                    </div>
                    {farm.sustainability_certifications.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Certifications</p>
                        <div className="flex flex-wrap gap-1">
                          {farm.sustainability_certifications.map((cert, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carbon" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blueCarbon.map((carbon) => (
              <Card key={carbon.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5" />
                    {carbon.ecosystem_type.replace('_', ' ')} Ecosystem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Area</p>
                        <p className="font-semibold">{carbon.ecosystem_area_hectares.toFixed(1)} ha</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Sequestration Rate</p>
                        <p className="font-semibold">{carbon.carbon_sequestration_rate.toFixed(2)} tC/ha/yr</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Annual Sequestration</p>
                      <p className="text-lg font-semibold text-green-600">
                        {(carbon.carbon_sequestration_rate * carbon.ecosystem_area_hectares).toFixed(1)} tC/year
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ecosystem Health</span>
                        <span className={getHealthScoreColor(carbon.ecosystem_health_score)}>
                          {(carbon.ecosystem_health_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={carbon.ecosystem_health_score * 100} />
                    </div>
                    <p className="text-xs text-gray-500">
                      Measured: {new Date(carbon.measured_at).toLocaleDateString()}
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