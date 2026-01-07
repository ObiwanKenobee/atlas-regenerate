-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    funding_goal DECIMAL(12, 2),
    funding_raised DECIMAL(12, 2) DEFAULT 0,
    project_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create project_metrics table
CREATE TABLE IF NOT EXISTS public.project_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    metric_name VARCHAR(255) NOT NULL,
    metric_value DECIMAL(15, 4),
    metric_unit VARCHAR(50),
    category VARCHAR(100),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create investments table
CREATE TABLE IF NOT EXISTS public.investments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    investment_type VARCHAR(50) DEFAULT 'donation',
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add admin role to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create RLS policies
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Projects are viewable by everyone" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Only admins can insert projects" ON public.projects
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
        )
    );

CREATE POLICY "Only admins can update projects" ON public.projects
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
        )
    );

-- Project metrics policies
CREATE POLICY "Project metrics are viewable by everyone" ON public.project_metrics
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage project metrics" ON public.project_metrics
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
        )
    );

-- Investments policies
CREATE POLICY "Users can view their own investments" ON public.investments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own investments" ON public.investments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all investments" ON public.investments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
        )
    );

-- Insert sample projects
INSERT INTO public.projects (title, description, location, latitude, longitude, funding_goal, project_type, image_url) VALUES
('Regenerative Farm Network', 'Building sustainable farming practices across rural communities', 'Costa Rica', 9.7489, -83.7534, 50000.00, 'agriculture', '/placeholder.svg'),
('Ocean Restoration Initiative', 'Coral reef restoration and marine ecosystem protection', 'Great Barrier Reef, Australia', -18.2871, 147.6992, 75000.00, 'marine', '/placeholder.svg'),
('Forest Carbon Sequestration', 'Reforestation project with indigenous communities', 'Amazon Basin, Brazil', -3.4653, -62.2159, 100000.00, 'forestry', '/placeholder.svg');

-- Insert sample metrics
INSERT INTO public.project_metrics (project_id, metric_name, metric_value, metric_unit, category) 
SELECT 
    p.id,
    'Carbon Sequestered',
    CASE 
        WHEN p.title LIKE '%Farm%' THEN 1250.5
        WHEN p.title LIKE '%Ocean%' THEN 890.2
        ELSE 2100.8
    END,
    'tons CO2',
    'environmental'
FROM public.projects p;