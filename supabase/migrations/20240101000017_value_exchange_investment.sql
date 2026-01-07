-- Value Exchange & Investment Marketplace
CREATE TABLE investment_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  asset_type TEXT NOT NULL, -- 'carbon_credit', 'biodiversity_credit', 'impact_bond', 'revenue_share'
  asset_status TEXT NOT NULL DEFAULT 'pending' CHECK (asset_status IN ('pending', 'verified', 'listed', 'sold', 'retired')),
  total_units DECIMAL(15,2) NOT NULL,
  available_units DECIMAL(15,2) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  minimum_purchase DECIMAL(10,2) DEFAULT 1,
  verification_data JSONB NOT NULL,
  impact_metrics JSONB NOT NULL,
  risk_rating TEXT NOT NULL CHECK (risk_rating IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  listed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE investment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES investment_assets(id),
  buyer_id UUID REFERENCES auth.users(id),
  seller_id UUID REFERENCES auth.users(id),
  transaction_type TEXT NOT NULL, -- 'primary_purchase', 'secondary_trade', 'retirement'
  units_traded DECIMAL(15,2) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  practitioner_payment DECIMAL(15,2) NOT NULL,
  transaction_status TEXT NOT NULL DEFAULT 'pending' CHECK (transaction_status IN ('pending', 'completed', 'failed', 'cancelled')),
  settlement_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE investor_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES auth.users(id),
  portfolio_name TEXT NOT NULL,
  portfolio_type TEXT NOT NULL, -- 'individual', 'institutional', 'fund'
  total_invested DECIMAL(15,2) DEFAULT 0,
  current_value DECIMAL(15,2) DEFAULT 0,
  impact_score DECIMAL(5,2) DEFAULT 0,
  diversification_score DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE portfolio_holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES investor_portfolios(id),
  asset_id UUID REFERENCES investment_assets(id),
  units_held DECIMAL(15,2) NOT NULL,
  average_cost DECIMAL(10,2) NOT NULL,
  current_value DECIMAL(15,2) NOT NULL,
  unrealized_gain_loss DECIMAL(15,2) DEFAULT 0,
  impact_contribution JSONB,
  acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE secondary_market_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES investor_portfolios(id),
  asset_id UUID REFERENCES investment_assets(id),
  order_type TEXT NOT NULL CHECK (order_type IN ('buy', 'sell')),
  order_status TEXT NOT NULL DEFAULT 'open' CHECK (order_status IN ('open', 'partial', 'filled', 'cancelled')),
  units_requested DECIMAL(15,2) NOT NULL,
  units_filled DECIMAL(15,2) DEFAULT 0,
  limit_price DECIMAL(10,2),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE institutional_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES auth.users(id),
  report_type TEXT NOT NULL, -- 'monthly', 'quarterly', 'annual', 'impact_summary'
  report_period_start DATE NOT NULL,
  report_period_end DATE NOT NULL,
  portfolio_performance JSONB NOT NULL,
  impact_metrics JSONB NOT NULL,
  risk_analysis JSONB NOT NULL,
  esg_scores JSONB NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fee_structures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fee_type TEXT NOT NULL, -- 'platform_fee', 'transaction_fee', 'management_fee', 'performance_fee'
  investor_tier TEXT NOT NULL, -- 'retail', 'accredited', 'institutional'
  fee_percentage DECIMAL(5,4) NOT NULL,
  minimum_fee DECIMAL(10,2) DEFAULT 0,
  maximum_fee DECIMAL(10,2),
  effective_date DATE NOT NULL,
  description TEXT
);

-- Insert default fee structures
INSERT INTO fee_structures (fee_type, investor_tier, fee_percentage, minimum_fee, effective_date, description) VALUES
('platform_fee', 'retail', 0.0250, 5.00, CURRENT_DATE, 'Platform fee for retail investors'),
('platform_fee', 'accredited', 0.0200, 25.00, CURRENT_DATE, 'Platform fee for accredited investors'),
('platform_fee', 'institutional', 0.0150, 100.00, CURRENT_DATE, 'Platform fee for institutional investors'),
('transaction_fee', 'retail', 0.0100, 2.50, CURRENT_DATE, 'Transaction fee for retail investors'),
('transaction_fee', 'accredited', 0.0075, 10.00, CURRENT_DATE, 'Transaction fee for accredited investors'),
('transaction_fee', 'institutional', 0.0050, 50.00, CURRENT_DATE, 'Transaction fee for institutional investors');

-- Enable RLS
ALTER TABLE investment_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE secondary_market_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutional_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read investment assets" ON investment_assets FOR SELECT USING (asset_status = 'listed');
CREATE POLICY "Admin manage investment assets" ON investment_assets FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users view own transactions" ON investment_transactions FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Users create transactions" ON investment_transactions FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Users manage own portfolios" ON investor_portfolios FOR ALL USING (auth.uid() = investor_id);

CREATE POLICY "Users view own holdings" ON portfolio_holdings FOR SELECT USING (
  EXISTS (SELECT 1 FROM investor_portfolios WHERE id = portfolio_id AND investor_id = auth.uid())
);

CREATE POLICY "Users manage own orders" ON secondary_market_orders FOR ALL USING (
  EXISTS (SELECT 1 FROM investor_portfolios WHERE id = portfolio_id AND investor_id = auth.uid())
);

CREATE POLICY "Users view own reports" ON institutional_reports FOR SELECT USING (auth.uid() = investor_id);
CREATE POLICY "Admin generate reports" ON institutional_reports FOR INSERT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read fee structures" ON fee_structures FOR SELECT USING (true);