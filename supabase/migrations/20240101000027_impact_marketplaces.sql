-- Impact Marketplaces System
CREATE TABLE regenerative_ventures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  venture_name TEXT NOT NULL,
  venture_type TEXT NOT NULL, -- 'startup', 'cooperative', 'social_enterprise', 'community_project'
  sector TEXT NOT NULL, -- 'agriculture', 'forestry', 'ocean', 'energy', 'circular_economy', 'health'
  stage TEXT NOT NULL, -- 'seed', 'early', 'growth', 'expansion', 'mature'
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  founder_team JSONB NOT NULL,
  business_model JSONB NOT NULL,
  impact_thesis JSONB NOT NULL,
  funding_goal DECIMAL(15,2) NOT NULL,
  funding_raised DECIMAL(15,2) DEFAULT 0,
  minimum_investment DECIMAL(10,2) NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'featured', 'suspended')),
  impact_metrics JSONB NOT NULL,
  financial_projections JSONB NOT NULL,
  risk_assessment JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE investment_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID REFERENCES regenerative_ventures(id),
  opportunity_type TEXT NOT NULL, -- 'equity', 'debt', 'revenue_share', 'impact_bond', 'token'
  investment_terms JSONB NOT NULL,
  target_amount DECIMAL(15,2) NOT NULL,
  raised_amount DECIMAL(15,2) DEFAULT 0,
  investor_count INTEGER DEFAULT 0,
  expected_return DECIMAL(5,2), -- percentage
  impact_return JSONB NOT NULL,
  investment_period_months INTEGER NOT NULL,
  closing_date DATE NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closing_soon', 'closed', 'funded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE investor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  investor_type TEXT NOT NULL, -- 'individual', 'family_office', 'fund', 'institution', 'foundation'
  accreditation_status TEXT NOT NULL, -- 'retail', 'accredited', 'qualified', 'institutional'
  investment_focus TEXT[] NOT NULL,
  impact_priorities JSONB NOT NULL,
  risk_tolerance TEXT NOT NULL, -- 'conservative', 'moderate', 'aggressive'
  investment_capacity DECIMAL(15,2) NOT NULL,
  portfolio_allocation JSONB NOT NULL,
  due_diligence_preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE marketplace_investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID REFERENCES investment_opportunities(id),
  investor_id UUID REFERENCES investor_profiles(id),
  investment_amount DECIMAL(15,2) NOT NULL,
  investment_date DATE NOT NULL,
  investment_terms JSONB NOT NULL,
  expected_impact JSONB NOT NULL,
  due_diligence_completed BOOLEAN DEFAULT false,
  legal_documentation JSONB,
  investment_status TEXT DEFAULT 'committed' CHECK (investment_status IN ('committed', 'funded', 'active', 'exited')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE impact_verification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID REFERENCES regenerative_ventures(id),
  verification_type TEXT NOT NULL, -- 'baseline', 'milestone', 'annual', 'exit'
  verifier_organization TEXT NOT NULL,
  verification_methodology TEXT NOT NULL,
  impact_claims JSONB NOT NULL,
  verified_impacts JSONB NOT NULL,
  verification_confidence DECIMAL(3,2) NOT NULL,
  verification_date DATE NOT NULL,
  certificate_url TEXT,
  next_verification_due DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE marketplace_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID REFERENCES regenerative_ventures(id),
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  financial_performance JSONB NOT NULL,
  impact_performance JSONB NOT NULL,
  operational_metrics JSONB NOT NULL,
  milestone_achievements JSONB,
  challenges_faced JSONB,
  future_outlook JSONB,
  investor_updates JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE impact_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID REFERENCES regenerative_ventures(id),
  rating_agency TEXT NOT NULL,
  rating_methodology TEXT NOT NULL,
  overall_rating TEXT NOT NULL, -- 'AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC'
  impact_score DECIMAL(5,2) NOT NULL,
  financial_score DECIMAL(5,2) NOT NULL,
  governance_score DECIMAL(5,2) NOT NULL,
  risk_score DECIMAL(5,2) NOT NULL,
  rating_rationale TEXT NOT NULL,
  rating_date DATE NOT NULL,
  rating_outlook TEXT NOT NULL, -- 'positive', 'stable', 'negative'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE marketplace_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID REFERENCES regenerative_ventures(id),
  analytics_period_start DATE NOT NULL,
  analytics_period_end DATE NOT NULL,
  investor_interest_score DECIMAL(5,2) NOT NULL,
  funding_velocity DECIMAL(10,2) NOT NULL, -- days to funding
  impact_multiplier DECIMAL(8,4) NOT NULL,
  market_traction JSONB NOT NULL,
  competitive_positioning JSONB,
  growth_trajectory JSONB NOT NULL,
  risk_indicators JSONB,
  recommendation_score DECIMAL(3,2) NOT NULL, -- 0-1 scale
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE secondary_market (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_investment_id UUID REFERENCES marketplace_investments(id),
  seller_id UUID REFERENCES investor_profiles(id),
  asset_type TEXT NOT NULL, -- 'equity_stake', 'debt_position', 'revenue_rights', 'impact_credits'
  units_for_sale DECIMAL(15,4) NOT NULL,
  asking_price_per_unit DECIMAL(10,2) NOT NULL,
  total_asking_price DECIMAL(15,2) NOT NULL,
  current_valuation DECIMAL(15,2),
  liquidity_premium DECIMAL(5,2), -- percentage
  listing_date DATE NOT NULL,
  expiry_date DATE,
  market_status TEXT DEFAULT 'listed' CHECK (market_status IN ('listed', 'under_offer', 'sold', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE impact_dividends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investment_id UUID REFERENCES marketplace_investments(id),
  dividend_type TEXT NOT NULL, -- 'financial', 'impact_credit', 'carbon_offset', 'biodiversity_credit'
  dividend_amount DECIMAL(15,2),
  impact_value JSONB,
  distribution_date DATE NOT NULL,
  distribution_method TEXT NOT NULL,
  tax_implications JSONB,
  reinvestment_option BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE marketplace_governance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID REFERENCES regenerative_ventures(id),
  governance_proposal TEXT NOT NULL,
  proposal_type TEXT NOT NULL, -- 'strategic', 'operational', 'impact', 'financial'
  proposed_by UUID REFERENCES investor_profiles(id),
  voting_power_required DECIMAL(5,2) NOT NULL, -- percentage
  voting_deadline DATE NOT NULL,
  proposal_status TEXT DEFAULT 'open' CHECK (proposal_status IN ('open', 'passed', 'rejected', 'withdrawn')),
  votes_for DECIMAL(15,2) DEFAULT 0,
  votes_against DECIMAL(15,2) DEFAULT 0,
  implementation_timeline JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE regenerative_ventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE secondary_market ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_dividends ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_governance ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read verified ventures" ON regenerative_ventures FOR SELECT USING (verification_status IN ('verified', 'featured'));
CREATE POLICY "Venture owners manage ventures" ON regenerative_ventures FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'venture_owner'));

CREATE POLICY "Public read open opportunities" ON investment_opportunities FOR SELECT USING (status IN ('open', 'closing_soon'));
CREATE POLICY "Venture owners manage opportunities" ON investment_opportunities FOR ALL USING (
  EXISTS (SELECT 1 FROM regenerative_ventures WHERE id = venture_id AND auth.jwt() ->> 'role' IN ('admin', 'venture_owner'))
);

CREATE POLICY "Users manage own investor profiles" ON investor_profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Investors view own investments" ON marketplace_investments FOR SELECT USING (
  EXISTS (SELECT 1 FROM investor_profiles WHERE id = investor_id AND user_id = auth.uid()) OR auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Investors create investments" ON marketplace_investments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM investor_profiles WHERE id = investor_id AND user_id = auth.uid())
);

CREATE POLICY "Public read impact verification" ON impact_verification FOR SELECT USING (true);
CREATE POLICY "Verifiers manage verification" ON impact_verification FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'verifier'));

CREATE POLICY "Public read performance data" ON marketplace_performance FOR SELECT USING (true);
CREATE POLICY "Public read impact ratings" ON impact_ratings FOR SELECT USING (true);
CREATE POLICY "Public read marketplace analytics" ON marketplace_analytics FOR SELECT USING (true);
CREATE POLICY "Public read secondary market" ON secondary_market FOR SELECT USING (market_status = 'listed');
CREATE POLICY "Investors view own dividends" ON impact_dividends FOR SELECT USING (
  EXISTS (SELECT 1 FROM marketplace_investments mi JOIN investor_profiles ip ON mi.investor_id = ip.id WHERE mi.id = investment_id AND ip.user_id = auth.uid())
);
CREATE POLICY "Public read governance proposals" ON marketplace_governance FOR SELECT USING (true);