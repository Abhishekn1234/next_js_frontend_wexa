import { Code2 } from "lucide-react";

interface SkillsEmptyProps {
  search: string;
  onClearSearch: () => void;
}

export function SkillsEmpty({ search, onClearSearch }: SkillsEmptyProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="rounded-full bg-slate-100 p-4">
        <Code2 size={28} className="text-slate-400" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-slate-900">No skills found</h2>

      <p className="mt-1 max-w-md text-sm text-slate-500">
        {search
          ? `No skills match "${search}". Try a different search term.`
          : "There are currently no skills available in CognoDB."}
      </p>

      {search && (
        <button
          type="button"
          onClick={onClearSearch}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Clear search
        </button>
      )}
    </div>
  );
}