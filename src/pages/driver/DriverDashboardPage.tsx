import { useState } from "react";
import {
  TrendingUp,
  CreditCard,
  Car,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  Zap,
  Bell,
  LogOut,
  BarChart3,
  FileText,
  Phone,
  Shield,
  Calendar,
  MapPin,
  Activity,
  Award,
  Target,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Wrench,
  Moon,
  Sun,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { drivers, vehicles, payments } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";
import Badge from "../../components/ui/Badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { useDriverTheme } from "../../hooks/useDriverTheme";

const weeklyEarnings = [
  { week: "W1", paid: 35000, target: 35000 },
  { week: "W2", paid: 35000, target: 35000 },
  { week: "W3", paid: 35000, target: 35000 },
  { week: "W4", paid: 35000, target: 35000 },
  { week: "W5", paid: 0, target: 35000 },
  { week: "W6", paid: 35000, target: 35000 },
  { week: "W7", paid: 35000, target: 35000 },
  { week: "W8", paid: 35000, target: 35000 },
];

const DRIVER_NAV = [
  { icon: BarChart3, label: "Overview", id: "overview" },
  { icon: CreditCard, label: "Payments", id: "payments" },
  { icon: Car, label: "My Vehicle", id: "vehicle" },
  { icon: Star, label: "Performance", id: "performance" },
  { icon: FileText, label: "Documents", id: "documents" },
  { icon: Bell, label: "Notifications", id: "notifications" },
];

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    title: "On-Time Streak",
    desc: "12 weeks consecutive",
    earned: true,
  },
  {
    icon: "💎",
    title: "Top Performer",
    desc: "Top 10% this quarter",
    earned: true,
  },
  {
    icon: "🔥",
    title: "6-Month Driver",
    desc: "Active for 6+ months",
    earned: true,
  },
  {
    icon: "🎯",
    title: "Zero Default",
    desc: "No missed payments",
    earned: false,
  },
  {
    icon: "⚡",
    title: "Fleet MVP",
    desc: "Highest revenue driver",
    earned: false,
  },
];

