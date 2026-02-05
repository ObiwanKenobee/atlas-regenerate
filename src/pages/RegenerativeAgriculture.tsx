import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sprout, Leaf, Droplets, Bug, TrendingUp, Award, DollarSign, MapPin, Calendar, Plus, Filter, Download, Zap } from 'lucide-react';
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
  location: { lat: number; lng: number; address: string };
  contact_info: { email: string; phone: string };
  financial_data: { revenue: number; costs: number; profit_margin: number };
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
  trend: 'improving' | 'stable' | 'declining';
  next_test_date: string;
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
  carbon_credits_generated: number;
  market_value: number;
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
  roi_percentage: number;
  environmental_impact: number;
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
  conservation_status: string;
  ecosystem_services_value: number;
}

export default function RegenerativeAgriculture() {
  const [farms, setFarms] = useState<RegenerativeFarm[]>([]);
  const [soilHealth, setSoilHealth] = useState<SoilHealthTracking[]>([]);
  const [carbonData, setCarbonData] = useState<CarbonSequestration[]>([]);
  const [practices, setPractices] = useState<SustainablePractice[]>([]);
  const [biodiversity, setBiodiversity] = useState<BiodiversityMonitoring[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Mock data for demonstration
  const mockFarms: RegenerativeFarm[] = [
    {
      id: '1',
      project_id: 'proj_001',
      farm_name: 'Green Valley Organic Farm',
      farmer_name: 'Maria Rodriguez',
      farm_size_hectares: 150,
      farming_system: 'organic',
      transition_start_date: '2022-03-15',
      certification_status: ['Organic', 'Regenerative Organic'],
      current_practices: {},
      location: { lat: 40.7128, lng: -74.0060, address: 'California, USA' },
      contact_info: { email: 'maria@greenvalley.com', phone: '+1-555-0123' },
      financial_data: { revenue: 285000, costs: 180000, profit_margin: 36.8 }
    },
    {
      id: '2',
      project_id: 'proj_002',
      farm_name: 'Sunrise Regenerative Ranch',
      farmer_name: 'John Thompson',
      farm_size_hectares: 320,
      farming_system: 'silvopasture',
      transition_start_date: '2021-08-20',
      certification_status: ['Carbon Verified', 'Grassland Alliance'],
      current_practices: {},
      location: { lat: 39.7392, lng: -104.9903, address: 'Colorado, USA' },
      contact_info: { email: 'john@sunriseranch.com', phone: '+1-555-0456' },
      financial_data: { revenue: 450000, costs: 290000, profit_margin: 35.6 }
    },
    {
      id: '3',
      project_id: 'proj_003',
      farm_name: 'Terra Nova Permaculture',
      farmer_name: 'Sarah Chen',
      farm_size_hectares: 85,
      farming_system: 'permaculture',
      transition_start_date: '2023-01-10',
      certification_status: ['Biodynamic', 'Fair Trade'],
      current_practices: {},
      location: { lat: 45.5152, lng: -122.6784, address: 'Oregon, USA' },
      contact_info: { email: 'sarah@terranova.com', phone: '+1-555-0789' },
      financial_data: { revenue: 125000, costs: 85000, profit_margin: 32.0 }
    }
  ];

  const mockSoilHealth: SoilHealthTracking[] = [
    {
      id: '1',
      farm_id: '1',
      soil_organic_matter: 4.2,
      soil_ph: 6.8,
      water_infiltration_rate: 28.5,
      aggregate_stability: 85,
      microbial_biomass: 450,
      earthworm_count: 12,
      erosion_risk_score: 0.15,
      measured_at: '2024-01-15',
      trend: 'improving',
      next_test_date: '2024-07-15'
    },
    {
      id: '2',
      farm_id: '2',
      soil_organic_matter: 5.1,
      soil_ph: 6.5,
      water_infiltration_rate: 32.0,
      aggregate_stability: 92,
      microbial_biomass: 520,
      earthworm_count: 18,
      erosion_risk_score: 0.08,
      measured_at: '2024-01-20',
      trend: 'improving',
      next_test_date: '2024-07-20'
    }
  ];

  const mockCarbonData: CarbonSequestration[] = [
    {
      id: '1',
      farm_id: '1',
      measurement_method: 'soil_sampling',
      total_carbon_sequestered: 18.5,
      sequestration_rate: 2.3,
      confidence_level: 0.94,
      verification_status: 'verified',
      measured_at: '2024-01-15',
      carbon_credits_generated: 18,
      market_value: 990
    },
    {
      id: '2',
      farm_id: '2',
      measurement_method: 'remote_sensing',
      total_carbon_sequestered: 42.8,
      sequestration_rate: 3.1,
      confidence_level: 0.91,
      verification_status: 'verified',
      measured_at: '2024-01-20',
      carbon_credits_generated: 42,
      market_value: 2310
    }
  ];

  useEffect(() => {
    // Simulate loading real data
    const loadData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFarms(mockFarms);
      setSoilHealth(mockSoilHealth);
      setCarbonData(mockCarbonData);
      setPractices([]);
      setBiodiversity([]);
      setLoading(false);
    };

    loadData();

    // Real-time updates simulation
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        // Simulate real-time metric updates
        setSoilHealth(prev => prev.map(soil => ({
          ...soil,
          soil_organic_matter: soil.soil_organic_matter + (Math.random() - 0.5) * 0.1,
          microbial_biomass: soil.microbial_biomass + (Math.random() - 0.5) * 10
        })));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [realTimeUpdates]);

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
      case 'improving': return 'bg-green-500';
      case 'stable': return 'bg-yellow-500';
      case 'declining': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthScore = (soilData: SoilHealthTracking) => {
    const organicMatterScore = Math.min(soilData.soil_organic_matter / 5, 1);
    const phScore = 1 - Math.abs(soilData.soil_ph - 6.5) / 2;
    const infiltrationScore = Math.min(soilData.water_infiltration_rate / 25, 1);
    const aggregateScore = soilData.aggregate_stability / 100;
    const erosionScore = 1 - soilData.erosion_risk_score;
    
    return (organicMatterScore + phScore + infiltrationScore + aggregateScore + erosionScore) / 5;
  };

  const getTotalFarmArea = () => farms.reduce((sum, farm) => sum + farm.farm_size_hectares, 0);
  const getTotalCarbonSequestered = () => carbonData.reduce((sum, carbon) => sum + carbon.total_carbon_sequestered, 0);
  const getAverageSoilHealth = () => {
    if (soilHealth.length === 0) return 0;
    return soilHealth.reduce((sum, soil) => sum + getHealthScore(soil), 0) / soilHealth.length;
  };
  const getActivePracticesCount = () => practices.filter(p => p.practice_status === 'active').length;
  const getTotalCarbonCreditsValue = () => carbonData.reduce((sum, carbon) => sum + carbon.market_value, 0);
  const getAverageROI = () => {
    if (farms.length === 0) return 0;
    return farms.reduce((sum, farm) => sum + farm.financial_data.profit_margin, 0) / farms.length;
  };

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.farm_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.farmer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'all' || farm.location.address.includes(filterRegion);
    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return (
      <div className="md:ml-80 p-4 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-lg font-semibold text-gray-700">Loading regenerative agriculture data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-80 p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header with Real-time Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Sprout className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Regenerative Agriculture</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${realTimeUpdates ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-xs text-gray-600">
                {realTimeUpdates ? 'Live Updates' : 'Static Data'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
          >
            <Zap className="h-4 w-4 mr-2" />
            {realTimeUpdates ? 'Pause' : 'Resume'} Updates
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Farm
          </Button>
        </div>
      </div>

      {/* Enhanced Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-4 w-4 sm:h-5 sm:w-5 text-green-100" />
              <div>
                <p className="text-xs text-green-100">Total Farms</p>
                <p className="text-xl sm:text-2xl font-bold">{farms.length}</p>
                <p className="text-xs text-green-200">+12% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-100" />
              <div>
                <p className="text-xs text-blue-100">Total Area</p>
                <p className="text-xl sm:text-2xl font-bold">{getTotalFarmArea().toLocaleString()} ha</p>
                <p className="text-xs text-blue-200">Across 3 regions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-purple-100" />
              <div>
                <p className="text-xs text-purple-100">Carbon Sequestered</p>
                <p className="text-xl sm:text-2xl font-bold">{getTotalCarbonSequestered().toFixed(1)} tC</p>
                <p className="text-xs text-purple-200">${getTotalCarbonCreditsValue().toLocaleString()} value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-orange-100" />
              <div>
                <p className="text-xs text-orange-100">Soil Health Avg</p>
                <p className="text-xl sm:text-2xl font-bold">{(getAverageSoilHealth() * 100).toFixed(0)}%</p>
                <p className="text-xs text-orange-200">Improving trend</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-green-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-teal-100" />
              <div>
                <p className="text-xs text-teal-100">Avg ROI</p>
                <p className="text-xl sm:text-2xl font-bold">{getAverageROI().toFixed(1)}%</p>
                <p className="text-xs text-teal-200">Profit margin</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4 sm:h-5 sm:w-5 text-pink-100" />
              <div>
                <p className="text-xs text-pink-100">Biodiversity</p>
                <p className="text-xl sm:text-2xl font-bold">+18%</p>
                <p className="text-xs text-pink-200">Species increase</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="flex-1">
          <Input
            placeholder="Search farms or farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterRegion} onValueChange={setFilterRegion}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="California">California</SelectItem>
            <SelectItem value="Colorado">Colorado</SelectItem>
            <SelectItem value="Oregon">Oregon</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Farm Name</SelectItem>
            <SelectItem value="size">Farm Size</SelectItem>
            <SelectItem value="carbon">Carbon Sequestered</SelectItem>
            <SelectItem value="roi">ROI</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      <Tabs defaultValue="farms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="farms" className="text-xs sm:text-sm">Farms ({filteredFarms.length})</TabsTrigger>
          <TabsTrigger value="soil" className="text-xs sm:text-sm">Soil Health</TabsTrigger>
          <TabsTrigger value="carbon" className="text-xs sm:text-sm">Carbon</TabsTrigger>
          <TabsTrigger value="practices" className="text-xs sm:text-sm">Practices</TabsTrigger>
          <TabsTrigger value="biodiversity" className="text-xs sm:text-sm">Biodiversity</TabsTrigger>
        </TabsList>

        {/* Enhanced Farms Tab */}
        <TabsContent value="farms" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {filteredFarms.map((farm) => (
              <Card key={farm.id} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      {getFarmingSystemIcon(farm.farming_system)}
                      <span className="truncate">{farm.farm_name}</span>
                    </CardTitle>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {farm.farm_size_hectares} ha
                      </Badge>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{farm.location.address.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-600">Farmer</p>
                      <p className="font-semibold truncate">{farm.farmer_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">System</p>
                      <p className="font-semibold capitalize text-xs">{farm.farming_system.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Revenue</p>
                      <p className="font-semibold text-green-600">${(farm.financial_data.revenue / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">ROI</p>
                      <p className="font-semibold text-blue-600">{farm.financial_data.profit_margin.toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Transition Progress</p>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Started: {new Date(farm.transition_start_date).toLocaleDateString()}
                    </p>
                  </div>

                  {farm.certification_status.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-1">
                        {farm.certification_status.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 text-xs">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredFarms.length === 0 && (
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-8 text-center">
                <Sprout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No farms match your current filters</p>
                <Button onClick={() => { setSearchTerm(''); setFilterRegion('all'); }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Enhanced Soil Health Tab */}
        <TabsContent value="soil" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {soilHealth.map((soil) => {
              const healthScore = getHealthScore(soil);
              const farm = farms.find(f => f.id === soil.farm_id);
              
              return (
                <Card key={soil.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                        {farm?.farm_name || 'Unknown Farm'}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(soil.trend)}>
                          {soil.trend}
                        </Badge>
                        <Badge variant="outline">
                          {(healthScore * 100).toFixed(0)}% Health
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 text-xs">Organic Matter</p>
                        <p className="font-semibold">{soil.soil_organic_matter.toFixed(2)}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-green-500 h-1 rounded-full" 
                            style={{width: `${Math.min(100, (soil.soil_organic_matter / 5) * 100)}%`}}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">pH Level</p>
                        <p className="font-semibold">{soil.soil_ph.toFixed(1)}</p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-blue-500 h-1 rounded-full" 
                            style={{width: `${(1 - Math.abs(soil.soil_ph - 6.5) / 2) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Water Infiltration</p>
                        <p className="font-semibold">{soil.water_infiltration_rate.toFixed(1)} mm/hr</p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-cyan-500 h-1 rounded-full" 
                            style={{width: `${Math.min(100, (soil.water_infiltration_rate / 30) * 100)}%`}}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Earthworms</p>
                        <p className="font-semibold">{soil.earthworm_count}/m²</p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-orange-500 h-1 rounded-full" 
                            style={{width: `${Math.min(100, (soil.earthworm_count / 20) * 100)}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Soil Health</span>
                        <span className="font-bold">{(healthScore * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={healthScore * 100} className="mb-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Last measured: {new Date(soil.measured_at).toLocaleDateString()}</span>
                        <span>Next test: {new Date(soil.next_test_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule Test
                      </Button>
                      <Button size="sm" className="flex-1">
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Enhanced Carbon Tab */}
        <TabsContent value="carbon" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {carbonData.map((carbon) => {
              const farm = farms.find(f => f.id === carbon.farm_id);
              
              return (
                <Card key={carbon.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
                        {farm?.farm_name || 'Unknown Farm'}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(carbon.verification_status)}>
                          {carbon.verification_status}
                        </Badge>
                        <Badge variant="outline">
                          {(carbon.confidence_level * 100).toFixed(0)}% confidence
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600">Total Sequestered</p>
                        <p className="text-xl font-bold text-green-600">{carbon.total_carbon_sequestered.toFixed(1)}</p>
                        <p className="text-xs text-gray-500">tCO₂</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600">Sequestration Rate</p>
                        <p className="text-xl font-bold text-blue-600">{carbon.sequestration_rate.toFixed(1)}</p>
                        <p className="text-xs text-gray-500">tCO₂/ha/yr</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Carbon Credits Generated</span>
                        <span className="text-lg font-bold text-green-600">{carbon.carbon_credits_generated}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Market Value</span>
                        <span className="text-lg font-bold text-green-600">${carbon.market_value.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Measurement Method</span>
                        <span className="capitalize">{carbon.measurement_method.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Confidence Level</span>
                        <span>{(carbon.confidence_level * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={carbon.confidence_level * 100} />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Trade Credits
                      </Button>
                      <Button size="sm" className="flex-1">
                        View Report
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">
                      Last measured: {new Date(carbon.measured_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="practices" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {practices.map((practice) => (
              <Card key={practice.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base line-clamp-2">{practice.practice_name}</CardTitle>
                    <Badge className={getStatusColor(practice.practice_status)}>
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