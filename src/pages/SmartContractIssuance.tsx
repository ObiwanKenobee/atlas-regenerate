import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Target, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';

// Mock data
const mockContracts = [
  { id: '1', project_id: 'p1', contract_type: 'impact_verified_release', contract_status: 'active', total_value: 850000, value_flows: {}, stakeholder_shares: { practitioner: 60, investor: 25, platform: 10, community: 5 }, performance_milestones: {}, created_at: '2025-06-15' },
  { id: '2', project_id: 'p2', contract_type: 'milestone_based_payment', contract_status: 'active', total_value: 1200000, value_flows: {}, stakeholder_shares: { practitioner: 55, investor: 30, platform: 10, community: 5 }, performance_milestones: {}, created_at: '2025-08-20' },
  { id: '3', project_id: 'p3', contract_type: 'revenue_share', contract_status: 'completed', total_value: 450000, value_flows: {}, stakeholder_shares: { practitioner: 65, investor: 20, platform: 10, community: 5 }, performance_milestones: {}, created_at: '2025-03-10' },
];

const mockMilestones = [
  { id: '1', contract_id: 'c1', milestone_name: 'Initial Planting Complete', milestone_type: 'carbon', target_value: 10000, current_value: 8500, release_percentage: 25, status: 'in_progress' },
  { id: '2', contract_id: 'c1', milestone_name: 'Year 1 Survival Rate', milestone_type: 'biodiversity', target_value: 85, current_value: 88, release_percentage: 25, status: 'achieved' },
  { id: '3', contract_id: 'c2', milestone_name: 'Soil Carbon Increase', milestone_type: 'carbon', target_value: 2500, current_value: 1800, release_percentage: 30, status: 'in_progress' },
  { id: '4', contract_id: 'c2', milestone_name: 'Water Quality Improvement', milestone_type: 'water', target_value: 40, current_value: 42, release_percentage: 20, status: 'achieved' },
];

const mockReleases = [
  { id: '1', contract_id: 'c1', release_amount: 212500, stakeholder_distributions: { practitioner: 127500, investor: 53125, platform: 21250, community: 10625 }, release_trigger: 'milestone_achieved', released_at: '2026-01-05' },
  { id: '2', contract_id: 'c2', release_amount: 240000, stakeholder_distributions: { practitioner: 132000, investor: 72000, platform: 24000, community: 12000 }, release_trigger: 'quarterly_review', released_at: '2025-12-31' },
];

const mockDisputes = [
  { id: '1', contract_id: 'c3', dispute_type: 'measurement_accuracy', description: 'Disagreement over carbon sequestration measurement methodology', status: 'resolved', created_at: '2025-11-15' },
];

export default function SmartContractIssuance() {
  const [contracts] = useState(mockContracts);
  const [milestones] = useState(mockMilestones);
  const [releases] = useState(mockReleases);
  const [disputes] = useState(mockDisputes);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'achieved': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'disputed': return 'bg-red-500';
      case 'paused': case 'in_progress': return 'bg-yellow-500';
      default: return 'bg-muted';
    }
  };

  const getMilestoneProgress = (milestone: typeof mockMilestones[0]) => Math.min((milestone.current_value / milestone.target_value) * 100, 100);

  const getTotalContractValue = () => contracts.reduce((sum, c) => sum + c.total_value, 0);
  const getActiveContracts = () => contracts.filter(c => c.contract_status === 'active').length;
  const getTotalReleased = () => releases.reduce((sum, r) => sum + r.release_amount, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Smart Contract Issuance</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><FileText className="h-5 w-5 text-blue-600" /><div><p className="text-sm text-muted-foreground">Total Contracts</p><p className="text-2xl font-bold">{contracts.length}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /><div><p className="text-sm text-muted-foreground">Active Contracts</p><p className="text-2xl font-bold">{getActiveContracts()}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-purple-600" /><div><p className="text-sm text-muted-foreground">Total Value</p><p className="text-2xl font-bold">${getTotalContractValue().toLocaleString()}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-orange-600" /><div><p className="text-sm text-muted-foreground">Total Released</p><p className="text-2xl font-bold">${getTotalReleased().toLocaleString()}</p></div></div></CardContent></Card>
      </div>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="releases">Value Releases</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="capitalize">{contract.contract_type.replace(/_/g, ' ')}</CardTitle>
                  <Badge className={getStatusColor(contract.contract_status)}>{contract.contract_status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><p className="text-sm text-muted-foreground">Total Value</p><p className="text-lg font-semibold">${contract.total_value.toLocaleString()}</p></div>
                  <div><p className="text-sm text-muted-foreground">Stakeholders</p><p className="text-lg font-semibold">{Object.keys(contract.stakeholder_shares || {}).length}</p></div>
                  <div><p className="text-sm text-muted-foreground">Milestones</p><p className="text-lg font-semibold">{milestones.filter(m => m.contract_id === contract.id).length}</p></div>
                </div>
                <div className="mt-4"><p className="text-sm text-muted-foreground mb-2">Stakeholder Shares</p><div className="flex flex-wrap gap-2">{Object.entries(contract.stakeholder_shares || {}).map(([role, share]) => (<Badge key={role} variant="outline">{role}: {share}%</Badge>))}</div></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" />{milestone.milestone_name}</CardTitle>
                  <Badge variant={milestone.status === 'achieved' ? 'default' : 'secondary'}>{milestone.status.replace(/_/g, ' ')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground">Target Value</p><p className="text-lg font-semibold">{milestone.target_value.toLocaleString()}</p></div>
                    <div><p className="text-sm text-muted-foreground">Release %</p><p className="text-lg font-semibold">{milestone.release_percentage}%</p></div>
                  </div>
                  <div><div className="flex justify-between text-sm mb-1"><span>Progress</span><span>{getMilestoneProgress(milestone).toFixed(1)}%</span></div><Progress value={getMilestoneProgress(milestone)} /><p className="text-xs text-muted-foreground mt-1">{milestone.current_value.toLocaleString()} / {milestone.target_value.toLocaleString()}</p></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="releases" className="space-y-4">
          {releases.map((release) => (
            <Card key={release.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div><p className="font-medium">${release.release_amount.toLocaleString()}</p><p className="text-sm text-muted-foreground capitalize">{release.release_trigger.replace(/_/g, ' ')}</p></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(release.released_at).toLocaleDateString()}</p>
                </div>
                {release.stakeholder_distributions && (
                  <div className="mt-3 pt-3 border-t"><p className="text-sm text-muted-foreground mb-2">Distribution</p><div className="flex flex-wrap gap-2">{Object.entries(release.stakeholder_distributions).map(([stakeholder, amount]) => (<Badge key={stakeholder} variant="outline">{stakeholder}: ${Number(amount).toLocaleString()}</Badge>))}</div></div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          {disputes.length === 0 ? (
            <Card><CardContent className="p-8 text-center"><AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No active disputes</p></CardContent></Card>
          ) : (
            disputes.map((dispute) => (
              <Card key={dispute.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 capitalize"><AlertTriangle className="h-5 w-5 text-red-500" />{dispute.dispute_type.replace(/_/g, ' ')}</CardTitle>
                    <Badge variant={dispute.status === 'resolved' ? 'default' : 'destructive'}>{dispute.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{dispute.description}</p>
                  <p className="text-xs text-muted-foreground">Raised on {new Date(dispute.created_at).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
