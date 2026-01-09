import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Satellite, Waves, Users, TrendingUp, Eye, Zap } from 'lucide-react';

// Mock data
const mockOracles = [
  { id: '1', oracle_name: 'Sentinel Earth Observer', oracle_type: 'satellite_analysis', data_sources: ['satellite_imagery', 'spectral_analysis', 'radar'], measurement_focus: ['vegetation_health', 'land_use_change', 'carbon_density'], ai_model_version: 'v3.2.1', confidence_threshold: 0.85, update_frequency_minutes: 15, active_status: true, last_execution: '2026-01-09T10:30:00Z' },
  { id: '2', oracle_name: 'BioSensor Network', oracle_type: 'sensor_network', data_sources: ['soil_sensors', 'weather_stations', 'water_monitors'], measurement_focus: ['soil_health', 'microclimate', 'hydrology'], ai_model_version: 'v2.8.0', confidence_threshold: 0.90, update_frequency_minutes: 5, active_status: true, last_execution: '2026-01-09T10:35:00Z' },
  { id: '3', oracle_name: 'Community Insights AI', oracle_type: 'partner_integration', data_sources: ['community_reports', 'field_observations', 'traditional_knowledge'], measurement_focus: ['social_impact', 'cultural_preservation', 'livelihood_metrics'], ai_model_version: 'v1.5.2', confidence_threshold: 0.75, update_frequency_minutes: 60, active_status: true, last_execution: '2026-01-09T09:00:00Z' },
];

const mockSoilMeasurements = [
  { id: '1', project_id: 'p1', soil_organic_carbon: 3.2, ph_level: 6.8, nutrient_levels: {}, microbial_diversity_index: 7.5, water_retention_capacity: 0.72, erosion_risk_score: 0.15, overall_health_score: 0.82, confidence_level: 0.91, measured_at: '2026-01-08' },
  { id: '2', project_id: 'p2', soil_organic_carbon: 2.8, ph_level: 7.1, nutrient_levels: {}, microbial_diversity_index: 6.8, water_retention_capacity: 0.65, erosion_risk_score: 0.22, overall_health_score: 0.75, confidence_level: 0.88, measured_at: '2026-01-07' },
];

const mockOceanMeasurements = [
  { id: '1', project_id: 'p3', water_temperature: 24.5, ph_level: 8.1, dissolved_oxygen: 7.2, chlorophyll_concentration: 2.8, marine_biodiversity_index: 7.8, coral_health_score: 0.72, overall_vitality_score: 0.78, confidence_level: 0.85, measured_at: '2026-01-08' },
  { id: '2', project_id: 'p4', water_temperature: 22.8, ph_level: 8.2, dissolved_oxygen: 7.8, chlorophyll_concentration: 3.2, marine_biodiversity_index: 8.5, coral_health_score: 0.85, overall_vitality_score: 0.88, confidence_level: 0.92, measured_at: '2026-01-07' },
];

const mockHumanOutcomes = [
  { id: '1', project_id: 'p1', community_id: 'c1', outcome_category: 'livelihood_improvement', baseline_value: 1200, current_value: 1850, improvement_percentage: 54.2, measurement_method: 'household_survey', sample_size: 250, data_reliability_score: 0.88, measured_at: '2026-01-05' },
  { id: '2', project_id: 'p2', community_id: 'c2', outcome_category: 'health_outcomes', baseline_value: 65, current_value: 82, improvement_percentage: 26.2, measurement_method: 'health_assessment', sample_size: 180, data_reliability_score: 0.92, measured_at: '2026-01-04' },
];

const mockInsights = [
  { id: '1', oracle_id: 'o1', insight_type: 'trend_analysis', insight_category: 'ecosystem_health', insight_summary: 'Vegetation health index shows 15% improvement over 6 months across monitored regions, indicating successful regeneration efforts.', confidence_score: 0.89, data_sources_used: ['satellite', 'sensors'], generated_at: '2026-01-08' },
  { id: '2', oracle_id: 'o2', insight_type: 'predictive_forecast', insight_category: 'carbon_sequestration', insight_summary: 'Based on current trends, projected carbon sequestration will exceed targets by 22% by end of year.', confidence_score: 0.82, data_sources_used: ['soil_sensors', 'satellite'], generated_at: '2026-01-07' },
];

