-- Project Registration and Verification System
CREATE TABLE IF NOT EXISTS public.restoration_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    practitioner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    project_type VARCHAR(100) NOT NULL, -- 'carbon_sequestration', 'soil_restoration', 'marine_protection'
    total_area DECIMAL(12, 4), -- in hectares
    location_description TEXT,
    registration_status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'submitted', 'verified', 'active'
    verification_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Geospatial Project Boundaries
CREATE TABLE IF NOT EXISTS public.project_boundaries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    boundary_name VARCHAR(255),
    geometry JSONB NOT NULL, -- GeoJSON polygon/multipolygon
    area_hectares DECIMAL(12, 4),
    verification_method VARCHAR(100), -- 'satellite', 'drone', 'ground_survey', 'gps'
    verified_by VARCHAR(255),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Baseline Ecosystem Health Assessment
CREATE TABLE IF NOT EXISTS public.baseline_assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    assessment_type VARCHAR(100) NOT NULL, -- 'soil_health', 'biodiversity', 'water_quality', 'carbon_stock'
    baseline_value DECIMAL(15, 4),
    measurement_unit VARCHAR(50),
    assessment_method VARCHAR(100),
    assessment_date DATE,
    assessor_name VARCHAR(255),
    assessor_credentials VARCHAR(255),
    documentation_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Historical Land Use Documentation
CREATE TABLE IF NOT EXISTS public.land_use_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    period_start DATE,
    period_end DATE,
    land_use_type VARCHAR(100), -- 'agriculture', 'grazing', 'forestry', 'urban', 'degraded', 'natural'
    management_practices TEXT,
    disturbance_events TEXT, -- fires, floods, droughts, etc.
    documentation_source VARCHAR(100), -- 'satellite_imagery', 'historical_records', 'local_knowledge'
    evidence_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Community Stakeholder Mapping
CREATE TABLE IF NOT EXISTS public.community_stakeholders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    stakeholder_name VARCHAR(255),
    stakeholder_type VARCHAR(100), -- 'indigenous_community', 'local_farmer', 'cooperative', 'government', 'ngo'
    role_in_project VARCHAR(100), -- 'landowner', 'manager', 'beneficiary', 'advisor', 'monitor'
    contact_info JSONB,
    engagement_level VARCHAR(50), -- 'high', 'medium', 'low'
    consent_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'granted', 'denied'
    benefit_sharing_agreement BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now') NOT NULL
);

-- Verification Documents
CREATE TABLE IF NOT EXISTS public.verification_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    document_type VARCHAR(100), -- 'land_title', 'environmental_permit', 'community_agreement', 'baseline_report'
    document_name VARCHAR(255),
    file_url TEXT,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    verified BOOLEAN DEFAULT false,
    verified_by VARCHAR(255),
    verified_at TIMESTAMP WITH TIME ZONE
);

-- Insert sample restoration projects
INSERT INTO public.restoration_projects (practitioner_id, project_name, project_type, total_area, location_description, registration_status) VALUES
((SELECT id FROM auth.users LIMIT 1), 'Green Valley Carbon Farm', 'carbon_sequestration', 250.5, 'Rolling hills in Northern California with mixed grassland and oak woodland', 'verified'),
((SELECT id FROM auth.users LIMIT 1), 'Coastal Kelp Restoration', 'marine_protection', 15.2, 'Nearshore kelp forest restoration along Monterey Bay coastline', 'active'),
((SELECT id FROM auth.users LIMIT 1), 'Regenerative Soil Initiative', 'soil_restoration', 180.0, 'Former conventional farmland transitioning to regenerative practices', 'submitted');

-- Sample geospatial boundaries (simplified GeoJSON)
INSERT INTO public.project_boundaries (project_id, boundary_name, geometry, area_hectares, verification_method, verified_by) 
SELECT 
    rp.id,
    'Main Project Area',
    '{"type": "Polygon", "coordinates": [[[-122.4194, 37.7749], [-122.4094, 37.7749], [-122.4094, 37.7849], [-122.4194, 37.7849], [-122.4194, 37.7749]]]}',
    CASE 
        WHEN rp.project_name LIKE '%Carbon%' THEN 250.5
        WHEN rp.project_name LIKE '%Kelp%' THEN 15.2
        ELSE 180.0
    END,
    'satellite',
    'GeoVerify Solutions'
FROM public.restoration_projects rp;

-- Sample baseline assessments
INSERT INTO public.baseline_assessments (project_id, assessment_type, baseline_value, measurement_unit, assessment_method, assessment_date, assessor_name)
SELECT 
    rp.id,
    CASE 
        WHEN rp.project_type = 'carbon_sequestration' THEN 'carbon_stock'
        WHEN rp.project_type = 'marine_protection' THEN 'biodiversity'
        ELSE 'soil_health'
    END,
    CASE 
        WHEN rp.project_type = 'carbon_sequestration' THEN 45.2
        WHEN rp.project_type = 'marine_protection' THEN 6.8
        ELSE 5.4
    END,
    CASE 
        WHEN rp.project_type = 'carbon_sequestration' THEN 'tons_co2_per_hectare'
        WHEN rp.project_type = 'marine_protection' THEN 'biodiversity_index'
        ELSE 'soil_health_score'
    END,
    'field_sampling',
    CURRENT_DATE - INTERVAL '30 days',
    'Dr. Sarah Martinez, Certified Soil Scientist'
FROM public.restoration_projects rp;

-- RLS Policies
ALTER TABLE public.restoration_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_boundaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baseline_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.land_use_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_stakeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;

-- Projects - practitioners can manage their own, others can view verified projects
CREATE POLICY "Practitioners can manage their own projects" ON public.restoration_projects
    FOR ALL USING (auth.uid() = practitioner_id);

CREATE POLICY "Verified projects are viewable by everyone" ON public.restoration_projects
    FOR SELECT USING (registration_status IN ('verified', 'active'));

-- Boundaries - linked to project access
CREATE POLICY "Project boundaries follow project access" ON public.project_boundaries
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.restoration_projects 
            WHERE restoration_projects.id = project_boundaries.project_id 
            AND (restoration_projects.practitioner_id = auth.uid() OR registration_status IN ('verified', 'active'))
        )
    );

-- Baseline assessments - public for verified projects, private for drafts
CREATE POLICY "Baseline assessments follow project visibility" ON public.baseline_assessments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.restoration_projects 
            WHERE restoration_projects.id = baseline_assessments.project_id 
            AND (restoration_projects.practitioner_id = auth.uid() OR registration_status IN ('verified', 'active'))
        )
    );