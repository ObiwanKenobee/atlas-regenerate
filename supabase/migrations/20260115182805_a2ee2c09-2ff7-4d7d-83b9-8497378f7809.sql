-- Create organizations table
CREATE TABLE public.organizations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    organization_type TEXT NOT NULL DEFAULT 'general',
    description TEXT,
    website_url TEXT,
    logo_url TEXT,
    location JSONB,
    contact_info JSONB,
    verification_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    owner_id UUID NOT NULL,
    project_name TEXT NOT NULL,
    project_type TEXT NOT NULL DEFAULT 'regenerative',
    description TEXT,
    location JSONB,
    start_date DATE,
    end_date DATE,
    status TEXT DEFAULT 'draft',
    verification_status TEXT DEFAULT 'pending',
    total_area_hectares NUMERIC,
    carbon_sequestered NUMERIC DEFAULT 0,
    biodiversity_score NUMERIC DEFAULT 0,
    funding_goal NUMERIC DEFAULT 0,
    funding_raised NUMERIC DEFAULT 0,
    impact_metrics JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_investments table
CREATE TABLE public.project_investments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    investor_id UUID NOT NULL,
    amount NUMERIC NOT NULL,
    investment_type TEXT DEFAULT 'direct',
    status TEXT DEFAULT 'pending',
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscription_tiers table
CREATE TABLE public.subscription_tiers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    tier_name TEXT NOT NULL UNIQUE,
    monthly_price NUMERIC NOT NULL DEFAULT 0,
    annual_price NUMERIC NOT NULL DEFAULT 0,
    features TEXT[] DEFAULT '{}',
    max_projects INTEGER DEFAULT 3,
    analytics_access BOOLEAN DEFAULT false,
    priority_support BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_subscriptions table
CREATE TABLE public.user_subscriptions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    tier_id UUID REFERENCES public.subscription_tiers(id) ON DELETE SET NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    payment_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Anyone can view organizations" 
ON public.organizations FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create organizations" 
ON public.organizations FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Projects policies
CREATE POLICY "Anyone can view published projects" 
ON public.projects FOR SELECT 
USING (status = 'published' OR owner_id = auth.uid());

CREATE POLICY "Owners can create projects" 
ON public.projects FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their projects" 
ON public.projects FOR UPDATE 
USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their projects" 
ON public.projects FOR DELETE 
USING (auth.uid() = owner_id);

-- Project investments policies
CREATE POLICY "Investors can view their investments" 
ON public.project_investments FOR SELECT 
USING (auth.uid() = investor_id);

CREATE POLICY "Authenticated users can invest" 
ON public.project_investments FOR INSERT 
WITH CHECK (auth.uid() = investor_id);

-- Subscription tiers policies (public read)
CREATE POLICY "Anyone can view subscription tiers" 
ON public.subscription_tiers FOR SELECT 
USING (true);

-- User subscriptions policies
CREATE POLICY "Users can view their subscriptions" 
ON public.user_subscriptions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their subscriptions" 
ON public.user_subscriptions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their subscriptions" 
ON public.user_subscriptions FOR UPDATE 
USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default subscription tiers
INSERT INTO public.subscription_tiers (tier_name, monthly_price, annual_price, features, max_projects, analytics_access, priority_support, is_active) VALUES
('Basic', 0, 0, ARRAY['project_registration', 'basic_metrics', 'community_access'], 3, false, false, true),
('Pro', 49, 470, ARRAY['unlimited_projects', 'advanced_analytics', 'priority_verification', 'api_access', 'carbon_marketplace'], -1, true, true, true),
('Enterprise', 199, 1990, ARRAY['white_label', 'dedicated_support', 'custom_integrations', 'bulk_verification', 'institutional_reporting', 'multi_org_management'], -1, true, true, true);