import {
  Search,
  X,
} from "lucide-react";

interface DeveloperFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function DeveloperFilters({
  search,
  onSearchChange,
}: DeveloperFiltersProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search developers..."
          className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X size={17} />
          </button>
        )}
      </div>
    </div>
  );
}