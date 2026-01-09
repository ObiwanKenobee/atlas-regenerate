import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Vote, Shield, Target, CheckCircle, Clock } from 'lucide-react';

// Mock data
const mockDecisions = [
  { id: '1', project_id: 'p1', decision_type: 'funding', ai_rationale: { reasoning: 'Project meets all regenerative criteria with strong community support and verified environmental impact.' }, confidence_score: 0.92, ethical_score: 0.88, decision_outcome: 'approved', created_at: '2026-01-08' },
  { id: '2', project_id: 'p2', decision_type: 'verification', ai_rationale: { reasoning: 'Carbon sequestration measurements verified through satellite imagery and ground sensors.' }, confidence_score: 0.85, ethical_score: 0.91, decision_outcome: 'approved', created_at: '2026-01-07' },
  { id: '3', project_id: 'p3', decision_type: 'stewardship', ai_rationale: { reasoning: 'Land management practices align with indigenous knowledge and ecological principles.' }, confidence_score: 0.78, ethical_score: 0.95, decision_outcome: 'approved', created_at: '2026-01-06' },
];

const mockVotes = [
  { id: '1', decision_id: 'd1', vote: 'approve', rationale: 'Strong environmental impact potential', voting_power: 1.5, created_at: '2026-01-08' },
  { id: '2', decision_id: 'd1', vote: 'approve', rationale: 'Community-driven approach is excellent', voting_power: 1.0, created_at: '2026-01-08' },
  { id: '3', decision_id: 'd2', vote: 'approve', rationale: 'Verification methodology is sound', voting_power: 2.0, created_at: '2026-01-07' },
  { id: '4', decision_id: 'd2', vote: 'abstain', rationale: 'Need more data on long-term impact', voting_power: 1.0, created_at: '2026-01-07' },
];

const mockScores = [
  { id: '1', project_id: 'p1', environmental_score: 0.92, social_score: 0.85, governance_score: 0.88, overall_score: 0.88, assessed_at: '2026-01-05' },
  { id: '2', project_id: 'p2', environmental_score: 0.78, social_score: 0.91, governance_score: 0.82, overall_score: 0.84, assessed_at: '2026-01-04' },
  { id: '3', project_id: 'p3', environmental_score: 0.95, social_score: 0.89, governance_score: 0.91, overall_score: 0.92, assessed_at: '2026-01-03' },
];

export default function EthicalGovernance() {
  const [decisions] = useState(mockDecisions);
  const [votes] = useState(mockVotes);
  const [scores] = useState(mockScores);

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
      default: return 'bg-muted';
    }
  };

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
                <p className="text-sm text-muted-foreground">AI Decisions</p>
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
                <p className="text-sm text-muted-foreground">Community Votes</p>
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
                <p className="text-sm text-muted-foreground">Avg Stewardship</p>
                <p className="text-2xl font-bold">{scores.length > 0 ? (scores.reduce((acc, s) => acc + s.overall_score, 0) / scores.length).toFixed(2) : '0.00'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Ethical Score</p>
                <p className="text-2xl font-bold">{decisions.length > 0 ? (decisions.reduce((acc, d) => acc + d.ethical_score, 0) / decisions.length).toFixed(2) : '0.00'}</p>
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
                  <Badge variant={decision.decision_outcome === 'approved' ? 'default' : 'destructive'}>{decision.decision_outcome}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">AI Confidence</p>
                      <Progress value={decision.confidence_score * 100} className="mt-1" />
                      <p className="text-xs text-muted-foreground mt-1">{(decision.confidence_score * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ethical Score</p>
                      <Progress value={decision.ethical_score * 100} className="mt-1" />
                      <p className="text-xs text-muted-foreground mt-1">{(decision.ethical_score * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">AI Rationale</p>
                    <p className="text-sm bg-muted/30 p-3 rounded">{decision.ai_rationale?.reasoning || 'No rationale provided'}</p>
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
                      <p className="text-sm text-muted-foreground">Power: {vote.voting_power}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(vote.created_at).toLocaleDateString()}</p>
                </div>
                {vote.rationale && <p className="text-sm text-muted-foreground mt-2 pl-6">{vote.rationale}</p>}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="stewardship" className="space-y-4">
          {scores.map((score) => (
            <Card key={score.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Stewardship Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Environmental</p>
                    <Progress value={score.environmental_score * 100} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{(score.environmental_score * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Social</p>
                    <Progress value={score.social_score * 100} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{(score.social_score * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Governance</p>
                    <Progress value={score.governance_score * 100} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{(score.governance_score * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Overall</p>
                    <Progress value={score.overall_score * 100} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{(score.overall_score * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" />Impact Additionality Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Impact verification data will appear here</p>
                <p className="text-sm text-muted-foreground mt-2">Verification cycles run every 90 days</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
