-- AI Oracle Monitoring System
CREATE TABLE IF NOT EXISTS public.monitoring_oracles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    oracle_name VARCHAR(255) NOT NULL,
    oracle_type VARCHAR(100) NOT NULL, -- 'satellite', 'iot_sensor', 'acoustic', 'water_quality'
    data_source VARCHAR(255), -- 'sentinel-2', 'landsat', 'soil_sensor_network', 'hydrophone_array'
    monitoring_frequency VARCHAR(50), -- '5_days', 'hourly', 'daily', 'weekly'
    ai_model VARCHAR(100), -- 'vegetation_index', 'soil_health_ml', 'biodiversity_classifier'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Real-time Monitoring Data
CREATE TABLE IF NOT EXISTS public.monitoring_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    oracle_id UUID REFERENCES public.monitoring_oracles(id),
    measurement_type VARCHAR(100), -- 'ndvi', 'soil_moisture', 'species_count', 'ph_level'
    measurement_value DECIMAL(15, 6),
    measurement_unit VARCHAR(50),
    confidence_score DECIMAL(5, 4), -- AI confidence 0-1
    raw_data JSONB, -- Original sensor/satellite data
    processed_data JSONB, -- AI-processed insights
    anomaly_detected BOOLEAN DEFAULT false,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Verification Events (AI-triggered)
CREATE TABLE IF NOT EXISTS public.verification_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    event_type VARCHAR(100), -- 'improvement_detected', 'degradation_alert', 'milestone_reached'
    severity VARCHAR(50), -- 'info', 'warning', 'critical', 'success'
    ai_analysis TEXT,
    supporting_data JSONB,
    verification_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'disputed'
    human_verified BOOLEAN DEFAULT false,
    verified_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Satellite Monitoring Specific
