import { Wrench, AlertCircle, CheckCircle, Clock } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import { vehicles } from "../../data/mockData";
import { formatDate } from "../../utils/format";

const maintenanceRecords = [
  {
    id: "m1",
    vehicleId: "v1",
    type: "Oil Change",
    cost: 15000,
    date: "2024-01-15",
    description: "Full synthetic oil change + filter",
    status: "Completed",
  },
  {
    id: "m2",
    vehicleId: "v4",
    type: "Brake Service",
    cost: 45000,
    date: "2024-03-01",
    description: "Front and rear brake pad replacement",
    status: "In Progress",
  },
  {
    id: "m3",
    vehicleId: "v2",
    type: "Tyre Rotation",
    cost: 8000,
    date: "2024-02-01",
    description: "4-wheel tyre rotation and balance",
    status: "Completed",
  },
  {
    id: "m4",
    vehicleId: "v3",
    type: "AC Service",
    cost: 22000,
    date: "2024-01-28",
    description: "Air conditioning regas and filter clean",
    status: "Completed",
  },
  {
    id: "m5",
    vehicleId: "v5",
    type: "Battery Replace",
    cost: 35000,
    date: "2024-02-14",
    description: "Battery replacement — OEM spec",
    status: "Completed",
  },
  {
    id: "m6",
    vehicleId: "v6",
    type: "Full Service",
    cost: 55000,
    date: "2024-04-05",
    description: "Scheduled 10,000km full service",
    status: "Upcoming",
  },
];

const statusColor = (s: string) =>
  s === "Completed"
    ? { bg: "rgba(16,185,129,0.12)", text: "#10b981" }
    : s === "In Progress"
      ? { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" }
      : { bg: "rgba(59,130,246,0.12)", text: "#3b82f6" };

export default function MaintenancePage() {
  const totalCost = maintenanceRecords
    .filter((r) => r.status === "Completed")
    .reduce((s, r) => s + r.cost, 0);
  const inProgress = maintenanceRecords.filter(
    (r) => r.status === "In Progress",
  ).length;
  const upcoming = maintenanceRecords.filter(
    (r) => r.status === "Upcoming",
  ).length;
  const completed = maintenanceRecords.filter(
    (r) => r.status === "Completed",
  ).length;

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1
          className="text-lg md:text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Maintenance
        </h1>
        <p
          className="text-xs md:text-sm mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          Track vehicle service history and upcoming schedules
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title="YTD Cost"
          value={`₦${(totalCost / 1000).toFixed(0)}k`}
          icon={Wrench}
          iconColor="text-accent"
        />
        <StatCard
          title="In Progress"
          value={String(inProgress)}
          icon={Clock}
          iconColor="text-amber-400"
        />
        <StatCard
          title="Upcoming"
          value={String(upcoming)}
          icon={AlertCircle}
          iconColor="text-blue-400"
        />
        <StatCard
          title="Completed"
          value={String(completed)}
          icon={CheckCircle}
          iconColor="text-emerald-400"
        />
      </div>

      {/* Service schedule grid */}
      <div className="card p-4 md:p-5">
        <h2 className="section-title mb-4">Service Schedule</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {vehicles.map((v) => {
            const daysToService = Math.round(
              (new Date(v.nextService).getTime() - Date.now()) / 86400000,
            );
            const urgency =
              daysToService < 0
                ? "Overdue"
                : daysToService < 30
                  ? "Due Soon"
                  : "OK";
            const urgencyStyle =
              urgency === "Overdue"
                ? { bg: "rgba(239,68,68,0.12)", text: "#ef4444" }
                : urgency === "Due Soon"
                  ? { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" }
                  : { bg: "rgba(16,185,129,0.12)", text: "#10b981" };
            return (
              <div
                key={v.id}
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: v.color }}
                  />
                  <p
                    className="font-semibold text-sm flex-1 truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {v.make} {v.model}
                  </p>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {v.plate}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>
                      Last service
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      {formatDate(v.lastService)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>
                      Next service
                    </span>
                    <span style={{ color: urgencyStyle.text }}>
                      {formatDate(v.nextService)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>Mileage</span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      {v.mileage.toLocaleString()} km
                    </span>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: urgencyStyle.bg,
                    color: urgencyStyle.text,
                  }}
                >
                  {urgency}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service history — table desktop, cards mobile */}
      <div className="card overflow-hidden">
        <div
          className="p-4 md:p-5 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h2 className="section-title">Service History</h2>
        </div>

        {/* Desktop table */}
        <div className="overflow-x-auto hidden sm:block">
          <table className="w-full">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="th">Vehicle</th>
                <th className="th">Service</th>
                <th className="th">Description</th>
                <th className="th">Date</th>
                <th className="th">Cost</th>
                <th className="th">Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRecords.map((r) => {
                const v = vehicles.find((veh) => veh.id === r.vehicleId);
                const sc = statusColor(r.status);
                return (
                  <tr key={r.id} className="table-row">
                    <td className="td">
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {v?.make} {v?.model}
                      </p>
                      <p
                        className="text-xs font-mono"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {v?.plate}
                      </p>
                    </td>
                    <td
                      className="td font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {r.type}
                    </td>
                    <td
                      className="td text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {r.description}
                    </td>
                    <td
                      className="td text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {formatDate(r.date)}
                    </td>
                    <td
                      className="td font-mono"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      ₦{r.cost.toLocaleString()}
                    </td>
                    <td className="td">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: sc.bg, color: sc.text }}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div
          className="sm:hidden divide-y"
          style={{ borderColor: "var(--border)" }}
        >
          {maintenanceRecords.map((r) => {
            const v = vehicles.find((veh) => veh.id === r.vehicleId);
            const sc = statusColor(r.status);
            return (
              <div key={r.id} className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {r.type}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {v?.make} {v?.model} ·{" "}
                      <span className="font-mono">{v?.plate}</span>
                    </p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: sc.bg, color: sc.text }}
                  >
                    {r.status}
                  </span>
                </div>
                <p
                  className="text-xs mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {r.description}
                </p>
                <div
                  className="flex justify-between text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span>{formatDate(r.date)}</span>
                  <span
                    className="font-mono font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    ₦{r.cost.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
