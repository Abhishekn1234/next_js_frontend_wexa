import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecommendationsHeaderProps {
  developerId: string;
  isLoading: boolean;
  onRefresh: () => void;
  isMobile: boolean;
}

export function RecommendationsHeader({
//   developerId,
  isLoading,
  onRefresh,
  isMobile,
}: RecommendationsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => navigate("/developers")}
          className="shrink-0 rounded-lg border border-slate-200 bg-white p-1.5 sm:p-2 text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          aria-label="Go back to developers"
        >
          <ArrowLeft size={isMobile ? 16 : 18} aria-hidden="true" />
        </button>
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Recommendations</h1>
          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500">
            Explore jobs and similar developers connected to this developer.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isLoading}
        className="flex h-9 sm:h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        aria-label={isLoading ? "Refreshing recommendations" : "Refresh recommendations"}
      >
        <RefreshCw size={isMobile ? 14 : 16} className={isLoading ? "animate-spin" : ""} aria-hidden="true" />
        {isLoading ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}