import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
          <AlertCircle
            size={22}
            className="text-red-600"
          />
        </div>

        <h2 className="mt-4 text-base font-semibold text-red-800">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-red-600">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <RefreshCw size={15} />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}