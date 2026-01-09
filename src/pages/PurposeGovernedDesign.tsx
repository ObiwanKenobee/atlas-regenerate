import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Heart, TreePine, Users, TrendingUp, Filter, Target } from 'lucide-react';

// Mock data
const mockPrinciples = [
  { id: '1', principle_name: 'Stewardship First', principle_category: 'stewardship', description: 'All actions must prioritize long-term ecosystem health over short-term gains.', weight: 0.35 },
  { id: '2', principle_name: 'Life Preservation', principle_category: 'life_preservation', description: 'Biodiversity and life systems must be protected and enhanced in all decisions.', weight: 0.30 },
  { id: '3', principle_name: 'Intergenerational Responsibility', principle_category: 'intergenerational_responsibility', description: 'Decisions must consider impact on future generations and their access to resources.', weight: 0.35 },
];

const mockActions = [
  { id: '1', action_type: 'funding_allocation', action_description: 'Allocate $500K to mangrove restoration project in Indonesia', stewardship_score: 4.5, life_preservation_score: 4.8, intergenerational_score: 4.2, profit_alignment_score: 3.8, overall_governance_score: 4.3, governance_status: 'approved', governance_rationale: 'Strong alignment with all core principles. High biodiversity impact and carbon sequestration potential.', created_at: '2026-01-08' },
  { id: '2', action_type: 'project_modification', action_description: 'Adjust farming practices to include cover cropping', stewardship_score: 4.2, life_preservation_score: 3.9, intergenerational_score: 4.0, profit_alignment_score: 4.5, overall_governance_score: 4.15, governance_status: 'approved', governance_rationale: 'Improves soil health while maintaining economic viability.', created_at: '2026-01-07' },
  { id: '3', action_type: 'resource_extraction', action_description: 'Limited timber harvesting in managed forest', stewardship_score: 3.2, life_preservation_score: 2.8, intergenerational_score: 3.0, profit_alignment_score: 4.2, overall_governance_score: 3.3, governance_status: 'requires_modification', governance_rationale: 'Requires additional biodiversity safeguards before approval.', created_at: '2026-01-06' },
];

const mockMetrics = [
  { id: '1', metric_name: 'Ecosystem Health Index', metric_type: 'stewardship_indicator', current_value: 78, target_value: 90, measurement_unit: 'index', trend_direction: 'improving' },
  { id: '2', metric_name: 'Species Diversity', metric_type: 'life_preservation_indicator', current_value: 145, target_value: 200, measurement_unit: 'species', trend_direction: 'improving' },
  { id: '3', metric_name: 'Carbon Sequestration Rate', metric_type: 'intergenerational_indicator', current_value: 12500, target_value: 20000, measurement_unit: 'tCO2/year', trend_direction: 'stable' },
  { id: '4', metric_name: 'Community Engagement', metric_type: 'social_indicator', current_value: 340, target_value: 500, measurement_unit: 'participants', trend_direction: 'improving' },
];

const mockProfitAlignment = [
  { id: '1', revenue_stream: 'Carbon Credits', revenue_amount: 850000, purpose_contribution_percentage: 92, stewardship_impact: { summary: 'Direct support for ecosystem restoration' }, life_preservation_impact: { summary: 'Habitat protection funding' }, intergenerational_impact: { summary: 'Long-term carbon storage' }, reporting_period_start: '2025-01-01', reporting_period_end: '2025-12-31' },
  { id: '2', revenue_stream: 'Biodiversity Credits', revenue_amount: 420000, purpose_contribution_percentage: 88, stewardship_impact: { summary: 'Species monitoring programs' }, life_preservation_impact: { summary: 'Wildlife corridor funding' }, intergenerational_impact: { summary: 'Genetic diversity preservation' }, reporting_period_start: '2025-01-01', reporting_period_end: '2025-12-31' },
];

