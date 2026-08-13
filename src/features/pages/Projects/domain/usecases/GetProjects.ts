import type { ProjectRepository } from "../repositories/ProjectRepo";

export class GetProjects {
  private readonly projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  execute(
    page: number,
    limit: number,
    search?: string
  ) {
    return this.projectRepository.getProjects(
      page,
      limit,
      search
    );
  }
}