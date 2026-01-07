-- Ethical AI Governance System
CREATE TABLE ethical_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  decision_type TEXT NOT NULL, -- 'funding', 'verification', 'stewardship', 'impact'
  ai_rationale JSONB NOT NULL,
  confidence_score DECIMAL(3,2) NOT NULL,
  ethical_score DECIMAL(3,2) NOT NULL,
  decision_outcome TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE community_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id UUID REFERENCES ethical_decisions(id),
  user_id UUID REFERENCES auth.users(id),
  vote TEXT NOT NULL CHECK (vote IN ('approve', 'reject', 'abstain')),
  rationale TEXT,
  voting_power DECIMAL(5,2) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE stewardship_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES auth.users(id),
  environmental_score DECIMAL(3,2) NOT NULL,
  social_score DECIMAL(3,2) NOT NULL,
  governance_score DECIMAL(3,2) NOT NULL,
  overall_score DECIMAL(3,2) NOT NULL,
  assessment_data JSONB NOT NULL,
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE impact_additionality (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  baseline_metrics JSONB NOT NULL,
  projected_impact JSONB NOT NULL,
  verified_impact JSONB,
  additionality_score DECIMAL(3,2) NOT NULL,
  verification_method TEXT NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE governance_parameters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parameter_name TEXT UNIQUE NOT NULL,
  parameter_value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default governance parameters
INSERT INTO governance_parameters (parameter_name, parameter_value, description) VALUES
('voting_threshold', '0.6', 'Minimum approval threshold for community votes'),
('min_stewardship_score', '0.7', 'Minimum stewardship score for project approval'),
('ai_confidence_threshold', '0.8', 'Minimum AI confidence for automated decisions'),
('impact_verification_period', '90', 'Days between impact verification cycles');

-- Enable RLS
ALTER TABLE ethical_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stewardship_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_additionality ENABLE ROW LEVEL SECURITY;
ALTER TABLE governance_parameters ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read ethical decisions" ON ethical_decisions FOR SELECT USING (true);
CREATE POLICY "Admin manage ethical decisions" ON ethical_decisions FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can vote" ON community_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public read votes" ON community_votes FOR SELECT USING (true);

CREATE POLICY "Public read stewardship scores" ON stewardship_scores FOR SELECT USING (true);
CREATE POLICY "Users can assess stewardship" ON stewardship_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public read impact additionality" ON impact_additionality FOR SELECT USING (true);
CREATE POLICY "Admin manage impact additionality" ON impact_additionality FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read governance parameters" ON governance_parameters FOR SELECT USING (true);
CREATE POLICY "Admin manage governance parameters" ON governance_parameters FOR ALL USING (auth.jwt() ->> 'role' = 'admin');