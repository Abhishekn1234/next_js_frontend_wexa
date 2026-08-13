import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface JobPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function JobPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: JobPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

      {/* Result count */}
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
        jobs
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-2">

        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">
            Previous
          </span>
        </button>

        {/* Page number */}
        <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-slate-900 px-3 text-sm font-medium text-white">
          {page}
        </div>

        <span className="text-sm text-slate-400">
          of
        </span>

        <div className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700">
          {totalPages}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">
            Next
          </span>
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
}