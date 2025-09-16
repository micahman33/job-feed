import { supabase } from "@/integrations/supabase/client";

export interface JobPostData {
  title: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  job_type: string;
  description: string;
  benefits?: string[];
  company_logo?: string;
}

export interface JobPostResponse {
  success: boolean;
  message: string;
  job?: any;
  error?: string;
  details?: string;
  missing_fields?: string[];
}

/**
 * Post a job using the Supabase Edge Function API
 * @param jobData - The job data to post
 * @returns Promise<JobPostResponse>
 */
export async function postJob(jobData: JobPostData): Promise<JobPostResponse> {
  // Use the Edge Function API
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${supabase.supabaseUrl}/functions/v1/post-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabase.supabaseKey}`,
        ...(session && { 'Authorization': `Bearer ${session.access_token}` })
      },
      body: JSON.stringify(jobData)
    });

    const result = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to post job',
        details: result.details,
        missing_fields: result.missing_fields
      };
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      error: 'Network error',
      details: error.message
    };
  }
}

/**
 * Get all jobs from the API
 * @returns Promise<any[]>
 */
export async function getJobs(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
