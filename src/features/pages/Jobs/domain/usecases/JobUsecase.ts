import type { JobRepository } from "../repositories/JobRepo";

export class GetJobs {
  private readonly jobRepository: JobRepository;

  constructor(jobRepository: JobRepository) {
    this.jobRepository = jobRepository;
  }

  execute(
    page: number,
    limit: number,
    search?: string
  ) {
    return this.jobRepository.getJobs(
      page,
      limit,
      search
    );
  }
}