import { useInfiniteQuery } from "@tanstack/react-query";
import { JobRepositoryImpl } from "../../data/repositories/JobRepoImpl";

const jobRepository = new JobRepositoryImpl();

export function useJobs(
  limit: number,
  search: string
) {
  return useInfiniteQuery({
    queryKey: ["jobs", limit, search],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      jobRepository.getJobs(
        pageParam,
        limit,
        search
      ),

    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination.hasNextPage) {
        return undefined;
      }

      return lastPage.pagination.page + 1;
    },

    staleTime: 30_000,
  });
}