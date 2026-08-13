import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";

import { ArrowLeft, BriefcaseBusiness, Code2, Users, RefreshCw } from "lucide-react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  type Node,
  type Edge,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  useDeveloperJobs,
  useRelatedSkillJobs,
  useSimilarDevelopers,
} from "./presentation/hooks/useRecommedation";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorStates from "../../components/common/ErrorStates";
import { getArray } from "./presentation/utils/getarray";
import { COLORS } from "./presentation/utils/colors";
import { getBreakpoint, LAYOUT_CONFIG } from "./presentation/utils/breakpoints";
import { useViewportWidth } from "./presentation/utils/useViewportwidth";

function RecommendationsContent() {
  const { developerId } = useParams<{ developerId: string }>();
  const navigate = useNavigate();
  const { fitView } = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);

  const width = useViewportWidth();
  const bp = getBreakpoint(width);
  const { cardW, cardH, columns, colGapExtra, rowGapExtra } = LAYOUT_CONFIG[bp];
  const isCompact = bp === "xs" || bp === "sm";
  const isMobile = bp === "xs";
  const isTablet = bp === "md";

  const {
    data: developerJobs,
    isLoading: jobsLoading,
    isError: jobsError,
    error: jobsErrorMessage,
    refetch: refetchJobs,
  } = useDeveloperJobs(developerId ?? "");

  const {
    data: relatedJobs,
    isLoading: relatedLoading,
    isError: relatedError,
    error: relatedErrorMessage,
    refetch: refetchRelated,
  } = useRelatedSkillJobs(developerId ?? "");

  const {
    data: similarDevelopers,
    isLoading: similarLoading,
    isError: similarError,
    error: similarErrorMessage,
    refetch: refetchSimilar,
  } = useSimilarDevelopers(developerId ?? "");

  const isLoading = jobsLoading || relatedLoading || similarLoading;
  const isError = jobsError || relatedError || similarError;

  const refreshAll = useCallback(() => {
    refetchJobs();
    refetchRelated();
    refetchSimilar();
  }, [refetchJobs, refetchRelated, refetchSimilar]);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const availableHeight = viewportHeight - rect.top - 40;
        const minHeight = isMobile ? 400 : 500;
        const maxHeight = isMobile ? 600 : 800;
        setContainerHeight(Math.max(minHeight, Math.min(availableHeight, maxHeight)));
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isMobile]);

  const jobsData = getArray(developerJobs);
  const skillJobsData = getArray(relatedJobs);
  const developersData = getArray(similarDevelopers);

  const jobs = jobsData.map((item: any) => item.job).filter(Boolean);
  const skillJobs = skillJobsData.map((item: any) => item.job).filter(Boolean);
  const developers = developersData.map((item: any) => item.developer).filter(Boolean);

  const colGap = cardW + colGapExtra;
  const rowGap = cardH + rowGapExtra;

  const centerX = ((columns - 1) * colGap) / 2;
  const jobsOriginY = isMobile ? 20 : 0;
  const skillsOriginY = Math.ceil(jobs.length / columns) * rowGap + rowGap * (isMobile ? 1.2 : 1.4);
  const developerY = skillsOriginY / 2;
  
  let developersX = colGap * columns + 140;
  if (isMobile) {
    developersX = colGap * columns + 80;
  } else if (isTablet) {
    developersX = colGap * columns + 100;
  }

  const nodeCardClass = isCompact ? "p-2.5 text-xs" : "p-4";
  const nodeMinW = isCompact ? "min-w-[120px] max-w-[160px]" : "min-w-[190px] max-w-[230px]";
  const nodeMaxW = isMobile ? "max-w-[140px]" : "max-w-[230px]";

  const nodes = useMemo<Node[]>(() => {
    if (!developerId) return [];
    
    return [
      {
        id: `developer-${developerId}`,
        position: { x: centerX, y: developerY },
        data: {
          label: (
            <div
              className={`${nodeMinW} ${nodeMaxW} rounded-xl border-2 border-indigo-400 bg-gradient-to-br from-indigo-600 to-indigo-800 ${nodeCardClass} text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all`}
              role="article"
              aria-label={`Developer: ${developerId}`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-lg bg-white/20 p-1.5 sm:p-2 backdrop-blur-sm">
                  <Users size={isCompact ? 14 : 20} aria-hidden="true" className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-indigo-200 font-medium uppercase tracking-wider">Developer</p>
                  <p className="font-bold truncate text-sm sm:text-base text-white">{developerId}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[10px] sm:text-xs text-indigo-200">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Active
                </span>
                <span className="w-px h-3 bg-indigo-400/30"></span>
                <span>{jobs.length + skillJobs.length} connections</span>
              </div>
            </div>
          ),
        },
        draggable: true,
        style: { zIndex: 10 },
      },
      ...jobs.map((job: any, index: number) => ({
        id: `job-${job.id || index}`,
        position: {
          x: (index % columns) * colGap,
          y: jobsOriginY + Math.floor(index / columns) * rowGap,
        },
        data: {
          label: (
            <div
              className={`${nodeMinW} ${nodeMaxW} rounded-xl border-2 ${COLORS.jobs.border} bg-white ${nodeCardClass} shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5`}
              role="article"
              aria-label={`Job: ${job.title || "Job"}`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className={`rounded-lg p-1.5 ${COLORS.jobs.iconBg}`}>
                  <BriefcaseBusiness 
                    size={isCompact ? 12 : 18} 
                    className={COLORS.jobs.icon} 
                    aria-hidden="true"
                  />
                </div>
                <span className="font-semibold text-slate-900 line-clamp-2 text-sm sm:text-base">
                  {job.title || "Job"}
                </span>
              </div>
              {job.company && (
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500 line-clamp-1">
                  {typeof job.company === "object" ? job.company.name : job.company}
                </p>
              )}
              <div className="mt-1 sm:mt-2 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                <span className="text-[10px] sm:text-xs text-slate-400 truncate">{job.location || ""}</span>
                {job.salaryMin && job.salaryMax && (
                  <span className="text-[10px] sm:text-xs text-emerald-600 font-medium">
                    {!isMobile ? "• " : ""}₹{job.salaryMin/100000}L-{job.salaryMax/100000}L
                  </span>
                )}
              </div>
            </div>
          ),
        },
        draggable: true,
      })),
      ...skillJobs.map((job: any, index: number) => {
        const relatedSkills = skillJobsData[index]?.relatedSkills || [];
        const matchedCount = skillJobsData[index]?.matchedRelatedSkills || 0;
        
        return {
          id: `skill-job-${job.id || index}`,
          position: {
            x: (index % columns) * colGap,
            y: skillsOriginY + Math.floor(index / columns) * rowGap,
          },
          data: {
            label: (
              <div
                className={`${nodeMinW} ${nodeMaxW} rounded-xl border-2 ${COLORS.skills.border} bg-white ${nodeCardClass} shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5`}
                role="article"
                aria-label={`Related job: ${job.title || "Related Job"}`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className={`rounded-lg p-1.5 ${COLORS.skills.iconBg}`}>
                    <Code2 
                      size={isCompact ? 12 : 18} 
                      className={COLORS.skills.icon} 
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-semibold text-slate-900 line-clamp-2 text-sm sm:text-base">
                    {job.title || "Related Job"}
                  </span>
                </div>
                {job.company && (
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 line-clamp-1">
                    {typeof job.company === "object" ? job.company.name : job.company}
                  </p>
                )}
                <div className="mt-1 sm:mt-2 flex flex-wrap gap-0.5 sm:gap-1">
                  {relatedSkills.slice(0, isMobile ? 2 : 3).map((skill: string, i: number) => (
                    <span 
                      key={i} 
                      className="rounded-full bg-purple-100 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs text-purple-700 truncate max-w-[60px] sm:max-w-none"
                    >
                      {skill}
                    </span>
                  ))}
                  {relatedSkills.length > (isMobile ? 2 : 3) && (
                    <span className="text-[9px] sm:text-xs text-slate-400">
                      +{relatedSkills.length - (isMobile ? 2 : 3)}
                    </span>
                  )}
                </div>
                <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs text-purple-600 truncate font-medium">
                  🎯 {matchedCount} skills matched
                </p>
              </div>
            ),
          },
          draggable: true,
        };
      }),
      ...developers.map((developer: any, index: number) => {
        const commonSkills = developersData[index]?.commonSkills || 0;
        
        return {
          id: `similar-${developer.id || index}`,
          position: {
            x: developersX,
            y: index * rowGap + (isMobile ? 20 : 0),
          },
          data: {
            label: (
              <div
                className={`${nodeMinW} ${nodeMaxW} rounded-xl border-2 ${COLORS.developers.border} bg-white ${nodeCardClass} shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5`}
                role="article"
                aria-label={`Similar developer: ${developer.name || developer.id || "Developer"}`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className={`rounded-lg p-1.5 ${COLORS.developers.iconBg}`}>
                    <Users 
                      size={isCompact ? 12 : 18} 
                      className={COLORS.developers.icon} 
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-semibold text-slate-900 line-clamp-1 text-sm sm:text-base">
                    {developer.name || developer.id || "Developer"}
                  </span>
                </div>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 line-clamp-1">{developer.location || ""}</p>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-slate-400">
                  ⏱ {developer.experienceYears || 0} years exp.
                </p>
                <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs text-emerald-600 truncate font-medium">
                  🤝 {commonSkills} common skills
                </p>
              </div>
            ),
          },
          draggable: true,
        };
      }),
    ];
  }, [
    developerId, 
    centerX, 
    developerY, 
    nodeMinW, 
    nodeMaxW, 
    nodeCardClass, 
    isCompact, 
    isMobile,
    jobs, 
    columns, 
    colGap, 
    jobsOriginY, 
    rowGap,
    skillJobs, 
    skillJobsData, 
    skillsOriginY,
    developers, 
    developersData, 
    developersX
  ]);

  const arrow = useCallback((color: string) => ({
    type: MarkerType.ArrowClosed as const,
    color,
    width: isMobile ? 12 : 16,
    height: isMobile ? 12 : 16,
  }), [isMobile]);

  const edges = useMemo<Edge[]>(() => {
    if (!developerId) return [];
    
    return [
      ...jobs.map((job: any, index: number) => ({
        id: `developer-job-${job.id || index}`,
        source: `developer-${developerId}`,
        target: `job-${job.id || index}`,
        animated: true,
        style: { stroke: COLORS.jobs.edge, strokeWidth: isMobile ? 2 : 2.5 },
        markerEnd: arrow(COLORS.jobs.edge),
      })),
      ...skillJobs.map((job: any, index: number) => ({
        id: `developer-skill-job-${job.id || index}`,
        source: `developer-${developerId}`,
        target: `skill-job-${job.id || index}`,
        animated: true,
        style: { stroke: COLORS.skills.edge, strokeWidth: isMobile ? 2 : 2.5 },
        markerEnd: arrow(COLORS.skills.edge),
      })),
      ...developers.map((developer: any, index: number) => ({
        id: `developer-similar-${developer.id || index}`,
        source: `developer-${developerId}`,
        target: `similar-${developer.id || index}`,
        animated: true,
        style: { stroke: COLORS.developers.edge, strokeWidth: isMobile ? 2 : 2.5 },
        markerEnd: arrow(COLORS.developers.edge),
      })),
    ];
  }, [developerId, jobs, skillJobs, developers, isMobile, arrow]);

  useEffect(() => {
    if (!isLoading && nodes.length > 1 && developerId) {
      const timer = setTimeout(() => {
        fitView({ 
          padding: isCompact ? 0.35 : 0.2, 
          minZoom: 0.15, 
          maxZoom: 1.5,
          duration: 300
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, nodes.length, fitView, isCompact, developerId]);

  if (!developerId) {
    return (
      <ErrorStates
        title="Developer not found"
        message="No developer ID was provided."
        onRetry={() => navigate("/developers")}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading recommendations..." />;
  }

  if (isError) {
    const error = jobsErrorMessage || relatedErrorMessage || similarErrorMessage;

    return (
      <ErrorStates
        title="Failed to load recommendations"
        message={
          error instanceof Error
            ? error.message
            : "Something went wrong while loading recommendations."
        }
        onRetry={refreshAll}
      />
    );
  }

  return (
    <div className="space-y-3 sm:space-y-6" ref={containerRef}>
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
          onClick={refreshAll}
          disabled={isLoading}
          className="flex h-9 sm:h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          aria-label={isLoading ? "Refreshing recommendations" : "Refresh recommendations"}
        >
          <RefreshCw size={isMobile ? 14 : 16} className={isLoading ? "animate-spin" : ""} aria-hidden="true" />
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-transparent">
        <div className="flex flex-col gap-2 sm:gap-3 border-b border-slate-200 px-3 sm:px-5 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div>
              <h2 className="font-semibold text-slate-900 text-sm sm:text-base">Recommendation Graph</h2>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500">
                {isMobile
                  ? "Pinch to zoom, drag to explore"
                  : "Drag nodes to explore relationships in the knowledge graph."}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium" role="list" aria-label="Graph legend">
              <span 
                className={`rounded-full ${COLORS.jobs.chipBg} px-2 sm:px-3 py-0.5 sm:py-1 ${COLORS.jobs.chipText}`}
                role="listitem"
              >
                Jobs ({jobs.length})
              </span>
              <span 
                className={`rounded-full ${COLORS.skills.chipBg} px-2 sm:px-3 py-0.5 sm:py-1 ${COLORS.skills.chipText}`}
                role="listitem"
              >
                Skills ({skillJobs.length})
              </span>
              <span 
                className={`rounded-full ${COLORS.developers.chipBg} px-2 sm:px-3 py-0.5 sm:py-1 ${COLORS.developers.chipText}`}
                role="listitem"
              >
                Developers ({developers.length})
              </span>
            </div>
          </div>

          <div className="sr-only" role="status" aria-live="polite">
            Graph contains {jobs.length} job nodes, {skillJobs.length} skill-related job nodes, 
            and {developers.length} similar developer nodes connected to the main developer.
          </div>
        </div>

        <div 
          style={{ height: containerHeight }} 
          className="w-full relative"
          role="img"
          aria-label="Interactive graph showing job recommendations and similar developers"
        >
          {nodes.length > 1 ? (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              fitViewOptions={{ 
                padding: isMobile ? 0.4 : isCompact ? 0.35 : 0.2, 
                minZoom: 0.15, 
                maxZoom: 1.5 
              }}
              minZoom={0.1}
              maxZoom={isMobile ? 2.5 : 2}
              proOptions={{ hideAttribution: true }}
              nodesDraggable
              panOnScroll={isCompact}
              zoomOnPinch
              defaultEdgeOptions={{ type: "smoothstep" }}
              className="touch-none"
              aria-label="Recommendation graph"
            >
              <Background gap={isMobile ? 16 : 24} />
              <Controls 
                position={isMobile ? "bottom-right" : "bottom-left"}
                showInteractive={!isCompact}
                className={isMobile ? "scale-75" : ""}
                aria-label="Graph controls"
              />
              {!isMobile && (
                <MiniMap 
                  pannable 
                  zoomable 
                  className="!hidden md:!block"
                  aria-label="Graph minimap"
                />
              )}
            </ReactFlow>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default function Recommendations() {
  return (
    <ReactFlowProvider>
      <RecommendationsContent />
    </ReactFlowProvider>
  );
}