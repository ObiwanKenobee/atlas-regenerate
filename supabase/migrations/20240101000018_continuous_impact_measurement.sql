-- Continuous Impact Measurement System
CREATE TABLE impact_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  metric_type TEXT NOT NULL, -- 'carbon_sequestration', 'biodiversity_index', 'water_quality', 'soil_health', 'community_engagement'
  metric_category TEXT NOT NULL, -- 'environmental', 'social', 'economic'
  baseline_value DECIMAL(15,4) NOT NULL,
  current_value DECIMAL(15,4) NOT NULL,
  target_value DECIMAL(15,4) NOT NULL,
  measurement_unit TEXT NOT NULL,
  measurement_method TEXT NOT NULL,
  confidence_level DECIMAL(3,2) NOT NULL,
  last_measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE impact_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_id UUID REFERENCES impact_metrics(id),
  measured_value DECIMAL(15,4) NOT NULL,
  measurement_source TEXT NOT NULL, -- 'satellite', 'iot_sensor', 'field_survey', 'third_party_audit'
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'disputed', 'rejected')),
  measurement_data JSONB,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES auth.users(id)
);

CREATE TABLE audit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  audit_period_start DATE NOT NULL,
  audit_period_end DATE NOT NULL,
  audit_type TEXT NOT NULL, -- 'quarterly', 'annual', 'certification', 'compliance'
  auditor_organization TEXT NOT NULL,
  auditor_contact JSONB NOT NULL,
  audit_scope TEXT[] NOT NULL,
  findings JSONB NOT NULL,
  recommendations JSONB,
  overall_rating TEXT NOT NULL CHECK (overall_rating IN ('excellent', 'good', 'satisfactory', 'needs_improvement', 'unsatisfactory')),
  certification_status TEXT DEFAULT 'pending' CHECK (certification_status IN ('pending', 'certified', 'conditional', 'denied')),
  report_url TEXT,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE third_party_verifiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  verifier_type TEXT NOT NULL, -- 'certification_body', 'audit_firm', 'research_institution', 'government_agency'
  accreditation_standards TEXT[] NOT NULL,
  contact_information JSONB NOT NULL,
  verification_scope TEXT[] NOT NULL,
  active_status BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE impact_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  certification_type TEXT NOT NULL, -- 'carbon_verified', 'biodiversity_certified', 'regenerative_organic', 'fair_trade'
  certification_standard TEXT NOT NULL,
  certifying_body UUID REFERENCES third_party_verifiers(id),
  certification_level TEXT NOT NULL, -- 'bronze', 'silver', 'gold', 'platinum'
  score DECIMAL(5,2) NOT NULL,
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  certificate_url TEXT,
  badge_image_url TEXT,
  verification_data JSONB NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE portfolio_impact_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES investor_portfolios(id),
  summary_period_start DATE NOT NULL,
  summary_period_end DATE NOT NULL,
  total_carbon_sequestered DECIMAL(15,4) DEFAULT 0,
  biodiversity_improvement DECIMAL(10,4) DEFAULT 0,
  water_quality_improvement DECIMAL(10,4) DEFAULT 0,
  soil_health_improvement DECIMAL(10,4) DEFAULT 0,
  communities_impacted INTEGER DEFAULT 0,
  jobs_created INTEGER DEFAULT 0,
  impact_score DECIMAL(5,2) NOT NULL,
  sdg_alignment JSONB NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE real_time_dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  dashboard_type TEXT NOT NULL, -- 'portfolio_impact', 'project_impact', 'global_impact'
  dashboard_config JSONB NOT NULL,
  refresh_interval INTEGER DEFAULT 300, -- seconds
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample third-party verifiers
INSERT INTO third_party_verifiers (organization_name, verifier_type, accreditation_standards, contact_information, verification_scope) VALUES
('Verra Registry', 'certification_body', ARRAY['VCS', 'CCB'], '{"website": "verra.org", "email": "info@verra.org"}', ARRAY['carbon_credits', 'biodiversity']),
('Gold Standard', 'certification_body', ARRAY['GS4GG', 'GS-VER'], '{"website": "goldstandard.org", "email": "info@goldstandard.org"}', ARRAY['carbon_credits', 'sdg_impact']),
('Regenerative Organic Alliance', 'certification_body', ARRAY['ROC'], '{"website": "regenorganic.org", "email": "info@regenorganic.org"}', ARRAY['regenerative_agriculture', 'soil_health']),
('Rainforest Alliance', 'certification_body', ARRAY['RA-Cert'], '{"website": "rainforest-alliance.org", "email": "info@ra.org"}', ARRAY['biodiversity', 'community_impact']);

-- Enable RLS
ALTER TABLE impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE third_party_verifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_impact_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_time_dashboards ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read impact metrics" ON impact_metrics FOR SELECT USING (true);
CREATE POLICY "Admin manage impact metrics" ON impact_metrics FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read verified measurements" ON impact_measurements FOR SELECT USING (verification_status = 'verified');
CREATE POLICY "Verifiers manage measurements" ON impact_measurements FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'verifier'));

CREATE POLICY "Public read published audit reports" ON audit_reports FOR SELECT USING (published_at IS NOT NULL);
CREATE POLICY "Admin manage audit reports" ON audit_reports FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read verifiers" ON third_party_verifiers FOR SELECT USING (active_status = true);
CREATE POLICY "Admin manage verifiers" ON third_party_verifiers FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read certifications" ON impact_certifications FOR SELECT USING (valid_until >= CURRENT_DATE);
CREATE POLICY "Certifiers manage certifications" ON impact_certifications FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'certifier'));

CREATE POLICY "Users view own portfolio impact" ON portfolio_impact_summary FOR SELECT USING (
  EXISTS (SELECT 1 FROM investor_portfolios WHERE id = portfolio_id AND investor_id = auth.uid())
);

CREATE POLICY "Users manage own dashboards" ON real_time_dashboards FOR ALL USING (auth.uid() = user_id);