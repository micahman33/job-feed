# Job Feed API - Developer Guide

Welcome to the Job Feed API! This guide will help you integrate job posting capabilities into your applications and automations.

## 🚀 Quick Start

### API Endpoint
```
https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job
```

### API Key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0
```

### Test Tool
Use our interactive testing tool: `test-direct-api.html`

## 📋 API Reference

### POST /functions/v1/post-job

Post a new job to the job board.

#### Headers
```
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

#### Request Body
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

#### Required Fields
- `title` (string): Job title
- `company` (string): Company name
- `location` (string): Job location
- `salary_min` (number): Minimum salary in USD
- `salary_max` (number): Maximum salary in USD
- `job_type` (string): One of: "Full-time", "Part-time", "Contract", "Internship"
- `description` (string): Job description

#### Optional Fields
- `benefits` (array): Array of benefit strings
- `company_logo` (string): Emoji or URL for company logo
- `user_id` (string): User ID for authenticated posts (leave null for anonymous)

#### Response

**Success (201)**
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

**Error (400/500)**
```json
{
  "error": "Missing required fields",
  "missing_fields": ["title", "company"],
  "details": "Additional error details"
}
```

## 💻 Code Examples

### JavaScript/Node.js
```javascript
const SUPABASE_URL = 'https://imaiixiyaynmtcfaaeea.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0';

async function postJob(jobData) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/post-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(jobData)
  });

  const result = await response.json();
  
  if (response.ok) {
    console.log('Job posted successfully:', result.job);
    return result.job;
  } else {
    console.error('Error posting job:', result.error);
    throw new Error(result.error);
  }
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
  benefits: ["Health Insurance", "Remote Work"]
};

postJob(jobData);
```

### Python
```python
import requests
import json

SUPABASE_URL = 'https://imaiixiyaynmtcfaaeea.supabase.co'
API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0'

def post_job(job_data):
    url = f"{SUPABASE_URL}/functions/v1/post-job"
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {API_KEY}'
    }
    
    response = requests.post(url, headers=headers, json=job_data)
    result = response.json()
    
    if response.status_code == 201:
        print('Job posted successfully:', result['job'])
        return result['job']
    else:
        print('Error posting job:', result['error'])
        raise Exception(result['error'])

# Example usage
job_data = {
    "title": "Data Scientist",
    "company": "DataFlow",
    "location": "Austin, TX",
    "salary_min": 95000,
    "salary_max": 150000,
    "job_type": "Full-time",
    "description": "Analyze complex datasets and build ML models...",
    "benefits": ["Health Insurance", "401K", "Stock Options"]
}

post_job(job_data)
```

### cURL
```bash
curl -X POST \
  https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0' \
  -d '{
    "title": "Product Manager",
    "company": "InnovateCo",
    "location": "New York, NY",
    "salary_min": 90000,
    "salary_max": 140000,
    "job_type": "Full-time",
    "description": "Join our product team to drive innovation...",
    "benefits": ["Health Insurance", "401K", "Stock Options"]
  }'
```

### PHP
```php
<?php
$supabase_url = 'https://imaiixiyaynmtcfaaeea.supabase.co';
$api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0';

function postJob($jobData) {
    global $supabase_url, $api_key;
    
    $url = $supabase_url . '/functions/v1/post-job';
    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $api_key
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($jobData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    $result = json_decode($response, true);
    
    if ($httpCode == 201) {
        echo "Job posted successfully: " . $result['job']['id'] . "\n";
        return $result['job'];
    } else {
        echo "Error posting job: " . $result['error'] . "\n";
        throw new Exception($result['error']);
    }
}

// Example usage
$jobData = [
    'title' => 'DevOps Engineer',
    'company' => 'CloudTech',
    'location' => 'Seattle, WA',
    'salary_min' => 100000,
    'salary_max' => 160000,
    'job_type' => 'Full-time',
    'description' => 'Build and maintain our cloud infrastructure...',
    'benefits' => ['Health Insurance', '401K', 'Remote Work']
];

postJob($jobData);
?>
```

## 🔧 Automation Platform Examples

### Automation Anywhere
1. Use the "HTTP Request" action
2. Set Method to POST
3. Set URL to: `https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job`
4. Add Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_API_KEY`
5. Set Body to JSON with your job data
6. Use variables to map your data fields

### Zapier Integration
1. Use the "Webhooks by Zapier" action
2. Set URL to: `https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job`
3. Set method to POST
4. Add headers: `Authorization: Bearer YOUR_API_KEY`
5. Map your form fields to the job data structure

### Make.com (Integromat)
1. Create a new scenario
2. Add "HTTP" module
3. Set URL and headers as above
4. Map your data fields

### Microsoft Power Automate
1. Add "HTTP" action
2. Set Method to POST
3. Set URI to the API endpoint
4. Add headers and body as JSON

### GitHub Actions
```yaml
name: Post Job
on:
  workflow_dispatch:
    inputs:
      title:
        description: 'Job Title'
        required: true
      company:
        description: 'Company Name'
        required: true

jobs:
  post-job:
    runs-on: ubuntu-latest
    steps:
      - name: Post Job
        run: |
          curl -X POST \
            https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job \
            -H 'Content-Type: application/json' \
            -H 'Authorization: Bearer ${{ secrets.API_KEY }}' \
            -d '{
              "title": "${{ github.event.inputs.title }}",
              "company": "${{ github.event.inputs.company }}",
              "location": "Remote",
              "salary_min": 80000,
              "salary_max": 120000,
              "job_type": "Full-time",
              "description": "Posted via GitHub Actions automation"
            }'
```

## 🧪 Testing

### Interactive Test Tool
Use the provided `test-direct-api.html` file to test your integrations:
1. Open the file in your browser
2. Try different test scenarios
3. Verify your API calls work correctly

### Validation Rules
- `salary_min` must be less than or equal to `salary_max`
- `salary_min` and `salary_max` must be positive numbers
- `job_type` must be one of the allowed values
- All required fields must be provided

## 📊 Rate Limits

- No specific rate limits are currently enforced
- Be respectful with your usage
- For high-volume applications, consider implementing your own rate limiting

## 🆘 Support

- Test your integration using the provided test tool
- Check the response error messages for debugging
- Ensure all required fields are provided
- Verify your API key is correct

## 🔒 Security

- The API key is safe to use in client-side applications
- All requests are logged for monitoring
- Rate limiting may be implemented in the future
- Your data is protected by Row Level Security policies

---

**Happy coding! 🚀**
