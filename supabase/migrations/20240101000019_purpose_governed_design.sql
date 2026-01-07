-- Purpose-Governed by Design System
CREATE TABLE governance_principles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  principle_name TEXT UNIQUE NOT NULL,
  principle_category TEXT NOT NULL, -- 'stewardship', 'life_preservation', 'intergenerational_responsibility'
  description TEXT NOT NULL,
  weight DECIMAL(3,2) NOT NULL, -- 0.0 to 1.0
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE action_governance_filters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type TEXT NOT NULL, -- 'investment', 'project_approval', 'fund_release', 'partnership', 'policy_change'
  action_description TEXT NOT NULL,
  proposed_by UUID REFERENCES auth.users(id),
  stewardship_score DECIMAL(5,2) NOT NULL,
  life_preservation_score DECIMAL(5,2) NOT NULL,
  intergenerational_score DECIMAL(5,2) NOT NULL,
  profit_alignment_score DECIMAL(5,2) NOT NULL, -- How well profit serves purpose
  overall_governance_score DECIMAL(5,2) NOT NULL,
  governance_status TEXT NOT NULL DEFAULT 'pending' CHECK (governance_status IN ('pending', 'approved', 'rejected', 'requires_modification')),
  governance_rationale TEXT NOT NULL,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE purpose_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_type TEXT NOT NULL, -- 'stewardship_indicator', 'life_preservation_indicator', 'intergenerational_indicator'
  current_value DECIMAL(15,4) NOT NULL,
  target_value DECIMAL(15,4) NOT NULL,
  measurement_unit TEXT NOT NULL,
  trend_direction TEXT NOT NULL CHECK (trend_direction IN ('improving', 'stable', 'declining')),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE profit_purpose_alignment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  revenue_stream TEXT NOT NULL,
  revenue_amount DECIMAL(15,2) NOT NULL,
  purpose_contribution_percentage DECIMAL(5,2) NOT NULL,
  stewardship_impact JSONB NOT NULL,
  life_preservation_impact JSONB NOT NULL,
  intergenerational_impact JSONB NOT NULL,
  profit_reinvestment_plan JSONB NOT NULL,
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE intergenerational_impact_assessment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  assessment_horizon_years INTEGER NOT NULL, -- 7, 25, 100 year assessments
  environmental_legacy JSONB NOT NULL,
  social_legacy JSONB NOT NULL,
  economic_legacy JSONB NOT NULL,
  risk_factors JSONB NOT NULL,
  mitigation_strategies JSONB NOT NULL,
  future_generations_benefit_score DECIMAL(5,2) NOT NULL,
  assessed_by UUID REFERENCES auth.users(id),
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE stewardship_commitments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commitment_type TEXT NOT NULL, -- 'land_protection', 'biodiversity_conservation', 'carbon_sequestration', 'water_stewardship'
  commitment_description TEXT NOT NULL,
  committed_by UUID REFERENCES auth.users(id),
  commitment_scope JSONB NOT NULL, -- geographic area, species, resources
  commitment_timeline JSONB NOT NULL,
  progress_indicators JSONB NOT NULL,
  current_status TEXT NOT NULL DEFAULT 'active' CHECK (current_status IN ('active', 'completed', 'at_risk', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert core governance principles
INSERT INTO governance_principles (principle_name, principle_category, description, weight) VALUES
('Land Stewardship', 'stewardship', 'Responsible care and management of land resources for current and future generations', 0.30),
('Biodiversity Preservation', 'life_preservation', 'Protection and enhancement of biological diversity and ecosystem health', 0.25),
('Climate Stability', 'intergenerational_responsibility', 'Actions that contribute to long-term climate stability and resilience', 0.20),
('Community Wellbeing', 'stewardship', 'Supporting the health, prosperity, and self-determination of local communities', 0.15),
('Regenerative Economics', 'intergenerational_responsibility', 'Economic models that restore rather than deplete natural and social capital', 0.10);

-- Insert sample purpose metrics
INSERT INTO purpose_metrics (metric_name, metric_type, current_value, target_value, measurement_unit, trend_direction) VALUES
('Ecosystem Health Index', 'stewardship_indicator', 7.2, 9.0, 'index_score', 'improving'),
('Species Diversity Count', 'life_preservation_indicator', 1247, 1500, 'species_count', 'improving'),
('Carbon Sequestration Rate', 'intergenerational_indicator', 2.3, 5.0, 'tCO2_per_hectare_per_year', 'improving'),
('Community Self-Sufficiency Index', 'stewardship_indicator', 6.8, 8.5, 'index_score', 'stable'),
('Regenerative Revenue Percentage', 'intergenerational_indicator', 78.5, 95.0, 'percentage', 'improving');

-- Enable RLS
ALTER TABLE governance_principles ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_governance_filters ENABLE ROW LEVEL SECURITY;
ALTER TABLE purpose_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profit_purpose_alignment ENABLE ROW LEVEL SECURITY;
ALTER TABLE intergenerational_impact_assessment ENABLE ROW LEVEL SECURITY;
ALTER TABLE stewardship_commitments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read governance principles" ON governance_principles FOR SELECT USING (active = true);
CREATE POLICY "Admin manage governance principles" ON governance_principles FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users view own actions" ON action_governance_filters FOR SELECT USING (auth.uid() = proposed_by OR auth.jwt() ->> 'role' IN ('admin', 'governance_reviewer'));
CREATE POLICY "Users propose actions" ON action_governance_filters FOR INSERT WITH CHECK (auth.uid() = proposed_by);
CREATE POLICY "Governance reviewers manage actions" ON action_governance_filters FOR UPDATE USING (auth.jwt() ->> 'role' IN ('admin', 'governance_reviewer'));

CREATE POLICY "Public read purpose metrics" ON purpose_metrics FOR SELECT USING (true);
CREATE POLICY "Admin manage purpose metrics" ON purpose_metrics FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read profit alignment" ON profit_purpose_alignment FOR SELECT USING (true);
CREATE POLICY "Admin manage profit alignment" ON profit_purpose_alignment FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read impact assessments" ON intergenerational_impact_assessment FOR SELECT USING (true);
CREATE POLICY "Assessors manage impact assessments" ON intergenerational_impact_assessment FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'impact_assessor'));

CREATE POLICY "Users view stewardship commitments" ON stewardship_commitments FOR SELECT USING (true);
CREATE POLICY "Users make commitments" ON stewardship_commitments FOR INSERT WITH CHECK (auth.uid() = committed_by);
CREATE POLICY "Commitment owners manage commitments" ON stewardship_commitments FOR UPDATE USING (auth.uid() = committed_by OR auth.jwt() ->> 'role' = 'admin');