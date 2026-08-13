import type { SkillsResponse } from "../entities/skills";
import type { SkillRepository } from "../repositories/SkillRepo";

export class GetSkills {
  private readonly skillRepository: SkillRepository;

  constructor(skillRepository: SkillRepository) {
    this.skillRepository = skillRepository;
  }

  execute(
    page: number,
    limit: number,
    search?: string
  ): Promise<SkillsResponse> {
    return this.skillRepository.getSkills(
      page,
      limit,
      search
    );
  }
}