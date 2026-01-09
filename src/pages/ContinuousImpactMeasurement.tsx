import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Award, FileText, Shield, TrendingUp, Leaf, Droplets, Users } from 'lucide-react';

// Mock data
const mockMetrics = [
  { id: '1', project_id: 'p1', metric_type: 'carbon_sequestration', metric_category: 'climate', baseline_value: 100, current_value: 450, target_value: 600, measurement_unit: 'tCO2', confidence_level: 0.92, last_measured_at: '2026-01-05' },
  { id: '2', project_id: 'p1', metric_type: 'biodiversity_index', metric_category: 'ecosystem', baseline_value: 3.2, current_value: 5.8, target_value: 7.0, measurement_unit: 'index', confidence_level: 0.88, last_measured_at: '2026-01-04' },
  { id: '3', project_id: 'p2', metric_type: 'water_quality', metric_category: 'water', baseline_value: 60, current_value: 85, target_value: 95, measurement_unit: '%', confidence_level: 0.95, last_measured_at: '2026-01-03' },
  { id: '4', project_id: 'p2', metric_type: 'community_engagement', metric_category: 'social', baseline_value: 120, current_value: 380, target_value: 500, measurement_unit: 'members', confidence_level: 0.90, last_measured_at: '2026-01-02' },
];

const mockAuditReports = [
  { id: '1', project_id: 'p1', audit_period_start: '2025-07-01', audit_period_end: '2025-12-31', audit_type: 'Annual', auditor_organization: 'EcoAudit Global', overall_rating: 'excellent', certification_status: 'certified', generated_at: '2026-01-05' },
  { id: '2', project_id: 'p2', audit_period_start: '2025-10-01', audit_period_end: '2025-12-31', audit_type: 'Quarterly', auditor_organization: 'Green Verify Inc', overall_rating: 'good', certification_status: 'certified', generated_at: '2026-01-03' },
];

const mockCertifications = [
  { id: '1', project_id: 'p1', certification_type: 'Carbon Standard', certification_standard: 'Verra VCS', certification_level: 'gold', score: 92, valid_from: '2025-01-01', valid_until: '2027-01-01', badge_image_url: '' },
  { id: '2', project_id: 'p2', certification_type: 'Biodiversity', certification_standard: 'IBAT', certification_level: 'platinum', score: 96, valid_from: '2025-06-01', valid_until: '2027-06-01', badge_image_url: '' },
  { id: '3', project_id: 'p1', certification_type: 'Social Impact', certification_standard: 'B Corp', certification_level: 'silver', score: 78, valid_from: '2025-03-01', valid_until: '2026-03-01', badge_image_url: '' },
];

const mockPortfolioSummary = [
  { id: '1', portfolio_id: 'pf1', total_carbon_sequestered: 12500, biodiversity_improvement: 0.35, water_quality_improvement: 0.28, communities_impacted: 45, jobs_created: 230, impact_score: 4.2, summary_period_start: '2025-01-01', summary_period_end: '2025-12-31' },
  { id: '2', portfolio_id: 'pf2', total_carbon_sequestered: 8700, biodiversity_improvement: 0.22, water_quality_improvement: 0.41, communities_impacted: 28, jobs_created: 156, impact_score: 3.8, summary_period_start: '2025-01-01', summary_period_end: '2025-12-31' },
];

