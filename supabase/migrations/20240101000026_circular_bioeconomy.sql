-- Circular Bioeconomy System
CREATE TABLE circular_enterprises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  enterprise_name TEXT NOT NULL,
  enterprise_type TEXT NOT NULL, -- 'waste_processing', 'material_recovery', 'biorefinery', 'upcycling', 'composting'
  business_model TEXT NOT NULL, -- 'b2b', 'b2c', 'cooperative', 'social_enterprise'
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  operational_scale TEXT NOT NULL, -- 'community', 'regional', 'national', 'international'
  circular_principles TEXT[] NOT NULL, -- 'reduce', 'reuse', 'recycle', 'recover', 'regenerate'
  certification_standards TEXT[] DEFAULT '{}',
  baseline_assessment JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE waste_stream_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES circular_enterprises(id),
  waste_type TEXT NOT NULL, -- 'organic', 'plastic', 'textile', 'electronic', 'agricultural', 'industrial'
  waste_source TEXT NOT NULL,
  input_volume_kg DECIMAL(12,2) NOT NULL,
  processing_method TEXT NOT NULL,
  output_products JSONB NOT NULL,
  recovery_rate DECIMAL(5,2) NOT NULL, -- percentage
  diversion_from_landfill DECIMAL(12,2) NOT NULL, -- kg
  processing_efficiency DECIMAL(5,2) NOT NULL, -- percentage
  environmental_impact_avoided JSONB NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE material_flows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES circular_enterprises(id),
  material_type TEXT NOT NULL,
  flow_direction TEXT NOT NULL, -- 'input', 'output', 'byproduct'
  material_source TEXT,
  material_destination TEXT,
  quantity_kg DECIMAL(12,2) NOT NULL,
  quality_grade TEXT NOT NULL, -- 'premium', 'standard', 'low_grade', 'contaminated'
  processing_stage TEXT NOT NULL,
  value_per_kg DECIMAL(8,2),
  carbon_footprint DECIMAL(10,4), -- kg CO2e
  circularity_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE regenerative_supply_chains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES circular_enterprises(id),
  supply_chain_name TEXT NOT NULL,
  chain_type TEXT NOT NULL, -- 'sourcing', 'processing', 'distribution', 'end_of_life'
  stakeholders JSONB NOT NULL,
  sustainability_metrics JSONB NOT NULL,
  traceability_level TEXT NOT NULL, -- 'full', 'partial', 'limited'
  regenerative_practices JSONB NOT NULL,
  social_impact JSONB NOT NULL,
  environmental_benefits JSONB NOT NULL,
  economic_viability JSONB NOT NULL,
  chain_resilience_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  established_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE circular_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES circular_enterprises(id),
  product_name TEXT NOT NULL,
  product_category TEXT NOT NULL, -- 'bioplastic', 'compost', 'biochar', 'recycled_material', 'upcycled_goods'
  input_materials JSONB NOT NULL,
  production_process JSONB NOT NULL,
  product_specifications JSONB NOT NULL,
  circular_design_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  biodegradability TEXT NOT NULL, -- 'biodegradable', 'compostable', 'recyclable', 'durable'
  life_cycle_assessment JSONB NOT NULL,
  market_demand DECIMAL(5,2) NOT NULL, -- percentage
  price_per_unit DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE waste_reduction_initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES circular_enterprises(id),
  initiative_name TEXT NOT NULL,
  initiative_type TEXT NOT NULL, -- 'source_reduction', 'design_optimization', 'process_improvement', 'behavior_change'
  target_waste_stream TEXT NOT NULL,
  baseline_waste_kg DECIMAL(12,2) NOT NULL,
  current_waste_kg DECIMAL(12,2) NOT NULL,
  reduction_percentage DECIMAL(5,2) NOT NULL,
  implementation_cost DECIMAL(10,2),
  cost_savings DECIMAL(10,2),
  environmental_benefits JSONB NOT NULL,
  implementation_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('planned', 'active', 'completed', 'paused'))
);