export default function DriverDashboardPage() {
  const { logout, notifications, unreadCount, markRead } = useApp();
  const { isDark: driverDark, toggle: toggleDriverDark } = useDriverTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const driver = drivers[0]; // James Okafor
  const vehicle = vehicles.find((v) => v.id === driver.vehicleId)!;
  const driverPayments = payments.filter((p) => p.driverId === driver.id);
  const paidPayments = driverPayments.filter((p) => p.status === "Paid");
  const onTimeRate = Math.round(
    (paidPayments.length / Math.max(driverPayments.length, 1)) * 100,
  );
  const daysToService = Math.round(
    (new Date(vehicle.nextService).getTime() - Date.now()) / 86400000,
  );
  const scoreColor =
    driver.performanceScore >= 80
      ? "#10b981"
      : driver.performanceScore >= 60
        ? "#f59e0b"
        : "#ef4444";

  const radialData = [{ value: driver.performanceScore, fill: scoreColor }];

  return (
    <div
      data-driver-theme={driverDark ? "dark" : "light"}
      className="flex h-screen font-sans overflow-hidden"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      {/* Sidebar */}
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <aside
        className={`flex flex-col border-r transition-all duration-300 flex-shrink-0 fixed md:relative inset-y-0 left-0 z-50 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} ${sidebarOpen ? "w-60" : "w-16"}`}
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-3 px-4 h-16 border-b border-[var(--border)] ${!sidebarOpen ? "justify-center" : ""}`}
        >
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <Zap size={15} className="text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="font-black text-[var(--text-primary)] text-sm">
                FahrVerse
              </p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                Driver Portal
              </p>
            </div>
          )}
        </div>

        {/* Driver mini-profile */}
        {sidebarOpen && (
          <div className="px-4 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black text-sm flex-shrink-0">
                {driver.avatar}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[var(--text-primary)] text-sm truncate">
                  {driver.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-400">
                    Active Driver
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {DRIVER_NAV.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-accent/15 text-white border border-accent/20"
                  : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--hover-bg)]"
              } ${!sidebarOpen ? "justify-center px-2" : ""}`}
              title={!sidebarOpen ? label : undefined}
            >
              <Icon size={17} className="flex-shrink-0" />
              {sidebarOpen && label}
              {sidebarOpen && id === "notifications" && unreadCount > 0 && (
                <span className="ml-auto text-xs bg-accent text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Toggle + logout */}
        <div className="p-3 border-t border-[var(--border)] space-y-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-all"
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${sidebarOpen ? "rotate-90" : "-rotate-90"}`}
            />
            {sidebarOpen && "Collapse"}
          </button>
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <LogOut size={15} />
            {sidebarOpen && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto md:ml-0">
        {/* Top bar */}
        <header
          className="h-16 border-b flex items-center gap-3 justify-between px-4 md:px-6 sticky top-0 z-20"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border)",
          }}
        >
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg flex-shrink-0"
            style={{ color: "var(--text-muted)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-[var(--text-primary)] capitalize text-sm md:text-base truncate">
              {activeTab === "overview"
                ? `Welcome back, ${driver.name.split(" ")[0]}! 👋`
                : DRIVER_NAV.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              {new Date().toLocaleDateString("en-NG", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {daysToService <= 14 && (
              <div className="hidden sm:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-lg">
                <Wrench size={12} /> Service due in {daysToService}d
              </div>
            )}
            <button
              onClick={toggleDriverDark}
              title={
                driverDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {driverDark ? (
                <Sun size={16} color="#f59e0b" />
              ) : (
                <Moon size={16} color="#3b82f6" />
              )}
            </button>
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black text-sm flex-shrink-0">
              {driver.avatar}
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* ── OVERVIEW ──────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in">
              {/* Alert banner */}
              {driver.outstandingBalance === 0 ? (
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-3.5">
                  <CheckCircle size={18} className="text-emerald-400" />
                  <p className="text-sm text-emerald-300 font-medium">
                    You're all caught up! No outstanding payments. Keep it up 🎉
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={18} className="text-amber-400" />
                    <p className="text-sm text-amber-300 font-medium">
                      You have an outstanding balance of{" "}
                      <strong>
                        {formatCurrency(driver.outstandingBalance)}
                      </strong>
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("payments")}
                    className="text-xs text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1"
                  >
                    Pay now <ChevronRight size={12} />
                  </button>
                </div>
              )}

              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  {
                    label: "Total Paid",
                    val: formatCurrency(driver.totalPaid),
                    icon: TrendingUp,
                    color: "text-emerald-400",
                    sub: "All time",
                    trend: "up",
                  },
                  {
                    label: "Weekly Rate",
                    val: formatCurrency(driver.weeklyPayment),
                    icon: CreditCard,
                    color: "text-accent",
                    sub: "Per week",
                    trend: "neutral",
                  },
                  {
                    label: "Performance",
                    val: `${driver.performanceScore}/100`,
                    icon: Star,
                    color: "text-amber-400",
                    sub: "Driver score",
                    trend: "up",
                  },
                  {
                    label: "On-Time Rate",
                    val: `${onTimeRate}%`,
                    icon: Target,
                    color: "text-violet-400",
                    sub: "Payment history",
                    trend: onTimeRate >= 90 ? "up" : "down",
                  },
                ].map((s) => (
                  <div key={s.label} className="card p-4 md:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center ${s.color}`}
                      >
                        <s.icon size={16} />
                      </div>
                      {s.trend !== "neutral" &&
                        (s.trend === "up" ? (
                          <ArrowUpRight
                            size={14}
                            className="text-emerald-400"
                          />
                        ) : (
                          <ArrowDownRight size={14} className="text-red-400" />
                        ))}
                    </div>
                    <p className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
                      {s.val}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid lg:grid-cols-3 gap-3 md:gap-4">
                {/* Payment history chart */}
                <div className="lg:col-span-2 card p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)]">
                        Weekly Payment History
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        Last 8 weeks
                      </p>
                    </div>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-semibold">
                      87.5% on time
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={weeklyEarnings}>
                      <defs>
                        <linearGradient id="dGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="week"
                        tick={{ fill: "#64748b", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tickFormatter={(v) => `₦${v / 1000}k`}
                        tick={{ fill: "#64748b", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        width={44}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                        formatter={(v: number) => [
                          `₦${v.toLocaleString()}`,
                          "",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        name="Target"
                        stroke="#64748b"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        fill="none"
                        dot={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="paid"
                        name="Paid"
                        stroke="#3b82f6"
                        strokeWidth={2.5}
                        fill="url(#dGrad)"
                        dot={{ fill: "#3b82f6", r: 3 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Score gauge */}
                <div className="card p-5 flex flex-col items-center">
                  <h3 className="font-bold text-[var(--text-primary)] mb-1 self-start">
                    Driver Score
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] self-start mb-4">
                    Your fleet ranking
                  </p>
                  <div className="relative">
                    <ResponsiveContainer width={160} height={160}>
                      <RadialBarChart
                        innerRadius="60%"
                        outerRadius="100%"
                        data={radialData}
                        startAngle={210}
                        endAngle={-30}
                      >
                        <RadialBar
                          dataKey="value"
                          cornerRadius={10}
                          background={{ fill: "rgba(255,255,255,0.04)" }}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className="text-4xl font-black"
                        style={{ color: scoreColor }}
                      >
                        {driver.performanceScore}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        / 100
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 w-full mt-2">
                    {[
                      { label: "Rank", val: "#1" },
                      { label: "Tier", val: "Elite" },
                      { label: "Risk", val: "Low" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-[var(--bg-elevated)] rounded-lg p-2 text-center"
                      >
                        <p className="font-black text-[var(--text-primary)] text-sm">
                          {s.val}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vehicle snapshot + Recent payments */}
              <div className="grid lg:grid-cols-2 gap-3 md:gap-4">
                {/* Vehicle */}
                <div className="card overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&q=80"
                    alt="Vehicle"
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-[var(--text-primary)]">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <Badge status={vehicle.status} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Plate", val: vehicle.plate },
                        {
                          label: "Mileage",
                          val: `${vehicle.mileage.toLocaleString()} km`,
                        },
                        {
                          label: "Next Service",
                          val: formatDate(vehicle.nextService),
                        },
                        {
                          label: "Revenue",
                          val: formatCurrency(vehicle.totalRevenue),
                        },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="bg-[var(--bg-elevated)] rounded-lg p-2.5"
                        >
                          <p className="text-xs text-[var(--text-muted)]">
                            {s.label}
                          </p>
                          <p className="text-sm font-bold text-[var(--text-primary)] mt-0.5">
                            {s.val}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveTab("vehicle")}
                      className="w-full mt-3 btn btn-secondary btn-sm justify-center"
                    >
                      View Vehicle Details <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Recent payments */}
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[var(--text-primary)]">
                      Recent Payments
                    </h3>
                    <button
                      onClick={() => setActiveTab("payments")}
                      className="text-xs text-accent hover:text-accent-light"
                    >
                      View all →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {driverPayments.slice(0, 5).map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${p.status === "Paid" ? "bg-emerald-400" : p.status === "Late" ? "bg-red-400" : "bg-amber-400"}`}
                          />
                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">
                              {formatDate(p.weekEnding)}
                            </p>
                            <p className="text-xs text-[var(--text-muted)]">
                              Week ending
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold font-mono text-[var(--text-primary)]">
                            {formatCurrency(p.amount)}
                          </p>
                          <Badge status={p.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)]">
                      Achievements
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      3 of 5 unlocked
                    </p>
                  </div>
                  <Award size={18} className="text-amber-400" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {ACHIEVEMENTS.map((a) => (
                    <div
                      key={a.title}
                      className={`text-center p-4 rounded-xl border transition-all ${a.earned ? "border-amber-500/30 bg-amber-500/5" : "border-white/[0.04] opacity-40 grayscale"}`}
                    >
                      <div className="text-3xl mb-2">{a.icon}</div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">
                        {a.title}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                        {a.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PAYMENTS ──────────────────────────────────────── */}
          {activeTab === "payments" && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  {
                    label: "Total Paid",
                    val: formatCurrency(driver.totalPaid),
                    color: "text-emerald-400",
                  },
                  {
                    label: "Outstanding",
                    val: formatCurrency(driver.outstandingBalance),
                    color:
                      driver.outstandingBalance > 0
                        ? "text-red-400"
                        : "text-emerald-400",
                  },
                  {
                    label: "Weekly Rate",
                    val: formatCurrency(driver.weeklyPayment),
                    color: "text-accent",
                  },
                  {
                    label: "Payments Made",
                    val: String(paidPayments.length),
                    color: "text-violet-400",
                  },
                ].map((s) => (
                  <div key={s.label} className="card p-5 text-center">
                    <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {driver.outstandingBalance > 0 && (
                <div
                  className="card rounded-xl p-6"
                  style={{ borderColor: "rgba(245,158,11,0.3)" }}
                >
                  <div className="flex items-start gap-4">
                    <AlertCircle
                      size={22}
                      className="text-amber-400 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-[var(--text-primary)] mb-1">
                        Payment Due
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-4">
                        You have an outstanding balance of{" "}
                        <strong className="text-amber-400">
                          {formatCurrency(driver.outstandingBalance)}
                        </strong>
                        . Please contact your fleet manager to arrange payment.
                      </p>
                      <div className="flex gap-3">
                        <button className="btn btn-primary btn-sm">
                          <Phone size={13} /> Contact Manager
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          <CreditCard size={13} /> Payment Options
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="card overflow-hidden">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-bold text-[var(--text-primary)]">
                    Full Payment History
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-[var(--border)]">
                      <tr>
                        <th className="th">Week Ending</th>
                        <th className="th">Amount</th>
                        <th className="th">Status</th>
                        <th className="th">Paid At</th>
                        <th className="th">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driverPayments.map((p) => (
                        <tr key={p.id} className="table-row">
                          <td className="td">{formatDate(p.weekEnding)}</td>
                          <td className="td font-mono font-bold text-[var(--text-primary)]">
                            {formatCurrency(p.amount)}
                          </td>
                          <td className="td">
                            <Badge status={p.status} />
                          </td>
                          <td className="td text-[var(--text-secondary)]">
                            {p.paidAt ? (
                              formatDate(p.paidAt)
                            ) : (
                              <span className="text-[var(--text-muted)]">
                                —
                              </span>
                            )}
                          </td>
                          <td className="td text-xs text-[var(--text-muted)]">
                            {p.note || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── VEHICLE ───────────────────────────────────────── */}
          {activeTab === "vehicle" && (
            <div className="space-y-5 animate-fade-in">
              <div className="card overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&q=80"
                    alt="Vehicle"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent flex items-end p-6">
                    <div>
                      <h2 className="text-3xl font-black text-[var(--text-primary)]">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h2>
                      <p className="font-mono text-accent text-lg">
                        {vehicle.plate}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Badge status={vehicle.status} />
                    </div>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: "Make", val: vehicle.make },
                    { label: "Model", val: vehicle.model },
                    { label: "Year", val: String(vehicle.year) },
                    { label: "Plate", val: vehicle.plate },
                    {
                      label: "Mileage",
                      val: `${vehicle.mileage.toLocaleString()} km`,
                    },
                    { label: "Status", val: vehicle.status },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-[var(--bg-elevated)] rounded-xl p-3 text-center"
                    >
                      <p className="text-xs text-[var(--text-muted)] mb-1">
                        {s.label}
                      </p>
                      <p className="font-bold text-[var(--text-primary)] text-sm">
                        {s.val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {/* Service info */}
                <div className="card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Wrench size={16} className="text-accent" />
                    <h3 className="font-bold text-[var(--text-primary)]">
                      Maintenance Schedule
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Last Service",
                        val: formatDate(vehicle.lastService),
                        icon: CheckCircle,
                        color: "text-emerald-400",
                      },
                      {
                        label: "Next Service",
                        val: formatDate(vehicle.nextService),
                        icon: Calendar,
                        color:
                          daysToService < 30
                            ? "text-amber-400"
                            : "text-[var(--text-secondary)]",
                      },
                      {
                        label: "Days Remaining",
                        val: `${daysToService} days`,
                        icon: Clock,
                        color:
                          daysToService < 14
                            ? "text-red-400"
                            : "text-slate-400",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <s.icon size={14} className={s.color} />
                          <span className="text-sm text-[var(--text-secondary)]">
                            {s.label}
                          </span>
                        </div>
                        <span className={`text-sm font-bold ${s.color}`}>
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                  {daysToService <= 14 && (
                    <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3 flex items-start gap-2">
                      <AlertCircle
                        size={14}
                        className="text-amber-400 flex-shrink-0 mt-0.5"
                      />
                      <p className="text-xs text-amber-300">
                        Service is due soon. Please notify your fleet manager or
                        visit the service centre.
                      </p>
                    </div>
                  )}
                </div>

                {/* Revenue stats */}
                <div className="card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity size={16} className="text-accent" />
                    <h3 className="font-bold text-[var(--text-primary)]">
                      Vehicle Revenue Stats
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Total Revenue Generated",
                        val: formatCurrency(vehicle.totalRevenue),
                        color: "text-emerald-400",
                      },
                      {
                        label: "Weekly Target",
                        val: formatCurrency(vehicle.weeklyTarget),
                        color: "text-accent",
                      },
                      {
                        label: "Avg Per Week",
                        val: formatCurrency(vehicle.totalRevenue / 52),
                        color: "text-[var(--text-secondary)]",
                      },
                      {
                        label: "Vehicle Utilisation",
                        val: "100%",
                        color: "text-violet-400",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0"
                      >
                        <span className="text-sm text-[var(--text-secondary)]">
                          {s.label}
                        </span>
                        <span
                          className={`text-sm font-bold font-mono ${s.color}`}
                        >
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PERFORMANCE ───────────────────────────────────── */}
          {activeTab === "performance" && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Performance Score",
                    val: `${driver.performanceScore}/100`,
                    sub: "Top 10% of fleet",
                    color: "text-amber-400",
                  },
                  {
                    label: "Risk Score",
                    val: `${driver.riskScore}/100`,
                    sub: "Low risk driver",
                    color: "text-emerald-400",
                  },
                  {
                    label: "On-Time Rate",
                    val: `${onTimeRate}%`,
                    sub: "Payment history",
                    color: "text-accent",
                  },
                  {
                    label: "Fleet Rank",
                    val: "#1",
                    sub: "Out of 6 drivers",
                    color: "text-violet-400",
                  },
                ].map((s) => (
                  <div key={s.label} className="card p-5 text-center">
                    <p className={`text-3xl font-black ${s.color}`}>{s.val}</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                      {s.label}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Score breakdown */}
              <div className="card p-6">
                <h3 className="font-bold text-[var(--text-primary)] mb-5">
                  Score Breakdown
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Payment Consistency",
                      score: 95,
                      desc: "Paying on time, every week",
                      color: "bg-emerald-400",
                    },
                    {
                      label: "Payment Timeliness",
                      score: 90,
                      desc: "How quickly you pay after due date",
                      color: "bg-accent",
                    },
                    {
                      label: "Account Age",
                      score: 88,
                      desc: "Tenure as a FahrVerse driver",
                      color: "bg-violet-400",
                    },
                    {
                      label: "Outstanding History",
                      score: 100,
                      desc: "No long-term outstanding balances",
                      color: "bg-amber-400",
                    },
                    {
                      label: "Fleet Contribution",
                      score: 88,
                      desc: "Revenue generated for the fleet",
                      color: "bg-cyan-400",
                    },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div>
                          <span className="text-sm font-semibold text-[var(--text-primary)]">
                            {s.label}
                          </span>
                          <span className="text-xs text-[var(--text-muted)] ml-2">
                            {s.desc}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-[var(--text-primary)]">
                          {s.score}/100
                        </span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.color} transition-all`}
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement tips */}
              <div className="card p-6">
                <h3 className="font-bold text-[var(--text-primary)] mb-4">
                  How to Improve Your Score
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: "⚡",
                      tip: "Pay before the due date each week — early payments earn bonus points.",
                    },
                    {
                      icon: "📅",
                      tip: "Maintain a streak — 12+ consecutive on-time payments unlock Elite tier.",
                    },
                    {
                      icon: "💬",
                      tip: "Communicate proactively — notify management before a payment is late.",
                    },
                    {
                      icon: "🚗",
                      tip: "Keep your vehicle in good condition — service history affects your score.",
                    },
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-[var(--bg-elevated)] rounded-xl border border-white/[0.04]"
                    >
                      <span className="text-xl">{t.icon}</span>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {t.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DOCUMENTS ─────────────────────────────────────── */}
          {activeTab === "documents" && (
            <div className="space-y-5 animate-fade-in">
              <div className="card p-6">
                <h3 className="font-bold text-[var(--text-primary)] mb-4">
                  Your Documents
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Driver's License",
                      status: "Verified",
                      expiry: "2026-08-15",
                      icon: Shield,
                    },
                    {
                      name: "National ID (NIN)",
                      status: "Verified",
                      expiry: null,
                      icon: FileText,
                    },
                    {
                      name: "Passport Photo",
                      status: "Verified",
                      expiry: null,
                      icon: FileText,
                    },
                    {
                      name: "Proof of Address",
                      status: "Pending Review",
                      expiry: null,
                      icon: MapPin,
                    },
                    {
                      name: "Vehicle Insurance",
                      status: "Not Uploaded",
                      expiry: null,
                      icon: Car,
                    },
                  ].map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between p-4 border border-white/[0.06] rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            doc.status === "Verified"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : doc.status === "Pending Review"
                                ? "bg-amber-500/15 text-amber-400"
                                : "bg-white/[0.06] text-[var(--text-muted)]"
                          }`}
                        >
                          <doc.icon size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-primary)] text-sm">
                            {doc.name}
                          </p>
                          {doc.expiry && (
                            <p className="text-xs text-[var(--text-muted)]">
                              Expires {formatDate(doc.expiry)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            doc.status === "Verified"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : doc.status === "Pending Review"
                                ? "bg-amber-500/15 text-amber-400"
                                : "bg-white/[0.06] text-[var(--text-muted)]"
                          }`}
                        >
                          {doc.status}
                        </span>
                        {doc.status === "Not Uploaded" && (
                          <button className="btn btn-secondary btn-sm">
                            Upload
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ─────────────────────────────────── */}
          {activeTab === "notifications" && (
            <div className="space-y-4 animate-fade-in max-w-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[var(--text-primary)]">
                  All Notifications
                </h3>
                <button
                  onClick={() => {
                    notifications.forEach((n) => markRead(n.id));
                  }}
                  className="text-xs text-accent hover:text-accent-light flex items-center gap-1"
                >
                  Mark all read
                </button>
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`flex items-start gap-3 p-4 rounded-lg border transition-colors cursor-pointer ${n.read ? "bg-[var(--bg-elevated)] border-transparent" : "bg-[var(--bg-elevated)]/50 border-accent"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      n.type === "payment"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : n.type === "driver"
                          ? "bg-red-500/15 text-red-400"
                          : n.type === "vehicle"
                            ? "bg-amber-500/15 text-amber-400"
                            : "bg-accent/15 text-accent"
                    }`}
                  >
                    <Bell size={16} />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm leading-relaxed ${n.read ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)] font-medium"}`}
                    >
                      {n.message}
                    </p>
                    {n.meta && (
                      <p className="text-xs text-accent mt-1">{n.meta}</p>
                    )}
                    <p className="text-xs text-[var(--text-muted)] mt-1.5">
                      {new Date(n.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="w-2.5 h-2.5 bg-accent rounded-full mt-1 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
