import { useInfiniteQuery } from "@tanstack/react-query";

import { ProjectRepositoryImpl } from "../../data/repositories/ProjectRepoImpl";
import { GetProjects } from "../../domain/usecases/GetProjects";

export function useProjects(
  limit: number,
  search: string
) {
  const repository = new ProjectRepositoryImpl();

  const getProjects = new GetProjects(repository);

  return useInfiniteQuery({
    queryKey: [
      "projects",
      limit,
      search,
    ],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getProjects.execute(
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