import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Satellite, Waves, Users, TrendingUp, Eye, Zap } from 'lucide-react';

interface AIOracle {
  id: string;
  oracle_name: string;
  oracle_type: string;
  data_sources: string[];
  measurement_focus: string[];
  ai_model_version: string;
  confidence_threshold: number;
  update_frequency_minutes: number;
  active_status: boolean;
  last_execution: string;
}

interface SoilHealthMeasurement {
  id: string;
  project_id: string;
  soil_organic_carbon: number;
  ph_level: number;
  nutrient_levels: any;
  microbial_diversity_index: number;
  water_retention_capacity: number;
  erosion_risk_score: number;
  overall_health_score: number;
  confidence_level: number;
  measured_at: string;
}

interface OceanVitalityMeasurement {
  id: string;
  project_id: string;
  water_temperature: number;
  ph_level: number;
  dissolved_oxygen: number;
  chlorophyll_concentration: number;
  marine_biodiversity_index: number;
  coral_health_score: number;
  overall_vitality_score: number;
  confidence_level: number;
  measured_at: string;
}

interface HumanOutcomeMeasurement {
  id: string;
  project_id: string;
  community_id: string;
  outcome_category: string;
  baseline_value: number;
  current_value: number;
  improvement_percentage: number;
  measurement_method: string;
  sample_size: number;
  data_reliability_score: number;
  measured_at: string;
}

interface AIIntelligenceInsight {
  id: string;
  oracle_id: string;
  insight_type: string;
  insight_category: string;
  insight_summary: string;
  confidence_score: number;
  data_sources_used: string[];
  generated_at: string;
}

