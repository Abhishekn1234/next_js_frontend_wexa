import { RefreshCw } from "lucide-react";
import type { RefObject } from "react";
import type { Job } from "../../domain/entities/jobs";
import JobCard from "./JobCard";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";


interface Props {
  jobs: Job[];
  total: number;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
}

export default function JobsList({
  jobs,
  total,
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  loadMoreRef,
}: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {jobs.length} of {total} jobs
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
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}
      </div>

      <div
        ref={loadMoreRef}
        className="flex min-h-24 items-center justify-center"
      >
        {isFetchingNextPage ? (
          <LoadingSpinner />
        ) : !hasNextPage ? (
          <p className="text-sm text-slate-400">
            No more jobs
          </p>
        ) : null}
      </div>
    </>
  );
}