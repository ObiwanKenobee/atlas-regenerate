import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Lightbulb, Heart, Network, TrendingUp, Users, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface KnowledgeAsset {
  id: string;
  asset_type: string;
  title: string;
  description: string;
  author_id: string;
  project_id: string;
  knowledge_category: string[];
  geographic_relevance: string[];
  verification_status: string;
  replication_potential: number;
  social_value_score: number;
  economic_value_score: number;
  created_at: string;
}

interface ImpactStory {
  id: string;
  knowledge_asset_id: string;
  story_type: string;
  storyteller_name: string;
  storyteller_role: string;
  community_context: any;
  lessons_learned: string[];
  emotional_impact_score: number;
  created_at: string;
}

interface ScientificFinding {
  id: string;
  knowledge_asset_id: string;
  research_type: string;
  research_question: string;
  key_findings: any;
  statistical_significance: number;
  peer_review_status: string;
  citations_count: number;
  created_at: string;
}

interface CulturalWisdom {
  id: string;
  knowledge_asset_id: string;
  wisdom_type: string;
  cultural_origin: string;
  knowledge_keeper: string;
  preservation_status: string;
  created_at: string;
}

interface KnowledgeSynthesis {
  id: string;
  synthesis_title: string;
  synthesis_type: string;
  contributing_assets: string[];
  key_insights: string[];
  confidence_level: number;
  generated_by: string;
  validation_status: string;
  created_at: string;
}

