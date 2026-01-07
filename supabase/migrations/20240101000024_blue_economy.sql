-- Blue Economy System
CREATE TABLE marine_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  project_name TEXT NOT NULL,
  project_type TEXT NOT NULL, -- 'coral_restoration', 'marine_protected_area', 'sustainable_fishery', 'aquaculture', 'seaweed_farming'
  ocean_region TEXT NOT NULL,
  project_boundaries GEOGRAPHY(POLYGON, 4326) NOT NULL,
  water_depth_range JSONB NOT NULL, -- min/max depths
  project_manager TEXT NOT NULL,
  start_date DATE NOT NULL,
  baseline_assessment JSONB NOT NULL,
  conservation_goals JSONB NOT NULL,
  stakeholder_communities TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ocean_vitality_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marine_project_id UUID REFERENCES marine_projects(id),
  monitoring_location GEOGRAPHY(POINT, 4326) NOT NULL,
  water_temperature DECIMAL(5,2) NOT NULL, -- celsius
  salinity DECIMAL(5,2) NOT NULL, -- ppt
  ph_level DECIMAL(4,2) NOT NULL,
  dissolved_oxygen DECIMAL(6,2) NOT NULL, -- mg/L
  turbidity DECIMAL(6,2) NOT NULL, -- NTU
  chlorophyll_a DECIMAL(8,4) NOT NULL, -- mg/m³
  nutrient_levels JSONB NOT NULL, -- nitrogen, phosphorus
  pollution_indicators JSONB NOT NULL,
  ocean_health_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE marine_biodiversity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marine_project_id UUID REFERENCES marine_projects(id),
  monitoring_area GEOGRAPHY(POLYGON, 4326),
  species_category TEXT NOT NULL, -- 'fish', 'coral', 'marine_mammals', 'seabirds', 'invertebrates', 'algae'
  species_name TEXT NOT NULL,
  population_count INTEGER,
  population_density DECIMAL(10,4), -- individuals per unit area
  biomass_estimate DECIMAL(12,4), -- kg
  conservation_status TEXT NOT NULL, -- 'least_concern', 'vulnerable', 'endangered', 'critically_endangered'
  habitat_quality DECIMAL(3,2) NOT NULL, -- 0-1 scale
  breeding_success_rate DECIMAL(5,2), -- percentage
  migration_patterns JSONB,
  observed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE coral_reef_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marine_project_id UUID REFERENCES marine_projects(id),
  reef_location GEOGRAPHY(POINT, 4326) NOT NULL,
  coral_cover_percentage DECIMAL(5,2) NOT NULL,
  coral_diversity_index DECIMAL(6,4) NOT NULL,
  bleaching_severity DECIMAL(3,2) NOT NULL, -- 0-1 scale
  disease_prevalence DECIMAL(5,2) NOT NULL, -- percentage
  recruitment_rate DECIMAL(8,4) NOT NULL, -- new corals per m²
  calcification_rate DECIMAL(8,4) NOT NULL, -- g CaCO3/m²/day
  resilience_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  restoration_interventions JSONB,
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sustainable_aquaculture (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marine_project_id UUID REFERENCES marine_projects(id),
  farm_name TEXT NOT NULL,
  aquaculture_type TEXT NOT NULL, -- 'finfish', 'shellfish', 'seaweed', 'integrated_multi_trophic'
  species_cultivated TEXT[] NOT NULL,
  farm_area_hectares DECIMAL(10,2) NOT NULL,
  production_capacity DECIMAL(12,2) NOT NULL, -- kg/year
  current_production DECIMAL(12,2) NOT NULL, -- kg/year
  feed_conversion_ratio DECIMAL(5,3), -- for finfish
  water_quality_management JSONB NOT NULL,
  environmental_impact_score DECIMAL(3,2) NOT NULL, -- 0-1 scale (lower is better)
  sustainability_certifications TEXT[] DEFAULT '{}',
  economic_performance JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fishery_management (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marine_project_id UUID REFERENCES marine_projects(id),
  fishery_name TEXT NOT NULL,
  target_species TEXT[] NOT NULL,
  fishing_methods TEXT[] NOT NULL,
  fishing_quota DECIMAL(12,2), -- kg/year
  actual_catch DECIMAL(12,2), -- kg/year
  stock_assessment JSONB NOT NULL,
  fishing_pressure_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  sustainability_rating TEXT NOT NULL, -- 'sustainable', 'moderately_sustainable', 'unsustainable'
  community_participation JSONB NOT NULL,
  economic_value DECIMAL(15,2) NOT NULL,
  management_measures JSONB NOT NULL,
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE blue_carbon_ecosystems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marine_project_id UUID REFERENCES marine_projects(id),
  ecosystem_type TEXT NOT NULL, -- 'mangrove', 'seagrass', 'salt_marsh', 'kelp_forest'
  ecosystem_area_hectares DECIMAL(10,2) NOT NULL,
  carbon_stock DECIMAL(12,4) NOT NULL, -- tonnes C/hectare
  carbon_sequestration_rate DECIMAL(8,4) NOT NULL, -- tonnes C/hectare/year
  biomass_above_ground DECIMAL(10,4) NOT NULL, -- tonnes/hectare
  biomass_below_ground DECIMAL(10,4) NOT NULL, -- tonnes/hectare
  soil_carbon_content DECIMAL(10,4) NOT NULL, -- tonnes C/hectare
  ecosystem_health_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  restoration_activities JSONB,
  threats_identified JSONB NOT NULL,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE marine_pollution_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marine_project_id UUID REFERENCES marine_projects(id),
  pollution_location GEOGRAPHY(POINT, 4326) NOT NULL,
  pollution_type TEXT NOT NULL, -- 'plastic', 'chemical', 'oil', 'sewage', 'agricultural_runoff', 'microplastics'
  concentration_level DECIMAL(12,6) NOT NULL,
  measurement_unit TEXT NOT NULL,
  pollution_source TEXT,
  impact_severity DECIMAL(3,2) NOT NULL, -- 0-1 scale
  cleanup_efforts JSONB,
  prevention_measures JSONB,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE coastal_community_impact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marine_project_id UUID REFERENCES marine_projects(id),
  community_name TEXT NOT NULL,
  community_size INTEGER NOT NULL,
  livelihood_dependency JSONB NOT NULL, -- fishing, tourism, aquaculture percentages
  income_improvement DECIMAL(5,2) DEFAULT 0, -- percentage change
  food_security_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  capacity_building_programs JSONB,
  traditional_knowledge_integration JSONB,
  gender_participation JSONB NOT NULL,
  youth_engagement JSONB,
  community_satisfaction DECIMAL(3,2) NOT NULL, -- 0-1 scale
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE blue_economy_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marine_project_id UUID REFERENCES marine_projects(id),
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  economic_value_generated DECIMAL(15,2) NOT NULL,
  jobs_created INTEGER NOT NULL,
  sustainable_livelihoods INTEGER NOT NULL,
  ecosystem_services_value DECIMAL(15,2) NOT NULL,
  carbon_credits_generated DECIMAL(10,2) DEFAULT 0,
  biodiversity_credits DECIMAL(10,2) DEFAULT 0,
  tourism_revenue DECIMAL(12,2) DEFAULT 0,
  research_collaborations INTEGER DEFAULT 0,
  policy_influence_score DECIMAL(3,2) DEFAULT 0, -- 0-1 scale
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE marine_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ocean_vitality_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE marine_biodiversity ENABLE ROW LEVEL SECURITY;
ALTER TABLE coral_reef_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE sustainable_aquaculture ENABLE ROW LEVEL SECURITY;
ALTER TABLE fishery_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE blue_carbon_ecosystems ENABLE ROW LEVEL SECURITY;
ALTER TABLE marine_pollution_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE coastal_community_impact ENABLE ROW LEVEL SECURITY;
ALTER TABLE blue_economy_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read marine projects" ON marine_projects FOR SELECT USING (true);
CREATE POLICY "Project managers manage projects" ON marine_projects FOR ALL USING (auth.jwt() ->> 'email' = project_manager OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read ocean vitality" ON ocean_vitality_monitoring FOR SELECT USING (true);
CREATE POLICY "Project teams monitor vitality" ON ocean_vitality_monitoring FOR INSERT USING (
  EXISTS (SELECT 1 FROM marine_projects WHERE id = marine_project_id AND (project_manager = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin'))
);

CREATE POLICY "Public read biodiversity" ON marine_biodiversity FOR SELECT USING (true);
CREATE POLICY "Public read coral health" ON coral_reef_health FOR SELECT USING (true);
CREATE POLICY "Public read aquaculture" ON sustainable_aquaculture FOR SELECT USING (true);
CREATE POLICY "Public read fisheries" ON fishery_management FOR SELECT USING (true);
CREATE POLICY "Public read blue carbon" ON blue_carbon_ecosystems FOR SELECT USING (true);
CREATE POLICY "Public read pollution" ON marine_pollution_tracking FOR SELECT USING (true);
CREATE POLICY "Public read community impact" ON coastal_community_impact FOR SELECT USING (true);
CREATE POLICY "Public read blue economy metrics" ON blue_economy_metrics FOR SELECT USING (true);