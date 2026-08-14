import { Code2, RefreshCw } from "lucide-react";
import type { Skill } from "../../domain/entities/skills";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

interface SkillsGridProps {
  skills: Skill[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
}

export function SkillsGrid({
  skills,
  total,
  isLoading,
  isError,
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  observerRef,
}: SkillsGridProps) {
  if (isLoading) {
    return (
      <>
        <LoadingSpinner message="Loading skills..." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
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
    );
  }

  if (isError || skills.length === 0) {
    return null;
  }

  return (
    <>
      {/* Result count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {skills.length} of {total} skills
        </p>

        {isFetching && !isFetchingNextPage && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <RefreshCw size={13} className="animate-spin" />
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
                <Code2 size={20} className="text-slate-700" />
              </div>
            </div>

            <h2 className="mt-4 font-semibold text-slate-900">{skill.name}</h2>

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
          <LoadingSpinner message="Loading more skills..." />
        )}

        {!hasNextPage && !isFetchingNextPage && (
          <p className="text-sm text-slate-400">No more skills</p>
        )}
      </div>
    </>
  );
}