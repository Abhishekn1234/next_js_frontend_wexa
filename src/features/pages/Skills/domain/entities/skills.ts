export interface Skill {
  id: string;
  name: string;
  category?: string;
  description?: string;
}

export interface SkillPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SkillsResponse {
  skills: Skill[];
  pagination: SkillPagination;
}