import { FolderKanban } from "lucide-react";

export function ProjectStatusCard({
  ongoing,
  completed,
  ongoingPercent,
  completedPercent,
}: {
  ongoing: number;
  completed: number;
  ongoingPercent: number;
  completedPercent: number;
}) {
  const hasProjects = ongoing + completed > 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="font-semibold text-slate-900">
        Project Status
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Current project distribution
      </p>

      {!hasProjects ? (
        <div className="mt-8 rounded-lg bg-slate-50 p-6 text-center">
          <FolderKanban
            size={28}
            className="mx-auto text-slate-400"
          />

          <p className="mt-3 text-sm font-medium text-slate-700">
            No project status data
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Project analytics will appear here once projects are available.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {/* Ongoing */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Ongoing
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {ongoing}{" "}
                <span className="font-normal text-slate-500">
                  ({ongoingPercent}%)
                </span>
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-500"
                style={{
                  width: `${ongoingPercent}%`,
                }}
              />
            </div>
          </div>

          {/* Completed */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Completed
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {completed}{" "}
                <span className="font-normal text-slate-500">
                  ({completedPercent}%)
                </span>
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-400 transition-all duration-500"
                style={{
                  width: `${completedPercent}%`,
                }}
              />
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm text-slate-500">
              Total Projects
            </span>

            <span className="font-semibold text-slate-900">
              {ongoing + completed}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
