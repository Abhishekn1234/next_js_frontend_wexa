import api from "../../../../api/api";
import type { RecommendedDeveloper, RecommendedJob } from "../../domain/entities/recommendations";
import type { RecommendationRepository } from "../../domain/repositories/RecommendationRepo";

export class RecommendationRepositoryImpl
  implements RecommendationRepository
{
  async getJobsForDeveloper(
    developerId: string
  ): Promise<RecommendedJob[]> {
    const response = await api.get(
      `/recommendations/developers/${developerId}/jobs`
    );

    return response.data.data ?? [];
  }

  async getRelatedSkillJobs(
    developerId: string
  ): Promise<RecommendedJob[]> {
    const response = await api.get(
      `/recommendations/developers/${developerId}/related-jobs`
    );

    return response.data.data ?? [];
  }

  async getDevelopersForJob(
    jobId: string
  ): Promise<RecommendedDeveloper[]> {
    const response = await api.get(
      `/recommendations/jobs/${jobId}/developers`
    );

    return response.data.data ?? [];
  }

  async getSimilarDevelopers(
    developerId: string
  ): Promise<RecommendedDeveloper[]> {
    const response = await api.get(
      `/recommendations/developers/${developerId}/similar`
    );

    return response.data.data ?? [];
  }
}