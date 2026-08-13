import {
  MapPin,
//   BriefcaseBusiness,
//   Code2,
  User,
  Briefcase,
  Star,
} from "lucide-react";

import type { Developer } from "../../domain/entities/developer";
import { useNavigate } from "react-router-dom";

interface DeveloperCardProps {
  developer: Developer;
}

export default function DeveloperCard({
  developer,
}: DeveloperCardProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100">
          <User size={22} className="text-slate-700" />
        </div>

        <div className="min-w-0">
          <h2 className="truncate font-semibold text-slate-900">
            {developer.name}
          </h2>

          {developer.email && (
            <p className="mt-1 truncate text-sm text-slate-500">
              {developer.email}
            </p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3">
        {developer.location && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} />
            <span>{developer.location}</span>
          </div>
        )}

        {developer.experience !== undefined && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Briefcase size={16} />
            <span>{developer.experience} years experience</span>
          </div>
        )}

        {developer.availability && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Star size={16} />
            <span>{developer.availability}</span>
          </div>
        )}
      </div>

      {/* Skills */}
      {developer.skills && developer.skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {developer.skills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}

      {/* Recommendation */}
      <button
        type="button"
        onClick={() =>
          navigate(`/recommendations/${developer.id}`)
        }
        className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        View Recommendations
      </button>
    </div>
  );
}