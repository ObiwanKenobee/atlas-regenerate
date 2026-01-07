-- Revenue Streams Table
CREATE TABLE IF NOT EXISTS public.revenue_streams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    stream_name VARCHAR(255) NOT NULL,
    stream_type VARCHAR(100) NOT NULL, -- 'transaction_fee', 'subscription', 'carbon_credits', 'impact_bonds'
    revenue_model VARCHAR(100) NOT NULL, -- 'percentage', 'fixed', 'tiered', 'performance'
    rate DECIMAL(10, 4), -- percentage or fixed amount
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Circular Economy Metrics
CREATE TABLE IF NOT EXISTS public.circular_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    metric_type VARCHAR(100) NOT NULL, -- 'waste_reduction', 'resource_efficiency', 'regeneration_rate'
    baseline_value DECIMAL(15, 4),
    current_value DECIMAL(15, 4),
    target_value DECIMAL(15, 4),
    unit VARCHAR(50),
    measurement_period VARCHAR(50), -- 'monthly', 'quarterly', 'annually'
    circular_score DECIMAL(5, 2), -- 0-100 score
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Impact Bonds (for performance-based revenue)
CREATE TABLE IF NOT EXISTS public.impact_bonds (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    bond_name VARCHAR(255) NOT NULL,
    target_impact DECIMAL(15, 4),
    current_impact DECIMAL(15, 4) DEFAULT 0,
    bond_value DECIMAL(12, 2),
    success_threshold DECIMAL(5, 2), -- percentage
    payout_rate DECIMAL(5, 4), -- percentage of bond value
    maturity_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Carbon Credits Trading
CREATE TABLE IF NOT EXISTS public.carbon_credits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    credits_generated DECIMAL(15, 4),
    credits_sold DECIMAL(15, 4) DEFAULT 0,
    price_per_credit DECIMAL(10, 2),
    verification_standard VARCHAR(100), -- 'VCS', 'Gold Standard', 'CDM'
    vintage_year INTEGER,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'verified', 'sold'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Subscription Tiers
CREATE TABLE IF NOT EXISTS public.subscription_tiers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tier_name VARCHAR(100) NOT NULL,
    monthly_price DECIMAL(10, 2),
    annual_price DECIMAL(10, 2),
    features JSONB,
    max_projects INTEGER,
    analytics_access BOOLEAN DEFAULT false,
    priority_support BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User Subscriptions
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tier_id UUID REFERENCES public.subscription_tiers(id),
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    payment_status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert revenue streams
INSERT INTO public.revenue_streams (stream_name, stream_type, revenue_model, rate, description) VALUES
('Platform Transaction Fee', 'transaction_fee', 'percentage', 2.5, 'Fee on all investment transactions'),
('Premium Subscription', 'subscription', 'tiered', 0, 'Monthly/annual subscription for advanced features'),
('Carbon Credit Trading', 'carbon_credits', 'percentage', 10.0, 'Commission on carbon credit sales'),
('Impact Bond Performance', 'impact_bonds', 'performance', 15.0, 'Revenue from successful impact outcomes'),
('Data Analytics License', 'subscription', 'fixed', 500.0, 'Enterprise data access licensing'),
('Verification Services', 'transaction_fee', 'fixed', 250.0, 'Third-party impact verification');

-- Insert subscription tiers
INSERT INTO public.subscription_tiers (tier_name, monthly_price, annual_price, features, max_projects, analytics_access, priority_support) VALUES
('Basic', 0, 0, '["project_browsing", "basic_metrics", "community_access"]', 3, false, false),
('Pro', 29.99, 299.99, '["unlimited_projects", "advanced_analytics", "priority_listing", "custom_reports"]', -1, true, false),
('Enterprise', 99.99, 999.99, '["white_label", "api_access", "dedicated_support", "custom_integrations"]', -1, true, true);

-- Insert sample circular metrics
INSERT INTO public.circular_metrics (project_id, metric_type, baseline_value, current_value, target_value, unit, measurement_period, circular_score)
SELECT 
    p.id,
    'waste_reduction',
    100.0,
    75.0,
    50.0,
    'tons',
    'monthly',
    75.5
FROM public.projects p LIMIT 1;

-- Insert sample carbon credits
INSERT INTO public.carbon_credits (project_id, credits_generated, price_per_credit, verification_standard, vintage_year, status)
SELECT 
    p.id,
    1250.5,
    25.00,
    'VCS',
    2024,
    'verified'
FROM public.projects p LIMIT 1;

-- RLS Policies
ALTER TABLE public.revenue_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circular_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_bonds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carbon_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Revenue streams - admin only
CREATE POLICY "Only admins can manage revenue streams" ON public.revenue_streams
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
        )
    );

-- Circular metrics - public read, admin write
CREATE POLICY "Circular metrics are viewable by everyone" ON public.circular_metrics
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage circular metrics" ON public.circular_metrics
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
        )
    );

-- Subscription tiers - public read
CREATE POLICY "Subscription tiers are viewable by everyone" ON public.subscription_tiers
    FOR SELECT USING (true);

-- User subscriptions - users can view their own
CREATE POLICY "Users can view their own subscriptions" ON public.user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions" ON public.user_subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);