-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  job_type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT NOT NULL,
  benefits TEXT[] DEFAULT '{}',
  company_logo TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs (public read, authenticated users can create)
CREATE POLICY "Anyone can view jobs" 
ON public.jobs 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create jobs" 
ON public.jobs 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs" 
ON public.jobs 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs" 
ON public.jobs 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample jobs to ensure minimum display
INSERT INTO public.jobs (title, company, location, salary_min, salary_max, job_type, description, benefits, company_logo) VALUES
('Senior Software Engineer', 'TechCorp', 'San Francisco, CA', 120000, 180000, 'Full-time', 'We are looking for a senior software engineer to join our growing team. You will be responsible for developing scalable web applications and mentoring junior developers.', ARRAY['Health Insurance', 'Dental Insurance', '401K', 'Paid Time Off', 'Remote Work'], '🚀'),
('Product Manager', 'InnovateCo', 'New York, NY', 90000, 140000, 'Full-time', 'Join our product team to drive innovation and build world-class products. You will work closely with engineering, design, and business teams.', ARRAY['Health Insurance', '401K', 'Paid Time Off', 'Stock Options', 'Flexible Schedule'], '💡'),
('Frontend Developer', 'WebStudio', 'Remote', 70000, 110000, 'Full-time', 'Looking for a talented frontend developer to create amazing user experiences. Experience with React and modern JavaScript required.', ARRAY['Health Insurance', 'Dental Insurance', 'Remote Work', 'Professional Development', 'Paid Time Off'], '🎨'),
('Data Scientist', 'DataFlow', 'Austin, TX', 95000, 150000, 'Full-time', 'Analyze complex datasets and build machine learning models to drive business insights. PhD in Data Science or related field preferred.', ARRAY['Health Insurance', '401K', 'Stock Options', 'Paid Time Off', 'Conference Budget'], '📊'),
('UX Designer', 'DesignHub', 'Los Angeles, CA', 80000, 120000, 'Full-time', 'Create intuitive and beautiful user experiences for our mobile and web applications. 3+ years of UX design experience required.', ARRAY['Health Insurance', 'Dental Insurance', 'Creative Budget', 'Paid Time Off', 'Flexible Schedule'], '🎯'),
('DevOps Engineer', 'CloudTech', 'Seattle, WA', 100000, 160000, 'Full-time', 'Build and maintain our cloud infrastructure. Experience with AWS, Docker, and Kubernetes required.', ARRAY['Health Insurance', '401K', 'Stock Options', 'Remote Work', 'On-call Bonus'], '☁️'),
('Marketing Manager', 'GrowthCo', 'Chicago, IL', 65000, 95000, 'Full-time', 'Lead our marketing efforts and drive customer acquisition. Experience with digital marketing and analytics tools required.', ARRAY['Health Insurance', 'Dental Insurance', '401K', 'Paid Time Off', 'Marketing Budget'], '📈'),
('Sales Representative', 'SalesForce Pro', 'Miami, FL', 45000, 80000, 'Full-time', 'Join our sales team and help grow our customer base. Commission structure with unlimited earning potential.', ARRAY['Health Insurance', 'Commission Structure', 'Paid Time Off', 'Travel Reimbursement', 'Phone Allowance'], '💼');