export default function RealityLinkedIntelligence() {
  const [oracles] = useState(mockOracles);
  const [soilMeasurements] = useState(mockSoilMeasurements);
  const [oceanMeasurements] = useState(mockOceanMeasurements);
  const [humanOutcomes] = useState(mockHumanOutcomes);
  const [insights] = useState(mockInsights);

  const getOracleTypeIcon = (type: string) => {
    switch (type) {
      case 'satellite_analysis': return <Satellite className="h-4 w-4 text-blue-600" />;
      case 'sensor_network': return <Zap className="h-4 w-4 text-yellow-600" />;
      case 'partner_integration': return <Users className="h-4 w-4 text-purple-600" />;
      case 'hybrid_intelligence': return <Brain className="h-4 w-4 text-green-600" />;
      default: return <Eye className="h-4 w-4 text-muted-foreground" />;
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

  const getAverageSoilHealth = () => soilMeasurements.length === 0 ? 0 : soilMeasurements.reduce((sum, m) => sum + m.overall_health_score, 0) / soilMeasurements.length;
  const getAverageOceanVitality = () => oceanMeasurements.length === 0 ? 0 : oceanMeasurements.reduce((sum, m) => sum + m.overall_vitality_score, 0) / oceanMeasurements.length;
  const getAverageHumanImprovement = () => humanOutcomes.length === 0 ? 0 : humanOutcomes.reduce((sum, m) => sum + m.improvement_percentage, 0) / humanOutcomes.length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Reality-Linked Intelligence</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Brain className="h-5 w-5 text-blue-600" /><div><p className="text-sm text-muted-foreground">Active Oracles</p><p className="text-2xl font-bold">{oracles.length}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /><div><p className="text-sm text-muted-foreground">Soil Health</p><p className={`text-2xl font-bold ${getHealthScoreColor(getAverageSoilHealth())}`}>{(getAverageSoilHealth() * 100).toFixed(0)}%</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Waves className="h-5 w-5 text-blue-600" /><div><p className="text-sm text-muted-foreground">Ocean Vitality</p><p className={`text-2xl font-bold ${getHealthScoreColor(getAverageOceanVitality())}`}>{(getAverageOceanVitality() * 100).toFixed(0)}%</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Users className="h-5 w-5 text-purple-600" /><div><p className="text-sm text-muted-foreground">Human Improvement</p><p className="text-2xl font-bold text-green-600">+{getAverageHumanImprovement().toFixed(1)}%</p></div></div></CardContent></Card>
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
                  <CardTitle className="flex items-center gap-2">{getOracleTypeIcon(oracle.oracle_type)}{oracle.oracle_name}</CardTitle>
                  <Badge variant={oracle.active_status ? 'default' : 'secondary'}>{oracle.active_status ? 'Active' : 'Inactive'}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><p className="text-sm text-muted-foreground">Model Version</p><p className="font-semibold">{oracle.ai_model_version}</p></div>
                  <div><p className="text-sm text-muted-foreground">Update Frequency</p><p className="font-semibold">{oracle.update_frequency_minutes} min</p></div>
                  <div><p className="text-sm text-muted-foreground">Confidence Threshold</p><p className="font-semibold">{(oracle.confidence_threshold * 100).toFixed(0)}%</p></div>
                </div>
                <div className="mt-4"><p className="text-sm text-muted-foreground mb-2">Data Sources</p><div className="flex flex-wrap gap-2">{oracle.data_sources.map((source, i) => (<Badge key={i} variant="outline">{source.replace(/_/g, ' ')}</Badge>))}</div></div>
                <div className="mt-3"><p className="text-sm text-muted-foreground mb-2">Measurement Focus</p><div className="flex flex-wrap gap-2">{oracle.measurement_focus.map((focus, i) => (<Badge key={i} variant="secondary">{focus.replace(/_/g, ' ')}</Badge>))}</div></div>
                <p className="text-xs text-muted-foreground mt-3">Last execution: {new Date(oracle.last_execution).toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="soil" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {soilMeasurements.map((m) => (
              <Card key={m.id}>
                <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Soil Health Analysis</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><p className="text-muted-foreground">Organic Carbon</p><p className="font-semibold">{m.soil_organic_carbon.toFixed(2)}%</p></div>
                      <div><p className="text-muted-foreground">pH Level</p><p className="font-semibold">{m.ph_level.toFixed(1)}</p></div>
                      <div><p className="text-muted-foreground">Microbial Diversity</p><p className="font-semibold">{m.microbial_diversity_index.toFixed(2)}</p></div>
                      <div><p className="text-muted-foreground">Water Retention</p><p className="font-semibold">{(m.water_retention_capacity * 100).toFixed(1)}%</p></div>
                    </div>
                    <div><div className="flex justify-between text-sm mb-1"><span>Overall Health Score</span><span className={getHealthScoreColor(m.overall_health_score)}>{(m.overall_health_score * 100).toFixed(1)}%</span></div><Progress value={m.overall_health_score * 100} /><p className="text-xs text-muted-foreground mt-1">Confidence: {(m.confidence_level * 100).toFixed(0)}%</p></div>
                    <p className="text-xs text-muted-foreground">Measured: {new Date(m.measured_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ocean" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {oceanMeasurements.map((m) => (
              <Card key={m.id}>
                <CardHeader><CardTitle className="flex items-center gap-2"><Waves className="h-5 w-5" />Ocean Vitality Analysis</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><p className="text-muted-foreground">Temperature</p><p className="font-semibold">{m.water_temperature.toFixed(1)}°C</p></div>
                      <div><p className="text-muted-foreground">pH Level</p><p className="font-semibold">{m.ph_level.toFixed(2)}</p></div>
                      <div><p className="text-muted-foreground">Dissolved O₂</p><p className="font-semibold">{m.dissolved_oxygen.toFixed(1)} mg/L</p></div>
                      <div><p className="text-muted-foreground">Chlorophyll</p><p className="font-semibold">{m.chlorophyll_concentration.toFixed(2)} mg/m³</p></div>
                    </div>
                    <div><div className="flex justify-between text-sm mb-1"><span>Marine Biodiversity Index</span><span>{m.marine_biodiversity_index.toFixed(2)}</span></div><Progress value={(m.marine_biodiversity_index / 10) * 100} /></div>
                    <div><div className="flex justify-between text-sm mb-1"><span>Overall Vitality Score</span><span className={getHealthScoreColor(m.overall_vitality_score)}>{(m.overall_vitality_score * 100).toFixed(1)}%</span></div><Progress value={m.overall_vitality_score * 100} /><p className="text-xs text-muted-foreground mt-1">Confidence: {(m.confidence_level * 100).toFixed(0)}%</p></div>
                    <p className="text-xs text-muted-foreground">Measured: {new Date(m.measured_at).toLocaleDateString()}</p>
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
                  <CardTitle className="flex items-center gap-2 capitalize"><Users className="h-5 w-5" />{outcome.outcome_category.replace(/_/g, ' ')} Outcomes</CardTitle>
                  <Badge variant="outline">Sample: {outcome.sample_size}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><p className="text-sm text-muted-foreground">Baseline Value</p><p className="font-semibold">{outcome.baseline_value.toLocaleString()}</p></div>
                  <div><p className="text-sm text-muted-foreground">Current Value</p><p className="font-semibold">{outcome.current_value.toLocaleString()}</p></div>
                  <div><p className="text-sm text-muted-foreground">Improvement</p><p className="font-semibold text-green-600">+{outcome.improvement_percentage.toFixed(1)}%</p></div>
                </div>
                <div className="mt-4"><Progress value={Math.min(100, outcome.improvement_percentage)} /><p className="text-xs text-muted-foreground mt-1">Method: {outcome.measurement_method.replace(/_/g, ' ')} • Reliability: {(outcome.data_reliability_score * 100).toFixed(0)}%</p></div>
                <p className="text-xs text-muted-foreground mt-2">Measured: {new Date(outcome.measured_at).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {insights.map((insight) => (
            <Card key={insight.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><span className="text-xl">{getInsightTypeIcon(insight.insight_type)}</span>{insight.insight_category.replace(/_/g, ' ')}</CardTitle>
                  <Badge variant="outline">Confidence: {(insight.confidence_score * 100).toFixed(0)}%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{insight.insight_summary}</p>
                <div className="flex flex-wrap gap-2">{insight.data_sources_used.map((source, i) => (<Badge key={i} variant="secondary">{source}</Badge>))}</div>
                <p className="text-xs text-muted-foreground mt-3">Generated: {new Date(insight.generated_at).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
