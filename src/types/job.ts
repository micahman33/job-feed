export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  type: string; // full-time, part-time, contract
  description: string;
  benefits: string[];
  postedDate: Date;
  companyLogo?: string;
}

export const AVAILABLE_BENEFITS = [
  "401K",
  "Health Insurance", 
  "Dental Insurance",
  "Paid Time Off",
  "Paid Training",
  "Remote Work",
  "Flexible Schedule",
  "Stock Options"
] as const;

export type Benefit = typeof AVAILABLE_BENEFITS[number];