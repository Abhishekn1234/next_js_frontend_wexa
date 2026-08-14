import { COLORS } from "../utils/colors";


interface RecommendationLegendProps {
  jobsCount: number;
  skillJobsCount: number;
  developersCount: number;
}

export function RecommendationLegend({
  jobsCount,
  skillJobsCount,
  developersCount,
}: RecommendationLegendProps) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium" role="list" aria-label="Graph legend">
      <span 
        className={`rounded-full ${COLORS.jobs.chipBg} px-2 sm:px-3 py-0.5 sm:py-1 ${COLORS.jobs.chipText}`}
        role="listitem"
      >
        Jobs ({jobsCount})
      </span>
      <span 
        className={`rounded-full ${COLORS.skills.chipBg} px-2 sm:px-3 py-0.5 sm:py-1 ${COLORS.skills.chipText}`}
        role="listitem"
      >
        Skills ({skillJobsCount})
      </span>
      <span 
        className={`rounded-full ${COLORS.developers.chipBg} px-2 sm:px-3 py-0.5 sm:py-1 ${COLORS.developers.chipText}`}
        role="listitem"
      >
        Developers ({developersCount})
      </span>
    </div>
  );
}