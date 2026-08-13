import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "No data found",
  message = "There is nothing to display here yet.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <SearchX
            size={23}
            className="text-slate-500"
          />
        </div>

        <h2 className="mt-4 text-base font-semibold text-slate-800">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}