CREATE TABLE IF NOT EXISTS public.satellite_observations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    satellite_source VARCHAR(100), -- 'sentinel-2', 'landsat-8', 'planet'
    image_date DATE,
    cloud_coverage DECIMAL(5, 2),
    ndvi_mean DECIMAL(8, 6),
    ndvi_change DECIMAL(8, 6), -- Change from baseline
    vegetation_health VARCHAR(50), -- 'excellent', 'good', 'fair', 'poor'
    image_url TEXT,
    analysis_confidence DECIMAL(5, 4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- IoT Sensor Networks
CREATE TABLE IF NOT EXISTS public.iot_sensors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    sensor_id VARCHAR(100) UNIQUE,
    sensor_type VARCHAR(100), -- 'soil_moisture', 'ph_sensor', 'temperature', 'nutrient_level'
    location_coordinates JSONB, -- {lat, lng, elevation}
    installation_date DATE,
    last_maintenance DATE,
    battery_level DECIMAL(5, 2),
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'maintenance', 'offline'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Biodiversity Acoustic Analysis
CREATE TABLE IF NOT EXISTS public.acoustic_monitoring (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    recording_date TIMESTAMP WITH TIME ZONE,
    species_detected JSONB, -- Array of detected species with confidence
    biodiversity_index DECIMAL(8, 4),
    acoustic_complexity DECIMAL(8, 4),
    dominant_frequencies JSONB,
    ai_classification_confidence DECIMAL(5, 4),
    audio_file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Water Quality Tracking
CREATE TABLE IF NOT EXISTS public.water_quality_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.restoration_projects(id) ON DELETE CASCADE,
    measurement_location JSONB, -- Coordinates of measurement point
    ph_level DECIMAL(4, 2),
    dissolved_oxygen DECIMAL(6, 2),
    turbidity DECIMAL(8, 2),
    nutrient_levels JSONB, -- N, P, K levels
    temperature DECIMAL(5, 2),
    conductivity DECIMAL(8, 2),
    quality_score DECIMAL(5, 2), -- Overall quality 0-100
    measurement_method VARCHAR(100), -- 'automated_sensor', 'manual_sampling', 'drone_analysis'
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert monitoring oracles
INSERT INTO public.monitoring_oracles (oracle_name, oracle_type, data_source, monitoring_frequency, ai_model) VALUES
('Sentinel-2 Vegetation Monitor', 'satellite', 'sentinel-2', '5_days', 'vegetation_index'),
('Soil Health Sensor Network', 'iot_sensor', 'soil_sensor_network', 'hourly', 'soil_health_ml'),
('Biodiversity Acoustic Classifier', 'acoustic', 'hydrophone_array', 'daily', 'biodiversity_classifier'),
('Water Quality Monitor', 'iot_sensor', 'water_quality_sensors', 'hourly', 'water_quality_ml');

-- Sample monitoring data
INSERT INTO public.monitoring_data (project_id, oracle_id, measurement_type, measurement_value, measurement_unit, confidence_score, raw_data, processed_data)
SELECT 
    rp.id,
    mo.id,
    CASE 
        WHEN mo.oracle_type = 'satellite' THEN 'ndvi'
        WHEN mo.oracle_type = 'iot_sensor' AND mo.oracle_name LIKE '%Soil%' THEN 'soil_moisture'
        WHEN mo.oracle_type = 'acoustic' THEN 'species_count'
        ELSE 'ph_level'
    END,
    CASE 
        WHEN mo.oracle_type = 'satellite' THEN 0.75
        WHEN mo.oracle_type = 'iot_sensor' AND mo.oracle_name LIKE '%Soil%' THEN 35.2
        WHEN mo.oracle_type = 'acoustic' THEN 12
        ELSE 7.2
    END,
    CASE 
        WHEN mo.oracle_type = 'satellite' THEN 'ndvi_index'
        WHEN mo.oracle_type = 'iot_sensor' AND mo.oracle_name LIKE '%Soil%' THEN 'percent'
        WHEN mo.oracle_type = 'acoustic' THEN 'species_count'
        ELSE 'ph'
    END,
    0.92,
    '{"sensor_reading": "raw_value", "timestamp": "2024-01-07T10:00:00Z"}',
    '{"ai_analysis": "healthy_vegetation", "trend": "improving", "anomalies": []}'
FROM public.restoration_projects rp
CROSS JOIN public.monitoring_oracles mo
WHERE rp.registration_status = 'active'
LIMIT 20;

-- Sample satellite observations
INSERT INTO public.satellite_observations (project_id, satellite_source, image_date, cloud_coverage, ndvi_mean, ndvi_change, vegetation_health, analysis_confidence)
SELECT 
    rp.id,
    'sentinel-2',
    CURRENT_DATE - INTERVAL '2 days',
    15.5,
    0.72,
    0.08, -- 8% improvement from baseline
    'good',
    0.94
FROM public.restoration_projects rp
WHERE rp.registration_status = 'active';

-- Sample verification events
INSERT INTO public.verification_events (project_id, event_type, severity, ai_analysis, supporting_data)
SELECT 
    rp.id,
    'improvement_detected',
    'success',
    'AI analysis indicates 8% improvement in vegetation health over the past 30 days. NDVI values show consistent upward trend with 94% confidence.',
    '{"ndvi_change": 0.08, "confidence": 0.94, "trend_duration": "30_days", "supporting_measurements": ["soil_moisture", "temperature"]}'
FROM public.restoration_projects rp
WHERE rp.registration_status = 'active'
LIMIT 3;

-- RLS Policies
ALTER TABLE public.monitoring_oracles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitoring_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.satellite_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iot_sensors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acoustic_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_quality_data ENABLE ROW LEVEL SECURITY;

-- Public read for monitoring oracles
CREATE POLICY "Monitoring oracles are viewable by everyone" ON public.monitoring_oracles FOR SELECT USING (true);

-- Monitoring data follows project visibility
CREATE POLICY "Monitoring data follows project access" ON public.monitoring_data
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.restoration_projects 
            WHERE restoration_projects.id = monitoring_data.project_id 
            AND (restoration_projects.practitioner_id = auth.uid() OR registration_status IN ('verified', 'active'))
        )
    );

-- Verification events follow project access
CREATE POLICY "Verification events follow project access" ON public.verification_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.restoration_projects 
            WHERE restoration_projects.id = verification_events.project_id 
            AND (restoration_projects.practitioner_id = auth.uid() OR registration_status IN ('verified', 'active'))
        )
    );