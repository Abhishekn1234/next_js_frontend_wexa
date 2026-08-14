import { RefreshCw } from "lucide-react";
import type { RefObject } from "react";
import DeveloperCard from "./DeveloperCard";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import type { Developer } from "../../domain/entities/developer";



interface Props {
  developers: Developer[];
  total: number;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
}

export default function DevelopersList({
  developers,
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
          Showing {developers.length} of {total} developers
        </p>

        {isFetching && !isFetchingNextPage && (
          <span className="flex items-center gap-2 text-xs text-slate-400">
            <RefreshCw size={13} className="animate-spin" />
            Updating...
          </span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {developers.map((developer) => (
          <DeveloperCard
            key={developer.id}
            developer={developer}
          />
        ))}
      </div>

      <div
        ref={loadMoreRef}
        className="flex min-h-24 items-center justify-center"
      >
        {isFetchingNextPage ? (
          <LoadingSpinner message="Loading more developers..." />
        ) : (
          !hasNextPage && (
            <p className="text-sm text-slate-400">
              No more developers
            </p>
          )
        )}
      </div>
    </>
  );
}