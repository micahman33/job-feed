import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { sampleJobs } from "@/data/sampleJobs";
import JobCard from "@/components/JobCard";
import JobDetailsModal from "@/components/JobDetailsModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    // Load jobs from localStorage or use sample data
    const storedJobs = localStorage.getItem('jobPosts');
    if (storedJobs) {
      const parsedJobs = JSON.parse(storedJobs).map((job: any) => ({
        ...job,
        postedDate: new Date(job.postedDate)
      }));
      // Combine with sample jobs and sort by date
      const allJobs = [...sampleJobs, ...parsedJobs];
      const last14Days = new Date();
      last14Days.setDate(last14Days.getDate() - 14);
      
      const recentJobs = allJobs
        .filter(job => job.postedDate >= last14Days)
        .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
      
      setJobs(recentJobs);
    } else {
      // Filter sample jobs to last 14 days and sort by newest
      const last14Days = new Date();
      last14Days.setDate(last14Days.getDate() - 14);
      
      const recentJobs = sampleJobs
        .filter(job => job.postedDate >= last14Days)
        .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
      
      setJobs(recentJobs);
    }
  }, []);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === "" ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
  const allBenefits = Array.from(new Set(jobs.flatMap(job => job.benefits)));

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
                    className="pl-10"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="City, state, or remote"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10"
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
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Popular Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {allBenefits.slice(0, 6).map((benefit) => (
                      <Badge key={benefit} variant="outline" className="text-xs cursor-pointer hover:bg-accent">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Job Type</h4>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input type="checkbox" id={type} className="rounded" />
                        <label htmlFor={type} className="text-sm text-muted-foreground cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
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
                {filteredJobs.length} jobs posted in the last 14 days
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