import {
  BriefcaseBusiness,
  MapPin,
  Building2,
} from "lucide-react";
import type { RecommendedJob } from "../../domain/entities/recommendations";


interface Props {
  job: RecommendedJob;
}

export default function RecommendationJobCard({
  job,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div className="rounded-lg bg-slate-100 p-3">
          <BriefcaseBusiness
            size={20}
            className="text-slate-700"
          />
        </div>

      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        {job.title ?? "Untitled Job"}
      </h3>

      {job.company && (
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <Building2 size={15} />
          <span>{job.company}</span>
        </div>
      )}

      {job.location && (
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={15} />
          <span>{job.location}</span>
        </div>
      )}

      {job.employmentType && (
        <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {job.employmentType}
        </div>
      )}

      {job.description && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
          {job.description}
        </p>
      )}

      {job.skills && job.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-md bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}