import {
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

import type { Job } from "../../domain/entities/jobs";

interface JobCardProps {
  job: Job;
}

export default function JobCard({
  job,
}: JobCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900">
            {job.title}
          </h3>

          {job.company && (
            <p className="mt-1 text-sm text-slate-500">
              {job.company}
            </p>
          )}
        </div>

        <div className="shrink-0 rounded-lg bg-slate-100 p-2.5">
          <BriefcaseBusiness
            size={18}
            className="text-slate-700"
          />
        </div>
      </div>

      {job.description && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
          {job.description}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {job.employmentType && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {job.employmentType}
          </span>
        )}

        {job.location && (
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            <MapPin size={12} />
            {job.location}
          </span>
        )}
      </div>
    </div>
  );
}