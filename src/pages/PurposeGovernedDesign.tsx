import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Heart, TreePine, Users, TrendingUp, Filter, Target } from 'lucide-react';

interface GovernancePrinciple {
  id: string;
  principle_name: string;
  principle_category: string;
  description: string;
  weight: number;
}

interface ActionGovernanceFilter {
  id: string;
  action_type: string;
  action_description: string;
  stewardship_score: number;
  life_preservation_score: number;
  intergenerational_score: number;
  profit_alignment_score: number;
  overall_governance_score: number;
  governance_status: string;
  governance_rationale: string;
  created_at: string;
}

interface PurposeMetric {
  id: string;
  metric_name: string;
  metric_type: string;
  current_value: number;
  target_value: number;
  measurement_unit: string;
  trend_direction: string;
}

interface ProfitPurposeAlignment {
  id: string;
  revenue_stream: string;
  revenue_amount: number;
  purpose_contribution_percentage: number;
  stewardship_impact: any;
  life_preservation_impact: any;
  intergenerational_impact: any;
  reporting_period_start: string;
  reporting_period_end: string;
}

export default function PurposeGovernedDesign() {
  const [principles, setPrinciples] = useState<GovernancePrinciple[]>([]);
  const [actions, setActions] = useState<ActionGovernanceFilter[]>([]);
  const [metrics, setMetrics] = useState<PurposeMetric[]>([]);
  const [profitAlignment, setProfitAlignment] = useState<ProfitPurposeAlignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGovernanceData();
  }, []);

  const fetchGovernanceData = async () => {
    try {
      // Mock data since governance tables don't exist
      setPrinciples([
        { id: '1', principle_name: 'Environmental Stewardship', principle_category: 'stewardship', description: 'Commitment to protecting and restoring natural ecosystems', weight: 0.3 },
        { id: '2', principle_name: 'Life Preservation', principle_category: 'life_preservation', description: 'Prioritizing biodiversity and species protection', weight: 0.25 },
        { id: '3', principle_name: 'Intergenerational Responsibility', principle_category: 'intergenerational_responsibility', description: 'Making decisions that benefit future generations', weight: 0.25 },
        { id: '4', principle_name: 'Community Wellbeing', principle_category: 'community', description: 'Supporting local communities and stakeholders', weight: 0.2 }
      ]);
      setActions([
        { id: '1', action_type: 'investment_decision', action_description: 'Fund regenerative agriculture project in Costa Rica', stewardship_score: 4.5, life_preservation_score: 4.2, intergenerational_score: 4.8, profit_alignment_score: 3.8, overall_governance_score: 4.3, governance_status: 'approved', governance_rationale: 'Strong alignment with stewardship principles', created_at: '2026-01-15' },
        { id: '2', action_type: 'policy_change', action_description: 'Update carbon credit verification standards', stewardship_score: 4.0, life_preservation_score: 3.8, intergenerational_score: 4.5, profit_alignment_score: 4.0, overall_governance_score: 4.1, governance_status: 'approved', governance_rationale: 'Improves long-term verification quality', created_at: '2026-01-10' }
      ]);
      setMetrics([
        { id: '1', metric_name: 'Carbon Sequestration', metric_type: 'environmental_indicator', current_value: 45000, target_value: 100000, measurement_unit: 'tCO2e', trend_direction: 'improving' },
        { id: '2', metric_name: 'Biodiversity Index', metric_type: 'life_preservation_indicator', current_value: 72, target_value: 90, measurement_unit: 'index score', trend_direction: 'stable' },
        { id: '3', metric_name: 'Community Employment', metric_type: 'social_indicator', current_value: 1250, target_value: 2000, measurement_unit: 'jobs', trend_direction: 'improving' }
      ]);
      setProfitAlignment([
        { id: '1', revenue_stream: 'Carbon Credits', revenue_amount: 2500000, purpose_contribution_percentage: 85, stewardship_impact: { summary: 'Direct funding for land restoration' }, life_preservation_impact: { summary: 'Habitat protection measures' }, intergenerational_impact: { summary: 'Long-term carbon storage' }, reporting_period_start: '2025-07-01', reporting_period_end: '2025-12-31' },
        { id: '2', revenue_stream: 'Impact Investments', revenue_amount: 1800000, purpose_contribution_percentage: 72, stewardship_impact: { summary: 'Regenerative farming support' }, life_preservation_impact: { summary: 'Species corridor creation' }, intergenerational_impact: { summary: 'Soil health improvement' }, reporting_period_start: '2025-07-01', reporting_period_end: '2025-12-31' }
      ]);
    } catch (error) {
      console.error('Error fetching governance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'stewardship': return <TreePine className="h-4 w-4 text-green-600" />;
      case 'life_preservation': return <Heart className="h-4 w-4 text-red-600" />;
      case 'intergenerational_responsibility': return <Users className="h-4 w-4 text-blue-600" />;
      default: return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'requires_modification': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'stable': return '➡️';
      case 'declining': return '📉';
      default: return '❓';
    }
  };

  const getOverallPurposeScore = () => {
    if (metrics.length === 0) return 0;
    const totalProgress = metrics.reduce((sum, metric) => {
      return sum + (metric.current_value / metric.target_value);
    }, 0);
    return (totalProgress / metrics.length) * 100;
  };

  const getAverageProfitAlignment = () => {
    if (profitAlignment.length === 0) return 0;
    return profitAlignment.reduce((sum, alignment) => sum + alignment.purpose_contribution_percentage, 0) / profitAlignment.length;
  };

  const getApprovedActionsCount = () => {
    return actions.filter(action => action.governance_status === 'approved').length;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading governance data...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-purple-600" />
        <h1 className="text-3xl font-bold">Purpose-Governed by Design</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Purpose Score</p>
                <p className="text-2xl font-bold">{getOverallPurposeScore().toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Profit Alignment</p>
                <p className="text-2xl font-bold">{getAverageProfitAlignment().toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Actions Approved</p>
                <p className="text-2xl font-bold">{getApprovedActionsCount()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Active Principles</p>
                <p className="text-2xl font-bold">{principles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="principles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="principles">Governance Principles</TabsTrigger>
          <TabsTrigger value="actions">Action Filters</TabsTrigger>
          <TabsTrigger value="metrics">Purpose Metrics</TabsTrigger>
          <TabsTrigger value="profit">Profit Alignment</TabsTrigger>
        </TabsList>

        <TabsContent value="principles" className="space-y-4">
          {principles.map((principle) => (
            <Card key={principle.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(principle.principle_category)}
                    {principle.principle_name}
                  </CardTitle>
                  <Badge variant="outline">
                    Weight: {(principle.weight * 100).toFixed(0)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">{principle.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Category:</span>
                  <Badge variant="secondary" className="capitalize">
                    {principle.principle_category.replace('_', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          {actions.map((action) => (
            <Card key={action.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="capitalize">{action.action_type.replace('_', ' ')}</CardTitle>
                  <Badge className={getStatusColor(action.governance_status)}>
                    {action.governance_status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{action.action_description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Stewardship</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(action.stewardship_score / 5) * 100} className="flex-1" />
                      <span className="text-sm font-semibold">{action.stewardship_score.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Life Preservation</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(action.life_preservation_score / 5) * 100} className="flex-1" />
                      <span className="text-sm font-semibold">{action.life_preservation_score.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Intergenerational</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(action.intergenerational_score / 5) * 100} className="flex-1" />
                      <span className="text-sm font-semibold">{action.intergenerational_score.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profit Alignment</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(action.profit_alignment_score / 5) * 100} className="flex-1" />
                      <span className="text-sm font-semibold">{action.profit_alignment_score.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-1">Governance Rationale:</p>
                  <p className="text-sm text-gray-800">{action.governance_rationale}</p>
                </div>
                <div className="mt-2 text-right">
                  <p className="text-xs text-gray-500">
                    Overall Score: {action.overall_governance_score.toFixed(1)}/5.0
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getCategoryIcon(metric.metric_type.replace('_indicator', ''))}
                      {metric.metric_name}
                    </CardTitle>
                    <span className="text-lg">{getTrendIcon(metric.trend_direction)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Current</p>
                        <p className="font-semibold">{metric.current_value.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Target</p>
                        <p className="font-semibold">{metric.target_value.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress to Target</span>
                        <span>{((metric.current_value / metric.target_value) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(metric.current_value / metric.target_value) * 100} />
                      <p className="text-xs text-gray-500 mt-1">
                        Unit: {metric.measurement_unit} • Trend: {metric.trend_direction}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profit" className="space-y-4">
          {profitAlignment.map((alignment) => (
            <Card key={alignment.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {alignment.revenue_stream}
                  </CardTitle>
                  <Badge variant="outline">
                    {alignment.purpose_contribution_percentage.toFixed(1)}% Purpose-Aligned
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Revenue Amount</p>
                    <p className="text-lg font-semibold">${alignment.revenue_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Purpose Contribution</p>
                    <div className="flex items-center gap-2">
                      <Progress value={alignment.purpose_contribution_percentage} className="flex-1" />
                      <span className="text-sm font-semibold">{alignment.purpose_contribution_percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Stewardship Impact</p>
                    <div className="bg-green-50 p-2 rounded text-xs">
                      {alignment.stewardship_impact?.summary || 'Land and resource stewardship'}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Life Preservation</p>
                    <div className="bg-red-50 p-2 rounded text-xs">
                      {alignment.life_preservation_impact?.summary || 'Biodiversity and ecosystem health'}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Intergenerational</p>
                    <div className="bg-blue-50 p-2 rounded text-xs">
                      {alignment.intergenerational_impact?.summary || 'Future generations benefit'}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Period: {new Date(alignment.reporting_period_start).toLocaleDateString()} - {new Date(alignment.reporting_period_end).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}