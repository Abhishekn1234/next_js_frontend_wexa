import { useEffect, useRef, useState } from "react";

import { useJobs } from "./presentation/hooks/useJobs";
import JobFilters from "./presentation/components/JobsFilters";
import JobSkeleton from "./presentation/components/JobSkeleton";



import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorStates from "../../components/common/ErrorStates";
import { useDebounce } from "../../components/hooks/useDebounce";
import JobsHeader from "./presentation/components/JobHeader";
import JobsEmpty from "./presentation/components/JobEmpty";
import JobsList from "./presentation/components/JobList";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
  } = useJobs(10, debouncedSearch);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const jobs = data?.pages.flatMap((page) => page.jobs) ?? [];
  const total = data?.pages.at(-1)?.pagination?.total ?? 0;

  return (
    <div className="space-y-6">
      <JobsHeader
        isFetching={isFetching}
        onRefresh={refetch}
      />

      <JobFilters
        search={search}
        onSearchChange={setSearch}
      />

      {isError && (
        <ErrorStates
          title="Failed to load jobs"
          message={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading jobs."
          }
          onRetry={refetch}
        />
      )}

      {isLoading && (
        <>
          <LoadingSpinner />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <JobSkeleton key={index} />
            ))}
          </div>
        </>
      )}

      {!isLoading && !isError && jobs.length === 0 && (
        <JobsEmpty
          search={search}
          onClear={() => setSearch("")}
        />
      )}

      {!isLoading && !isError && jobs.length > 0 && (
        <JobsList
          jobs={jobs}
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