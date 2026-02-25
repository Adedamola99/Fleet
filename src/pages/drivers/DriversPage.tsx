import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  Eye,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import { drivers, vehicles } from "../../data/mockData";
import { formatCurrency } from "../../utils/format";
import type { DriverStatus } from "../../types";

export default function DriversPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DriverStatus | "All">("All");
  const [sortField, setSortField] = useState<
    "name" | "performanceScore" | "weeklyPayment"
  >("performanceScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = drivers
    .filter(
      (d) =>
        (statusFilter === "All" || d.status === statusFilter) &&
        (d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.email.toLowerCase().includes(search.toLowerCase())),
    )
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortField === "name") return a.name.localeCompare(b.name) * mul;
      return (a[sortField] - b[sortField]) * mul;
    });

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: typeof sortField }) =>
    sortField === field ? (
      sortDir === "asc" ? (
        <ChevronUp size={12} />
      ) : (
        <ChevronDown size={12} />
      )
    ) : null;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Page header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1
            className="text-lg md:text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Drivers
          </h1>
          <p
            className="text-xs md:text-sm mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            {drivers.length} drivers registered
          </p>
        </div>
        <button className="btn btn-primary btn-sm flex-shrink-0">
          <Plus size={14} />{" "}
          <span className="hidden sm:inline">Add Driver</span>
        </button>
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
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter
            size={13}
            style={{ color: "var(--text-muted)" }}
            className="flex-shrink-0"
          />
          {(["All", "Active", "Suspended", "Inactive"] as const).map((s) => (
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

      {/* ── Desktop table ── */}
      <div className="card overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="th">Driver</th>
                <th className="th">Vehicle</th>
                <th
                  className="th cursor-pointer hover:text-[var(--text-secondary)]"
                  onClick={() => toggleSort("weeklyPayment")}
                >
                  <span className="flex items-center gap-1">
                    Weekly <SortIcon field="weeklyPayment" />
                  </span>
                </th>
                <th className="th">Status</th>
                <th
                  className="th cursor-pointer hover:text-[var(--text-secondary)]"
                  onClick={() => toggleSort("performanceScore")}
                >
                  <span className="flex items-center gap-1">
                    Score <SortIcon field="performanceScore" />
                  </span>
                </th>
                <th className="th">Outstanding</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => {
                const v = vehicles.find((v) => v.id === d.vehicleId);
                return (
                  <tr key={d.id} className="table-row">
                    <td className="td">
                      <div className="flex items-center gap-3">
                        <Avatar initials={d.avatar} size="sm" />
                        <div>
                          <p
                            className="font-semibold text-sm"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {d.name}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {d.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="td">
                      {v ? (
                        <div>
                          <p
                            className="text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {v.make} {v.model}
                          </p>
                          <p
                            className="text-xs font-mono"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {v.plate}
                          </p>
                        </div>
                      ) : (
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td
                      className="td font-mono text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {formatCurrency(d.weeklyPayment)}
                    </td>
                    <td className="td">
                      <Badge status={d.status} />
                    </td>
                    <td className="td">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-16 h-1.5 rounded-full overflow-hidden"
                          style={{ backgroundColor: "var(--hover-bg)" }}
                        >
                          <div
                            className={`h-full rounded-full ${d.performanceScore >= 80 ? "bg-emerald-400" : d.performanceScore >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                            style={{ width: `${d.performanceScore}%` }}
                          />
                        </div>
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {d.performanceScore}
                        </span>
                      </div>
                    </td>
                    <td className="td">
                      {d.outstandingBalance > 0 ? (
                        <span className="text-red-400 font-mono text-xs font-semibold">
                          {formatCurrency(d.outstandingBalance)}
                        </span>
                      ) : (
                        <span className="text-emerald-400 text-xs">
                          Cleared
                        </span>
                      )}
                    </td>
                    <td className="td">
                      <button
                        onClick={() => navigate(`/drivers/${d.id}`)}
                        className="btn btn-ghost btn-sm"
                      >
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div
              className="text-center py-12 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No drivers match your filters.
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile card list ── */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 && (
          <div
            className="text-center py-12 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No drivers match your filters.
          </div>
        )}
        {filtered.map((d) => {
          const v = vehicles.find((v) => v.id === d.vehicleId);
          return (
            <button
              key={d.id}
              onClick={() => navigate(`/drivers/${d.id}`)}
              className="card p-4 w-full text-left transition-all"
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--border-strong)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar initials={d.avatar} size="md" />
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-sm truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {d.name}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {d.email}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge status={d.status} />
                  <ChevronRight
                    size={14}
                    style={{ color: "var(--text-muted)" }}
                  />
                </div>
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
                    {formatCurrency(d.weeklyPayment)}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Weekly
                  </p>
                </div>
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  <p
                    className={`text-xs font-bold ${d.performanceScore >= 80 ? "text-emerald-400" : d.performanceScore >= 60 ? "text-amber-400" : "text-red-400"}`}
                  >
                    {d.performanceScore}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Score
                  </p>
                </div>
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  <p
                    className={`text-xs font-bold font-mono ${d.outstandingBalance > 0 ? "text-red-400" : "text-emerald-400"}`}
                  >
                    {d.outstandingBalance > 0
                      ? formatCurrency(d.outstandingBalance)
                      : "Clear"}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Owed
                  </p>
                </div>
              </div>
              {v && (
                <p
                  className="text-xs mt-2.5 pt-2.5 border-t"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                  }}
                >
                  🚗 {v.make} {v.model} ·{" "}
                  <span className="font-mono">{v.plate}</span>
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
