-- Drop the existing policy that only allows authenticated users to create jobs
DROP POLICY IF EXISTS "Authenticated users can create jobs" ON public.jobs;

-- Create a new policy that allows anyone (including anonymous users) to create jobs
CREATE POLICY "Anyone can create jobs" 
ON public.jobs 
FOR INSERT 
TO public
WITH CHECK (true);

-- Update the existing policy for authenticated users to ensure they can only create jobs with their own user_id
CREATE POLICY "Authenticated users can create jobs with their user_id" 
ON public.jobs 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);
