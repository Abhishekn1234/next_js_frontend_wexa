import { useInfiniteQuery } from "@tanstack/react-query";

import { DeveloperRepositoryImpl } from "../../data/repositories/DeveloperRepositoryImpl";
import { GetDevelopers } from "../../domain/usecase/GetDevelopers";

export function useDevelopers(
  limit: number,
  search: string
) {
  const repository =
    new DeveloperRepositoryImpl();

  const getDevelopers =
    new GetDevelopers(repository);

  return useInfiniteQuery({
    queryKey: [
      "developers",
      limit,
      search,
    ],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getDevelopers.execute(
        pageParam,
        limit,
        search
      ),

    getNextPageParam: (lastPage) => {
      if (
        !lastPage.pagination.hasNextPage
      ) {
        return undefined;
      }

      return (
        lastPage.pagination.page + 1
      );
    },

    staleTime: 30_000,
  });
}