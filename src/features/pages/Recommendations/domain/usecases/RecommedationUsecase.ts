import type { RecommendationRepository } from "../repositories/RecommendationRepo";

export class GetRecommendations {
  private readonly recommendationRepository: RecommendationRepository;

  constructor(
    recommendationRepository: RecommendationRepository
  ) {
    this.recommendationRepository = recommendationRepository;
  }

  getJobsForDeveloper(developerId: string) {
    return this.recommendationRepository.getJobsForDeveloper(
      developerId
    );
  }

  getRelatedSkillJobs(developerId: string) {
    return this.recommendationRepository.getRelatedSkillJobs(
      developerId
    );
  }

  getDevelopersForJob(jobId: string) {
    return this.recommendationRepository.getDevelopersForJob(
      jobId
    );
  }

  getSimilarDevelopers(developerId: string) {
    return this.recommendationRepository.getSimilarDevelopers(
      developerId
    );
  }
}