# Job Posting API Examples

This document shows how to use the job posting API from external applications.

## API Endpoint

**URL:** `https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job`  
**Method:** `POST`  
**Content-Type:** `application/json`

## Authentication

The API supports both authenticated and anonymous requests:

- **Anonymous requests**: Use the public anon key
- **Authenticated requests**: Use a valid JWT token from Supabase Auth

## Request Format

```json
{
  "title": "Senior Software Engineer",
  "company": "TechCorp Inc.",
  "location": "San Francisco, CA",
  "salary_min": 120000,
  "salary_max": 180000,
  "job_type": "Full-time",
  "description": "We are looking for a senior software engineer...",
  "benefits": ["Health Insurance", "401K", "Remote Work"],
  "company_logo": "🚀",
  "user_id": "optional-user-id"
}
```

## Response Format

### Success Response (201)
```json
{
  "success": true,
  "message": "Job posted successfully",
  "job": {
    "id": "uuid-here",
    "title": "Senior Software Engineer",
    "company": "TechCorp Inc.",
    "created_at": "2024-01-15T10:30:00Z",
    // ... other job fields
  }
}
```

### Error Response (400/500)
```json
{
  "error": "Missing required fields",
  "missing_fields": ["title", "company"],
  "details": "Additional error details"
}
```

## Example Usage

### JavaScript/Node.js
```javascript
const SUPABASE_URL = 'https://imaiixiyaynmtcfaaeea.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

async function postJob(jobData) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/post-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(jobData)
  });

  const result = await response.json();
  
  if (response.ok) {
    console.log('Job posted successfully:', result.job);
  } else {
    console.error('Error posting job:', result.error);
  }
  
  return result;
}

// Example usage
const jobData = {
  title: "Frontend Developer",
  company: "WebStudio",
  location: "Remote",
  salary_min: 70000,
  salary_max: 110000,
  job_type: "Full-time",
  description: "Looking for a talented frontend developer...",
  benefits: ["Health Insurance", "Remote Work"],
  company_logo: "🎨"
};

postJob(jobData);
```

### Python
```python
import requests
import json

SUPABASE_URL = 'https://imaiixiyaynmtcfaaeea.supabase.co'
SUPABASE_ANON_KEY = 'your-anon-key-here'

def post_job(job_data):
    url = f"{SUPABASE_URL}/functions/v1/post-job"
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {SUPABASE_ANON_KEY}'
    }
    
    response = requests.post(url, headers=headers, json=job_data)
    result = response.json()
    
    if response.status_code == 201:
        print('Job posted successfully:', result['job'])
    else:
        print('Error posting job:', result['error'])
    
    return result

# Example usage
job_data = {
    "title": "Data Scientist",
    "company": "DataFlow",
    "location": "Austin, TX",
    "salary_min": 95000,
    "salary_max": 150000,
    "job_type": "Full-time",
    "description": "Analyze complex datasets and build ML models...",
    "benefits": ["Health Insurance", "401K", "Stock Options"],
    "company_logo": "📊"
}

post_job(job_data)
```

### cURL
```bash
curl -X POST \
  https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer your-anon-key-here' \
  -d '{
    "title": "Product Manager",
    "company": "InnovateCo",
    "location": "New York, NY",
    "salary_min": 90000,
    "salary_max": 140000,
    "job_type": "Full-time",
    "description": "Join our product team to drive innovation...",
    "benefits": ["Health Insurance", "401K", "Stock Options"],
    "company_logo": "💡"
  }'
```

## Required Fields

- `title` (string): Job title
- `company` (string): Company name
- `location` (string): Job location
- `salary_min` (number): Minimum salary
- `salary_max` (number): Maximum salary
- `job_type` (string): Job type (Full-time, Part-time, Contract, Internship)
- `description` (string): Job description

## Optional Fields

- `benefits` (array): Array of benefit strings
- `company_logo` (string): Company logo emoji or URL
- `user_id` (string): User ID for authenticated posts

## Error Codes

- `400`: Bad Request (missing fields, validation errors)
- `500`: Internal Server Error (database errors, server issues)

## Rate Limiting

The API is subject to Supabase's rate limiting policies. For high-volume usage, consider implementing your own rate limiting or caching strategies.
