import type { Job } from "../entities/jobs";

export interface JobRepository {
  getJobs(
    page: number,
    limit: number,
    search?: string
  ): Promise<{
    jobs: Job[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }>;
}