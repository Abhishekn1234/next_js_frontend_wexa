import { Users } from "lucide-react";

interface RecommendationEmptyProps {
  isMobile: boolean;
}

export function RecommendationEmpty({ isMobile }: RecommendationEmptyProps) {
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="text-center">
        <Users size={isMobile ? 32 : 40} className="mx-auto text-slate-300" aria-hidden="true" />
        <h3 className="mt-2 sm:mt-3 font-semibold text-slate-900 text-sm sm:text-base">
          No recommendations found
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          There are no connected jobs or similar developers for this developer.
        </p>
      </div>
    </div>
  );
}