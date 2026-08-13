export default function JobSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-5 w-48 rounded bg-slate-200" />
          <div className="h-4 w-28 rounded bg-slate-200" />
        </div>

        <div className="h-10 w-10 rounded-lg bg-slate-200" />
      </div>

      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-5/6 rounded bg-slate-200" />
        <div className="h-3 w-4/6 rounded bg-slate-200" />
      </div>

      <div className="mt-5 flex gap-2">
        <div className="h-6 w-20 rounded-full bg-slate-200" />
        <div className="h-6 w-24 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}