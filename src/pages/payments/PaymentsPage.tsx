import { useState } from "react";
import {
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  Search,
  ChevronRight,
} from "lucide-react";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import StatCard from "../../components/ui/StatCard";
import { payments, drivers, vehicles } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";
import type { PaymentStatus } from "../../types";

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "All">(
    "All",
  );
  const [search, setSearch] = useState("");

  const paid = payments.filter((p) => p.status === "Paid");
  const late = payments.filter((p) => p.status === "Late");
  const pending = payments.filter((p) => p.status === "Pending");
  const totalCollected = paid.reduce((s, p) => s + p.amount, 0);
  const totalOutstanding = [...late, ...pending].reduce(
    (s, p) => s + p.amount,
    0,
  );

  const filtered = payments.filter((p) => {
    const driver = drivers.find((d) => d.id === p.driverId);
    const matchSearch =
      !search || driver?.name.toLowerCase().includes(search.toLowerCase());
    return (statusFilter === "All" || p.status === statusFilter) && matchSearch;
  });

  const collectionPct = Math.round((113000 / 203000) * 100);

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1
          className="text-lg md:text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Payments
        </h1>
        <p
          className="text-xs md:text-sm mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          Track weekly driver payments and collections
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title="Total Collected"
          value={formatCurrency(totalCollected)}
          icon={CheckCircle}
          iconColor="text-emerald-400"
          change="+8.2%"
          changeType="up"
        />
        <StatCard
          title="Outstanding"
          value={formatCurrency(totalOutstanding)}
          icon={AlertTriangle}
          iconColor="text-amber-400"
          subtitle={`${late.length + pending.length} payments`}
        />
        <StatCard
          title="On Time Rate"
          value={`${Math.round((paid.length / payments.length) * 100)}%`}
          icon={Clock}
          iconColor="text-accent"
        />
        <StatCard
          title="This Week"
          value={formatCurrency(
            payments
              .filter((p) => p.weekEnding === "2024-03-17")
              .reduce((s, p) => s + p.amount, 0),
          )}
          icon={DollarSign}
          iconColor="text-violet-400"
        />
      </div>

      {/* Weekly summary */}
      <div className="card p-4 md:p-5">
        <h2 className="section-title mb-3">Week Ending March 17, 2024</h2>
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
          {[
            {
              label: "Expected",
              val: formatCurrency(203000),
              color: "var(--text-primary)",
            },
            {
              label: "Collected",
              val: formatCurrency(113000),
              color: "#10b981",
            },
            {
              label: "Remaining",
              val: formatCurrency(90000),
              color: "#f59e0b",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg p-3 text-center"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <p
                className="text-[10px] md:text-xs mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                {s.label}
              </p>
              <p
                className="text-sm md:text-lg font-bold"
                style={{ color: s.color }}
              >
                {s.val}
              </p>
            </div>
          ))}
        </div>
        <div
          className="flex justify-between text-xs mb-1.5"
          style={{ color: "var(--text-muted)" }}
        >
          <span>Collection progress</span>
          <span>{collectionPct}%</span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--hover-bg)" }}
        >
          <div
            className="h-full bg-accent rounded-full"
            style={{ width: `${collectionPct}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 min-w-0">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            className="input pl-9 py-2 text-xs w-full"
            placeholder="Search driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["All", "Paid", "Late", "Pending"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`btn btn-sm ${statusFilter === s ? "btn-primary" : "btn-secondary"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="card overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="th">Driver</th>
                <th className="th">Vehicle</th>
                <th className="th">Amount</th>
                <th className="th">Week Ending</th>
                <th className="th">Status</th>
                <th className="th">Paid At</th>
                <th className="th">Note</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const driver = drivers.find((d) => d.id === p.driverId);
                const vehicle = vehicles.find((v) => v.id === p.vehicleId);
                return (
                  <tr key={p.id} className="table-row">
                    <td className="td">
                      <div className="flex items-center gap-2.5">
                        {driver && (
                          <Avatar initials={driver.avatar} size="sm" />
                        )}
                        <span
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {driver?.name ?? "—"}
                        </span>
                      </div>
                    </td>
                    <td
                      className="td text-xs font-mono"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {vehicle?.plate ?? "—"}
                    </td>
                    <td
                      className="td font-mono font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {formatCurrency(p.amount)}
                    </td>
                    <td
                      className="td text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {formatDate(p.weekEnding)}
                    </td>
                    <td className="td">
                      <Badge status={p.status} />
                    </td>
                    <td
                      className="td text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {p.paidAt ? (
                        formatDate(p.paidAt)
                      ) : (
                        <span style={{ color: "var(--text-muted)" }}>—</span>
                      )}
                    </td>
                    <td
                      className="td text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {p.note || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div
              className="text-center py-10 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No payments match your filters.
            </div>
          )}
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2.5">
        {filtered.length === 0 && (
          <div
            className="text-center py-10 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No payments match your filters.
          </div>
        )}
        {filtered.map((p) => {
          const driver = drivers.find((d) => d.id === p.driverId);
          const vehicle = vehicles.find((v) => v.id === p.vehicleId);
          return (
            <div key={p.id} className="card p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {driver && <Avatar initials={driver.avatar} size="sm" />}
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {driver?.name ?? "—"}
                    </p>
                    <p
                      className="text-xs font-mono"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {vehicle?.plate ?? "—"}
                    </p>
                  </div>
                </div>
                <Badge status={p.status} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  <p
                    className="text-xs font-bold font-mono"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {formatCurrency(p.amount)}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Amount
                  </p>
                </div>
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {formatDate(p.weekEnding)}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Week End
                  </p>
                </div>
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {p.paidAt ? formatDate(p.paidAt) : "—"}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Paid At
                  </p>
                </div>
              </div>
              {p.note && (
                <p
                  className="text-xs mt-2.5 pt-2.5 border-t"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                  }}
                >
                  Note: {p.note}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
