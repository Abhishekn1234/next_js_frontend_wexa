import type { DeveloperRepository } from "../repositories/DeveloperRepo";

export class GetDevelopers {
  private readonly developerRepository: DeveloperRepository;

  constructor(developerRepository: DeveloperRepository) {
    this.developerRepository = developerRepository;
  }

  execute(
    page: number,
    limit: number,
    search?: string
  ) {
    return this.developerRepository.getDevelopers(
      page,
      limit,
      search
    );
  }
}