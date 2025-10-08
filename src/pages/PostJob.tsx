import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AVAILABLE_BENEFITS } from "@/types/job";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Building2, MapPin, DollarSign, FileText, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { postJob } from "@/lib/jobApi";

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    type: "",
    description: "",
    benefits: [] as string[],
    companyLogo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBenefitChange = (benefit: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      benefits: checked 
        ? [...prev.benefits, benefit]
        : prev.benefits.filter(b => b !== benefit)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.company || !formData.location || 
        !formData.salaryMin || !formData.salaryMax || !formData.type || 
        !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use the API endpoint for all job postings
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        salary_min: parseInt(formData.salaryMin),
        salary_max: parseInt(formData.salaryMax),
        job_type: formData.type,
        description: formData.description,
        benefits: formData.benefits,
        company_logo: formData.companyLogo || null,
        user_id: user?.id || null
      };

      const result = await postJob(jobData);

      if (result.success) {
        toast({
          title: "Job Posted Successfully!",
          description: "Your job posting is now live and visible to job seekers.",
        });
      } else {
        throw new Error(result.error || 'Failed to post job');
      }

      // Navigate back to home
      navigate('/');
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast({
        title: "Error Posting Job",
        description: error.message || "There was an error posting your job. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const companyLogos = [
    "🚀", "💡", "🎨", "📊", "🎯", "☁️", "📈", "💼", "🔧", "🌟", "💻", "📱"
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post a Job</h1>
          <p className="text-muted-foreground">
            Fill out the form below to post your job and reach thousands of qualified candidates.
          </p>
          {!user && (
            <div className="mt-4 p-4 bg-accent rounded-lg">
              <p className="text-sm text-accent-foreground">
                💡 <strong>Tip:</strong> Sign in to manage your job postings and track applications.{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary"
                  onClick={() => navigate('/auth')}
                >
                  Sign in here
                </Button>
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    placeholder="e.g. TechCorp Inc."
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="location"
                      placeholder="e.g. San Francisco, CA or Remote"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Job Type *</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salary Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Salary Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salaryMin">Minimum Salary (USD) *</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="e.g. 80000"
                    value={formData.salaryMin}
                    onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="salaryMax">Maximum Salary (USD) *</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="e.g. 120000"
                    value={formData.salaryMax}
                    onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  placeholder="Provide a detailed job description including responsibilities, requirements, and qualifications..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={8}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Benefits & Perks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AVAILABLE_BENEFITS.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <Checkbox
                      id={benefit}
                      checked={formData.benefits.includes(benefit)}
                      onCheckedChange={(checked) => 
                        handleBenefitChange(benefit, checked as boolean)
                      }
                    />
                    <Label htmlFor={benefit} className="cursor-pointer">
                      {benefit}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Logo */}
          <Card>
            <CardHeader>
              <CardTitle>Company Logo (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Select an emoji or provide URL</Label>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2 mt-2 mb-4">
                  {companyLogos.map((logo, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer rounded-lg border-2 p-3 text-center text-2xl ${
                        formData.companyLogo === logo ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('companyLogo', logo)}
                    >
                      {logo}
                    </div>
                  ))}
                </div>
                <Input
                  placeholder="Or paste logo URL here"
                  value={formData.companyLogo}
                  onChange={(e) => handleInputChange('companyLogo', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting Job..." : "Post Job"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;