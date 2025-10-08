import { Job } from "@/types/job";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Building2, Calendar } from "lucide-react";
import { formatTextWithLineBreaks } from "@/lib/utils";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailsModal = ({ job, isOpen, onClose }: JobDetailsModalProps) => {
  if (!job) return null;

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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                {job.title}
              </DialogTitle>
              <div className="flex items-center text-muted-foreground mb-2">
                <Building2 className="h-5 w-5 mr-2" />
                <span className="font-semibold text-lg">{job.company}</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
              {job.company_logo ? (
                // Check if it's an emoji (single character or emoji) vs URL
                job.company_logo.length <= 4 && !job.company_logo.startsWith('http') ? (
                  <span className="text-3xl">
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
                        parent.innerHTML = `<span class="text-lg font-semibold text-muted-foreground">${job.company.substring(0, 2).toUpperCase()}</span>`;
                      }
                    }}
                  />
                )
              ) : (
                <span className="text-lg font-semibold text-muted-foreground">
                  {job.company.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-salary font-semibold">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{formatSalary(job.salary_min, job.salary_max)} per year</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Posted {formatDate(new Date(job.created_at))}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-benefit-tag text-benefit-tag-foreground">
              {job.job_type}
            </Badge>
            {job.benefits.map((benefit) => (
              <Badge key={benefit} variant="outline">
                {benefit}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Job Description</h3>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <div className="whitespace-pre-wrap leading-relaxed">{formatTextWithLineBreaks(job.description)}</div>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground px-8">
              Apply Now
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;