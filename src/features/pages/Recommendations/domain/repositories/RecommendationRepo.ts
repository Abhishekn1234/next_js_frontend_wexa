import type { RecommendedDeveloper, RecommendedJob } from "../entities/recommendations";

export interface RecommendationRepository {
  getJobsForDeveloper(
    developerId: string
  ): Promise<RecommendedJob[]>;

  getRelatedSkillJobs(
    developerId: string
  ): Promise<RecommendedJob[]>;

  getDevelopersForJob(
    jobId: string
  ): Promise<RecommendedDeveloper[]>;

  getSimilarDevelopers(
    developerId: string
  ): Promise<RecommendedDeveloper[]>;
}