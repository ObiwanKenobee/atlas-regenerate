-- Reality-Linked Intelligence System
CREATE TABLE ai_oracles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oracle_name TEXT NOT NULL,
  oracle_type TEXT NOT NULL, -- 'satellite_analysis', 'sensor_network', 'partner_integration', 'hybrid_intelligence'
  data_sources TEXT[] NOT NULL,
  measurement_focus TEXT[] NOT NULL, -- 'soil_health', 'ocean_vitality', 'human_outcomes', 'biodiversity', 'climate'
  ai_model_version TEXT NOT NULL,
  confidence_threshold DECIMAL(3,2) DEFAULT 0.80,
  update_frequency_minutes INTEGER DEFAULT 60,
  active_status BOOLEAN DEFAULT true,
  last_execution TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE reality_data_ingestion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oracle_id UUID REFERENCES ai_oracles(id),
  project_id UUID REFERENCES projects(id),
  data_source TEXT NOT NULL, -- 'landsat_8', 'sentinel_2', 'iot_sensors', 'field_partners', 'community_reports'
  data_type TEXT NOT NULL, -- 'satellite_imagery', 'sensor_readings', 'survey_data', 'observational_data'
  raw_data JSONB NOT NULL,
  processed_data JSONB NOT NULL,
  data_quality_score DECIMAL(3,2) NOT NULL,
  ingestion_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processing_duration_ms INTEGER NOT NULL
);

