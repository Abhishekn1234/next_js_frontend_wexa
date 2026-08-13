import { BriefcaseBusiness } from "lucide-react";

export function EmploymentTypesCard({
  employmentTypes,
}: {
  employmentTypes: {
    type: string;
    count: number;
  }[];
}) {
  const totalJobs = employmentTypes.reduce(
    (total, item) => total + item.count,
    0
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="font-semibold text-slate-900">
        Employment Types
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Job distribution by employment type
      </p>

      {employmentTypes.length === 0 ? (
        <div className="mt-8 rounded-lg bg-slate-50 p-6 text-center">
          <BriefcaseBusiness
            size={28}
            className="mx-auto text-slate-400"
          />

          <p className="mt-3 text-sm font-medium text-slate-700">
            No employment data
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Employment statistics will appear here once jobs are available.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {employmentTypes.map((item) => {
            const percentage =
              totalJobs > 0
                ? Math.round((item.count / totalJobs) * 100)
                : 0;

            return (
              <div
                key={item.type}
                className="rounded-lg border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {item.type.replaceAll("_", " ")}
                  </span>

                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">
                      {item.count}
                    </span>

                    <span className="ml-2 text-xs text-slate-500">
                      ({percentage}%)
                    </span>
                  </div>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-900 transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}