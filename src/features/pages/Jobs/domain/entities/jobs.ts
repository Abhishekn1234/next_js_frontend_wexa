export interface Job {
  id: string;
  title: string;
  company?: string;
  description?: string;
  employmentType?: string;
  location?: string;
  createdAt?: string;
}