export default function RealityLinkedIntelligence() {
  const [oracles, setOracles] = useState<AIOracle[]>([]);
  const [soilMeasurements, setSoilMeasurements] = useState<SoilHealthMeasurement[]>([]);
  const [oceanMeasurements, setOceanMeasurements] = useState<OceanVitalityMeasurement[]>([]);
  const [humanOutcomes, setHumanOutcomes] = useState<HumanOutcomeMeasurement[]>([]);
  const [insights, setInsights] = useState<AIIntelligenceInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntelligenceData();
  }, []);

  const fetchIntelligenceData = async () => {
    try {
      // Mock data since intelligence tables don't exist
      setOracles([
        { id: '1', oracle_name: 'Sentinel-2 Analysis Engine', oracle_type: 'satellite_analysis', data_sources: ['sentinel_2', 'landsat_9'], measurement_focus: ['vegetation_health', 'land_cover'], ai_model_version: 'v3.2.1', confidence_threshold: 0.85, update_frequency_minutes: 60, active_status: true, last_execution: '2026-02-05T10:30:00Z' },
        { id: '2', oracle_name: 'IoT Sensor Network', oracle_type: 'sensor_network', data_sources: ['soil_sensors', 'water_quality'], measurement_focus: ['soil_moisture', 'ph_levels'], ai_model_version: 'v2.1.0', confidence_threshold: 0.9, update_frequency_minutes: 15, active_status: true, last_execution: '2026-02-05T10:45:00Z' }
      ]);
      setSoilMeasurements([
        { id: '1', project_id: '1', soil_organic_carbon: 3.2, ph_level: 6.8, nutrient_levels: {}, microbial_diversity_index: 0.75, water_retention_capacity: 0.65, erosion_risk_score: 0.2, overall_health_score: 0.78, confidence_level: 0.92, measured_at: '2026-02-04' }
      ]);
      setOceanMeasurements([
        { id: '1', project_id: '2', water_temperature: 24.5, ph_level: 8.1, dissolved_oxygen: 7.2, chlorophyll_concentration: 0.45, marine_biodiversity_index: 7.8, coral_health_score: 0.72, overall_vitality_score: 0.76, confidence_level: 0.88, measured_at: '2026-02-03' }
      ]);
      setHumanOutcomes([
        { id: '1', project_id: '1', community_id: 'c1', outcome_category: 'economic_wellbeing', baseline_value: 15000, current_value: 22500, improvement_percentage: 50, measurement_method: 'survey', sample_size: 150, data_reliability_score: 0.85, measured_at: '2026-01-30' }
      ]);
      setInsights([
        { id: '1', oracle_id: '1', insight_type: 'trend_analysis', insight_category: 'vegetation', insight_summary: 'Vegetation health improving by 15% in project areas over last quarter', confidence_score: 0.89, data_sources_used: ['sentinel_2'], generated_at: '2026-02-04' }
      ]);
    } catch (error) {
      console.error('Error fetching intelligence data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOracleTypeIcon = (type: string) => {
    switch (type) {
      case 'satellite_analysis': return <Satellite className="h-4 w-4 text-blue-600" />;
      case 'sensor_network': return <Zap className="h-4 w-4 text-yellow-600" />;
      case 'partner_integration': return <Users className="h-4 w-4 text-purple-600" />;
      case 'hybrid_intelligence': return <Brain className="h-4 w-4 text-green-600" />;
      default: return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'trend_analysis': return '📈';
      case 'anomaly_detection': return '🚨';
      case 'predictive_forecast': return '🔮';
      case 'correlation_discovery': return '🔗';
      default: return '💡';
    }
  };

  const getAverageSoilHealth = () => {
    if (soilMeasurements.length === 0) return 0;
    return soilMeasurements.reduce((sum, m) => sum + m.overall_health_score, 0) / soilMeasurements.length;
  };

  const getAverageOceanVitality = () => {
    if (oceanMeasurements.length === 0) return 0;
    return oceanMeasurements.reduce((sum, m) => sum + m.overall_vitality_score, 0) / oceanMeasurements.length;
  };

  const getAverageHumanImprovement = () => {
    if (humanOutcomes.length === 0) return 0;
    return humanOutcomes.reduce((sum, m) => sum + m.improvement_percentage, 0) / humanOutcomes.length;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading reality intelligence data...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Reality-Linked Intelligence</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Active Oracles</p>
                <p className="text-2xl font-bold">{oracles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Soil Health</p>
                <p className={`text-2xl font-bold ${getHealthScoreColor(getAverageSoilHealth())}`}>
                  {(getAverageSoilHealth() * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Ocean Vitality</p>
                <p className={`text-2xl font-bold ${getHealthScoreColor(getAverageOceanVitality())}`}>
                  {(getAverageOceanVitality() * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Human Improvement</p>
                <p className="text-2xl font-bold text-green-600">+{getAverageHumanImprovement().toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="oracles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="oracles">AI Oracles</TabsTrigger>
          <TabsTrigger value="soil">Soil Health</TabsTrigger>
          <TabsTrigger value="ocean">Ocean Vitality</TabsTrigger>
          <TabsTrigger value="human">Human Outcomes</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="oracles" className="space-y-4">
          {oracles.map((oracle) => (
            <Card key={oracle.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getOracleTypeIcon(oracle.oracle_type)}
                    {oracle.oracle_name}
                  </CardTitle>
                  <Badge variant={oracle.active_status ? 'default' : 'secondary'}>
                    {oracle.active_status ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Model Version</p>
                    <p className="font-semibold">{oracle.ai_model_version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Update Frequency</p>
                    <p className="font-semibold">{oracle.update_frequency_minutes} min</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Confidence Threshold</p>
                    <p className="font-semibold">{(oracle.confidence_threshold * 100).toFixed(0)}%</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Data Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {oracle.data_sources.map((source, index) => (
                      <Badge key={index} variant="outline">
                        {source.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Measurement Focus</p>
                  <div className="flex flex-wrap gap-2">
                    {oracle.measurement_focus.map((focus, index) => (
                      <Badge key={index} variant="secondary">
                        {focus.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Last execution: {new Date(oracle.last_execution).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="soil" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {soilMeasurements.map((measurement) => (
              <Card key={measurement.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Soil Health Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Organic Carbon</p>
                        <p className="font-semibold">{measurement.soil_organic_carbon.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">pH Level</p>
                        <p className="font-semibold">{measurement.ph_level.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Microbial Diversity</p>
                        <p className="font-semibold">{measurement.microbial_diversity_index.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Water Retention</p>
                        <p className="font-semibold">{(measurement.water_retention_capacity * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Health Score</span>
                        <span className={getHealthScoreColor(measurement.overall_health_score)}>
                          {(measurement.overall_health_score * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={measurement.overall_health_score * 100} />
                      <p className="text-xs text-gray-500 mt-1">
                        Confidence: {(measurement.confidence_level * 100).toFixed(0)}%
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Measured: {new Date(measurement.measured_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ocean" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {oceanMeasurements.map((measurement) => (
              <Card key={measurement.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5" />
                    Ocean Vitality Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Temperature</p>
                        <p className="font-semibold">{measurement.water_temperature.toFixed(1)}°C</p>
                      </div>
                      <div>
                        <p className="text-gray-600">pH Level</p>
                        <p className="font-semibold">{measurement.ph_level.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Dissolved O₂</p>
                        <p className="font-semibold">{measurement.dissolved_oxygen.toFixed(1)} mg/L</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Chlorophyll</p>
                        <p className="font-semibold">{measurement.chlorophyll_concentration.toFixed(2)} mg/m³</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Marine Biodiversity Index</span>
                        <span>{measurement.marine_biodiversity_index.toFixed(2)}</span>
                      </div>
                      <Progress value={(measurement.marine_biodiversity_index / 10) * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Vitality Score</span>
                        <span className={getHealthScoreColor(measurement.overall_vitality_score)}>
                          {(measurement.overall_vitality_score * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={measurement.overall_vitality_score * 100} />
                      <p className="text-xs text-gray-500 mt-1">
                        Confidence: {(measurement.confidence_level * 100).toFixed(0)}%
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Measured: {new Date(measurement.measured_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="human" className="space-y-4">
          {humanOutcomes.map((outcome) => (
            <Card key={outcome.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {outcome.outcome_category.replace('_', ' ')} Outcomes
                  </CardTitle>
                  <Badge variant="outline">
                    Sample: {outcome.sample_size}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Baseline Value</p>
                    <p className="font-semibold">{outcome.baseline_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Value</p>
                    <p className="font-semibold">{outcome.current_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Improvement</p>
                    <p className="font-semibold text-green-600">+{outcome.improvement_percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Data Reliability</span>
                    <span>{(outcome.data_reliability_score * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={outcome.data_reliability_score * 100} />
                </div>
                <div className="mt-3 text-sm">
                  <p className="text-gray-600">Method: <span className="font-medium">{outcome.measurement_method.replace('_', ' ')}</span></p>
                  <p className="text-gray-600">Community: <span className="font-medium">{outcome.community_id}</span></p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Measured: {new Date(outcome.measured_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {insights.map((insight) => (
            <Card key={insight.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">{getInsightTypeIcon(insight.insight_type)}</span>
                    {insight.insight_type.replace('_', ' ')}
                  </CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {insight.insight_category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{insight.insight_summary}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Confidence Score</span>
                  <span className="font-semibold">{(insight.confidence_score * 100).toFixed(0)}%</span>
                </div>
                <Progress value={insight.confidence_score * 100} className="mb-3" />
                <div>
                  <p className="text-sm text-gray-600 mb-2">Data Sources Used</p>
                  <div className="flex flex-wrap gap-2">
                    {insight.data_sources_used.map((source, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {source.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Generated: {new Date(insight.generated_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}