import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sprout, Leaf, Droplets, Bug, TrendingUp, Award, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RegenerativeFarm {
  id: string;
  project_id: string;
  farm_name: string;
  farmer_name: string;
  farm_size_hectares: number;
  farming_system: string;
  transition_start_date: string;
  certification_status: string[];
  current_practices: any;
}

interface SoilHealthTracking {
  id: string;
  farm_id: string;
  soil_organic_matter: number;
  soil_ph: number;
  water_infiltration_rate: number;
  aggregate_stability: number;
  microbial_biomass: number;
  earthworm_count: number;
  erosion_risk_score: number;
  measured_at: string;
}

interface CarbonSequestration {
  id: string;
  farm_id: string;
  measurement_method: string;
  total_carbon_sequestered: number;
  sequestration_rate: number;
  confidence_level: number;
  verification_status: string;
  measured_at: string;
}

interface SustainablePractice {
  id: string;
  farm_id: string;
  practice_category: string;
  practice_name: string;
  area_applied_hectares: number;
  implementation_cost: number;
  practice_status: string;
  success_metrics: any;
  implementation_date: string;
}

interface BiodiversityMonitoring {
  id: string;
  farm_id: string;
  species_category: string;
  species_count: number;
  species_diversity_index: number;
  beneficial_species_count: number;
  habitat_quality_score: number;
  observed_at: string;
}

