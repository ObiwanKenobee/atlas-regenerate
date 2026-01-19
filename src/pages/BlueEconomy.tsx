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
  const [marineProjects, setMarineProjects] = useState<MarineProject[]>([]);
  const [oceanVitality, setOceanVitality] = useState<OceanVitalityMonitoring[]>([]);
  const [biodiversity, setBiodiversity] = useState<MarineBiodiversity[]>([]);
  const [coralHealth, setCoralHealth] = useState<CoralReefHealth[]>([]);
  const [aquaculture, setAquaculture] = useState<SustainableAquaculture[]>([]);
  const [blueCarbon, setBlueCarbon] = useState<BlueCarbonEcosystem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlueEconomyData();
    const interval = setInterval(fetchBlueEconomyData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchBlueEconomyData = async () => {
    try {
      const [projectsRes, vitalityRes, biodiversityRes, coralRes, aquacultureRes, carbonRes] = await Promise.all([
        supabase.from('marine_projects').select('*').order('created_at', { ascending: false }),
        supabase.from('ocean_vitality_monitoring').select('*').order('measured_at', { ascending: false }).limit(20),
        supabase.from('marine_biodiversity').select('*').order('observed_at', { ascending: false }).limit(25),
        supabase.from('coral_reef_health').select('*').order('assessed_at', { ascending: false }).limit(15),
        supabase.from('sustainable_aquaculture').select('*').order('created_at', { ascending: false }),
        supabase.from('blue_carbon_ecosystems').select('*').order('measured_at', { ascending: false }).limit(20)
      ]);

      if (projectsRes.data) setMarineProjects(projectsRes.data);
      if (vitalityRes.data) setOceanVitality(vitalityRes.data);
      if (biodiversityRes.data) setBiodiversity(biodiversityRes.data);
      if (coralRes.data) setCoralHealth(coralRes.data);
      if (aquacultureRes.data) setAquaculture(aquacultureRes.data);
      if (carbonRes.data) setBlueCarbon(carbonRes.data);
    } catch (error) {
      console.error('Error fetching blue economy data:', error);
    } finally {
      setLoading(false);
    }
  };

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