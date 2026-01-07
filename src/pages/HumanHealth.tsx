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
  const [communities, setCommunities] = useState<HealthCommunity[]>([]);
  const [healthcareAccess, setHealthcareAccess] = useState<HealthcareAccess[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<CommunityHealthMetric[]>([]);
  const [preventivePrograms, setPreventivePrograms] = useState<PreventiveHealthProgram[]>([]);
  const [nutrition, setNutrition] = useState<NutritionSecurity[]>([]);
  const [mentalHealth, setMentalHealth] = useState<MentalHealthWellbeing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthData();
    const interval = setInterval(fetchHealthData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchHealthData = async () => {
    try {
      const [communitiesRes, accessRes, metricsRes, programsRes, nutritionRes, mentalRes] = await Promise.all([
        supabase.from('health_communities').select('*').order('created_at', { ascending: false }),
        supabase.from('healthcare_access').select('*').order('assessed_at', { ascending: false }).limit(20),
        supabase.from('community_health_metrics').select('*').gte('confidence_level', 0.7).order('measured_at', { ascending: false }).limit(25),
        supabase.from('preventive_health_programs').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('nutrition_security').select('*').order('assessed_at', { ascending: false }).limit(15),
        supabase.from('mental_health_wellbeing').select('*').order('assessed_at', { ascending: false }).limit(15)
      ]);

      if (communitiesRes.data) setCommunities(communitiesRes.data);
      if (accessRes.data) setHealthcareAccess(accessRes.data);
      if (metricsRes.data) setHealthMetrics(metricsRes.data);
      if (programsRes.data) setPreventivePrograms(programsRes.data);
      if (nutritionRes.data) setNutrition(nutritionRes.data);
      if (mentalRes.data) setMentalHealth(mentalRes.data);
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setLoading(false);
    }
  };

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