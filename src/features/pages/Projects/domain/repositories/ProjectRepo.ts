import type { ProjectsResponse } from "../entities/projects";


export interface ProjectRepository {
  getProjects(
    page: number,
    limit: number,
    search?: string
  ): Promise<ProjectsResponse>;
}