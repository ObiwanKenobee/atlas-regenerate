import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, Shield, Droplets, Brain, TrendingUp, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface HealthCommunity {
  id: string;
  community_name: string;
  population_size: number;
  community_type: string;
  health_coordinator: string;
  baseline_health_assessment: any;
  created_at: string;
}

interface HealthcareAccess {
  id: string;
  community_id: string;
  facility_type: string;
  facility_name: string;
  distance_km: number;
  accessibility_score: number;
  utilization_rate: number;
  assessed_at: string;
}

interface CommunityHealthMetric {
  id: string;
  community_id: string;
  metric_category: string;
  metric_name: string;
  baseline_value: number;
  current_value: number;
  target_value: number;
  improvement_percentage: number;
  confidence_level: number;
  measured_at: string;
}

interface PreventiveHealthProgram {
  id: string;
  community_id: string;
  program_name: string;
  program_type: string;
  coverage_percentage: number;
  participation_rate: number;
  effectiveness_score: number;
  program_status: string;
  created_at: string;
}

interface NutritionSecurity {
  id: string;
  community_id: string;
  malnutrition_rate: number;
  stunting_rate: number;
  food_security_score: number;
  dietary_diversity_score: number;
  assessed_at: string;
}

interface MentalHealthWellbeing {
  id: string;
  community_id: string;
  depression_prevalence: number;
  anxiety_prevalence: number;
  stress_level_score: number;
  social_cohesion_score: number;
  community_resilience_score: number;
  assessed_at: string;
}

