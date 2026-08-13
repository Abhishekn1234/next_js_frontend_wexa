import {
  Network,
} from "lucide-react";

interface Props {
  title: string;
  message: string;
}

export default function RecommendationEmpty({
  title,
  message,
}: Props) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

      <div className="rounded-full bg-slate-100 p-4">
        <Network
          size={28}
          className="text-slate-400"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 max-w-md text-sm text-slate-500">
        {message}
      </p>

    </div>
  );
}