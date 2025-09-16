import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Building2 } from "lucide-react";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  const formatSalary = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
      }
      return `$${num}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    // If posted within the last hour
    if (diffMinutes < 60) {
      if (diffMinutes < 1) return "Just now";
      return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    }
    
    // If posted within the last 24 hours
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }
    
    // If posted today (same calendar day)
    if (diffDays === 0) return "Today";
    
    // If posted yesterday
    if (diffDays === 1) return "Yesterday";
    
    // If posted within the last week
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    // If posted within the last 2 weeks
    if (diffDays <= 14) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    
    // For older posts, show the actual date
    return date.toLocaleDateString();
  };

  return (
    <Card 
      className="hover:bg-job-card-hover cursor-pointer transition-all duration-200 hover:shadow-md border-border"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 hover:text-primary">
              {job.title}
            </h3>
            <div className="flex items-center text-muted-foreground mb-2">
              <Building2 className="h-4 w-4 mr-1" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
            {job.company_logo ? (
              // Check if it's an emoji (single character or emoji) vs URL
              job.company_logo.length <= 4 && !job.company_logo.startsWith('http') ? (
                <span className="text-2xl">
                  {job.company_logo}
                </span>
              ) : (
                <img 
                  src={job.company_logo} 
                  alt={`${job.company} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to company initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-sm font-semibold text-muted-foreground">${job.company.substring(0, 2).toUpperCase()}</span>`;
                    }
                  }}
                />
              )
            ) : (
              <span className="text-sm font-semibold text-muted-foreground">
                {job.company.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{job.location}</span>
        </div>
        
        <div className="flex items-center text-salary font-semibold mb-4">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>{formatSalary(job.salary_min, job.salary_max)}</span>
          <span className="text-muted-foreground font-normal ml-1">per year</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="bg-benefit-tag text-benefit-tag-foreground">
            {job.job_type}
          </Badge>
          {job.benefits.slice(0, 3).map((benefit) => (
            <Badge key={benefit} variant="outline" className="text-xs">
              {benefit}
            </Badge>
          ))}
          {job.benefits.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.benefits.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          Posted {formatDate(new Date(job.created_at))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;