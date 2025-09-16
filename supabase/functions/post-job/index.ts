import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface JobPostRequest {
  title: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  job_type: string;
  description: string;
  benefits?: string[];
  company_logo?: string;
  user_id?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Parse request body
    const jobData: JobPostRequest = await req.json()

    // Validate required fields
    const requiredFields = ['title', 'company', 'location', 'salary_min', 'salary_max', 'job_type', 'description']
    const missingFields = requiredFields.filter(field => !jobData[field])
    
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields', 
          missing_fields: missingFields 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate salary values
    if (jobData.salary_min < 0 || jobData.salary_max < 0) {
      return new Response(
        JSON.stringify({ error: 'Salary values must be positive' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (jobData.salary_min > jobData.salary_max) {
      return new Response(
        JSON.stringify({ error: 'Minimum salary cannot be greater than maximum salary' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Prepare job data for insertion
    const jobToInsert = {
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      salary_min: jobData.salary_min,
      salary_max: jobData.salary_max,
      job_type: jobData.job_type,
      description: jobData.description,
      benefits: jobData.benefits || [],
      company_logo: jobData.company_logo || null,
      user_id: jobData.user_id || null // Allow anonymous posts
    }

    // Insert job into database
    const { data, error } = await supabaseClient
      .from('jobs')
      .insert(jobToInsert)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create job posting', 
          details: error.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Job posted successfully',
        job: data 
      }),
      { 
        status: 201, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})