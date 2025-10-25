-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'manufacturer', 'distributor', 'pharmacy', 'patient');

-- Create user_roles table with proper security
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create helper function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS Policies
CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create profiles table for additional user info
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create batches table for medicine tracking
CREATE TABLE public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_number TEXT UNIQUE NOT NULL,
  medicine_name TEXT NOT NULL,
  manufacturer_id UUID REFERENCES auth.users(id),
  manufacturing_date TIMESTAMP WITH TIME ZONE NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT DEFAULT 'manufactured',
  qr_code_data TEXT,
  hedera_topic_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

-- Batches RLS policies
CREATE POLICY "Anyone can view batches"
ON public.batches
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Manufacturers can insert batches"
ON public.batches
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'manufacturer') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authorized users can update batches"
ON public.batches
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manufacturer') OR
  public.has_role(auth.uid(), 'distributor') OR
  public.has_role(auth.uid(), 'pharmacy')
);

-- Create batch_events table for tracking
CREATE TABLE public.batch_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL,
  description TEXT,
  location TEXT,
  actor_id UUID REFERENCES auth.users(id),
  hedera_transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.batch_events ENABLE ROW LEVEL SECURITY;

-- Batch events RLS policies
CREATE POLICY "Anyone can view batch events"
ON public.batch_events
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authorized users can insert batch events"
ON public.batch_events
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manufacturer') OR
  public.has_role(auth.uid(), 'distributor') OR
  public.has_role(auth.uid(), 'pharmacy')
);

-- Create anomalies table for AI detection
CREATE TABLE public.anomalies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE,
  anomaly_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.anomalies ENABLE ROW LEVEL SECURITY;

-- Anomalies RLS policies
CREATE POLICY "Authorized users can view anomalies"
ON public.anomalies
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manufacturer') OR
  public.has_role(auth.uid(), 'distributor') OR
  public.has_role(auth.uid(), 'pharmacy')
);

CREATE POLICY "Admins can update anomalies"
ON public.anomalies
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_batches_updated_at
BEFORE UPDATE ON public.batches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();