export default function PurposeGovernedDesign() {
  const [principles] = useState(mockPrinciples);
  const [actions] = useState(mockActions);
  const [metrics] = useState(mockMetrics);
  const [profitAlignment] = useState(mockProfitAlignment);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'stewardship': return <TreePine className="h-4 w-4 text-green-600" />;
      case 'life_preservation': return <Heart className="h-4 w-4 text-red-600" />;
      case 'intergenerational_responsibility': return <Users className="h-4 w-4 text-blue-600" />;
      default: return <Shield className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'requires_modification': return 'bg-yellow-500';
      default: return 'bg-muted';
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
    return (metrics.reduce((sum, m) => sum + (m.current_value / m.target_value), 0) / metrics.length) * 100;
  };

  const getAverageProfitAlignment = () => {
    if (profitAlignment.length === 0) return 0;
    return profitAlignment.reduce((sum, a) => sum + a.purpose_contribution_percentage, 0) / profitAlignment.length;
  };

  const getApprovedActionsCount = () => actions.filter(a => a.governance_status === 'approved').length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-purple-600" />
        <h1 className="text-3xl font-bold">Purpose-Governed by Design</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Target className="h-5 w-5 text-purple-600" /><div><p className="text-sm text-muted-foreground">Purpose Score</p><p className="text-2xl font-bold">{getOverallPurposeScore().toFixed(1)}%</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /><div><p className="text-sm text-muted-foreground">Profit Alignment</p><p className="text-2xl font-bold">{getAverageProfitAlignment().toFixed(1)}%</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Filter className="h-5 w-5 text-blue-600" /><div><p className="text-sm text-muted-foreground">Actions Approved</p><p className="text-2xl font-bold">{getApprovedActionsCount()}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Shield className="h-5 w-5 text-orange-600" /><div><p className="text-sm text-muted-foreground">Active Principles</p><p className="text-2xl font-bold">{principles.length}</p></div></div></CardContent></Card>
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
                  <CardTitle className="flex items-center gap-2">{getCategoryIcon(principle.principle_category)}{principle.principle_name}</CardTitle>
                  <Badge variant="outline">Weight: {(principle.weight * 100).toFixed(0)}%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">{principle.description}</p>
                <div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">Category:</span><Badge variant="secondary" className="capitalize">{principle.principle_category.replace(/_/g, ' ')}</Badge></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          {actions.map((action) => (
            <Card key={action.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="capitalize">{action.action_type.replace(/_/g, ' ')}</CardTitle>
                  <Badge className={getStatusColor(action.governance_status)}>{action.governance_status.replace(/_/g, ' ')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{action.action_description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div><p className="text-sm text-muted-foreground">Stewardship</p><div className="flex items-center gap-2"><Progress value={(action.stewardship_score / 5) * 100} className="flex-1" /><span className="text-sm font-semibold">{action.stewardship_score.toFixed(1)}</span></div></div>
                  <div><p className="text-sm text-muted-foreground">Life Preservation</p><div className="flex items-center gap-2"><Progress value={(action.life_preservation_score / 5) * 100} className="flex-1" /><span className="text-sm font-semibold">{action.life_preservation_score.toFixed(1)}</span></div></div>
                  <div><p className="text-sm text-muted-foreground">Intergenerational</p><div className="flex items-center gap-2"><Progress value={(action.intergenerational_score / 5) * 100} className="flex-1" /><span className="text-sm font-semibold">{action.intergenerational_score.toFixed(1)}</span></div></div>
                  <div><p className="text-sm text-muted-foreground">Profit Alignment</p><div className="flex items-center gap-2"><Progress value={(action.profit_alignment_score / 5) * 100} className="flex-1" /><span className="text-sm font-semibold">{action.profit_alignment_score.toFixed(1)}</span></div></div>
                </div>
                <div className="border-t pt-3"><p className="text-sm text-muted-foreground mb-1">Governance Rationale:</p><p className="text-sm">{action.governance_rationale}</p></div>
                <div className="mt-2 text-right"><p className="text-xs text-muted-foreground">Overall Score: {action.overall_governance_score.toFixed(1)}/5.0</p></div>
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
                    <CardTitle className="flex items-center gap-2">{getCategoryIcon(metric.metric_type.replace('_indicator', ''))}{metric.metric_name}</CardTitle>
                    <span className="text-lg">{getTrendIcon(metric.trend_direction)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><p className="text-muted-foreground">Current</p><p className="font-semibold">{metric.current_value.toLocaleString()}</p></div>
                      <div><p className="text-muted-foreground">Target</p><p className="font-semibold">{metric.target_value.toLocaleString()}</p></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1"><span>Progress to Target</span><span>{((metric.current_value / metric.target_value) * 100).toFixed(1)}%</span></div>
                      <Progress value={(metric.current_value / metric.target_value) * 100} />
                      <p className="text-xs text-muted-foreground mt-1">Unit: {metric.measurement_unit} • Trend: {metric.trend_direction}</p>
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
                  <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />{alignment.revenue_stream}</CardTitle>
                  <Badge variant="outline">{alignment.purpose_contribution_percentage.toFixed(1)}% Purpose-Aligned</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div><p className="text-sm text-muted-foreground">Revenue Amount</p><p className="text-lg font-semibold">${alignment.revenue_amount.toLocaleString()}</p></div>
                  <div><p className="text-sm text-muted-foreground">Purpose Contribution</p><div className="flex items-center gap-2"><Progress value={alignment.purpose_contribution_percentage} className="flex-1" /><span className="text-sm font-semibold">{alignment.purpose_contribution_percentage.toFixed(1)}%</span></div></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div><p className="text-muted-foreground mb-1">Stewardship Impact</p><div className="bg-green-500/10 p-2 rounded text-xs">{alignment.stewardship_impact?.summary || 'Land and resource stewardship'}</div></div>
                  <div><p className="text-muted-foreground mb-1">Life Preservation</p><div className="bg-red-500/10 p-2 rounded text-xs">{alignment.life_preservation_impact?.summary || 'Biodiversity and ecosystem health'}</div></div>
                  <div><p className="text-muted-foreground mb-1">Intergenerational</p><div className="bg-blue-500/10 p-2 rounded text-xs">{alignment.intergenerational_impact?.summary || 'Future generations benefit'}</div></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Period: {new Date(alignment.reporting_period_start).toLocaleDateString()} - {new Date(alignment.reporting_period_end).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