export default function StoriesToSystems() {
  const [knowledgeAssets, setKnowledgeAssets] = useState<KnowledgeAsset[]>([]);
  const [impactStories, setImpactStories] = useState<ImpactStory[]>([]);
  const [scientificFindings, setScientificFindings] = useState<ScientificFinding[]>([]);
  const [culturalWisdom, setCulturalWisdom] = useState<CulturalWisdom[]>([]);
  const [synthesis, setSynthesis] = useState<KnowledgeSynthesis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKnowledgeData();
    const interval = setInterval(fetchKnowledgeData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchKnowledgeData = async () => {
    try {
      const [assetsRes, storiesRes, findingsRes, wisdomRes, synthesisRes] = await Promise.all([
        supabase.from('knowledge_assets').select('*').in('verification_status', ['verified', 'featured']).order('created_at', { ascending: false }),
        supabase.from('impact_stories').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('scientific_findings').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('cultural_wisdom').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('knowledge_synthesis').select('*').in('validation_status', ['validated', 'published']).order('created_at', { ascending: false }).limit(5)
      ]);

      if (assetsRes.data) setKnowledgeAssets(assetsRes.data);
      if (storiesRes.data) setImpactStories(storiesRes.data);
      if (findingsRes.data) setScientificFindings(findingsRes.data);
      if (wisdomRes.data) setCulturalWisdom(wisdomRes.data);
      if (synthesisRes.data) setSynthesis(synthesisRes.data);
    } catch (error) {
      console.error('Error fetching knowledge data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'impact_story': return <Heart className="h-4 w-4 text-red-600" />;
      case 'scientific_finding': return <Lightbulb className="h-4 w-4 text-blue-600" />;
      case 'cultural_wisdom': return <Users className="h-4 w-4 text-purple-600" />;
      case 'practice_guide': return <BookOpen className="h-4 w-4 text-green-600" />;
      default: return <Globe className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'featured': return 'bg-gold-500';
      case 'verified': return 'bg-green-500';
      case 'published': return 'bg-blue-500';
      case 'validated': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPreservationColor = (status: string) => {
    switch (status) {
      case 'thriving': return 'bg-green-500';
      case 'maintained': return 'bg-blue-500';
      case 'at_risk': return 'bg-yellow-500';
      case 'endangered': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTotalKnowledgeValue = () => {
    return knowledgeAssets.reduce((sum, asset) => sum + asset.social_value_score + asset.economic_value_score, 0);
  };

  const getAverageReplicationPotential = () => {
    if (knowledgeAssets.length === 0) return 0;
    return knowledgeAssets.reduce((sum, asset) => sum + asset.replication_potential, 0) / knowledgeAssets.length;
  };

  const getStoriesByType = () => {
    const types = impactStories.reduce((acc, story) => {
      acc[story.story_type] = (acc[story.story_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(types);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading knowledge platform...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Network className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">From Stories to Systems</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Knowledge Assets</p>
                <p className="text-2xl font-bold">{knowledgeAssets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Value Score</p>
                <p className="text-2xl font-bold">{getTotalKnowledgeValue().toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Replication Potential</p>
                <p className="text-2xl font-bold">{(getAverageReplicationPotential() * 100).toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Synthesis Reports</p>
                <p className="text-2xl font-bold">{synthesis.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
                    <CardTitle className="flex items-center gap-2">
                      {getAssetTypeIcon(asset.asset_type)}
                      {asset.title}
                    </CardTitle>
                    <Badge className={getStatusColor(asset.verification_status)}>
                      {asset.verification_status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">{asset.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Social Value</p>
                        <p className="font-semibold">{asset.social_value_score.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Economic Value</p>
                        <p className="font-semibold">{asset.economic_value_score.toFixed(1)}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Replication Potential</span>
                        <span>{(asset.replication_potential * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={asset.replication_potential * 100} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Categories</p>
                      <div className="flex flex-wrap gap-1">
                        {asset.knowledge_category.slice(0, 2).map((category, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {category.replace('_', ' ')}
                          </Badge>
                        ))}
                        {asset.knowledge_category.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{asset.knowledge_category.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(asset.created_at).toLocaleDateString()}
                    </p>
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
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    {story.story_type.replace('_', ' ')} Story
                  </CardTitle>
                  <Badge variant="outline">
                    Impact: {story.emotional_impact_score.toFixed(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Storyteller</p>
                      <p className="font-semibold">{story.storyteller_name}</p>
                      <p className="text-xs text-gray-500">{story.storyteller_role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Community Context</p>
                      <p className="text-sm">{story.community_context?.location || 'Global'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Key Lessons Learned</p>
                    <ul className="text-sm space-y-1">
                      {story.lessons_learned.slice(0, 3).map((lesson, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-gray-500">
                    Shared: {new Date(story.created_at).toLocaleDateString()}
                  </p>
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
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    {finding.research_type.replace('_', ' ')}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(finding.peer_review_status)}>
                      {finding.peer_review_status}
                    </Badge>
                    <Badge variant="outline">
                      Citations: {finding.citations_count}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Research Question</p>
                    <p className="text-sm font-medium">{finding.research_question}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Key Findings</p>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      {finding.key_findings?.summary || 'Detailed findings available in full report'}
                    </div>
                  </div>
                  {finding.statistical_significance && (
                    <div>
                      <p className="text-sm text-gray-600">Statistical Significance</p>
                      <p className="font-semibold">p = {finding.statistical_significance.toFixed(3)}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Published: {new Date(finding.created_at).toLocaleDateString()}
                  </p>
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
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {wisdom.wisdom_type.replace('_', ' ')}
                  </CardTitle>
                  <Badge className={getPreservationColor(wisdom.preservation_status)}>
                    {wisdom.preservation_status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Cultural Origin</p>
                      <p className="font-semibold">{wisdom.cultural_origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Knowledge Keeper</p>
                      <p className="font-semibold">{wisdom.knowledge_keeper}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Preservation Status</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getPreservationColor(wisdom.preservation_status).replace('bg-', 'bg-')}`} />
                      <span className="text-sm capitalize">{wisdom.preservation_status.replace('_', ' ')}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Documented: {new Date(wisdom.created_at).toLocaleDateString()}
                  </p>
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
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    {synth.synthesis_title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(synth.validation_status)}>
                      {synth.validation_status}
                    </Badge>
                    <Badge variant="outline">
                      {synth.contributing_assets.length} sources
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Synthesis Type</p>
                    <p className="font-medium capitalize">{synth.synthesis_type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Key Insights</p>
                    <ul className="text-sm space-y-1">
                      {synth.key_insights.slice(0, 3).map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Confidence Level</p>
                      <Progress value={synth.confidence_level * 100} className="w-24 mt-1" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Generated by</p>
                      <p className="text-sm font-medium">{synth.generated_by.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(synth.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}