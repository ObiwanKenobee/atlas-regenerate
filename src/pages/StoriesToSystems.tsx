import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Lightbulb, Heart, Network, TrendingUp, Users, Globe } from 'lucide-react';

// Mock data
const mockKnowledgeAssets = [
  { id: '1', asset_type: 'impact_story', title: 'Regenerating the Costa Rican Rainforest', description: 'How local communities transformed degraded farmland into thriving forest ecosystem', author_id: 'a1', project_id: 'p1', knowledge_category: ['forest_restoration', 'community_engagement', 'biodiversity'], geographic_relevance: ['Central America', 'Tropical'], verification_status: 'featured', replication_potential: 0.85, social_value_score: 92, economic_value_score: 78, created_at: '2025-11-15' },
  { id: '2', asset_type: 'scientific_finding', title: 'Soil Carbon Sequestration in Regenerative Agriculture', description: 'Peer-reviewed research on carbon capture potential of cover cropping practices', author_id: 'a2', project_id: 'p2', knowledge_category: ['soil_health', 'carbon_sequestration', 'agriculture'], geographic_relevance: ['North America', 'Temperate'], verification_status: 'verified', replication_potential: 0.92, social_value_score: 65, economic_value_score: 88, created_at: '2025-10-20' },
  { id: '3', asset_type: 'cultural_wisdom', title: 'Traditional Fire Management Practices', description: 'Indigenous knowledge systems for sustainable land management', author_id: 'a3', project_id: 'p3', knowledge_category: ['indigenous_knowledge', 'fire_management', 'land_stewardship'], geographic_relevance: ['Australia', 'Arid'], verification_status: 'verified', replication_potential: 0.68, social_value_score: 95, economic_value_score: 52, created_at: '2025-09-08' },
];

const mockImpactStories = [
  { id: '1', knowledge_asset_id: 'k1', story_type: 'transformation', storyteller_name: 'Maria Santos', storyteller_role: 'Community Leader', community_context: { location: 'Costa Rica' }, lessons_learned: ['Community ownership is essential', 'Start with quick wins', 'Build trust over time'], emotional_impact_score: 9.2, created_at: '2025-11-15' },
  { id: '2', knowledge_asset_id: 'k2', story_type: 'resilience', storyteller_name: 'David Chen', storyteller_role: 'Regenerative Farmer', community_context: { location: 'California' }, lessons_learned: ['Patience is key in soil regeneration', 'Diversity builds resilience', 'Measure what matters'], emotional_impact_score: 8.5, created_at: '2025-10-20' },
];

const mockScientificFindings = [
  { id: '1', knowledge_asset_id: 'k2', research_type: 'field_study', research_question: 'How does cover cropping affect soil organic carbon over 5 years?', key_findings: { summary: '35% increase in soil organic carbon observed in treatment plots compared to control' }, statistical_significance: 0.001, peer_review_status: 'published', citations_count: 47, created_at: '2025-10-20' },
  { id: '2', knowledge_asset_id: 'k3', research_type: 'meta_analysis', research_question: 'What are the biodiversity outcomes of regenerative grazing practices?', key_findings: { summary: 'Regenerative grazing associated with 28% higher biodiversity index across 15 studies' }, statistical_significance: 0.01, peer_review_status: 'peer_reviewed', citations_count: 23, created_at: '2025-08-15' },
];

const mockCulturalWisdom = [
  { id: '1', knowledge_asset_id: 'k3', wisdom_type: 'land_management', cultural_origin: 'Aboriginal Australian', knowledge_keeper: 'Elder James Walker', preservation_status: 'maintained', created_at: '2025-09-08' },
  { id: '2', knowledge_asset_id: 'k4', wisdom_type: 'water_stewardship', cultural_origin: 'Andean Quechua', knowledge_keeper: 'Community Council', preservation_status: 'thriving', created_at: '2025-07-22' },
];

