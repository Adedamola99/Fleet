import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  ChevronDown,
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
  Car,
  CreditCard,
  X,
  CheckCheck,
  Menu,
} from "lucide-react";
import Avatar from "../ui/Avatar";
import { useApp } from "../../context/AppContext";
import { formatRelativeTime } from "../../utils/format";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const {
    user,
    isDark,
    notifications,
    unreadCount,
    searchQuery,
    searchResults,
    toggleDark,
    logout,
    markAllRead,
    markRead,
    setSearchQuery,
  } = useApp();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false); // mobile search expand

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchQuery("");
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setSearchQuery]);

  const handleSearchResult = (r: (typeof searchResults)[0]) => {
    setSearchQuery("");
    setSearchOpen(false);
    if (r.type === "driver") navigate(`/drivers/${r.id}`);
    else if (r.type === "vehicle") navigate(`/vehicles/${r.id}`);
    else navigate("/payments");
  };

  const topbarStyle = {
    height: "64px",
    backgroundColor: "var(--bg-surface)",
    borderBottom: "1px solid var(--border)",
    flexShrink: 0,
  };

  const dropdownStyle = {
    backgroundColor: "var(--bg-surface)",
    border: "1px solid var(--border-strong)",
    borderRadius: "0.75rem",
    boxShadow: "var(--shadow-hover)",
  };

  return (
    <header
      className="flex items-center justify-between px-4 md:px-6 gap-3 relative z-30"
      style={topbarStyle}
    >
      {/* ── Hamburger — mobile only ── */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg flex-shrink-0 transition-colors"
        style={{ color: "var(--text-muted)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--text-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--text-muted)")
        }
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* ── Search ── */}
      <div
        ref={searchRef}
        className={`relative flex-1 ${searchOpen ? "block" : "hidden md:block"} max-w-sm`}
      >
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--text-muted)" }}
        />
        <input
          type="text"
          placeholder="Search drivers, vehicles..."
          className="input pl-9 py-2 text-xs w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus={searchOpen}
        />
        {(searchQuery || searchOpen) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSearchOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={13} />
          </button>
        )}

        {/* Search dropdown */}
        {searchResults.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 mt-2 overflow-hidden animate-fade-in z-50"
            style={dropdownStyle}
          >
            {searchResults.map((r) => {
              const Icon =
                r.type === "driver"
                  ? User
                  : r.type === "vehicle"
                    ? Car
                    : CreditCard;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSearchResult(r)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--hover-bg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--hover-bg)" }}
                  >
                    <Icon size={13} className="text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {r.title}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {r.subtitle}
                    </p>
                  </div>
                  <span
                    className="ml-auto text-xs capitalize flex-shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {r.type}
                  </span>
                </button>
              );
            })}
          </div>
        )}
        {searchQuery && searchResults.length === 0 && (
          <div
            className="absolute top-full left-0 right-0 mt-2 px-4 py-6 text-center animate-fade-in z-50"
            style={dropdownStyle}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              No results for "
              <span style={{ color: "var(--text-primary)" }}>
                {searchQuery}
              </span>
              "
            </p>
          </div>
        )}
      </div>

      {/* ── Right actions ── */}
      <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
        {/* Mobile search toggle */}
        {!searchOpen && (
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden btn btn-ghost btn-sm p-2.5"
          >
            <Search size={16} style={{ color: "var(--text-secondary)" }} />
          </button>
        )}

        {/* Dark mode */}
        <button
          onClick={toggleDark}
          title={isDark ? "Light mode" : "Dark mode"}
          className="btn btn-ghost btn-sm p-2.5"
        >
          {isDark ? (
            <Sun size={16} className="text-amber-500" />
          ) : (
            <Moon size={16} className="text-accent" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative group">
          <button className="btn btn-ghost btn-sm p-2.5 relative">
            <Bell size={16} style={{ color: "var(--text-secondary)" }} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <div
            className="absolute right-0 top-12 w-80 md:w-96 overflow-hidden shadow-2xl hidden group-hover:block group-focus-within:block animate-fade-in z-50"
            style={dropdownStyle}
          >
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="text-xs bg-accent/15 text-accent px-1.5 py-0.5 rounded-full font-semibold">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs transition-colors hover:text-accent"
                  style={{ color: "var(--text-muted)" }}
                >
                  <CheckCheck size={12} /> Mark all read
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors"
                  style={{
                    borderBottom: "1px solid var(--border)",
                    backgroundColor: !n.read
                      ? "rgba(59,130,246,0.04)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--hover-bg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = !n.read
                      ? "rgba(59,130,246,0.04)"
                      : "transparent")
                  }
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      n.type === "payment"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : n.type === "driver"
                          ? "bg-red-500/15 text-red-500"
                          : n.type === "vehicle"
                            ? "bg-amber-500/15 text-amber-500"
                            : "bg-accent/15 text-accent"
                    }`}
                  >
                    <Bell size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm leading-snug ${n.read ? "" : "font-semibold"}`}
                      style={{
                        color: n.read
                          ? "var(--text-secondary)"
                          : "var(--text-primary)",
                      }}
                    >
                      {n.message}
                    </p>
                    {n.meta && (
                      <p className="text-xs text-accent mt-0.5">{n.meta}</p>
                    )}
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {formatRelativeTime(n.timestamp)}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
            <div
              className="px-4 py-2.5"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <button className="text-xs text-accent hover:text-accent-dark transition-colors w-full text-center font-medium">
                View all notifications
              </button>
            </div>
          </div>
        </div>

        {/* User dropdown */}
        <div className="relative group ml-1">
          <button
            className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg transition-colors"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--hover-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Avatar
              initials={
                user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") ?? "FA"
              }
              size="sm"
            />
            <div className="hidden sm:block text-left">
              <p
                className="text-xs font-bold leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                {user?.name}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                {user?.role}
              </p>
            </div>
            <ChevronDown
              size={13}
              className="hidden sm:block"
              style={{ color: "var(--text-muted)" }}
            />
          </button>

          <div
            className="absolute right-0 top-12 w-52 py-1.5 shadow-2xl hidden group-hover:block animate-fade-in z-50"
            style={dropdownStyle}
          >
            <div
              className="px-4 py-3 mb-1"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <p
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {user?.name}
              </p>
              <p
                className="text-xs mt-0.5 truncate"
                style={{ color: "var(--text-muted)" }}
              >
                {user?.email ?? "admin@fahrverse.com"}
              </p>
            </div>
            {[
              {
                icon: User,
                label: "My Profile",
                action: () => navigate("/settings"),
              },
              {
                icon: Settings,
                label: "Settings",
                action: () => navigate("/settings"),
              },
            ].map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--hover-bg)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                marginTop: "4px",
                paddingTop: "4px",
              }}
            >
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(239,68,68,0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
