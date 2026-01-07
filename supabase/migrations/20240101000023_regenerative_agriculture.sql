-- Regenerative Agriculture System
CREATE TABLE regenerative_farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  farm_name TEXT NOT NULL,
  farmer_name TEXT NOT NULL,
  farm_size_hectares DECIMAL(10,2) NOT NULL,
  farm_location GEOGRAPHY(POINT, 4326) NOT NULL,
  farm_boundaries GEOGRAPHY(POLYGON, 4326),
  farming_system TEXT NOT NULL, -- 'organic', 'biodynamic', 'permaculture', 'agroecology', 'silvopasture'
  transition_start_date DATE NOT NULL,
  certification_status TEXT[] DEFAULT '{}',
  baseline_assessment JSONB NOT NULL,
  current_practices JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE soil_health_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES regenerative_farms(id),
  measurement_location GEOGRAPHY(POINT, 4326) NOT NULL,
  soil_organic_matter DECIMAL(6,3) NOT NULL, -- percentage
  soil_ph DECIMAL(4,2) NOT NULL,
  bulk_density DECIMAL(5,3) NOT NULL, -- g/cm³
  water_infiltration_rate DECIMAL(8,4) NOT NULL, -- mm/hour
  aggregate_stability DECIMAL(5,2) NOT NULL, -- percentage
  microbial_biomass DECIMAL(8,4) NOT NULL, -- mg C/kg soil
  earthworm_count INTEGER DEFAULT 0,
  compaction_level DECIMAL(3,2) NOT NULL, -- 0-1 scale
  erosion_risk_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE carbon_sequestration (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES regenerative_farms(id),
  measurement_method TEXT NOT NULL, -- 'soil_sampling', 'remote_sensing', 'modeling', 'direct_measurement'
  soil_carbon_stock DECIMAL(10,4) NOT NULL, -- tonnes C/hectare
  biomass_carbon DECIMAL(10,4) NOT NULL, -- tonnes C/hectare
  root_carbon DECIMAL(10,4) NOT NULL, -- tonnes C/hectare
  total_carbon_sequestered DECIMAL(10,4) NOT NULL, -- tonnes C/hectare
  sequestration_rate DECIMAL(8,4) NOT NULL, -- tonnes C/hectare/year
  measurement_depth_cm INTEGER NOT NULL,
  confidence_level DECIMAL(3,2) NOT NULL,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'certified')),
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sustainable_practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES regenerative_farms(id),
  practice_category TEXT NOT NULL, -- 'cover_crops', 'crop_rotation', 'composting', 'no_till', 'agroforestry', 'livestock_integration'
  practice_name TEXT NOT NULL,
  implementation_date DATE NOT NULL,
  practice_details JSONB NOT NULL,
  area_applied_hectares DECIMAL(10,2) NOT NULL,
  implementation_cost DECIMAL(10,2),
  expected_benefits JSONB NOT NULL,
  actual_results JSONB,
  success_metrics JSONB NOT NULL,
  practice_status TEXT DEFAULT 'active' CHECK (practice_status IN ('planned', 'active', 'completed', 'discontinued')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE crop_diversity_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES regenerative_farms(id),
  growing_season TEXT NOT NULL,
  crop_species TEXT[] NOT NULL,
  crop_varieties TEXT[] NOT NULL,
  companion_plants TEXT[] DEFAULT '{}',
  cover_crops TEXT[] DEFAULT '{}',
  biodiversity_index DECIMAL(5,3) NOT NULL,
  yield_data JSONB NOT NULL,
  nutritional_quality JSONB,
  pest_pressure_score DECIMAL(3,2) DEFAULT 0, -- 0-1 scale
  disease_incidence DECIMAL(3,2) DEFAULT 0, -- 0-1 scale
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE water_management (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES regenerative_farms(id),
  water_source TEXT NOT NULL, -- 'rainfall', 'irrigation', 'groundwater', 'surface_water'
  water_conservation_methods TEXT[] NOT NULL,
  water_usage_liters DECIMAL(12,2) NOT NULL,
  water_efficiency_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  runoff_reduction DECIMAL(5,2) NOT NULL, -- percentage
  water_quality_indicators JSONB NOT NULL,
  drought_resilience_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE biodiversity_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES regenerative_farms(id),
  monitoring_area GEOGRAPHY(POLYGON, 4326),
  species_category TEXT NOT NULL, -- 'birds', 'insects', 'mammals', 'plants', 'soil_microbes'
  species_count INTEGER NOT NULL,
  species_diversity_index DECIMAL(6,4) NOT NULL,
  beneficial_species_count INTEGER DEFAULT 0,
  pest_species_count INTEGER DEFAULT 0,
  endemic_species_count INTEGER DEFAULT 0,
  habitat_quality_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  monitoring_method TEXT NOT NULL,
  observed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE farm_economics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES regenerative_farms(id),
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  total_revenue DECIMAL(12,2) NOT NULL,
  production_costs DECIMAL(12,2) NOT NULL,
  transition_costs DECIMAL(12,2) DEFAULT 0,
  carbon_credit_revenue DECIMAL(10,2) DEFAULT 0,
  premium_price_revenue DECIMAL(10,2) DEFAULT 0,
  cost_savings DECIMAL(10,2) DEFAULT 0,
  net_profit DECIMAL(12,2) NOT NULL,
  roi_percentage DECIMAL(5,2) NOT NULL,
  payback_period_years DECIMAL(4,1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE regenerative_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES regenerative_farms(id),
  certification_type TEXT NOT NULL, -- 'regenerative_organic', 'carbon_verified', 'biodiversity_certified', 'soil_health_certified'
  certifying_body TEXT NOT NULL,
  certification_level TEXT NOT NULL, -- 'bronze', 'silver', 'gold', 'platinum'
  score DECIMAL(5,2) NOT NULL,
  requirements_met JSONB NOT NULL,
  audit_date DATE NOT NULL,
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  certificate_url TEXT,
  annual_fee DECIMAL(8,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE regenerative_farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE soil_health_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_sequestration ENABLE ROW LEVEL SECURITY;
ALTER TABLE sustainable_practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_diversity_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE biodiversity_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_economics ENABLE ROW LEVEL SECURITY;
ALTER TABLE regenerative_certifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read farms" ON regenerative_farms FOR SELECT USING (true);
CREATE POLICY "Farmers manage own farms" ON regenerative_farms FOR ALL USING (auth.jwt() ->> 'email' = farmer_name OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read soil health" ON soil_health_tracking FOR SELECT USING (true);
CREATE POLICY "Farm owners track soil health" ON soil_health_tracking FOR INSERT USING (
  EXISTS (SELECT 1 FROM regenerative_farms WHERE id = farm_id AND (farmer_name = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin'))
);

CREATE POLICY "Public read carbon data" ON carbon_sequestration FOR SELECT USING (verification_status = 'verified');
CREATE POLICY "Farm owners track carbon" ON carbon_sequestration FOR INSERT USING (
  EXISTS (SELECT 1 FROM regenerative_farms WHERE id = farm_id AND (farmer_name = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin'))
);

CREATE POLICY "Public read practices" ON sustainable_practices FOR SELECT USING (true);
CREATE POLICY "Farm owners manage practices" ON sustainable_practices FOR ALL USING (
  EXISTS (SELECT 1 FROM regenerative_farms WHERE id = farm_id AND (farmer_name = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin'))
);

CREATE POLICY "Public read crop diversity" ON crop_diversity_tracking FOR SELECT USING (true);
CREATE POLICY "Public read water management" ON water_management FOR SELECT USING (true);
CREATE POLICY "Public read biodiversity" ON biodiversity_monitoring FOR SELECT USING (true);
CREATE POLICY "Public read economics" ON farm_economics FOR SELECT USING (true);
CREATE POLICY "Public read certifications" ON regenerative_certifications FOR SELECT USING (valid_until >= CURRENT_DATE);