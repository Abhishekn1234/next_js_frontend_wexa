export default function DeveloperSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-200" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="h-3 w-48 rounded bg-slate-200" />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="h-3 w-40 rounded bg-slate-200" />
        <div className="h-3 w-32 rounded bg-slate-200" />
        <div className="h-3 w-28 rounded bg-slate-200" />
      </div>

      <div className="mt-5 flex gap-2">
        <div className="h-6 w-14 rounded bg-slate-200" />
        <div className="h-6 w-20 rounded bg-slate-200" />
        <div className="h-6 w-16 rounded bg-slate-200" />
      </div>
    </div>
  );
}