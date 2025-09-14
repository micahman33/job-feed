import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AVAILABLE_BENEFITS, Job } from "@/types/job";
import { useToast } from "@/hooks/use-toast";
import { Building2, MapPin, DollarSign, FileText, Award } from "lucide-react";

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Create new job
    const newJob: Job = {
      id: Date.now().toString(),
      title: formData.title,
      company: formData.company,
      location: formData.location,
      salaryMin: parseInt(formData.salaryMin),
      salaryMax: parseInt(formData.salaryMax),
      type: formData.type,
      description: formData.description,
      benefits: formData.benefits,
      postedDate: new Date(),
      companyLogo: formData.companyLogo || undefined
    };

    // Save to localStorage
    const existingJobs = JSON.parse(localStorage.getItem('jobPosts') || '[]');
    existingJobs.push(newJob);
    localStorage.setItem('jobPosts', JSON.stringify(existingJobs));

    toast({
      title: "Job Posted Successfully!",
      description: "Your job posting is now live and visible to job seekers.",
    });

    // Navigate back to home
    navigate('/');
  };

  const companyLogos = [
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center", 
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1558655146-364adaf25c24?w=64&h=64&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=64&h=64&fit=crop&crop=center"
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post a Job</h1>
          <p className="text-muted-foreground">
            Fill out the form below to post your job and reach thousands of qualified candidates.
          </p>
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
                  <Select onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Textarea
                  id="description"
                  placeholder="Provide a detailed job description including responsibilities, requirements, and qualifications..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={8}
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
                <Label>Select a logo or provide URL</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-2 mb-4">
                  {companyLogos.map((logo, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer rounded-lg border-2 p-2 ${
                        formData.companyLogo === logo ? 'border-primary' : 'border-border'
                      }`}
                      onClick={() => handleInputChange('companyLogo', logo)}
                    >
                      <img src={logo} alt={`Logo ${index + 1}`} className="w-full h-12 object-cover rounded" />
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
            >
              Post Job
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/')}
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