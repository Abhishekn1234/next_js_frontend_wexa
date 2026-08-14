import { FolderKanban, RefreshCw } from "lucide-react";

interface Props {
  isFetching: boolean;
  onRefresh: () => void;
}

export default function ProjectsHeader({
  isFetching,
  onRefresh,
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-slate-900 p-2.5 text-white">
          <FolderKanban size={20} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Explore projects in the WEXA CognoDB knowledge graph.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isFetching}
        className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshCw
          size={16}
          className={isFetching ? "animate-spin" : ""}
        />

        {isFetching ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}