export default function RegenerativeAgriculture() {
  const [farms, setFarms] = useState<RegenerativeFarm[]>([]);
  const [soilHealth, setSoilHealth] = useState<SoilHealthTracking[]>([]);
  const [carbonData, setCarbonData] = useState<CarbonSequestration[]>([]);
  const [practices, setPractices] = useState<SustainablePractice[]>([]);
  const [biodiversity, setBiodiversity] = useState<BiodiversityMonitoring[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgricultureData();
    const interval = setInterval(fetchAgricultureData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchAgricultureData = async () => {
    try {
      const [farmsRes, soilRes, carbonRes, practicesRes, biodiversityRes] = await Promise.all([
        supabase.from('regenerative_farms').select('*').order('created_at', { ascending: false }),
        supabase.from('soil_health_tracking').select('*').order('measured_at', { ascending: false }).limit(20),
        supabase.from('carbon_sequestration').select('*').eq('verification_status', 'verified').order('measured_at', { ascending: false }).limit(15),
        supabase.from('sustainable_practices').select('*').order('implementation_date', { ascending: false }).limit(25),
        supabase.from('biodiversity_monitoring').select('*').order('observed_at', { ascending: false }).limit(20)
      ]);

      if (farmsRes.data) setFarms(farmsRes.data);
      if (soilRes.data) setSoilHealth(soilRes.data);
      if (carbonRes.data) setCarbonData(carbonRes.data);
      if (practicesRes.data) setPractices(practicesRes.data);
      if (biodiversityRes.data) setBiodiversity(biodiversityRes.data);
    } catch (error) {
      console.error('Error fetching agriculture data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFarmingSystemIcon = (system: string) => {
    switch (system) {
      case 'organic': return <Leaf className="h-4 w-4 text-green-600" />;
      case 'biodynamic': return <Sprout className="h-4 w-4 text-purple-600" />;
      case 'permaculture': return <Bug className="h-4 w-4 text-orange-600" />;
      case 'agroecology': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'silvopasture': return <Droplets className="h-4 w-4 text-cyan-600" />;
      default: return <Sprout className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500';
      case 'certified': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthScore = (soilData: SoilHealthTracking) => {
    const organicMatterScore = Math.min(soilData.soil_organic_matter / 5, 1); // 5% is excellent
    const phScore = 1 - Math.abs(soilData.soil_ph - 6.5) / 2; // 6.5 is optimal
    const infiltrationScore = Math.min(soilData.water_infiltration_rate / 25, 1); // 25mm/hr is good
    const aggregateScore = soilData.aggregate_stability / 100;
    const erosionScore = 1 - soilData.erosion_risk_score;
    
    return (organicMatterScore + phScore + infiltrationScore + aggregateScore + erosionScore) / 5;
  };

  const getTotalFarmArea = () => {
    return farms.reduce((sum, farm) => sum + farm.farm_size_hectares, 0);
  };

  const getTotalCarbonSequestered = () => {
    return carbonData.reduce((sum, carbon) => sum + carbon.total_carbon_sequestered, 0);
  };

  const getAverageSoilHealth = () => {
    if (soilHealth.length === 0) return 0;
    return soilHealth.reduce((sum, soil) => sum + getHealthScore(soil), 0) / soilHealth.length;
  };

  const getActivePracticesCount = () => {
    return practices.filter(p => p.practice_status === 'active').length;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading regenerative agriculture data...</div>;
  }

  return (
    <div className="md:ml-80 p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Sprout className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
        <h1 className="text-2xl sm:text-3xl font-bold">Regenerative Agriculture</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Farms</p>
                <p className="text-xl sm:text-2xl font-bold">{farms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Area</p>
                <p className="text-xl sm:text-2xl font-bold">{getTotalFarmArea().toLocaleString()} ha</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Carbon Sequestered</p>
                <p className="text-xl sm:text-2xl font-bold">{getTotalCarbonSequestered().toFixed(1)} tC</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Active Practices</p>
                <p className="text-xl sm:text-2xl font-bold">{getActivePracticesCount()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="farms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="farms" className="text-xs sm:text-sm">Farms</TabsTrigger>
          <TabsTrigger value="soil" className="text-xs sm:text-sm">Soil Health</TabsTrigger>
          <TabsTrigger value="carbon" className="text-xs sm:text-sm">Carbon</TabsTrigger>
          <TabsTrigger value="practices" className="text-xs sm:text-sm">Practices</TabsTrigger>
          <TabsTrigger value="biodiversity" className="text-xs sm:text-sm">Biodiversity</TabsTrigger>
        </TabsList>

        <TabsContent value="farms" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {farms.map((farm) => (
              <Card key={farm.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      {getFarmingSystemIcon(farm.farming_system)}
                      <span className="truncate">{farm.farm_name}</span>
                    </CardTitle>
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {farm.farm_size_hectares} ha
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Farmer</p>
                    <p className="font-semibold text-sm sm:text-base truncate">{farm.farmer_name}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Farming System</p>
                    <p className="font-semibold text-sm sm:text-base capitalize">{farm.farming_system.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Transition Started</p>
                    <p className="font-semibold text-sm sm:text-base">{new Date(farm.transition_start_date).toLocaleDateString()}</p>
                  </div>
                  {farm.certification_status.length > 0 && (
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-1">
                        {farm.certification_status.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="soil" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {soilHealth.map((soil) => (
              <Card key={soil.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    Soil Health Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs sm:text-sm">Organic Matter</p>
                      <p className="font-semibold">{soil.soil_organic_matter.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs sm:text-sm">pH Level</p>
                      <p className="font-semibold">{soil.soil_ph.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs sm:text-sm">Water Infiltration</p>
                      <p className="font-semibold">{soil.water_infiltration_rate.toFixed(1)} mm/hr</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs sm:text-sm">Earthworms</p>
                      <p className="font-semibold">{soil.earthworm_count}/m²</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Soil Health</span>
                      <span>{(getHealthScore(soil) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={getHealthScore(soil) * 100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Aggregate Stability</span>
                      <span>{soil.aggregate_stability.toFixed(1)}%</span>
                    </div>
                    <Progress value={soil.aggregate_stability} />
                  </div>
                  <p className="text-xs text-gray-500">
                    Measured: {new Date(soil.measured_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carbon" className="space-y-4">
          {carbonData.map((carbon) => (
            <Card key={carbon.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Carbon Sequestration
                  </CardTitle>
                  <Badge className={getStatusColor(carbon.verification_status)}>
                    {carbon.verification_status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Sequestered</p>
                    <p className="text-lg font-semibold">{carbon.total_carbon_sequestered.toFixed(2)} tC/ha</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sequestration Rate</p>
                    <p className="text-lg font-semibold">{carbon.sequestration_rate.toFixed(2)} tC/ha/yr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Measurement Method</p>
                    <p className="text-lg font-semibold capitalize">{carbon.measurement_method.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Confidence Level</span>
                    <span>{(carbon.confidence_level * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={carbon.confidence_level * 100} />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Measured: {new Date(carbon.measured_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="practices" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {practices.map((practice) => (
              <Card key={practice.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base line-clamp-2">{practice.practice_name}</CardTitle>
                    <Badge className={getStatusColor(practice.practice_status)} size="sm">
                      {practice.practice_status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-sm capitalize">{practice.practice_category.replace('_', ' ')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs">Area Applied</p>
                      <p className="font-semibold">{practice.area_applied_hectares} ha</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Cost</p>
                      <p className="font-semibold">${practice.implementation_cost?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Implemented: {new Date(practice.implementation_date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="biodiversity" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {biodiversity.map((bio) => (
              <Card key={bio.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Bug className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="capitalize">{bio.species_category} Monitoring</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs sm:text-sm">Species Count</p>
                      <p className="font-semibold">{bio.species_count}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs sm:text-sm">Beneficial Species</p>
                      <p className="font-semibold">{bio.beneficial_species_count}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Diversity Index</span>
                      <span>{bio.species_diversity_index.toFixed(3)}</span>
                    </div>
                    <Progress value={(bio.species_diversity_index / 5) * 100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Habitat Quality</span>
                      <span>{(bio.habitat_quality_score * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={bio.habitat_quality_score * 100} />
                  </div>
                  <p className="text-xs text-gray-500">
                    Observed: {new Date(bio.observed_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}