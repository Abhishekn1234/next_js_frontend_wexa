import { useEffect, useRef, useState } from "react";
import {
  Code2,
  RefreshCw,
} from "lucide-react";

import { useSkills } from "./presentation/hooks/useSkills";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorStates from "../../components/common/ErrorStates";
import { useDebounce } from "../../components/hooks/useDebounce";

export default function Skills() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(
    search,
    400
  );

  const limit = 10;

  const observerRef =
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
  } = useSkills(
    limit,
    debouncedSearch
  );

  const skills =
    data?.pages.flatMap(
      (page) => page.skills ?? []
    ) ?? [];

  const total =
    data?.pages[0]?.pagination?.total ??
    skills.length;

  useEffect(() => {
    const element = observerRef.current;

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

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-slate-900 p-2.5 text-white">
            <Code2 size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Skills
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Explore technical skills in the WEXA CognoDB knowledge graph.
            </p>
          </div>

        </div>

        {/* Refresh */}
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

          {isFetching
            ? "Refreshing..."
            : "Refresh"}
        </button>

      </div>

      {/* Search */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">

        <div className="relative">

          <Code2
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search skills..."
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

        </div>

      </div>

      {/* Error */}
      {isError && (
        <ErrorStates
          title="Failed to load skills"
          message={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading skills."
          }
          onRetry={() => refetch()}
        />
      )}

      {/* Initial Loading */}
      {isLoading && (
        <>
          <LoadingSpinner message="Loading skills..." />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {Array.from({
              length: 8,
            }).map((_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="h-11 w-11 rounded-lg bg-slate-200" />

                <div className="mt-4 h-5 w-2/3 rounded bg-slate-200" />

                <div className="mt-3 h-4 w-full rounded bg-slate-100" />

                <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
              </div>
            ))}

          </div>
        </>
      )}

      {/* Empty */}
      {!isLoading &&
        !isError &&
        skills.length === 0 && (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

            <div className="rounded-full bg-slate-100 p-4">
              <Code2
                size={28}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No skills found
            </h2>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              {search
                ? `No skills match "${search}". Try a different search term.`
                : "There are currently no skills available in CognoDB."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Clear search
              </button>
            )}

          </div>
        )}

      {/* Skills */}
      {!isLoading &&
        !isError &&
        skills.length > 0 && (
          <>

            {/* Result count */}
            <div className="flex items-center justify-between">

              <p className="text-sm text-slate-500">
                Showing {skills.length} of {total} skills
              </p>

              {isFetching &&
                !isFetchingNextPage && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">

                    <RefreshCw
                      size={13}
                      className="animate-spin"
                    />

                    Updating...

                  </div>
                )}

            </div>

            {/* Skills grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {skills.map((skill: any) => (
                <div
                  key={skill.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="rounded-lg bg-slate-100 p-3">
                      <Code2
                        size={20}
                        className="text-slate-700"
                      />
                    </div>

                  </div>

                  <h2 className="mt-4 font-semibold text-slate-900">
                    {skill.name}
                  </h2>

                  {skill.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {skill.description}
                    </p>
                  )}

                </div>
              ))}

            </div>

            {/* Infinite scroll */}
            <div
              ref={observerRef}
              className="flex min-h-[80px] items-center justify-center"
            >

              {isFetchingNextPage && (
                <LoadingSpinner
                  message="Loading more skills..."
                />
              )}

              {!hasNextPage &&
                !isFetchingNextPage && (
                  <p className="text-sm text-slate-400">
                    No more skills
                  </p>
                )}

            </div>

          </>
        )}

    </div>
  );
}