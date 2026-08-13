import { Bell, Menu, } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        {/* Mobile logo */}
        <div className="lg:hidden">
          <h1 className="text-base font-bold text-slate-900">
            WEXA
          </h1>

          <p className="text-[10px] text-slate-500">
            CognoDB
          </p>
        </div>
      </div>

      {/* Search */}
     

      {/* Right */}
      <div className="ml-auto flex items-center gap-3">
        {/* Notification */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            W
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-900">
              Developer
            </p>

            <p className="text-xs text-slate-500">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}