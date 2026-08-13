import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  RefreshCw,
} from "lucide-react";

import { useJobs } from "./presentation/hooks/useJobs";
import JobCard from "./presentation/components/JobCard";
import JobSkeleton from "./presentation/components/JobSkeleton";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorStates from "../../components/common/ErrorStates";
import JobFilters from "./presentation/components/JobsFilters";
import { useDebounce } from "../../components/hooks/useDebounce";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch=useDebounce(
    search,
    400
  )
  const limit = 10;

  const loadMoreRef =
    useRef<HTMLDivElement | null>(null);

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
  } = useJobs(
    limit,
    debouncedSearch
  );

  
  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

 
  const jobs =
    data?.pages.flatMap(
      (page) => page.jobs
    ) ?? [];

 
  const total =
    data?.pages[0]?.pagination.total ?? 0;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-slate-900 p-2.5 text-white">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Jobs
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Explore job opportunities in the WEXA CognoDB knowledge graph.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={
              isFetching
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* Search */}
      <JobFilters
        search={search}
        onSearchChange={setSearch}
      />

      {/* Error */}
      {isError && (
        <ErrorStates
          title="Failed to load jobs"
          message={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading jobs."
          }
          onRetry={() => refetch()}
        />
      )}

      {/* Initial Loading */}
      {isLoading && (
        <>
          <LoadingSpinner />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <JobSkeleton
                key={index}
              />
            ))}
          </div>
        </>
      )}

      {/* Empty */}
      {!isLoading &&
        !isError &&
        jobs.length === 0 && (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

            <div className="rounded-full bg-slate-100 p-4">
              <BriefcaseBusiness
                size={28}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No jobs found
            </h2>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              {search
                ? `No jobs match "${search}". Try a different search term.`
                : "There are currently no jobs available in CognoDB."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Clear search
              </button>
            )}

          </div>
        )}

      {/* Jobs */}
      {!isLoading &&
        !isError &&
        jobs.length > 0 && (
          <>

            {/* Result count */}
            <div className="flex items-center justify-between">

              <p className="text-sm text-slate-500">
                Showing {jobs.length} of {total} jobs
              </p>

              {isFetching &&
                !isFetchingNextPage && (
                  <p className="text-xs text-slate-400">
                    Updating...
                  </p>
                )}

            </div>

            {/* Job cards */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              ))}

            </div>

            {/* Infinite scroll trigger */}
            <div
              ref={loadMoreRef}
              className="flex min-h-24 items-center justify-center"
            >

              {isFetchingNextPage && (
                <LoadingSpinner />
              )}

              {!hasNextPage &&
                !isFetchingNextPage && (
                  <p className="text-sm text-slate-400">

                  </p>
                )}

            </div>

          </>
        )}

    </div>
  );
}