import type { Skill } from "../../../Skills/domain/entities/skills";

export interface RecommendedJob {
  id: string;
  title?: string;
  company?: string;
  location?: string;
  employmentType?: string;
  description?: string;
  skills?: Skill[];
}

export interface RecommendedDeveloper {
  id: string;
  name: string;
  email?: string;
  location?: string;
  experience?: number;
  availability?: string;
  skills?: Skill[];
}

export interface RecommendationResponse<T> {
  data: T[];
}