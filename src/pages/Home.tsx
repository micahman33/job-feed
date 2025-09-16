import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { sampleJobs } from "@/data/sampleJobs";
import JobCard from "@/components/JobCard";
import JobDetailsModal from "@/components/JobDetailsModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  // Reload jobs when the page regains focus (e.g., returning from PostJob page)
  useEffect(() => {
    const handleFocus = () => {
      loadJobs();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const loadJobs = async () => {
    try {
      // Load jobs from Supabase
      const { data: dbJobs, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      // Load jobs from localStorage (for non-authenticated users)
      const localStorageJobs = JSON.parse(localStorage.getItem('jobPosts') || '[]');
      console.log('Loaded localStorage jobs:', localStorageJobs);

      if (error) {
        console.error('Error loading jobs:', error);
        // Fall back to localStorage jobs + sample jobs
        const allJobs = [...localStorageJobs, ...sampleJobs];
        setJobs(allJobs);
      } else {
        // Combine database jobs, localStorage jobs, and sample jobs
        const allJobs = [...(dbJobs || []), ...localStorageJobs, ...sampleJobs];
        
        // Filter to last 14 days and sort by newest
        const last14Days = new Date();
        last14Days.setDate(last14Days.getDate() - 14);
        
        const recentJobs = allJobs
          .filter(job => new Date(job.created_at) >= last14Days)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 50); // Limit to 50 jobs before pagination

        // Ensure minimum 6 jobs are shown
        const finalJobs = recentJobs.length >= 6 ? recentJobs : [...recentJobs, ...sampleJobs.slice(0, 6 - recentJobs.length)];
        setJobs(finalJobs);
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      // Fall back to localStorage jobs + sample jobs
      const localStorageJobs = JSON.parse(localStorage.getItem('jobPosts') || '[]');
      setJobs([...localStorageJobs, ...sampleJobs]);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleBenefitToggle = (benefit: string) => {
    setSelectedBenefits(prev => 
      prev.includes(benefit) 
        ? prev.filter(b => b !== benefit)
        : [...prev, benefit]
    );
  };

  const handleJobTypeToggle = (type: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === "" ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesBenefits = selectedBenefits.length === 0 ||
      selectedBenefits.some(benefit => job.benefits.includes(benefit));
    
    const matchesJobType = selectedJobTypes.length === 0 ||
      selectedJobTypes.includes(job.job_type);
    
    return matchesSearch && matchesLocation && matchesBenefits && matchesJobType;
  });

  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
  const allBenefits = Array.from(new Set(jobs.flatMap(job => job.benefits)));
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover opportunities from top companies. Your next career move starts here.
            </p>
            
            {/* Search Bar */}
            <div className="bg-card rounded-lg p-4 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="City, state, or remote"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary-hover text-primary-foreground px-8">
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-card rounded-lg p-6 border border-border sticky top-24">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter Jobs
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Benefits</h4>
                  <div className="space-y-2">
                    {allBenefits.slice(0, 8).map((benefit) => (
                      <div key={benefit} className="flex items-center space-x-2">
                        <Checkbox
                          id={benefit}
                          checked={selectedBenefits.includes(benefit)}
                          onCheckedChange={() => handleBenefitToggle(benefit)}
                        />
                        <label htmlFor={benefit} className="text-sm text-muted-foreground cursor-pointer">
                          {benefit}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedJobTypes.includes(type)}
                          onCheckedChange={() => handleJobTypeToggle(type)}
                        />
                        <label htmlFor={type} className="text-sm text-muted-foreground cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {(selectedBenefits.length > 0 || selectedJobTypes.length > 0) && (
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedBenefits([]);
                        setSelectedJobTypes([]);
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Recent Job Postings
              </h2>
              <p className="text-muted-foreground">
                {filteredJobs.length} jobs available
              </p>
            </div>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onClick={() => handleJobClick(job)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No jobs found matching your criteria.
                  </p>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <JobDetailsModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;