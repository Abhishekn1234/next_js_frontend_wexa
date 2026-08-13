import type { Skill } from "../../../Skills/domain/entities/skills";

export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  skills?: Skill[];
}

export interface ProjectPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: ProjectPagination;
}