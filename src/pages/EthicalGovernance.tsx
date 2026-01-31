import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Vote, Shield, Target, CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EthicalDecision {
  id: string;
  project_id: string;
  decision_type: string;
  ai_rationale: any;
  confidence_score: number;
  ethical_score: number;
  decision_outcome: string;
  created_at: string;
}

interface CommunityVote {
  id: string;
  decision_id: string;
  vote: string;
  rationale: string;
  voting_power: number;
  created_at: string;
}

interface StewardshipScore {
  id: string;
  project_id: string;
  environmental_score: number;
  social_score: number;
  governance_score: number;
  overall_score: number;
  assessed_at: string;
}

export default function EthicalGovernance() {
  // Mock data since ethical governance tables don't exist
  const decisions: EthicalDecision[] = [
    { id: '1', project_id: 'p1', decision_type: 'funding', ai_rationale: { summary: 'Project meets ethical guidelines' }, confidence_score: 0.92, ethical_score: 0.88, decision_outcome: 'approved', created_at: '2026-01-25' },
    { id: '2', project_id: 'p2', decision_type: 'verification', ai_rationale: { summary: 'Requires additional documentation' }, confidence_score: 0.78, ethical_score: 0.82, decision_outcome: 'pending_review', created_at: '2026-01-24' }
  ];

  const votes: CommunityVote[] = [
    { id: '1', decision_id: '1', vote: 'approve', rationale: 'Strong environmental impact', voting_power: 1.5, created_at: '2026-01-26' },
    { id: '2', decision_id: '1', vote: 'approve', rationale: 'Benefits local community', voting_power: 1.0, created_at: '2026-01-26' }
  ];

  const scores: StewardshipScore[] = [
    { id: '1', project_id: 'p1', environmental_score: 8.5, social_score: 7.8, governance_score: 8.2, overall_score: 8.2, assessed_at: '2026-01-20' }
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const submitVote = async (decisionId: string, vote: string, rationale: string) => {
    toast.success('Vote submitted successfully');
  };

  const getDecisionIcon = (type: string) => {
    switch (type) {
      case 'funding': return <Target className="h-4 w-4" />;
      case 'verification': return <CheckCircle className="h-4 w-4" />;
      case 'stewardship': return <Shield className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getVoteColor = (vote: string) => {
    switch (vote) {
      case 'approve': return 'bg-green-500';
      case 'reject': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading governance data...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Ethical AI Governance</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">AI Decisions</p>
                <p className="text-2xl font-bold">{decisions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Vote className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Community Votes</p>
                <p className="text-2xl font-bold">{votes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Stewardship</p>
                <p className="text-2xl font-bold">
                  {scores.length > 0 ? (scores.reduce((acc, s) => acc + s.overall_score, 0) / scores.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Ethical Score</p>
                <p className="text-2xl font-bold">
                  {decisions.length > 0 ? (decisions.reduce((acc, d) => acc + d.ethical_score, 0) / decisions.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="decisions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="decisions">AI Decisions</TabsTrigger>
          <TabsTrigger value="voting">Community Voting</TabsTrigger>
          <TabsTrigger value="stewardship">Stewardship Scores</TabsTrigger>
          <TabsTrigger value="impact">Impact Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="decisions" className="space-y-4">
          {decisions.map((decision) => (
            <Card key={decision.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getDecisionIcon(decision.decision_type)}
                    <CardTitle className="capitalize">{decision.decision_type} Decision</CardTitle>
                  </div>
                  <Badge variant={decision.decision_outcome === 'approved' ? 'default' : 'destructive'}>
                    {decision.decision_outcome}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">AI Confidence</p>
                      <Progress value={decision.confidence_score * 100} className="mt-1" />
                      <p className="text-xs text-gray-500 mt-1">{(decision.confidence_score * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ethical Score</p>
                      <Progress value={decision.ethical_score * 100} className="mt-1" />
                      <p className="text-xs text-gray-500 mt-1">{(decision.ethical_score * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">AI Rationale</p>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                      {decision.ai_rationale?.reasoning || 'No rationale provided'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="voting" className="space-y-4">
          {votes.map((vote) => (
            <Card key={vote.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getVoteColor(vote.vote)}`} />
                    <div>
                      <p className="font-medium capitalize">{vote.vote}</p>
                      <p className="text-sm text-gray-600">Power: {vote.voting_power}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(vote.created_at).toLocaleDateString()}
                  </p>
                </div>
                {vote.rationale && (
                  <p className="text-sm text-gray-700 mt-2 pl-6">{vote.rationale}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="stewardship" className="space-y-4">
          {scores.map((score) => (
            <Card key={score.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Stewardship Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Environmental</p>
                    <Progress value={score.environmental_score * 100} className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">{(score.environmental_score * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Social</p>
                    <Progress value={score.social_score * 100} className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">{(score.social_score * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Governance</p>
                    <Progress value={score.governance_score * 100} className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">{(score.governance_score * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall</p>
                    <Progress value={score.overall_score * 100} className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">{(score.overall_score * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Impact Additionality Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Impact verification data will appear here</p>
                <p className="text-sm text-gray-500 mt-2">Verification cycles run every 90 days</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}