export default function ContinuousImpactMeasurement() {
  const [metrics] = useState(mockMetrics);
  const [auditReports] = useState(mockAuditReports);
  const [certifications] = useState(mockCertifications);
  const [portfolioSummary] = useState(mockPortfolioSummary);

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'carbon_sequestration': return <Leaf className="h-4 w-4 text-green-600" />;
      case 'biodiversity_index': return <Activity className="h-4 w-4 text-blue-600" />;
      case 'water_quality': return <Droplets className="h-4 w-4 text-cyan-600" />;
      case 'community_engagement': return <Users className="h-4 w-4 text-purple-600" />;
      default: return <TrendingUp className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'satisfactory': return 'bg-yellow-500';
      case 'needs_improvement': return 'bg-orange-500';
      case 'unsatisfactory': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  const getCertificationColor = (level: string) => {
    switch (level) {
      case 'platinum': return 'bg-purple-500';
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-400';
      case 'bronze': return 'bg-orange-600';
      default: return 'bg-muted';
    }
  };

  const getMetricProgress = (metric: typeof mockMetrics[0]) => {
    const progress = ((metric.current_value - metric.baseline_value) / (metric.target_value - metric.baseline_value)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const getTotalCarbonSequestered = () => portfolioSummary.reduce((sum, s) => sum + s.total_carbon_sequestered, 0);
  const getTotalCommunitiesImpacted = () => portfolioSummary.reduce((sum, s) => sum + s.communities_impacted, 0);
  const getAverageImpactScore = () => portfolioSummary.length === 0 ? 0 : portfolioSummary.reduce((sum, s) => sum + s.impact_score, 0) / portfolioSummary.length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold">Continuous Impact Measurement</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Carbon Sequestered</p>
                <p className="text-2xl font-bold">{getTotalCarbonSequestered().toLocaleString()} tCO₂</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Communities Impacted</p>
                <p className="text-2xl font-bold">{getTotalCommunitiesImpacted()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Certifications</p>
                <p className="text-2xl font-bold">{certifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Impact Score</p>
                <p className="text-2xl font-bold">{getAverageImpactScore().toFixed(1)}/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Real-Time Dashboard</TabsTrigger>
          <TabsTrigger value="audits">Audit Reports</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 capitalize">
                      {getMetricIcon(metric.metric_type)}
                      {metric.metric_type.replace('_', ' ')}
                    </CardTitle>
                    <Badge variant="outline" className="capitalize">{metric.metric_category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div><p className="text-muted-foreground">Baseline</p><p className="font-semibold">{metric.baseline_value.toLocaleString()}</p></div>
                      <div><p className="text-muted-foreground">Current</p><p className="font-semibold">{metric.current_value.toLocaleString()}</p></div>
                      <div><p className="text-muted-foreground">Target</p><p className="font-semibold">{metric.target_value.toLocaleString()}</p></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1"><span>Progress to Target</span><span>{getMetricProgress(metric).toFixed(1)}%</span></div>
                      <Progress value={getMetricProgress(metric)} />
                      <p className="text-xs text-muted-foreground mt-1">Unit: {metric.measurement_unit} • Confidence: {(metric.confidence_level * 100).toFixed(0)}%</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Last measured: {new Date(metric.last_measured_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          {auditReports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />{report.audit_type} Audit Report</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getRatingColor(report.overall_rating)}>{report.overall_rating}</Badge>
                    <Badge variant="outline" className="capitalize">{report.certification_status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><p className="text-sm text-muted-foreground">Auditor</p><p className="font-semibold">{report.auditor_organization}</p></div>
                  <div><p className="text-sm text-muted-foreground">Period</p><p className="font-semibold">{new Date(report.audit_period_start).toLocaleDateString()} - {new Date(report.audit_period_end).toLocaleDateString()}</p></div>
                  <div><p className="text-sm text-muted-foreground">Generated</p><p className="font-semibold">{new Date(report.generated_at).toLocaleDateString()}</p></div>
                </div>
                <div className="mt-4"><Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-2" />View Full Report</Button></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" />{cert.certification_type}</CardTitle>
                    <Badge className={getCertificationColor(cert.certification_level)}>{cert.certification_level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div><p className="text-sm text-muted-foreground">Standard</p><p className="font-semibold">{cert.certification_standard}</p></div>
                    <div><p className="text-sm text-muted-foreground">Score</p><div className="flex items-center gap-2"><Progress value={cert.score} className="flex-1" /><span className="text-sm font-semibold">{cert.score}/100</span></div></div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><p className="text-muted-foreground">Valid From</p><p>{new Date(cert.valid_from).toLocaleDateString()}</p></div>
                      <div><p className="text-muted-foreground">Valid Until</p><p>{new Date(cert.valid_until).toLocaleDateString()}</p></div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full"><Shield className="h-4 w-4 mr-2" />View Certificate</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          {portfolioSummary.map((summary) => (
            <Card key={summary.id}>
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Portfolio Impact Summary</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><p className="text-sm text-muted-foreground">Carbon Sequestered</p><p className="text-lg font-semibold">{summary.total_carbon_sequestered.toLocaleString()} tCO₂</p></div>
                  <div><p className="text-sm text-muted-foreground">Biodiversity Improvement</p><p className="text-lg font-semibold">+{(summary.biodiversity_improvement * 100).toFixed(1)}%</p></div>
                  <div><p className="text-sm text-muted-foreground">Communities Impacted</p><p className="text-lg font-semibold">{summary.communities_impacted}</p></div>
                  <div><p className="text-sm text-muted-foreground">Jobs Created</p><p className="text-lg font-semibold">{summary.jobs_created}</p></div>
                </div>
                <div className="mt-4"><div className="flex justify-between text-sm mb-1"><span>Overall Impact Score</span><span>{summary.impact_score.toFixed(1)}/5.0</span></div><Progress value={(summary.impact_score / 5) * 100} /></div>
                <p className="text-xs text-muted-foreground mt-2">Period: {new Date(summary.summary_period_start).toLocaleDateString()} - {new Date(summary.summary_period_end).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
