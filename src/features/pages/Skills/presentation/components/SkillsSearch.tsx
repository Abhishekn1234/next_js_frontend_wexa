import { Code2 } from "lucide-react";

interface SkillsSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function SkillsSearch({ search, onSearchChange }: SkillsSearchProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="relative">
        <Code2
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search skills..."
          className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />
      </div>
    </div>
  );
}