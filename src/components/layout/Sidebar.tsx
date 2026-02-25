import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  CreditCard,
  Wrench,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  X,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onClose?: () => void;
}

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/drivers", icon: Users, label: "Drivers" },
  { to: "/vehicles", icon: Car, label: "Vehicles" },
  { to: "/payments", icon: CreditCard, label: "Payments" },
  { to: "/maintenance", icon: Wrench, label: "Maintenance" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

export default function Sidebar({
  collapsed,
  onToggle,
  onClose,
}: SidebarProps) {
  return (
    <aside
      className={`relative flex flex-col flex-shrink-0 h-full transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-60"}`}
      style={{
        backgroundColor: "var(--bg-surface)",
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      {/* Logo row */}
      <div
        className={`flex items-center h-16 flex-shrink-0 px-4 ${collapsed ? "justify-center" : "justify-between"}`}
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span
                className="font-black tracking-tight block"
                style={{ color: "var(--text-primary)" }}
              >
                FahrVerse
              </span>
              <span
                className="block text-[10px] uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Driver Fleet
              </span>
            </div>
          )}
        </div>
        {/* Mobile close button — only visible on small screens */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            onClick={onClose}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`
            }
          >
            <Icon size={18} strokeWidth={2} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-3" style={{ borderTop: "1px solid var(--border)" }}>
        <NavLink
          to="/settings"
          title={collapsed ? "Settings" : undefined}
          onClick={onClose}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`
          }
        >
          <Settings size={18} strokeWidth={2} className="flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>

      {/* Collapse toggle — desktop only */}
      <button
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full hidden md:flex items-center justify-center z-10 transition-colors"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-strong)",
          color: "var(--text-muted)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--text-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--text-muted)")
        }
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