CREATE TABLE bioeconomy_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES circular_enterprises(id),
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  total_waste_processed_kg DECIMAL(15,2) NOT NULL,
  materials_recovered_kg DECIMAL(15,2) NOT NULL,
  landfill_diversion_rate DECIMAL(5,2) NOT NULL, -- percentage
  carbon_emissions_avoided DECIMAL(12,4) NOT NULL, -- kg CO2e
  water_saved_liters DECIMAL(15,2) DEFAULT 0,
  energy_generated_kwh DECIMAL(12,2) DEFAULT 0,
  jobs_created INTEGER DEFAULT 0,
  revenue_generated DECIMAL(15,2) NOT NULL,
  circular_economy_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE material_passports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID NOT NULL, -- references various material tables
  material_type TEXT NOT NULL,
  origin_information JSONB NOT NULL,
  composition_details JSONB NOT NULL,
  processing_history JSONB NOT NULL,
  quality_certifications TEXT[] DEFAULT '{}',
  environmental_impact JSONB NOT NULL,
  end_of_life_options JSONB NOT NULL,
  blockchain_hash TEXT,
  current_location TEXT,
  current_owner TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE circular_partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES circular_enterprises(id),
  partner_name TEXT NOT NULL,
  partner_type TEXT NOT NULL, -- 'supplier', 'processor', 'distributor', 'end_user', 'waste_generator'
  partnership_model TEXT NOT NULL, -- 'symbiotic', 'contractual', 'cooperative', 'network'
  material_exchanges JSONB NOT NULL,
  value_creation JSONB NOT NULL,
  sustainability_benefits JSONB NOT NULL,
  partnership_strength DECIMAL(3,2) NOT NULL, -- 0-1 scale
  established_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'terminated'))
);

CREATE TABLE innovation_labs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES circular_enterprises(id),
  lab_name TEXT NOT NULL,
  research_focus TEXT[] NOT NULL,
  innovation_projects JSONB NOT NULL,
  technology_readiness_level INTEGER NOT NULL, -- 1-9 scale
  pilot_programs JSONB,
  commercialization_potential DECIMAL(3,2) NOT NULL, -- 0-1 scale
  intellectual_property JSONB,
  collaboration_networks JSONB,
  funding_sources JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE circular_impact_assessment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES circular_enterprises(id),
  assessment_period_start DATE NOT NULL,
  assessment_period_end DATE NOT NULL,
  environmental_impact JSONB NOT NULL,
  social_impact JSONB NOT NULL,
  economic_impact JSONB NOT NULL,
  circularity_indicators JSONB NOT NULL,
  sdg_contributions JSONB NOT NULL,
  stakeholder_benefits JSONB NOT NULL,
  system_transformation JSONB NOT NULL,
  overall_impact_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  verified_by TEXT,
  assessment_methodology TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE circular_enterprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_stream_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE regenerative_supply_chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE circular_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_reduction_initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE bioeconomy_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_passports ENABLE ROW LEVEL SECURITY;
ALTER TABLE circular_partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE innovation_labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE circular_impact_assessment ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read circular enterprises" ON circular_enterprises FOR SELECT USING (true);
CREATE POLICY "Enterprise owners manage enterprises" ON circular_enterprises FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'enterprise_owner'));

CREATE POLICY "Public read waste tracking" ON waste_stream_tracking FOR SELECT USING (true);
CREATE POLICY "Enterprises track waste" ON waste_stream_tracking FOR INSERT USING (
  EXISTS (SELECT 1 FROM circular_enterprises WHERE id = enterprise_id AND auth.jwt() ->> 'role' IN ('admin', 'enterprise_owner'))
);

CREATE POLICY "Public read material flows" ON material_flows FOR SELECT USING (true);
CREATE POLICY "Public read supply chains" ON regenerative_supply_chains FOR SELECT USING (true);
CREATE POLICY "Public read circular products" ON circular_products FOR SELECT USING (true);
CREATE POLICY "Public read waste reduction" ON waste_reduction_initiatives FOR SELECT USING (true);
CREATE POLICY "Public read bioeconomy metrics" ON bioeconomy_metrics FOR SELECT USING (true);
CREATE POLICY "Public read material passports" ON material_passports FOR SELECT USING (true);
CREATE POLICY "Public read partnerships" ON circular_partnerships FOR SELECT USING (status = 'active');
CREATE POLICY "Public read innovation labs" ON innovation_labs FOR SELECT USING (true);
CREATE POLICY "Public read impact assessments" ON circular_impact_assessment FOR SELECT USING (true);