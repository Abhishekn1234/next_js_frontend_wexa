import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../components/hooks/useDebounce";
import { useDevelopers } from "./presentation/hooks/useDevelopers";

import DeveloperFilters from "./presentation/components/DeveloperFilters";
import DeveloperSkeleton from "./presentation/components/DeveloperSkeleton";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorStates from "../../components/common/ErrorStates";
import DevelopersEmpty from "./presentation/components/DevelopersEmpty";
import DevelopersHeader from "./presentation/components/DevelopersHeader";
import DevelopersList from "./presentation/components/DevelopersList";

export default function DevelopersPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useDevelopers(10, debouncedSearch);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const developers = data?.pages.flatMap((page) => page.developers) ?? [];
  const total = data?.pages.at(-1)?.pagination?.total ?? developers.length;

  return (
    <div className="space-y-6">
      <DevelopersHeader
        isFetching={isFetching}
        onRefresh={refetch}
      />

      <DeveloperFilters
        search={search}
        onSearchChange={setSearch}
      />

      {isError && (
        <ErrorStates
          title="Failed to load developers"
          message={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading developers."
          }
          onRetry={refetch}
        />
      )}

      {isLoading && (
        <>
          <LoadingSpinner />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <DeveloperSkeleton key={i} />
            ))}
          </div>
        </>
      )}

      {!isLoading && !isError && developers.length === 0 && (
        <DevelopersEmpty
          search={search}
          onClear={() => setSearch("")}
        />
      )}

      {!isLoading && !isError && developers.length > 0 && (
        <DevelopersList
          developers={developers}
          total={total}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          loadMoreRef={loadMoreRef}
        />
      )}
    </div>
  );
}