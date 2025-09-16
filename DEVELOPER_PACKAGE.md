# 🚀 Job Feed API - Developer Package

Welcome! This package contains everything you need to integrate with the Job Feed API.

## 📦 What's Included

1. **API Key** - Your authentication token
2. **API Documentation** - Complete reference guide
3. **OpenAPI Specification** - Machine-readable API definition
4. **Code Examples** - Ready-to-use examples in multiple languages
5. **Test Tool** - Interactive testing interface
6. **Automation Examples** - Popular automation platforms

## 🔑 Your API Credentials

### API Endpoint
```
https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job
```

### API Key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0
```

### Usage
```bash
curl -X POST \
  https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0' \
  -d '{
    "title": "Your Job Title",
    "company": "Your Company",
    "location": "Job Location",
    "salary_min": 80000,
    "salary_max": 120000,
    "job_type": "Full-time",
    "description": "Job description here..."
  }'
```

## 📚 Documentation Files

| File | Description |
|------|-------------|
| `DEVELOPER_API_GUIDE.md` | Complete API documentation with examples |
| `job-feed-api.yaml` | OpenAPI 3.0 specification for automation tools |
| `AUTOMATION_ANYWHERE_GUIDE.md` | Step-by-step Automation Anywhere integration |
| `test-direct-api.html` | Interactive testing tool |
| `DEVELOPER_PACKAGE.md` | This file - quick start guide |

## 🧪 Testing Your Integration

### Option 1: Interactive Test Tool
1. Open `test-direct-api.html` in your browser
2. Click "Test Edge Function API" to verify your setup
3. Use "Custom Job Data" to test with your own data

### Option 2: Quick cURL Test
```bash
curl -X POST \
  https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0' \
  -d '{
    "title": "Test Job",
    "company": "Test Company",
    "location": "Remote",
    "salary_min": 50000,
    "salary_max": 80000,
    "job_type": "Full-time",
    "description": "This is a test job posting"
  }'
```

## 🔧 Popular Automation Platforms

### Automation Anywhere
1. Use the "HTTP Request" action
2. Set Method to POST
3. Set URL to the API endpoint
4. Add Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_API_KEY`
5. Set Body to JSON with your job data
6. Use variables to map your data fields

### Zapier
1. Create a new Zap
2. Use "Webhooks by Zapier" as the action
3. Set URL to the API endpoint
4. Add Authorization header with your API key
5. Map your trigger data to the job fields

### Make.com (Integromat)
1. Create a new scenario
2. Add "HTTP" module
3. Configure POST request to the API endpoint
4. Add headers and map your data

### Microsoft Power Automate
1. Add "HTTP" action
2. Set Method to POST
3. Set URI to the API endpoint
4. Add headers and body as JSON

### GitHub Actions
```yaml
- name: Post Job
  run: |
    curl -X POST \
      https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job \
      -H 'Content-Type: application/json' \
      -H 'Authorization: Bearer ${{ secrets.API_KEY }}' \
      -d '{"title": "Auto-posted Job", "company": "GitHub", ...}'
```

## 📋 Required Fields

Every job posting must include:
- `title` - Job title
- `company` - Company name  
- `location` - Job location
- `salary_min` - Minimum salary (number)
- `salary_max` - Maximum salary (number)
- `job_type` - One of: "Full-time", "Part-time", "Contract", "Internship"
- `description` - Job description

## 🎯 Optional Fields

- `benefits` - Array of benefit strings
- `company_logo` - Emoji or URL
- `user_id` - For authenticated posts

## ⚡ Quick Start Checklist

- [ ] Copy the API key
- [ ] Test with the interactive tool
- [ ] Read the full documentation
- [ ] Try a simple cURL request
- [ ] Build your integration
- [ ] Test with real data

## 🆘 Need Help?

1. **Test First**: Use the interactive test tool to verify your setup
2. **Check Examples**: Look at the code examples in the documentation
3. **Validate Data**: Ensure all required fields are provided
4. **Check Headers**: Verify your Authorization header is correct

## 🔒 Security Notes

- The API key is safe to use in client-side applications
- No rate limits are currently enforced
- All requests are logged for monitoring
- Your data is protected by database security policies

---

**Ready to build? Start with the test tool and then dive into the full documentation! 🚀**
