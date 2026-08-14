import { useEffect, useRef, useState } from "react";

import { useProjects } from "./presentation/hooks/useProjects";



import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorStates from "../../components/common/ErrorStates";
import { useDebounce } from "../../components/hooks/useDebounce";
import ProjectsHeader from "./presentation/components/ProjectHeader";
import ProjectsEmpty from "./presentation/components/ProjectsEmpty";
import ProjectsList from "./presentation/components/ProjectsList";

export default function Projects() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const observerRef = useRef<HTMLDivElement | null>(null);

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
  } = useProjects(10, debouncedSearch);

  const projects =
    data?.pages.flatMap((page) => page.projects ?? []) ?? [];

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

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingSpinner message="Loading projects..." />;
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
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProjectsHeader
        isFetching={isFetching}
        onRefresh={refetch}
      />

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />
      </div>

      {projects.length === 0 ? (
        <ProjectsEmpty
          search={search}
          onClear={() => setSearch("")}
        />
      ) : (
        <ProjectsList
          projects={projects}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          observerRef={observerRef}
        />
      )}
    </div>
  );
}