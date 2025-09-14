export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  job_type: string;
  description: string;
  benefits: string[];
  created_at: string;
  company_logo?: string;
  user_id?: string;
}

export const AVAILABLE_BENEFITS = [
  "401K",
  "Health Insurance", 
  "Dental Insurance",
  "Paid Time Off",
  "Paid Training",
  "Remote Work",
  "Flexible Schedule",
  "Stock Options",
  "Commission Structure",
  "Professional Development",
  "Conference Budget",
  "Creative Budget",
  "On-call Bonus",
  "Marketing Budget",
  "Travel Reimbursement",
  "Phone Allowance"
] as const;

export type Benefit = typeof AVAILABLE_BENEFITS[number];