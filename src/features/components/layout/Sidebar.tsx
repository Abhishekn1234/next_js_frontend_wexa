import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  LayoutDashboard,

  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Developers",
    path: "/developers",
    icon: Users,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Skills",
    path: "/skills",
    icon: Code2,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
 
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-64 shrink-0
          border-r border-slate-200
          bg-white
          transition-transform duration-300
          lg:static
          lg:min-h-screen
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              WEXA
            </h1>

            <p className="text-xs text-slate-500">
              CognoDB
            </p>
          </div>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={18} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}