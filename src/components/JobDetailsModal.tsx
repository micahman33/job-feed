import { Job } from "@/types/job";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Building2, Calendar } from "lucide-react";

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
            {job.company_logo && (
              <img 
                src={job.company_logo} 
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-lg object-cover border"
              />
            )}
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
              <div className="whitespace-pre-wrap leading-relaxed">{job.description}</div>
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