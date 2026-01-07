-- From Stories to Systems Knowledge Platform
CREATE TABLE knowledge_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_type TEXT NOT NULL, -- 'impact_story', 'scientific_finding', 'cultural_wisdom', 'practice_guide'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content JSONB NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  project_id UUID REFERENCES projects(id),
  knowledge_category TEXT[] NOT NULL, -- 'regenerative_agriculture', 'ecosystem_restoration', 'community_development'
  geographic_relevance TEXT[] NOT NULL,
  cultural_context JSONB,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'featured', 'archived')),
  impact_metrics JSONB,
  replication_potential DECIMAL(3,2) DEFAULT 0,
  social_value_score DECIMAL(5,2) DEFAULT 0,
  economic_value_score DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE impact_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_asset_id UUID REFERENCES knowledge_assets(id),
  story_type TEXT NOT NULL, -- 'transformation', 'challenge_overcome', 'innovation', 'community_success'
  storyteller_name TEXT NOT NULL,
  storyteller_role TEXT NOT NULL,
  community_context JSONB NOT NULL,
  before_state JSONB NOT NULL,
  intervention_details JSONB NOT NULL,
  after_state JSONB NOT NULL,
  lessons_learned TEXT[] NOT NULL,
  replication_guidance JSONB,
  media_attachments JSONB, -- photos, videos, audio
  story_timeline JSONB NOT NULL,
  emotional_impact_score DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE scientific_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_asset_id UUID REFERENCES knowledge_assets(id),
  research_type TEXT NOT NULL, -- 'field_study', 'lab_analysis', 'longitudinal_study', 'meta_analysis'
  research_question TEXT NOT NULL,
  methodology JSONB NOT NULL,
  data_collection_period JSONB NOT NULL,
  sample_size INTEGER,
  key_findings JSONB NOT NULL,
  statistical_significance DECIMAL(4,3),
  practical_applications JSONB NOT NULL,
  peer_review_status TEXT DEFAULT 'pending' CHECK (peer_review_status IN ('pending', 'reviewed', 'published', 'cited')),
  citations_count INTEGER DEFAULT 0,
  replication_studies JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cultural_wisdom (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_asset_id UUID REFERENCES knowledge_assets(id),
  wisdom_type TEXT NOT NULL, -- 'traditional_practice', 'indigenous_knowledge', 'ancestral_technique', 'cultural_value'
  cultural_origin TEXT NOT NULL,
  knowledge_keeper TEXT NOT NULL,
  knowledge_lineage JSONB NOT NULL,
  practice_description JSONB NOT NULL,
  seasonal_timing JSONB,
  ecological_principles JSONB NOT NULL,
  social_protocols JSONB NOT NULL,
  adaptation_guidelines JSONB,
  preservation_status TEXT NOT NULL CHECK (preservation_status IN ('thriving', 'maintained', 'at_risk', 'endangered')),
  intergenerational_transfer JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE knowledge_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_asset_id UUID REFERENCES knowledge_assets(id),
  target_asset_id UUID REFERENCES knowledge_assets(id),
  connection_type TEXT NOT NULL, -- 'builds_upon', 'validates', 'contradicts', 'complements', 'applies_to'
  connection_strength DECIMAL(3,2) NOT NULL, -- 0.0 to 1.0
  connection_description TEXT NOT NULL,
  discovered_by TEXT, -- 'ai_analysis', 'user_submission', 'expert_review'
  validated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE knowledge_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_asset_id UUID REFERENCES knowledge_assets(id),
  applied_by UUID REFERENCES auth.users(id),
  application_context JSONB NOT NULL,
  adaptation_made JSONB,
  results_achieved JSONB NOT NULL,
  success_metrics JSONB NOT NULL,
  challenges_faced JSONB,
  recommendations JSONB,
  replication_value DECIMAL(3,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE knowledge_synthesis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  synthesis_title TEXT NOT NULL,
  synthesis_type TEXT NOT NULL, -- 'best_practices', 'meta_analysis', 'pattern_recognition', 'innovation_pathway'
  contributing_assets UUID[] NOT NULL,
  synthesis_content JSONB NOT NULL,
  key_insights TEXT[] NOT NULL,
  actionable_recommendations JSONB NOT NULL,
  confidence_level DECIMAL(3,2) NOT NULL,
  generated_by TEXT NOT NULL, -- 'ai_synthesis', 'expert_panel', 'community_collaboration'
  validation_status TEXT DEFAULT 'draft' CHECK (validation_status IN ('draft', 'reviewed', 'validated', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE social_learning_networks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  network_name TEXT NOT NULL,
  network_focus TEXT[] NOT NULL,
  coordinator_id UUID REFERENCES auth.users(id),
  member_count INTEGER DEFAULT 0,
  knowledge_sharing_frequency TEXT NOT NULL,
  collaboration_tools JSONB NOT NULL,
  learning_outcomes JSONB,
  network_impact_score DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE knowledge_economics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_asset_id UUID REFERENCES knowledge_assets(id),
  economic_value_type TEXT NOT NULL, -- 'cost_savings', 'revenue_generation', 'efficiency_gains', 'risk_reduction'
  quantified_value DECIMAL(15,2),
  value_calculation_method TEXT NOT NULL,
  time_horizon_years INTEGER NOT NULL,
  beneficiary_scale TEXT NOT NULL, -- 'individual', 'community', 'regional', 'global'
  replication_multiplier DECIMAL(8,4) DEFAULT 1.0000,
  economic_validation JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE knowledge_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE scientific_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_wisdom ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_synthesis ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_learning_networks ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_economics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read verified knowledge" ON knowledge_assets FOR SELECT USING (verification_status IN ('verified', 'featured'));
CREATE POLICY "Users create knowledge" ON knowledge_assets FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors manage own knowledge" ON knowledge_assets FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Public read stories" ON impact_stories FOR SELECT USING (
  EXISTS (SELECT 1 FROM knowledge_assets WHERE id = knowledge_asset_id AND verification_status IN ('verified', 'featured'))
);
CREATE POLICY "Users create stories" ON impact_stories FOR INSERT USING (
  EXISTS (SELECT 1 FROM knowledge_assets WHERE id = knowledge_asset_id AND author_id = auth.uid())
);

CREATE POLICY "Public read findings" ON scientific_findings FOR SELECT USING (
  EXISTS (SELECT 1 FROM knowledge_assets WHERE id = knowledge_asset_id AND verification_status IN ('verified', 'featured'))
);

CREATE POLICY "Public read cultural wisdom" ON cultural_wisdom FOR SELECT USING (
  EXISTS (SELECT 1 FROM knowledge_assets WHERE id = knowledge_asset_id AND verification_status IN ('verified', 'featured'))
);

CREATE POLICY "Public read validated connections" ON knowledge_connections FOR SELECT USING (validated = true);
CREATE POLICY "Users create connections" ON knowledge_connections FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Public read applications" ON knowledge_applications FOR SELECT USING (true);
CREATE POLICY "Users create applications" ON knowledge_applications FOR INSERT WITH CHECK (auth.uid() = applied_by);

CREATE POLICY "Public read validated synthesis" ON knowledge_synthesis FOR SELECT USING (validation_status IN ('validated', 'published'));
CREATE POLICY "Experts create synthesis" ON knowledge_synthesis FOR INSERT USING (auth.jwt() ->> 'role' IN ('admin', 'expert', 'researcher'));

CREATE POLICY "Public read networks" ON social_learning_networks FOR SELECT USING (true);
CREATE POLICY "Coordinators manage networks" ON social_learning_networks FOR ALL USING (auth.uid() = coordinator_id);

CREATE POLICY "Public read economics" ON knowledge_economics FOR SELECT USING (true);
CREATE POLICY "Experts manage economics" ON knowledge_economics FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'economist', 'researcher'));