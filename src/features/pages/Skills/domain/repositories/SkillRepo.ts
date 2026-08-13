import type {
  SkillsResponse,
} from "../../domain/entities/skills";

export interface SkillRepository {
  getSkills(
    page: number,
    limit: number,
    search?: string
  ): Promise<SkillsResponse>;
}