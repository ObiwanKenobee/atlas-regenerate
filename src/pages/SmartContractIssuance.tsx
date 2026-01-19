import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Target, DollarSign, AlertTriangle, Users, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SmartContract {
  id: string;
  project_id: string;
  contract_type: string;
  contract_status: string;
  total_value: number;
  value_flows: any;
  stakeholder_shares: any;
  performance_milestones: any;
  created_at: string;
}

interface ContractMilestone {
  id: string;
  contract_id: string;
  milestone_name: string;
  milestone_type: string;
  target_value: number;
  current_value: number;
  release_percentage: number;
  status: string;
}

interface ValueRelease {
  id: string;
  contract_id: string;
  release_amount: number;
  stakeholder_distributions: any;
  release_trigger: string;
  released_at: string;
}

interface ContractDispute {
  id: string;
  contract_id: string;
  dispute_type: string;
  description: string;
  status: string;
  created_at: string;
}

export default function SmartContractIssuance() {
  const [contracts, setContracts] = useState<SmartContract[]>([]);
  const [milestones, setMilestones] = useState<ContractMilestone[]>([]);
  const [releases, setReleases] = useState<ValueRelease[]>([]);
  const [disputes, setDisputes] = useState<ContractDispute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContractData();
    const interval = setInterval(fetchContractData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchContractData = async () => {
    try {
      const [contractsRes, milestonesRes, releasesRes, disputesRes] = await Promise.all([
        supabase.from('smart_contracts').select('*').order('created_at', { ascending: false }),
        supabase.from('contract_milestones').select('*').order('milestone_name'),
        supabase.from('value_releases').select('*').order('released_at', { ascending: false }).limit(10),
        supabase.from('contract_disputes').select('*').order('created_at', { ascending: false }).limit(10)
      ]);

      if (contractsRes.data) setContracts(contractsRes.data);
      if (milestonesRes.data) setMilestones(milestonesRes.data);
      if (releasesRes.data) setReleases(releasesRes.data);
      if (disputesRes.data) setDisputes(disputesRes.data);
    } catch (error) {
      console.error('Error fetching contract data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'disputed': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getMilestoneProgress = (milestone: ContractMilestone) => {
    return Math.min((milestone.current_value / milestone.target_value) * 100, 100);
  };

  const getTotalContractValue = () => {
    return contracts.reduce((sum, contract) => sum + contract.total_value, 0);
  };

  const getActiveContracts = () => {
    return contracts.filter(c => c.contract_status === 'active').length;
  };

  const getTotalReleased = () => {
    return releases.reduce((sum, release) => sum + release.release_amount, 0);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading contract data...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Smart Contract Issuance</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Contracts</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Contracts</p>
                <p className="text-2xl font-bold">{getActiveContracts()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${getTotalContractValue().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Total Released</p>
                <p className="text-2xl font-bold">${getTotalReleased().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
                  <CardTitle className="capitalize">{contract.contract_type.replace('_', ' ')}</CardTitle>
                  <Badge className={getStatusColor(contract.contract_status)}>
                    {contract.contract_status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-lg font-semibold">${contract.total_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stakeholders</p>
                    <p className="text-lg font-semibold">
                      {Object.keys(contract.stakeholder_shares || {}).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Milestones</p>
                    <p className="text-lg font-semibold">
                      {milestones.filter(m => m.contract_id === contract.id).length}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Stakeholder Shares</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(contract.stakeholder_shares || {}).map(([role, share]) => (
                      <Badge key={role} variant="outline">
                        {role}: {share}%
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {milestone.milestone_name}
                  </CardTitle>
                  <Badge variant={milestone.status === 'achieved' ? 'default' : 'secondary'}>
                    {milestone.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Target Value</p>
                      <p className="text-lg font-semibold">{milestone.target_value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Release %</p>
                      <p className="text-lg font-semibold">{milestone.release_percentage}%</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{getMilestoneProgress(milestone).toFixed(1)}%</span>
                    </div>
                    <Progress value={getMilestoneProgress(milestone)} />
                    <p className="text-xs text-gray-500 mt-1">
                      {milestone.current_value.toLocaleString()} / {milestone.target_value.toLocaleString()}
                    </p>
                  </div>
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
                    <div>
                      <p className="font-medium">${release.release_amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 capitalize">
                        {release.release_trigger.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(release.released_at).toLocaleDateString()}
                  </p>
                </div>
                {release.stakeholder_distributions && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-2">Distribution</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(release.stakeholder_distributions).map(([stakeholder, amount]) => (
                        <Badge key={stakeholder} variant="outline">
                          {stakeholder}: ${Number(amount).toLocaleString()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          {disputes.map((dispute) => (
            <Card key={dispute.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    {dispute.dispute_type.replace('_', ' ')}
                  </CardTitle>
                  <Badge variant={dispute.status === 'resolved' ? 'default' : 'destructive'}>
                    {dispute.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-2">{dispute.description}</p>
                <p className="text-xs text-gray-500">
                  Raised on {new Date(dispute.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}