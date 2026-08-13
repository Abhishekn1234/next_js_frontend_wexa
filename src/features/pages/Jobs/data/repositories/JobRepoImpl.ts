import api from "../../../../api/api";
import type { Job } from "../../domain/entities/jobs";
import type { JobRepository } from "../../domain/repositories/JobRepo";

export class JobRepositoryImpl implements JobRepository {
  async getJobs(
    page: number,
    limit: number,
    search?: string
  ) {
    const response = await api.get("/jobs", {
      params: {
        page,
        limit,
        ...(search?.trim()
          ? { search: search.trim() }
          : {}),
      },
    });

    return {
      jobs: response.data.data as Job[],
      pagination: response.data.pagination,
    };
  }
}