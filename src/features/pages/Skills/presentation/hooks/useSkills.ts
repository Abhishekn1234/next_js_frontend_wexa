import { useInfiniteQuery } from "@tanstack/react-query";
import { GetSkills } from "../../domain/usecases/Skillsusecase";
import { SkillRepositoryImpl } from "../../data/repositories/SkillsRepoImpl";

export function useSkills(
  limit: number,
  search: string
) {
  const repository = new SkillRepositoryImpl();

  const getSkills = new GetSkills(
    repository
  );

  return useInfiniteQuery({
    queryKey: [
      "skills",
      limit,
      search,
    ],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getSkills.execute(
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