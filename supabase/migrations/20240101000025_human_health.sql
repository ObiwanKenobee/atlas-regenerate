-- Human Health System
CREATE TABLE health_communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  community_name TEXT NOT NULL,
  population_size INTEGER NOT NULL,
  geographic_location GEOGRAPHY(POINT, 4326) NOT NULL,
  community_type TEXT NOT NULL, -- 'rural', 'urban', 'indigenous', 'coastal', 'mountain'
  primary_language TEXT NOT NULL,
  cultural_context JSONB NOT NULL,
  socioeconomic_profile JSONB NOT NULL,
  health_coordinator TEXT NOT NULL,
  baseline_health_assessment JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE healthcare_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  facility_type TEXT NOT NULL, -- 'clinic', 'hospital', 'mobile_unit', 'telemedicine', 'traditional_healer'
  facility_name TEXT NOT NULL,
  distance_km DECIMAL(6,2) NOT NULL,
  travel_time_minutes INTEGER NOT NULL,
  services_available TEXT[] NOT NULL,
  operating_hours JSONB NOT NULL,
  staff_count INTEGER NOT NULL,
  equipment_availability JSONB NOT NULL,
  medication_stock_level DECIMAL(3,2) NOT NULL, -- 0-1 scale
  accessibility_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  utilization_rate DECIMAL(5,2) NOT NULL, -- percentage
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE community_health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  metric_category TEXT NOT NULL, -- 'mortality', 'morbidity', 'nutrition', 'mental_health', 'maternal_health', 'child_health'
  metric_name TEXT NOT NULL,
  baseline_value DECIMAL(10,4) NOT NULL,
  current_value DECIMAL(10,4) NOT NULL,
  target_value DECIMAL(10,4) NOT NULL,
  measurement_unit TEXT NOT NULL,
  improvement_percentage DECIMAL(6,2) NOT NULL,
  data_source TEXT NOT NULL, -- 'health_records', 'survey', 'screening', 'vital_registration'
  confidence_level DECIMAL(3,2) NOT NULL,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE preventive_health_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  program_name TEXT NOT NULL,
  program_type TEXT NOT NULL, -- 'vaccination', 'screening', 'education', 'nutrition', 'sanitation', 'mental_health'
  target_population TEXT NOT NULL, -- 'children', 'adults', 'elderly', 'pregnant_women', 'all'
  program_description TEXT NOT NULL,
  implementation_date DATE NOT NULL,
  coverage_percentage DECIMAL(5,2) NOT NULL,
  participation_rate DECIMAL(5,2) NOT NULL,
  effectiveness_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  cost_per_beneficiary DECIMAL(8,2),
  health_outcomes JSONB NOT NULL,
  program_status TEXT DEFAULT 'active' CHECK (program_status IN ('planned', 'active', 'completed', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE health_education_initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  initiative_name TEXT NOT NULL,
  education_topic TEXT NOT NULL, -- 'hygiene', 'nutrition', 'disease_prevention', 'reproductive_health', 'mental_wellness'
  delivery_method TEXT[] NOT NULL, -- 'workshops', 'peer_education', 'media_campaigns', 'community_meetings'
  target_audience TEXT[] NOT NULL,
  participants_reached INTEGER NOT NULL,
  knowledge_improvement DECIMAL(5,2) NOT NULL, -- percentage
  behavior_change_rate DECIMAL(5,2) NOT NULL, -- percentage
  cultural_adaptation JSONB NOT NULL,
  sustainability_plan JSONB,
  conducted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE nutrition_security (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  assessment_type TEXT NOT NULL, -- 'household_survey', 'anthropometric', 'dietary_diversity', 'food_security'
  malnutrition_rate DECIMAL(5,2) NOT NULL, -- percentage
  stunting_rate DECIMAL(5,2) NOT NULL, -- percentage under 5
  wasting_rate DECIMAL(5,2) NOT NULL, -- percentage under 5
  food_security_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  dietary_diversity_score DECIMAL(5,2) NOT NULL,
  micronutrient_deficiency JSONB NOT NULL,
  seasonal_variation JSONB,
  intervention_programs JSONB,
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE water_sanitation_hygiene (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  water_access_type TEXT NOT NULL, -- 'piped', 'borehole', 'well', 'surface_water', 'rainwater'
  water_quality_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  water_availability_hours INTEGER NOT NULL, -- hours per day
  sanitation_facility_type TEXT NOT NULL, -- 'flush_toilet', 'pit_latrine', 'composting_toilet', 'open_defecation'
  sanitation_coverage DECIMAL(5,2) NOT NULL, -- percentage
  hygiene_practices_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  handwashing_facilities BOOLEAN NOT NULL,
  waste_management_system TEXT NOT NULL,
  waterborne_disease_incidence DECIMAL(8,4) NOT NULL, -- cases per 1000
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE mental_health_wellbeing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  assessment_method TEXT NOT NULL, -- 'survey', 'clinical_screening', 'community_consultation'
  depression_prevalence DECIMAL(5,2) NOT NULL, -- percentage
  anxiety_prevalence DECIMAL(5,2) NOT NULL, -- percentage
  stress_level_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  social_cohesion_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  support_systems_availability JSONB NOT NULL,
  mental_health_services JSONB,
  stigma_reduction_efforts JSONB,
  community_resilience_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  cultural_healing_practices JSONB,
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE health_workforce (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  worker_type TEXT NOT NULL, -- 'doctor', 'nurse', 'community_health_worker', 'traditional_healer', 'midwife'
  worker_count INTEGER NOT NULL,
  training_level TEXT NOT NULL, -- 'basic', 'intermediate', 'advanced', 'specialized'
  certification_status TEXT[] DEFAULT '{}',
  population_ratio DECIMAL(8,2) NOT NULL, -- workers per 1000 population
  retention_rate DECIMAL(5,2) NOT NULL, -- percentage
  workload_score DECIMAL(3,2) NOT NULL, -- 0-1 scale (higher is more overloaded)
  capacity_building_needs JSONB NOT NULL,
  performance_indicators JSONB,
  assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE health_outcomes_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  outcome_category TEXT NOT NULL, -- 'mortality_reduction', 'disease_prevention', 'quality_of_life', 'life_expectancy'
  baseline_measurement DECIMAL(10,4) NOT NULL,
  current_measurement DECIMAL(10,4) NOT NULL,
  improvement_target DECIMAL(10,4) NOT NULL,
  measurement_unit TEXT NOT NULL,
  time_period_months INTEGER NOT NULL,
  contributing_factors JSONB NOT NULL,
  intervention_effectiveness JSONB,
  sustainability_indicators JSONB,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE health_economics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES health_communities(id),
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  healthcare_expenditure DECIMAL(12,2) NOT NULL,
  preventive_care_investment DECIMAL(10,2) NOT NULL,
  treatment_cost_savings DECIMAL(10,2) NOT NULL,
  productivity_gains DECIMAL(12,2) NOT NULL,
  economic_burden_reduction DECIMAL(12,2) NOT NULL,
  cost_per_qaly DECIMAL(10,2), -- Quality Adjusted Life Year
  return_on_investment DECIMAL(5,2) NOT NULL, -- percentage
  healthcare_financing JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE health_communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE preventive_health_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_education_initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_security ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_sanitation_hygiene ENABLE ROW LEVEL SECURITY;
ALTER TABLE mental_health_wellbeing ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_workforce ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_outcomes_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_economics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read health communities" ON health_communities FOR SELECT USING (true);
CREATE POLICY "Health coordinators manage communities" ON health_communities FOR ALL USING (auth.jwt() ->> 'email' = health_coordinator OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read healthcare access" ON healthcare_access FOR SELECT USING (true);
CREATE POLICY "Health teams track access" ON healthcare_access FOR INSERT USING (
  EXISTS (SELECT 1 FROM health_communities WHERE id = community_id AND (health_coordinator = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin'))
);

CREATE POLICY "Public read health metrics" ON community_health_metrics FOR SELECT USING (confidence_level >= 0.7);
CREATE POLICY "Public read preventive programs" ON preventive_health_programs FOR SELECT USING (true);
CREATE POLICY "Public read health education" ON health_education_initiatives FOR SELECT USING (true);
CREATE POLICY "Public read nutrition data" ON nutrition_security FOR SELECT USING (true);
CREATE POLICY "Public read wash data" ON water_sanitation_hygiene FOR SELECT USING (true);
CREATE POLICY "Public read mental health" ON mental_health_wellbeing FOR SELECT USING (true);
CREATE POLICY "Public read health workforce" ON health_workforce FOR SELECT USING (true);
CREATE POLICY "Public read health outcomes" ON health_outcomes_tracking FOR SELECT USING (true);
CREATE POLICY "Public read health economics" ON health_economics FOR SELECT USING (true);