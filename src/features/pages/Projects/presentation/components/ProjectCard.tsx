import {
  FolderKanban,
  CalendarDays,
} from "lucide-react";
import type { Project } from "../../domain/entities/projects";


interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-lg bg-slate-100 p-3">
          <FolderKanban
            size={20}
            className="text-slate-700"
          />
        </div>

        {project.status && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {project.status}
          </span>
        )}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-slate-900">
        {project.name}
      </h2>

      {project.description && (
        <p className="mt-2 line-clamp-3 text-sm text-slate-500">
          {project.description}
        </p>
      )}

      {(project.startDate || project.endDate) && (
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays size={14} />

          <span>
            {project.startDate ?? "—"}
            {" → "}
            {project.endDate ?? "Present"}
          </span>
        </div>
      )}

      {project.skills &&
        project.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.skills.slice(0, 4).map(
              (skill) => (
                <span
                  key={skill.id}
                  className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                >
                  {skill.name}
                </span>
              )
            )}

            {project.skills.length > 4 && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
                +{project.skills.length - 4}
              </span>
            )}
          </div>
        )}
    </div>
  );
}