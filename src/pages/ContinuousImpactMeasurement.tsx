import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Award, FileText, Shield, TrendingUp, Leaf, Droplets, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ImpactMetric {
  id: string;
  project_id: string;
  metric_type: string;
  metric_category: string;
  baseline_value: number;
  current_value: number;
  target_value: number;
  measurement_unit: string;
  confidence_level: number;
  last_measured_at: string;
}

interface AuditReport {
  id: string;
  project_id: string;
  audit_period_start: string;
  audit_period_end: string;
  audit_type: string;
  auditor_organization: string;
  overall_rating: string;
  certification_status: string;
  generated_at: string;
}

interface ImpactCertification {
  id: string;
  project_id: string;
  certification_type: string;
  certification_standard: string;
  certification_level: string;
  score: number;
  valid_from: string;
  valid_until: string;
  badge_image_url: string;
}

interface PortfolioImpactSummary {
  id: string;
  portfolio_id: string;
  total_carbon_sequestered: number;
  biodiversity_improvement: number;
  water_quality_improvement: number;
  communities_impacted: number;
  jobs_created: number;
  impact_score: number;
  summary_period_start: string;
  summary_period_end: string;
}

export default function ContinuousImpactMeasurement() {
  // Mock data since impact measurement tables don't exist
  const metrics: ImpactMetric[] = [
    { id: '1', project_id: 'p1', metric_type: 'carbon_sequestration', metric_category: 'environmental', baseline_value: 0, current_value: 45.2, target_value: 100, measurement_unit: 'tons CO2', confidence_level: 0.92, last_measured_at: '2026-01-28' },
    { id: '2', project_id: 'p1', metric_type: 'biodiversity_index', metric_category: 'ecological', baseline_value: 3.2, current_value: 6.8, target_value: 8.0, measurement_unit: 'index', confidence_level: 0.85, last_measured_at: '2026-01-27' },
    { id: '3', project_id: 'p2', metric_type: 'water_quality', metric_category: 'environmental', baseline_value: 60, current_value: 85, target_value: 95, measurement_unit: 'percent', confidence_level: 0.88, last_measured_at: '2026-01-26' }
  ];

  const auditReports: AuditReport[] = [
    { id: '1', project_id: 'p1', audit_period_start: '2025-07-01', audit_period_end: '2025-12-31', audit_type: 'annual', auditor_organization: 'EcoVerify International', overall_rating: 'excellent', certification_status: 'certified', generated_at: '2026-01-15' }
  ];

  const certifications: ImpactCertification[] = [
    { id: '1', project_id: 'p1', certification_type: 'carbon_credit', certification_standard: 'Verra VCS', certification_level: 'gold', score: 92, valid_from: '2025-01-01', valid_until: '2026-12-31', badge_image_url: '/placeholder.svg' }
  ];

  const portfolioSummary: PortfolioImpactSummary[] = [
    { id: '1', portfolio_id: 'port1', total_carbon_sequestered: 2500, biodiversity_improvement: 35, water_quality_improvement: 28, communities_impacted: 12, jobs_created: 85, impact_score: 8.7, summary_period_start: '2025-01-01', summary_period_end: '2025-12-31' }
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'carbon_sequestration': return <Leaf className="h-4 w-4 text-green-600" />;
      case 'biodiversity_index': return <Activity className="h-4 w-4 text-blue-600" />;
      case 'water_quality': return <Droplets className="h-4 w-4 text-cyan-600" />;
      case 'community_engagement': return <Users className="h-4 w-4 text-purple-600" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'satisfactory': return 'bg-yellow-500';
      case 'needs_improvement': return 'bg-orange-500';
      case 'unsatisfactory': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCertificationColor = (level: string) => {
    switch (level) {
      case 'platinum': return 'bg-purple-500';
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-400';
      case 'bronze': return 'bg-orange-600';
      default: return 'bg-gray-500';
    }
  };

  const getMetricProgress = (metric: ImpactMetric) => {
    const progress = ((metric.current_value - metric.baseline_value) / (metric.target_value - metric.baseline_value)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const getTotalCarbonSequestered = () => {
    return portfolioSummary.reduce((sum, summary) => sum + summary.total_carbon_sequestered, 0);
  };

  const getTotalCommunitiesImpacted = () => {
    return portfolioSummary.reduce((sum, summary) => sum + summary.communities_impacted, 0);
  };

  const getAverageImpactScore = () => {
    if (portfolioSummary.length === 0) return 0;
    return portfolioSummary.reduce((sum, summary) => sum + summary.impact_score, 0) / portfolioSummary.length;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading impact data...</div>;
  }

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
                <p className="text-sm text-gray-600">Carbon Sequestered</p>
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
                <p className="text-sm text-gray-600">Communities Impacted</p>
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
                <p className="text-sm text-gray-600">Certifications</p>
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
                <p className="text-sm text-gray-600">Impact Score</p>
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
                    <CardTitle className="flex items-center gap-2">
                      {getMetricIcon(metric.metric_type)}
                      {metric.metric_type.replace('_', ' ')}
                    </CardTitle>
                    <Badge variant="outline" className="capitalize">
                      {metric.metric_category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Baseline</p>
                        <p className="font-semibold">{metric.baseline_value.toLocaleString()}</p>
                      </div>
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
                        <span>{getMetricProgress(metric).toFixed(1)}%</span>
                      </div>
                      <Progress value={getMetricProgress(metric)} />
                      <p className="text-xs text-gray-500 mt-1">
                        Unit: {metric.measurement_unit} • Confidence: {(metric.confidence_level * 100).toFixed(0)}%
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Last measured: {new Date(metric.last_measured_at).toLocaleDateString()}
                    </p>
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
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {report.audit_type} Audit Report
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getRatingColor(report.overall_rating)}>
                      {report.overall_rating}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {report.certification_status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Auditor</p>
                    <p className="font-semibold">{report.auditor_organization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Period</p>
                    <p className="font-semibold">
                      {new Date(report.audit_period_start).toLocaleDateString()} - {new Date(report.audit_period_end).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Generated</p>
                    <p className="font-semibold">{new Date(report.generated_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                </div>
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
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      {cert.certification_type.replace('_', ' ')}
                    </CardTitle>
                    <Badge className={getCertificationColor(cert.certification_level)}>
                      {cert.certification_level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Standard</p>
                      <p className="font-semibold">{cert.certification_standard}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Score</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(cert.score / 100) * 100} className="flex-1" />
                        <span className="text-sm font-semibold">{cert.score}/100</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-600">Valid From</p>
                        <p>{new Date(cert.valid_from).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Valid Until</p>
                        <p>{new Date(cert.valid_until).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Shield className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          {portfolioSummary.map((summary) => (
            <Card key={summary.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Portfolio Impact Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Carbon Sequestered</p>
                    <p className="text-lg font-semibold">{summary.total_carbon_sequestered.toLocaleString()} tCO₂</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Biodiversity Improvement</p>
                    <p className="text-lg font-semibold">+{(summary.biodiversity_improvement * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Communities Impacted</p>
                    <p className="text-lg font-semibold">{summary.communities_impacted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Jobs Created</p>
                    <p className="text-lg font-semibold">{summary.jobs_created}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Impact Score</span>
                    <span>{summary.impact_score.toFixed(1)}/5.0</span>
                  </div>
                  <Progress value={(summary.impact_score / 5) * 100} />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Period: {new Date(summary.summary_period_start).toLocaleDateString()} - {new Date(summary.summary_period_end).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}