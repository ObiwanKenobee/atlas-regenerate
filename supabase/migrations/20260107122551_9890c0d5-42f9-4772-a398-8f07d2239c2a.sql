-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'practitioner',
  organization TEXT,
  bio TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create waitlist table for email signups
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  stakeholder_type TEXT,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create impact_metrics table for dashboard
CREATE TABLE public.impact_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value DECIMAL NOT NULL,
  metric_unit TEXT,
  category TEXT NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Waitlist policies (public insert for signups)
CREATE POLICY "Anyone can join waitlist" 
ON public.waitlist FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view waitlist" 
ON public.waitlist FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Impact metrics policies (public read)
CREATE POLICY "Anyone can view impact metrics" 
ON public.impact_metrics FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert metrics" 
ON public.impact_metrics FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create function to handle profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample impact metrics data
INSERT INTO public.impact_metrics (metric_name, metric_value, metric_unit, category) VALUES
('Carbon Sequestered', 2340000, 'tonnes CO2', 'climate'),
('Hectares Restored', 12500000, 'hectares', 'land'),
('Ocean Area Protected', 8200000, 'sq km', 'ocean'),
('Communities Supported', 147, 'communities', 'social'),
('Clean Water Access', 3200000, 'people', 'health'),
('Biodiversity Index', 87.5, 'score', 'ecosystem'),
('Circular Economy Value', 1800000000, 'USD', 'economy'),
('Renewable Energy Generated', 45000, 'GWh', 'energy');