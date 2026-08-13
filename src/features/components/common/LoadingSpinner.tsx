import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  message = "Loading...",
  fullScreen = false,
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-[60vh]" : "min-h-[240px]"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2
          size={28}
          className="animate-spin text-slate-700"
        />

        <p className="text-sm text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}