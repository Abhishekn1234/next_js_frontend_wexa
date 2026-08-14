import { useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
//   MarkerType,
  type Node,
  type Edge,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// import { BriefcaseBusiness, Code2, Users } from "lucide-react";
// import { COLORS } from "../presentation/utils/colors";
// import { LAYOUT_CONFIG } from "../presentation/utils/breakpoints";
import { RecommendationLegend } from "./RecommendationLegend";
import { RecommendationEmpty } from "./RecommendationEmpty";

interface RecommendationGraphProps {
  developerId: string;
  nodes: Node[];
  edges: Edge[];
  isLoading: boolean;
  jobs: any[];
  skillJobs: any[];
  developers: any[];
  isCompact: boolean;
  isMobile: boolean;
  isTablet: boolean;
  bp: string;
}

export function RecommendationGraph({
  developerId,
  nodes,
  edges,
  isLoading,
  jobs,
  skillJobs,
  developers,
  isCompact,
  isMobile,
//   isTablet,
//   bp,
}: RecommendationGraphProps) {
  const { fitView } = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);

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

  return (
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

          <RecommendationLegend 
            jobsCount={jobs.length}
            skillJobsCount={skillJobs.length}
            developersCount={developers.length}
          />
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
          <RecommendationEmpty isMobile={isMobile} />
        )}
      </div>
    </div>
  );
}