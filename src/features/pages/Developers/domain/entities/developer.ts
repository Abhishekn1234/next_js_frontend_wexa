import type { Skill } from "../../../Skills/domain/entities/skills";

export interface Developer {
  id: string;
  name: string;
  email?: string;
  location?: string;
  experience?: number;
  availability?: string;
  skills?: Skill[];
}

export interface DeveloperPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface DevelopersResponse {
  developers: Developer[];
  pagination: DeveloperPagination;
}