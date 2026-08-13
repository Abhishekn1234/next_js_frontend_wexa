import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DeveloperPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function DeveloperPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: DeveloperPaginationProps) {
  if (total === 0) {
    return null;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-700">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-medium text-slate-700">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-700">
          {total}
        </span>{" "}
        developers
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() =>
            onPageChange(page - 1)
          }
          className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-slate-900 px-3 text-sm font-medium text-white">
          {page}
        </div>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() =>
            onPageChange(page + 1)
          }
          className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
