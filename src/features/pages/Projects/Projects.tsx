import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FolderKanban,
  RefreshCw,
} from "lucide-react";

import { useProjects } from "./presentation/hooks/useProjects";

import ProjectCard from "./presentation/components/ProjectCard";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorStates from "../../components/common/ErrorStates";
import { useDebounce } from "../../components/hooks/useDebounce";

export default function Projects() {
  const [search, setSearch] = useState("");
  const debouncedSearch=useDebounce(search,400);
  const limit = 10;

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
  } = useProjects(
    limit,
    debouncedSearch
  );

  const projects =
    data?.pages.flatMap(
      (page) => page.projects ?? []
    ) ?? [];

  const observerRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = observerRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
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

 
  if (isLoading) {
    return (
      <LoadingSpinner
        
        message="Loading projects..."
      />
    );
  }

  
  if (isError) {
    return (
      <ErrorStates
        title="Failed to load projects"
        message={
          error instanceof Error
            ? error.message
            : "Something went wrong while loading projects."
        }
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-slate-900 p-2.5 text-white">
            <FolderKanban size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Projects
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Explore projects in the WEXA CognoDB knowledge graph.
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

          {isFetching
            ? "Refreshing..."
            : "Refresh"}
        </button>

      </div>

      {/* Search */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">

        <div className="relative">

          <FolderKanban
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search projects..."
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

        </div>

      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

          <div className="rounded-full bg-slate-100 p-4">
            <FolderKanban
              size={28}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            No projects found
          </h2>

          <p className="mt-1 max-w-md text-sm text-slate-500">
            {search
              ? `No projects match "${search}". Try a different search term.`
              : "There are currently no projects available in CognoDB."}
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

      {/* Projects */}
      {projects.length > 0 && (
        <>

          {/* Result count */}
          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              {projects.length} projects loaded
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

          {/* Project grid */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}

          </div>

          {/* Infinite scroll */}
          <div
            ref={observerRef}
            className="flex min-h-[80px] items-center justify-center"
          >

            {isFetchingNextPage && (
              <LoadingSpinner
                message="Loading more projects..."
              />
            )}

            {!hasNextPage && (
              <p className="text-sm text-slate-400">
             
              </p>
            )}

          </div>

        </>
      )}

    </div>
  );
}