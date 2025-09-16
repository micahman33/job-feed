# 🤖 Automation Anywhere Integration Guide

This guide shows you how to integrate the Job Feed API with Automation Anywhere to automatically post jobs.

## 🚀 Quick Setup

### API Credentials
- **Endpoint**: `https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job`
- **API Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0`

## 📋 Step-by-Step Setup

### 1. Create HTTP Request Action

1. In your Automation Anywhere bot, add an **HTTP Request** action
2. Set the following properties:

| Property | Value |
|----------|-------|
| **Method** | POST |
| **URL** | `https://imaiixiyaynmtcfaaeea.supabase.co/functions/v1/post-job` |
| **Content Type** | `application/json` |

### 2. Configure Headers

Add these headers in the HTTP Request action:

| Header Name | Header Value |
|-------------|--------------|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWlpeGl5YXlubXRjZmFhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4ODI4MDQsImV4cCI6MjA3MzQ1ODgwNH0.h56G1loDTn_b6L875cqm91nGfKaDcvRg9I3QJZjFrS0` |

### 3. Configure Request Body

Set the request body to JSON format with your job data:

```json
{
  "title": "$job_title$",
  "company": "$company_name$",
  "location": "$job_location$",
  "salary_min": $salary_min$,
  "salary_max": $salary_max$,
  "job_type": "$job_type$",
  "description": "$job_description$",
  "benefits": ["$benefit1$", "$benefit2$", "$benefit3$"],
  "company_logo": "$company_logo$"
}
```

### 4. Variable Mapping

Create variables in your bot to map your data:

| Variable Name | Example Value | Description |
|---------------|---------------|-------------|
| `$job_title$` | "Senior Software Engineer" | Job title |
| `$company_name$` | "TechCorp Inc." | Company name |
| `$job_location$` | "San Francisco, CA" | Job location |
| `$salary_min$` | 120000 | Minimum salary (number) |
| `$salary_max$` | 180000 | Maximum salary (number) |
| `$job_type$` | "Full-time" | Job type |
| `$job_description$` | "We are looking for..." | Job description |
| `$benefit1$` | "Health Insurance" | First benefit |
| `$benefit2$` | "401K" | Second benefit |
| `$benefit3$` | "Remote Work" | Third benefit |
| `$company_logo$` | "🚀" | Company logo (emoji or URL) |

## 🔧 Advanced Configuration

### Error Handling

Add error handling to your bot:

1. **Check Response Status**: After the HTTP Request, check if the response status is 201 (success)
2. **Parse Response**: Extract the response body to get job details
3. **Log Results**: Log success/failure for monitoring

### Response Handling

The API returns a JSON response:

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Job posted successfully",
  "job": {
    "id": "uuid-here",
    "title": "Senior Software Engineer",
    "company": "TechCorp Inc.",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (400/500)**:
```json
{
  "error": "Missing required fields",
  "missing_fields": ["title", "company"],
  "details": "Please provide all required fields"
}
```

### Validation Rules

Ensure your data meets these requirements:

- **Required Fields**: title, company, location, salary_min, salary_max, job_type, description
- **Job Types**: Must be one of: "Full-time", "Part-time", "Contract", "Internship"
- **Salary**: salary_min must be ≤ salary_max, both must be positive numbers
- **Description**: Should be at least 10 characters long

## 📊 Example Bot Flow

### 1. Data Input
- Read job data from Excel/CSV file
- Or extract from web scraping
- Or get from form submissions

### 2. Data Validation
- Check required fields are present
- Validate salary ranges
- Ensure job type is valid

### 3. API Call
- Use HTTP Request action
- Send job data to API
- Handle response

### 4. Result Processing
- Log successful posts
- Handle errors appropriately
- Update tracking records

## 🧪 Testing Your Bot

### Test with Sample Data

Use this sample job data to test your bot:

```json
{
  "title": "Test Automation Engineer",
  "company": "TestCorp",
  "location": "Remote",
  "salary_min": 80000,
  "salary_max": 120000,
  "job_type": "Full-time",
  "description": "This is a test job posting created via Automation Anywhere bot.",
  "benefits": ["Health Insurance", "401K", "Remote Work"],
  "company_logo": "🤖"
}
```

### Validation Checklist

Before running your bot:

- [ ] API endpoint URL is correct
- [ ] Authorization header includes the full API key
- [ ] Content-Type header is set to `application/json`
- [ ] All required fields are mapped to variables
- [ ] Salary values are numbers (not strings)
- [ ] Job type matches allowed values
- [ ] Error handling is implemented

## 🔍 Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check that the Authorization header includes "Bearer " prefix
   - Verify the API key is complete and correct

2. **400 Bad Request**
   - Check that all required fields are provided
   - Ensure salary values are numbers, not strings
   - Verify job_type is one of the allowed values

3. **500 Internal Server Error**
   - Check the request body format
   - Ensure Content-Type header is set correctly
   - Verify the JSON is properly formatted

### Debug Tips

1. **Log Request Details**: Log the full request before sending
2. **Check Response**: Always log the response for debugging
3. **Test Manually**: Use the test tool (`test-direct-api.html`) to verify your data
4. **Validate JSON**: Ensure your JSON is properly formatted

## 📈 Best Practices

1. **Batch Processing**: Process multiple jobs in a loop
2. **Error Recovery**: Implement retry logic for failed requests
3. **Monitoring**: Log all API calls for audit purposes
4. **Rate Limiting**: Add delays between requests if processing many jobs
5. **Data Validation**: Validate data before sending to API

## 🎯 Use Cases

### HR Automation
- Automatically post jobs from HR systems
- Sync job postings across multiple platforms
- Process job applications and create postings

### Recruitment Agencies
- Bulk post jobs from client requirements
- Automate job posting workflows
- Integrate with existing recruitment tools

### Company Websites
- Auto-post jobs from company career pages
- Sync with internal job management systems
- Streamline job posting processes

---

**Need help? Use the interactive test tool (`test-direct-api.html`) to verify your setup before running your bot! 🚀**