export default function HumanHealth() {
  // Mock data since health-specific tables don't exist
  const communities: HealthCommunity[] = [
    { id: '1', community_name: 'Mountain Village Health', population_size: 12500, community_type: 'mountain', health_coordinator: 'Dr. Maria Santos', baseline_health_assessment: {}, created_at: '2025-02-15' },
    { id: '2', community_name: 'Coastal Community Wellness', population_size: 28000, community_type: 'coastal', health_coordinator: 'Dr. James Chen', baseline_health_assessment: {}, created_at: '2025-03-20' }
  ];

  const healthcareAccess: HealthcareAccess[] = [
    { id: '1', community_id: '1', facility_type: 'clinic', facility_name: 'Mountain Health Clinic', distance_km: 5.2, accessibility_score: 0.78, utilization_rate: 65.5, assessed_at: '2026-01-25' },
    { id: '2', community_id: '2', facility_type: 'hospital', facility_name: 'Coastal Regional Hospital', distance_km: 8.5, accessibility_score: 0.85, utilization_rate: 72.3, assessed_at: '2026-01-24' }
  ];

  const healthMetrics: CommunityHealthMetric[] = [
    { id: '1', community_id: '1', metric_category: 'maternal_health', metric_name: 'Prenatal Care Coverage', baseline_value: 60, current_value: 82, target_value: 95, improvement_percentage: 36.7, confidence_level: 0.85, measured_at: '2026-01-20' },
    { id: '2', community_id: '2', metric_category: 'child_health', metric_name: 'Immunization Rate', baseline_value: 72, current_value: 91, target_value: 98, improvement_percentage: 26.4, confidence_level: 0.92, measured_at: '2026-01-19' }
  ];

  const preventivePrograms: PreventiveHealthProgram[] = [
    { id: '1', community_id: '1', program_name: 'Maternal Health Initiative', program_type: 'maternal_care', coverage_percentage: 78.5, participation_rate: 85.2, effectiveness_score: 0.82, program_status: 'active', created_at: '2025-04-01' },
    { id: '2', community_id: '2', program_name: 'Child Nutrition Program', program_type: 'nutrition', coverage_percentage: 92.3, participation_rate: 88.5, effectiveness_score: 0.88, program_status: 'active', created_at: '2025-05-15' }
  ];

  const nutrition: NutritionSecurity[] = [
    { id: '1', community_id: '1', malnutrition_rate: 8.5, stunting_rate: 12.3, food_security_score: 0.72, dietary_diversity_score: 6.8, assessed_at: '2026-01-15' },
    { id: '2', community_id: '2', malnutrition_rate: 5.2, stunting_rate: 8.1, food_security_score: 0.85, dietary_diversity_score: 7.5, assessed_at: '2026-01-14' }
  ];

  const mentalHealth: MentalHealthWellbeing[] = [
    { id: '1', community_id: '1', depression_prevalence: 12.5, anxiety_prevalence: 18.2, stress_level_score: 6.2, social_cohesion_score: 0.75, community_resilience_score: 0.72, assessed_at: '2026-01-10' }
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const getCommunityTypeIcon = (type: string) => {
    switch (type) {
      case 'rural': return <Users className="h-4 w-4 text-green-600" />;
      case 'urban': return <Activity className="h-4 w-4 text-blue-600" />;
      case 'indigenous': return <Heart className="h-4 w-4 text-purple-600" />;
      case 'coastal': return <Droplets className="h-4 w-4 text-cyan-600" />;
      case 'mountain': return <TrendingUp className="h-4 w-4 text-gray-600" />;
      default: return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'planned': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTotalPopulation = () => {
    return communities.reduce((sum, community) => sum + community.population_size, 0);
  };

  const getAverageAccessibilityScore = () => {
    if (healthcareAccess.length === 0) return 0;
    return healthcareAccess.reduce((sum, access) => sum + access.accessibility_score, 0) / healthcareAccess.length;
  };

  const getActivePrograms = () => {
    return preventivePrograms.filter(p => p.program_status === 'active').length;
  };

  const getAverageHealthImprovement = () => {
    if (healthMetrics.length === 0) return 0;
    return healthMetrics.reduce((sum, metric) => sum + metric.improvement_percentage, 0) / healthMetrics.length;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading health data...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="h-8 w-8 text-red-600" />
        <h1 className="text-3xl font-bold">Human Health</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Communities</p>
                <p className="text-2xl font-bold">{communities.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Population</p>
                <p className="text-2xl font-bold">{getTotalPopulation().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Active Programs</p>
                <p className="text-2xl font-bold">{getActivePrograms()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Health Improvement</p>
                <p className="text-2xl font-bold text-green-600">+{getAverageHealthImprovement().toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="communities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="access">Healthcare Access</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
          <TabsTrigger value="programs">Preventive Programs</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="mental">Mental Health</TabsTrigger>
        </TabsList>

        <TabsContent value="communities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communities.map((community) => (
              <Card key={community.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getCommunityTypeIcon(community.community_type)}
                      {community.community_name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Population</p>
                      <p className="font-semibold">{community.population_size.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Community Type</p>
                      <p className="font-semibold capitalize">{community.community_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Health Coordinator</p>
                      <p className="font-semibold">{community.health_coordinator}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Established: {new Date(community.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthcareAccess.map((access) => (
              <Card key={access.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    {access.facility_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Facility Type</p>
                        <p className="font-semibold capitalize">{access.facility_type.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Distance</p>
                        <p className="font-semibold">{access.distance_km.toFixed(1)} km</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Accessibility Score</span>
                        <span className={getScoreColor(access.accessibility_score)}>
                          {(access.accessibility_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={access.accessibility_score * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Utilization Rate</span>
                        <span>{access.utilization_rate.toFixed(1)}%</span>
                      </div>
                      <Progress value={access.utilization_rate} />
                    </div>
                    <p className="text-xs text-gray-500">
                      Assessed: {new Date(access.assessed_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          {healthMetrics.map((metric) => (
            <Card key={metric.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {metric.metric_name}
                  </CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {metric.metric_category.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Baseline</p>
                    <p className="font-semibold">{metric.baseline_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current</p>
                    <p className="font-semibold">{metric.current_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target</p>
                    <p className="font-semibold">{metric.target_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Improvement</p>
                    <p className="font-semibold text-green-600">+{metric.improvement_percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress to Target</span>
                    <span>{(((metric.current_value - metric.baseline_value) / (metric.target_value - metric.baseline_value)) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={((metric.current_value - metric.baseline_value) / (metric.target_value - metric.baseline_value)) * 100} />
                  <p className="text-xs text-gray-500 mt-1">
                    Confidence: {(metric.confidence_level * 100).toFixed(0)}%
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Measured: {new Date(metric.measured_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {preventivePrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{program.program_name}</CardTitle>
                    <Badge className={getStatusColor(program.program_status)}>
                      {program.program_status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Program Type</p>
                      <p className="font-semibold capitalize">{program.program_type.replace('_', ' ')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Coverage</p>
                        <p className="font-semibold">{program.coverage_percentage.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Participation</p>
                        <p className="font-semibold">{program.participation_rate.toFixed(1)}%</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Effectiveness</span>
                        <span className={getScoreColor(program.effectiveness_score)}>
                          {(program.effectiveness_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={program.effectiveness_score * 100} />
                    </div>
                    <p className="text-xs text-gray-500">
                      Started: {new Date(program.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nutrition.map((nutr) => (
              <Card key={nutr.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Nutrition Security Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Malnutrition Rate</p>
                        <p className="font-semibold text-red-600">{nutr.malnutrition_rate.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Stunting Rate</p>
                        <p className="font-semibold text-orange-600">{nutr.stunting_rate.toFixed(1)}%</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Food Security Score</span>
                        <span className={getScoreColor(nutr.food_security_score)}>
                          {(nutr.food_security_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={nutr.food_security_score * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Dietary Diversity</span>
                        <span>{nutr.dietary_diversity_score.toFixed(1)}</span>
                      </div>
                      <Progress value={(nutr.dietary_diversity_score / 10) * 100} />
                    </div>
                    <p className="text-xs text-gray-500">
                      Assessed: {new Date(nutr.assessed_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mental" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentalHealth.map((mental) => (
              <Card key={mental.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Mental Health & Wellbeing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Depression</p>
                        <p className="font-semibold text-red-600">{mental.depression_prevalence.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Anxiety</p>
                        <p className="font-semibold text-orange-600">{mental.anxiety_prevalence.toFixed(1)}%</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Social Cohesion</span>
                        <span className={getScoreColor(mental.social_cohesion_score)}>
                          {(mental.social_cohesion_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={mental.social_cohesion_score * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Community Resilience</span>
                        <span className={getScoreColor(mental.community_resilience_score)}>
                          {(mental.community_resilience_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={mental.community_resilience_score * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Stress Level</span>
                        <span className={mental.stress_level_score <= 0.3 ? 'text-green-600' : mental.stress_level_score <= 0.6 ? 'text-yellow-600' : 'text-red-600'}>
                          {(mental.stress_level_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={mental.stress_level_score * 100} />
                    </div>
                    <p className="text-xs text-gray-500">
                      Assessed: {new Date(mental.assessed_at).toLocaleDateString()}
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