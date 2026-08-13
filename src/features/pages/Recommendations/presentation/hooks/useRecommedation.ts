import { useQuery } from "@tanstack/react-query";
import { RecommendationRepositoryImpl } from "../../data/repositories/RecommendationRepoImpl";
import { GetRecommendations } from "../../domain/usecases/RecommedationUsecase";


const repository = new RecommendationRepositoryImpl();
const getRecommendations = new GetRecommendations(repository);

export function useDeveloperJobs(
  developerId: string
) {
  return useQuery({
    queryKey: [
      "recommendations",
      "developer-jobs",
      developerId,
    ],

    queryFn: () =>
      getRecommendations.getJobsForDeveloper(
        developerId
      ),

    enabled: Boolean(developerId),

    staleTime: 30_000,
  });
}

export function useRelatedSkillJobs(
  developerId: string
) {
  return useQuery({
    queryKey: [
      "recommendations",
      "related-jobs",
      developerId,
    ],

    queryFn: () =>
      getRecommendations.getRelatedSkillJobs(
        developerId
      ),

    enabled: Boolean(developerId),

    staleTime: 30_000,
  });
}

export function useJobDevelopers(
  jobId: string
) {
  return useQuery({
    queryKey: [
      "recommendations",
      "job-developers",
      jobId,
    ],

    queryFn: () =>
      getRecommendations.getDevelopersForJob(
        jobId
      ),

    enabled: Boolean(jobId),

    staleTime: 30_000,
  });
}

export function useSimilarDevelopers(
  developerId: string
) {
  return useQuery({
    queryKey: [
      "recommendations",
      "similar-developers",
      developerId,
    ],

    queryFn: () =>
      getRecommendations.getSimilarDevelopers(
        developerId
      ),

    enabled: Boolean(developerId),

    staleTime: 30_000,
  });
}