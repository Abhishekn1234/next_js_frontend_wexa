import api from "../../../../api/api";
import type { SkillsResponse } from "../../domain/entities/skills";
import type { SkillRepository } from "../../domain/repositories/SkillRepo";

export class SkillRepositoryImpl
  implements SkillRepository
{
  async getSkills(
    page: number,
    limit: number,
    search?: string
  ): Promise<SkillsResponse> {
    const response = await api.get(
      "/skills",
      {
        params: {
          page,
          limit,
          search,
        },
      }
    );

    return {
      skills: response.data.data,
      pagination: response.data.pagination,
    };
  }
}