const mockSynthesis = [
  { id: '1', synthesis_title: 'Integrated Approaches to Ecosystem Restoration', synthesis_type: 'cross_domain', contributing_assets: ['k1', 'k2', 'k3'], key_insights: ['Community engagement doubles success rates', 'Traditional knowledge enhances scientific approaches', 'Financial sustainability requires diversified revenue'], confidence_level: 0.87, generated_by: 'ai_assisted', validation_status: 'validated', created_at: '2026-01-05' },
];

export default function StoriesToSystems() {
  const [knowledgeAssets] = useState(mockKnowledgeAssets);
  const [impactStories] = useState(mockImpactStories);
  const [scientificFindings] = useState(mockScientificFindings);
  const [culturalWisdom] = useState(mockCulturalWisdom);
  const [synthesis] = useState(mockSynthesis);

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'impact_story': return <Heart className="h-4 w-4 text-red-600" />;
      case 'scientific_finding': return <Lightbulb className="h-4 w-4 text-blue-600" />;
      case 'cultural_wisdom': return <Users className="h-4 w-4 text-purple-600" />;
      case 'practice_guide': return <BookOpen className="h-4 w-4 text-green-600" />;
      default: return <Globe className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'featured': return 'bg-yellow-500';
      case 'verified': case 'published': case 'validated': return 'bg-green-500';
      default: return 'bg-muted';
    }
  };

  const getPreservationColor = (status: string) => {
    switch (status) {
      case 'thriving': return 'bg-green-500';
      case 'maintained': return 'bg-blue-500';
      case 'at_risk': return 'bg-yellow-500';
      case 'endangered': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  const getTotalKnowledgeValue = () => knowledgeAssets.reduce((sum, a) => sum + a.social_value_score + a.economic_value_score, 0);
  const getAverageReplicationPotential = () => knowledgeAssets.length === 0 ? 0 : knowledgeAssets.reduce((sum, a) => sum + a.replication_potential, 0) / knowledgeAssets.length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Network className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">From Stories to Systems</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-blue-600" /><div><p className="text-sm text-muted-foreground">Knowledge Assets</p><p className="text-2xl font-bold">{knowledgeAssets.length}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /><div><p className="text-sm text-muted-foreground">Total Value Score</p><p className="text-2xl font-bold">{getTotalKnowledgeValue().toFixed(0)}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Globe className="h-5 w-5 text-purple-600" /><div><p className="text-sm text-muted-foreground">Replication Potential</p><p className="text-2xl font-bold">{(getAverageReplicationPotential() * 100).toFixed(0)}%</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Network className="h-5 w-5 text-orange-600" /><div><p className="text-sm text-muted-foreground">Synthesis Reports</p><p className="text-2xl font-bold">{synthesis.length}</p></div></div></CardContent></Card>
      </div>

      <Tabs defaultValue="assets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assets">Knowledge Assets</TabsTrigger>
          <TabsTrigger value="stories">Impact Stories</TabsTrigger>
          <TabsTrigger value="science">Scientific Findings</TabsTrigger>
          <TabsTrigger value="wisdom">Cultural Wisdom</TabsTrigger>
          <TabsTrigger value="synthesis">Knowledge Synthesis</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {knowledgeAssets.map((asset) => (
              <Card key={asset.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">{getAssetTypeIcon(asset.asset_type)}{asset.title}</CardTitle>
                    <Badge className={getStatusColor(asset.verification_status)}>{asset.verification_status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{asset.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><p className="text-muted-foreground">Social Value</p><p className="font-semibold">{asset.social_value_score.toFixed(1)}</p></div>
                      <div><p className="text-muted-foreground">Economic Value</p><p className="font-semibold">{asset.economic_value_score.toFixed(1)}</p></div>
                    </div>
                    <div><div className="flex justify-between text-sm mb-1"><span>Replication Potential</span><span>{(asset.replication_potential * 100).toFixed(0)}%</span></div><Progress value={asset.replication_potential * 100} /></div>
                    <div><p className="text-sm text-muted-foreground mb-2">Categories</p><div className="flex flex-wrap gap-1">{asset.knowledge_category.slice(0, 2).map((cat, i) => (<Badge key={i} variant="outline" className="text-xs">{cat.replace(/_/g, ' ')}</Badge>))}{asset.knowledge_category.length > 2 && <Badge variant="outline" className="text-xs">+{asset.knowledge_category.length - 2}</Badge>}</div></div>
                    <p className="text-xs text-muted-foreground">Created: {new Date(asset.created_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stories" className="space-y-4">
          {impactStories.map((story) => (
            <Card key={story.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 capitalize"><Heart className="h-5 w-5" />{story.story_type} Story</CardTitle>
                  <Badge variant="outline">Impact: {story.emotional_impact_score.toFixed(1)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground">Storyteller</p><p className="font-semibold">{story.storyteller_name}</p><p className="text-xs text-muted-foreground">{story.storyteller_role}</p></div>
                    <div><p className="text-sm text-muted-foreground">Community Context</p><p className="text-sm">{story.community_context?.location || 'Global'}</p></div>
                  </div>
                  <div><p className="text-sm text-muted-foreground mb-2">Key Lessons Learned</p><ul className="text-sm space-y-1">{story.lessons_learned.slice(0, 3).map((lesson, i) => (<li key={i} className="flex items-start gap-2"><span className="text-green-600 mt-1">•</span><span>{lesson}</span></li>))}</ul></div>
                  <p className="text-xs text-muted-foreground">Shared: {new Date(story.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="science" className="space-y-4">
          {scientificFindings.map((finding) => (
            <Card key={finding.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 capitalize"><Lightbulb className="h-5 w-5" />{finding.research_type.replace(/_/g, ' ')}</CardTitle>
                  <div className="flex gap-2"><Badge className={getStatusColor(finding.peer_review_status)}>{finding.peer_review_status.replace(/_/g, ' ')}</Badge><Badge variant="outline">Citations: {finding.citations_count}</Badge></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div><p className="text-sm text-muted-foreground mb-1">Research Question</p><p className="text-sm font-medium">{finding.research_question}</p></div>
                  <div><p className="text-sm text-muted-foreground mb-1">Key Findings</p><div className="bg-blue-500/10 p-3 rounded text-sm">{finding.key_findings?.summary || 'Detailed findings available in full report'}</div></div>
                  {finding.statistical_significance && <div><p className="text-sm text-muted-foreground">Statistical Significance</p><p className="font-semibold">p = {finding.statistical_significance.toFixed(3)}</p></div>}
                  <p className="text-xs text-muted-foreground">Published: {new Date(finding.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="wisdom" className="space-y-4">
          {culturalWisdom.map((wisdom) => (
            <Card key={wisdom.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 capitalize"><Users className="h-5 w-5" />{wisdom.wisdom_type.replace(/_/g, ' ')}</CardTitle>
                  <Badge className={getPreservationColor(wisdom.preservation_status)}>{wisdom.preservation_status.replace(/_/g, ' ')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground">Cultural Origin</p><p className="font-semibold">{wisdom.cultural_origin}</p></div>
                    <div><p className="text-sm text-muted-foreground">Knowledge Keeper</p><p className="font-semibold">{wisdom.knowledge_keeper}</p></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Documented: {new Date(wisdom.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="synthesis" className="space-y-4">
          {synthesis.map((synth) => (
            <Card key={synth.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><Network className="h-5 w-5" />{synth.synthesis_title}</CardTitle>
                  <div className="flex gap-2"><Badge className={getStatusColor(synth.validation_status)}>{synth.validation_status}</Badge><Badge variant="outline">Confidence: {(synth.confidence_level * 100).toFixed(0)}%</Badge></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div><p className="text-sm text-muted-foreground mb-2">Key Insights</p><ul className="text-sm space-y-2">{synth.key_insights.map((insight, i) => (<li key={i} className="flex items-start gap-2"><span className="text-primary mt-1">→</span><span>{insight}</span></li>))}</ul></div>
                  <div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">Generated by:</span><Badge variant="outline" className="capitalize">{synth.generated_by.replace(/_/g, ' ')}</Badge></div>
                  <p className="text-xs text-muted-foreground">Created: {new Date(synth.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
