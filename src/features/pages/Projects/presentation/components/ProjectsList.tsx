import { RefreshCw } from "lucide-react";
import type { RefObject } from "react";
import type { Project } from "../../domain/entities/projects";
import ProjectCard from "./ProjectCard";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";


interface Props {
  projects: Project[];
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  observerRef: RefObject<HTMLDivElement | null>;
}

export default function ProjectsList({
  projects,
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  observerRef,
}: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {projects.length} projects loaded
        </p>

        {isFetching && !isFetchingNextPage && (
          <span className="flex items-center gap-2 text-xs text-slate-400">
            <RefreshCw
              size={13}
              className="animate-spin"
            />
            Updating...
          </span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>

      <div
        ref={observerRef}
        className="flex min-h-[80px] items-center justify-center"
      >
        {isFetchingNextPage ? (
          <LoadingSpinner message="Loading more projects..." />
        ) : !hasNextPage ? (
          <p className="text-sm text-slate-400">
            No more projects
          </p>
        ) : null}
      </div>
    </>
  );
}