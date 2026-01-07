-- Regenerative Value Exchange System
CREATE TABLE regenerative_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  asset_category TEXT NOT NULL, -- 'carbon_restoration', 'ecosystem_recovery', 'cultural_preservation', 'biodiversity_credit'
  asset_name TEXT NOT NULL,
  asset_description TEXT NOT NULL,
  total_units DECIMAL(15,4) NOT NULL,
  available_units DECIMAL(15,4) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  price_adjustment_factor DECIMAL(5,4) DEFAULT 1.0000,
  impact_multiplier DECIMAL(5,4) DEFAULT 1.0000,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'active', 'retired')),
  impact_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_price_update TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE living_smart_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES regenerative_assets(id),
  contract_type TEXT NOT NULL, -- 'adaptive_pricing', 'impact_bonus', 'performance_penalty', 'regeneration_milestone'
  contract_logic JSONB NOT NULL,
  trigger_conditions JSONB NOT NULL,
  adaptation_rules JSONB NOT NULL,
  current_state JSONB NOT NULL,
  execution_history JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_executed TIMESTAMP WITH TIME ZONE
);

CREATE TABLE regenerative_exchanges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES regenerative_assets(id),
  buyer_id UUID REFERENCES auth.users(id),
  seller_id UUID REFERENCES auth.users(id),
  exchange_type TEXT NOT NULL, -- 'direct_purchase', 'impact_swap', 'regeneration_trade', 'cultural_exchange'
  units_exchanged DECIMAL(15,4) NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  total_value DECIMAL(15,2) NOT NULL,
  impact_bonus DECIMAL(10,2) DEFAULT 0,
  regeneration_premium DECIMAL(10,2) DEFAULT 0,
  exchange_status TEXT NOT NULL DEFAULT 'pending' CHECK (exchange_status IN ('pending', 'completed', 'failed', 'cancelled')),
  impact_verification JSONB,
  settlement_data JSONB,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE impact_driven_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES regenerative_assets(id),
  pricing_model TEXT NOT NULL, -- 'carbon_sequestration_rate', 'biodiversity_improvement', 'cultural_vitality', 'ecosystem_health'
  baseline_metrics JSONB NOT NULL,
  current_metrics JSONB NOT NULL,
  impact_improvement DECIMAL(10,4) NOT NULL,
  price_adjustment DECIMAL(5,4) NOT NULL,
  adjustment_rationale TEXT NOT NULL,
  effective_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cultural_preservation_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES regenerative_assets(id),
  cultural_element TEXT NOT NULL, -- 'traditional_knowledge', 'indigenous_practices', 'heritage_site', 'language_preservation'
  community_id UUID REFERENCES auth.users(id),
  preservation_method TEXT NOT NULL,
  cultural_impact_score DECIMAL(5,2) NOT NULL,
  community_benefit_percentage DECIMAL(5,2) NOT NULL,
  intergenerational_value JSONB NOT NULL,
  preservation_status TEXT NOT NULL DEFAULT 'active' CHECK (preservation_status IN ('active', 'at_risk', 'preserved', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ecosystem_recovery_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES regenerative_assets(id),
  recovery_type TEXT NOT NULL, -- 'forest_restoration', 'wetland_recovery', 'soil_regeneration', 'marine_restoration'
  baseline_condition JSONB NOT NULL,
  current_condition JSONB NOT NULL,
  recovery_trajectory JSONB NOT NULL,
  recovery_rate DECIMAL(10,4) NOT NULL,
  ecosystem_services_value DECIMAL(15,2) NOT NULL,
  biodiversity_index DECIMAL(5,2) NOT NULL,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE regenerative_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id),
  portfolio_name TEXT NOT NULL,
  portfolio_focus TEXT NOT NULL, -- 'carbon_focused', 'biodiversity_focused', 'cultural_focused', 'mixed_regenerative'
  total_value DECIMAL(15,2) DEFAULT 0,
  regenerative_impact_score DECIMAL(5,2) DEFAULT 0,
  carbon_impact DECIMAL(15,4) DEFAULT 0,
  biodiversity_impact DECIMAL(10,4) DEFAULT 0,
  cultural_impact DECIMAL(10,4) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE portfolio_asset_holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES regenerative_portfolios(id),
  asset_id UUID REFERENCES regenerative_assets(id),
  units_held DECIMAL(15,4) NOT NULL,
  acquisition_price DECIMAL(10,2) NOT NULL,
  current_value DECIMAL(15,2) NOT NULL,
  impact_contribution JSONB NOT NULL,
  holding_period_days INTEGER DEFAULT 0,
  acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE regenerative_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE living_smart_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE regenerative_exchanges ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_driven_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_preservation_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_recovery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE regenerative_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_asset_holdings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read verified assets" ON regenerative_assets FOR SELECT USING (verification_status IN ('verified', 'active'));
CREATE POLICY "Admin manage assets" ON regenerative_assets FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read active contracts" ON living_smart_contracts FOR SELECT USING (active = true);
CREATE POLICY "Admin manage contracts" ON living_smart_contracts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users view own exchanges" ON regenerative_exchanges FOR SELECT USING (auth.uid() IN (buyer_id, seller_id) OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Users create exchanges" ON regenerative_exchanges FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Public read pricing data" ON impact_driven_pricing FOR SELECT USING (true);
CREATE POLICY "Admin manage pricing" ON impact_driven_pricing FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read cultural assets" ON cultural_preservation_assets FOR SELECT USING (true);
CREATE POLICY "Communities manage cultural assets" ON cultural_preservation_assets FOR ALL USING (auth.uid() = community_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read ecosystem tracking" ON ecosystem_recovery_tracking FOR SELECT USING (true);
CREATE POLICY "Admin manage ecosystem tracking" ON ecosystem_recovery_tracking FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users manage own portfolios" ON regenerative_portfolios FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Users view own holdings" ON portfolio_asset_holdings FOR SELECT USING (
  EXISTS (SELECT 1 FROM regenerative_portfolios WHERE id = portfolio_id AND owner_id = auth.uid())
);