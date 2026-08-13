import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  Users,
  GitBranch,
} from "lucide-react";

import { useDashboard } from "./presenation/hooks/useDashboard";
import StatCard from "./presenation/components/StatsCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorState from "../../components/common/ErrorStates";
import { AnalyticsCard } from "./presenation/components/AnalyticsCard";
import { ProjectStatusCard } from "./presenation/components/ProjectStatusCard";
import { EmploymentTypesCard } from "./presenation/components/EmployeeTypesStatsCard";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useDashboard();

  if (isLoading) {
    return (
      <LoadingSpinner
        message="Loading dashboard..."
       
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load dashboard"
        message={
          error instanceof Error
            ? error.message
            : "Something went wrong while loading dashboard data."
        }
      />
    );
  }

  
  if (!data) {
    return (
      <ErrorState
        title="No dashboard data"
        message="Dashboard statistics are currently unavailable."
      />
    );
  }

  const relationships = data.relationships;
  const projectStatus = data.projectStatus;
  const employmentTypes = data.employmentTypes;

  return (
    <div className="space-y-8">
    
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of the WEXA CognoDB knowledge graph
        </p>
      </div>

      {/* Main Statistics */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Platform Overview
          </h2>

          <p className="text-sm text-slate-500">
            Current entities available in CognoDB
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Developers"
            value={data.developers}
            icon={Users}
          />

          <StatCard
            title="Jobs"
            value={data.jobs}
            icon={BriefcaseBusiness}
          />

          <StatCard
            title="Skills"
            value={data.skills}
            icon={Code2}
          />

          <StatCard
            title="Projects"
            value={data.projects}
            icon={FolderKanban}
          />
        </div>
      </section>

      
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Graph Analytics
          </h2>

          <p className="text-sm text-slate-500">
            Insights generated from relationships in CognoDB
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
         
          <AnalyticsCard
            title="Skill Relationships"
            value={relationships.hasSkill}
            description="Developer → Skill"
            icon={GitBranch}
          />

          
          <AnalyticsCard
            title="Job Requirements"
            value={relationships.requires}
            description="Job → Skill"
            icon={BriefcaseBusiness}
          />

          {/* Project → Skill */}
          <AnalyticsCard
            title="Project Skills"
            value={relationships.usesSkill}
            description="Project → Skill"
            icon={Code2}
          />

         
          <AnalyticsCard
            title="Developer Projects"
            value={relationships.workedOn}
            description="Developer → Project"
            icon={FolderKanban}
          />
        </div>
      </section>

    
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Distribution Analytics
          </h2>

          <p className="text-sm text-slate-500">
            Breakdown of projects and jobs across the platform
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
         
          <ProjectStatusCard
            ongoing={projectStatus.ongoing}
            completed={projectStatus.completed}
            ongoingPercent={projectStatus.ongoingPercent}
            completedPercent={projectStatus.completedPercent}
          />

     
          <EmploymentTypesCard
            employmentTypes={employmentTypes}
          />
        </div>
      </section>
    </div>
  );
}





