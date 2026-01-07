-- Stakeholder Types and Enterprise Features
CREATE TABLE IF NOT EXISTS public.stakeholder_types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL, -- 'practitioner', 'investor', 'government', 'builder'
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    dashboard_config JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enterprise Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    stakeholder_type VARCHAR(100) NOT NULL,
    size VARCHAR(50), -- 'small', 'medium', 'large', 'enterprise'
    location VARCHAR(255),
    verification_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Organization Members
CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(100) DEFAULT 'member', -- 'admin', 'manager', 'member', 'viewer'
    permissions JSONB,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Practitioner-specific data
CREATE TABLE IF NOT EXISTS public.land_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    asset_name VARCHAR(255) NOT NULL,
    asset_type VARCHAR(100), -- 'farmland', 'forest', 'wetland', 'grassland'
    area_hectares DECIMAL(10, 2),
    location VARCHAR(255),
    coordinates JSONB,
    soil_health_score DECIMAL(5, 2),
    biodiversity_index DECIMAL(5, 2),
    carbon_stock DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Investor-specific data
CREATE TABLE IF NOT EXISTS public.investment_portfolios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    portfolio_name VARCHAR(255) NOT NULL,
    total_committed DECIMAL(15, 2),
    total_deployed DECIMAL(15, 2),
    target_sectors JSONB,
    risk_profile VARCHAR(50),
    impact_thesis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Government/NGO programs
CREATE TABLE IF NOT EXISTS public.sustainability_programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    program_name VARCHAR(255) NOT NULL,
    program_type VARCHAR(100), -- 'policy', 'funding', 'research', 'monitoring'
    budget DECIMAL(15, 2),
    target_beneficiaries INTEGER,
    geographic_scope VARCHAR(255),
    sdg_alignment JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Builder/Researcher projects
CREATE TABLE IF NOT EXISTS public.research_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    research_area VARCHAR(100), -- 'ai', 'climate_tech', 'regenerative_science'
    funding_status VARCHAR(50),
    publication_count INTEGER DEFAULT 0,
    patent_count INTEGER DEFAULT 0,
    open_source BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now') NOT NULL
);

-- Insert stakeholder types
INSERT INTO public.stakeholder_types (type_name, display_name, description, dashboard_config) VALUES
('practitioner', 'Regenerative Practitioners', 'Farmers, land stewards, and community leaders', 
 '{"widgets": ["land_health", "carbon_credits", "biodiversity", "revenue_streams"], "metrics": ["soil_health", "carbon_sequestration", "biodiversity_index"]}'),
('investor', 'Investors & Institutions', 'Forward-thinking capital seeking impact opportunities', 
 '{"widgets": ["portfolio_performance", "impact_metrics", "risk_analysis", "deal_flow"], "metrics": ["roi", "impact_score", "esg_rating"]}'),
('government', 'Governments & NGOs', 'Organizations needing transparent sustainability tools', 
 '{"widgets": ["program_tracking", "policy_impact", "beneficiary_metrics", "sdg_progress"], "metrics": ["program_reach", "policy_effectiveness", "sdg_alignment"]}'),
('builder', 'Builders & Researchers', 'Scientists and innovators in climate tech', 
 '{"widgets": ["research_pipeline", "innovation_metrics", "collaboration_network", "impact_scaling"], "metrics": ["publication_impact", "patent_portfolio", "open_source_contributions"]}');

-- Sample organizations
INSERT INTO public.organizations (name, stakeholder_type, size, location, verification_status) VALUES
('Green Valley Farms Collective', 'practitioner', 'medium', 'California, USA', 'verified'),
('Regenerative Capital Partners', 'investor', 'large', 'New York, USA', 'verified'),
('Ministry of Climate Action', 'government', 'enterprise', 'Costa Rica', 'verified'),
('Climate AI Research Lab', 'builder', 'small', 'MIT, USA', 'verified');

-- RLS Policies
ALTER TABLE public.stakeholder_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.land_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sustainability_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;

-- Public read for stakeholder types
CREATE POLICY "Stakeholder types are viewable by everyone" ON public.stakeholder_types FOR SELECT USING (true);

-- Organization policies
CREATE POLICY "Users can view organizations they belong to" ON public.organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organization_members 
            WHERE organization_members.organization_id = organizations.id 
            AND organization_members.user_id = auth.uid()
        )
    );

-- Organization member policies
CREATE POLICY "Users can view their organization memberships" ON public.organization_members
    FOR SELECT USING (auth.uid() = user_id);

-- Asset policies (organization members only)
CREATE POLICY "Organization members can view assets" ON public.land_assets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organization_members 
            WHERE organization_members.organization_id = land_assets.organization_id 
            AND organization_members.user_id = auth.uid()
        )
    );