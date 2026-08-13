import api from "../../../../api/api";
import type { ProjectsResponse } from "../../domain/entities/projects";
import type { ProjectRepository } from "../../domain/repositories/ProjectRepo";

export class ProjectRepositoryImpl
  implements ProjectRepository
{
  async getProjects(
    page: number,
    limit: number,
    search?: string
  ): Promise<ProjectsResponse> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (search?.trim()) {
      params.append("search", search.trim());
    }

    const response = await api.get(
      `/projects?${params.toString()}`
    );

    if (!response) {
      throw new Error("Failed to fetch projects");
    }

    const result = response.data;

    return {
      projects: result.data ?? [],
      pagination: result.pagination,
    };
  }
}