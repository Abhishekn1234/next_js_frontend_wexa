import {
  MapPin,
  Mail,
  User,
} from "lucide-react";
import type { RecommendedDeveloper } from "../../domain/entities/recommendations";


interface Props {
  developer: RecommendedDeveloper;
}

export default function RecommendationDeveloperCard({
  developer,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white">
          <User size={20} />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900">
            {developer.name}
          </h3>

          {developer.email && (
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <Mail size={13} />
              <span className="truncate">
                {developer.email}
              </span>
            </div>
          )}
        </div>

      </div>

      {developer.location && (
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={15} />
          {developer.location}
        </div>
      )}

      {developer.experience !== undefined && (
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium">
            Experience:
          </span>{" "}
          {developer.experience} years
        </p>
      )}

      {developer.availability && (
        <div className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {developer.availability}
        </div>
      )}

      {developer.skills &&
        developer.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
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