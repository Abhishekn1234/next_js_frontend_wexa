// import { useParams, useNavigate } from "react-router-dom";
// import { useCallback, useMemo } from "react";

import {
  // MarkerType,
  ReactFlowProvider,
  // useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// import {
//   useDeveloperJobs,
//   useRelatedSkillJobs,
//   useSimilarDevelopers,
// } from "./presentation/hooks/useRecommedation";

// import LoadingSpinner from "../../components/common/LoadingSpinner";
// import ErrorStates from "../../components/common/ErrorStates";
// import { getArray } from "./presentation/utils/getarray";
// import { COLORS } from "./presentation/utils/colors";
// import { getBreakpoint, LAYOUT_CONFIG } from "./presentation/utils/breakpoints";
// import { useViewportWidth } from "./presentation/utils/useViewportwidth";
// import { BriefcaseBusiness, Code2, Users } from "lucide-react";
// import { RecommendationGraph } from "./presentation/components/RecommendationGraph";
// import { RecommendationsHeader } from "./presentation/components/RecommendationsHeader";
import { RecommendationsContent } from "./presentation/components/RecommendationContent";

// import { RecommendationsHeader } from "./components/RecommendationsHeader";
// import { RecommendationGraph } from "./components/RecommendationGraph";



export default function Recommendations() {
  return (
    <ReactFlowProvider>
      <RecommendationsContent />
    </ReactFlowProvider>
  );
}