CREATE TABLE soil_health_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  oracle_id UUID REFERENCES ai_oracles(id),
  measurement_location GEOGRAPHY(POINT, 4326) NOT NULL,
  soil_organic_carbon DECIMAL(8,4) NOT NULL, -- percentage
  ph_level DECIMAL(4,2) NOT NULL,
  nutrient_levels JSONB NOT NULL, -- nitrogen, phosphorus, potassium
  microbial_diversity_index DECIMAL(6,4) NOT NULL,
  water_retention_capacity DECIMAL(6,4) NOT NULL,
  erosion_risk_score DECIMAL(3,2) NOT NULL,
  overall_health_score DECIMAL(3,2) NOT NULL,
  confidence_level DECIMAL(3,2) NOT NULL,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ocean_vitality_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  oracle_id UUID REFERENCES ai_oracles(id),
  measurement_location GEOGRAPHY(POINT, 4326) NOT NULL,
  water_temperature DECIMAL(5,2) NOT NULL, -- celsius
  ph_level DECIMAL(4,2) NOT NULL,
  dissolved_oxygen DECIMAL(6,2) NOT NULL, -- mg/L
  chlorophyll_concentration DECIMAL(8,4) NOT NULL, -- mg/m³
  marine_biodiversity_index DECIMAL(6,4) NOT NULL,
  coral_health_score DECIMAL(3,2), -- if applicable
  pollution_indicators JSONB NOT NULL,
  overall_vitality_score DECIMAL(3,2) NOT NULL,
  confidence_level DECIMAL(3,2) NOT NULL,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE human_outcome_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  oracle_id UUID REFERENCES ai_oracles(id),
  community_id TEXT NOT NULL,
  outcome_category TEXT NOT NULL, -- 'livelihood', 'health', 'education', 'food_security', 'income'
  baseline_value DECIMAL(10,4) NOT NULL,
  current_value DECIMAL(10,4) NOT NULL,
  improvement_percentage DECIMAL(6,2) NOT NULL,
  measurement_method TEXT NOT NULL, -- 'survey', 'economic_data', 'health_records', 'education_metrics'
  sample_size INTEGER NOT NULL,
  data_reliability_score DECIMAL(3,2) NOT NULL,
  cultural_context JSONB,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ai_intelligence_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oracle_id UUID REFERENCES ai_oracles(id),
  project_id UUID REFERENCES projects(id),
  insight_type TEXT NOT NULL, -- 'trend_analysis', 'anomaly_detection', 'predictive_forecast', 'correlation_discovery'
  insight_category TEXT NOT NULL, -- 'environmental', 'social', 'economic', 'integrated'
  insight_summary TEXT NOT NULL,
  detailed_analysis JSONB NOT NULL,
  confidence_score DECIMAL(3,2) NOT NULL,
  actionable_recommendations JSONB,
  data_sources_used TEXT[] NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE partner_data_integration (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name TEXT NOT NULL,
  partner_type TEXT NOT NULL, -- 'research_institution', 'government_agency', 'ngo', 'community_organization'
  data_sharing_agreement JSONB NOT NULL,
  api_endpoint TEXT,
  data_format TEXT NOT NULL, -- 'json', 'csv', 'xml', 'geojson'
  update_frequency TEXT NOT NULL,
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_status TEXT DEFAULT 'active' CHECK (sync_status IN ('active', 'paused', 'error', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE reality_validation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  measurement_id UUID NOT NULL, -- references various measurement tables
  measurement_type TEXT NOT NULL, -- 'soil_health', 'ocean_vitality', 'human_outcomes'
  validation_method TEXT NOT NULL, -- 'cross_reference', 'field_verification', 'peer_review', 'statistical_analysis'
  validation_result TEXT NOT NULL CHECK (validation_result IN ('validated', 'flagged', 'rejected', 'pending')),
  validation_confidence DECIMAL(3,2) NOT NULL,
  validation_notes TEXT,
  validated_by TEXT, -- system or user identifier
  validated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample AI oracles
INSERT INTO ai_oracles (oracle_name, oracle_type, data_sources, measurement_focus, ai_model_version, update_frequency_minutes) VALUES
('Soil Intelligence Oracle', 'hybrid_intelligence', ARRAY['landsat_8', 'sentinel_2', 'iot_sensors'], ARRAY['soil_health'], 'SoilAI-v2.1', 30),
('Ocean Vitality Oracle', 'satellite_analysis', ARRAY['modis', 'sentinel_3', 'marine_sensors'], ARRAY['ocean_vitality'], 'OceanAI-v1.8', 60),
('Human Impact Oracle', 'partner_integration', ARRAY['survey_data', 'economic_indicators', 'health_records'], ARRAY['human_outcomes'], 'HumanAI-v3.2', 120),
('Integrated Reality Oracle', 'hybrid_intelligence', ARRAY['satellite_imagery', 'sensor_networks', 'community_data'], ARRAY['soil_health', 'ocean_vitality', 'human_outcomes', 'biodiversity'], 'IntegratedAI-v4.0', 15);

-- Enable RLS
ALTER TABLE ai_oracles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reality_data_ingestion ENABLE ROW LEVEL SECURITY;
ALTER TABLE soil_health_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ocean_vitality_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE human_outcome_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_intelligence_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_data_integration ENABLE ROW LEVEL SECURITY;
ALTER TABLE reality_validation ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read active oracles" ON ai_oracles FOR SELECT USING (active_status = true);
CREATE POLICY "Admin manage oracles" ON ai_oracles FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read validated data" ON reality_data_ingestion FOR SELECT USING (data_quality_score >= 0.7);
CREATE POLICY "Oracles ingest data" ON reality_data_ingestion FOR INSERT USING (auth.jwt() ->> 'role' IN ('admin', 'oracle_system'));

CREATE POLICY "Public read soil measurements" ON soil_health_measurements FOR SELECT USING (confidence_level >= 0.7);
CREATE POLICY "Oracles create measurements" ON soil_health_measurements FOR INSERT USING (auth.jwt() ->> 'role' IN ('admin', 'oracle_system'));

CREATE POLICY "Public read ocean measurements" ON ocean_vitality_measurements FOR SELECT USING (confidence_level >= 0.7);
CREATE POLICY "Oracles create measurements" ON ocean_vitality_measurements FOR INSERT USING (auth.jwt() ->> 'role' IN ('admin', 'oracle_system'));

CREATE POLICY "Public read human outcomes" ON human_outcome_measurements FOR SELECT USING (data_reliability_score >= 0.7);
CREATE POLICY "Oracles create outcomes" ON human_outcome_measurements FOR INSERT USING (auth.jwt() ->> 'role' IN ('admin', 'oracle_system'));

CREATE POLICY "Public read insights" ON ai_intelligence_insights FOR SELECT USING (confidence_score >= 0.7);
CREATE POLICY "Oracles generate insights" ON ai_intelligence_insights FOR INSERT USING (auth.jwt() ->> 'role' IN ('admin', 'oracle_system'));

CREATE POLICY "Public read partner integrations" ON partner_data_integration FOR SELECT USING (sync_status = 'active');
CREATE POLICY "Admin manage partners" ON partner_data_integration FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read validated results" ON reality_validation FOR SELECT USING (validation_result = 'validated');
CREATE POLICY "Validators manage validation" ON reality_validation FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'validator'));