import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Plus, ChevronRight } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import { vehicles, drivers } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";
import type { VehicleStatus } from "../../types";

export default function VehiclesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | "All">(
    "All",
  );

  const filtered = vehicles.filter(
    (v) =>
      (statusFilter === "All" || v.status === statusFilter) &&
      `${v.make} ${v.model} ${v.plate}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1
            className="text-lg md:text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Vehicles
          </h1>
          <p
            className="text-xs md:text-sm mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            {vehicles.length} vehicles in fleet
          </p>
        </div>
        <button className="btn btn-primary btn-sm flex-shrink-0">
          <Plus size={14} />{" "}
          <span className="hidden sm:inline">Add Vehicle</span>
        </button>
      </div>

      {/* Fleet summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Active",
            count: vehicles.filter((v) => v.status === "Active").length,
            color: "#10b981",
          },
          {
            label: "In Maintenance",
            count: vehicles.filter((v) => v.status === "Maintenance").length,
            color: "#f59e0b",
          },
          {
            label: "Inactive",
            count: vehicles.filter((v) => v.status === "Inactive").length,
            color: "var(--text-secondary)",
          },
        ].map((s) => (
          <div key={s.label} className="card p-3 md:p-4 text-center">
            <p
              className="text-xl md:text-2xl font-bold"
              style={{ color: s.color }}
            >
              {s.count}
            </p>
            <p
              className="text-[10px] md:text-xs mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
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
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["All", "Active", "Maintenance", "Inactive"] as const).map((s) => (
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
                <th className="th">Vehicle</th>
                <th className="th">Plate</th>
                <th className="th">Driver</th>
                <th className="th">Weekly Target</th>
                <th className="th">Total Revenue</th>
                <th className="th">Mileage</th>
                <th className="th">Next Service</th>
                <th className="th">Status</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => {
                const driver = drivers.find((d) => d.id === v.driverId);
                return (
                  <tr key={v.id} className="table-row">
                    <td className="td">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-2 h-8 rounded-full flex-shrink-0"
                          style={{ background: v.color }}
                        />
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {v.year} {v.make} {v.model}
                        </p>
                      </div>
                    </td>
                    <td
                      className="td font-mono text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {v.plate}
                    </td>
                    <td className="td">
                      {driver ? (
                        <div className="flex items-center gap-2">
                          <Avatar initials={driver.avatar} size="sm" />
                          <span
                            className="text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {driver.name}
                          </span>
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
                      className="td font-mono"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {formatCurrency(v.weeklyTarget)}
                    </td>
                    <td className="td font-mono font-semibold text-emerald-400">
                      {formatCurrency(v.totalRevenue)}
                    </td>
                    <td
                      className="td text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {v.mileage.toLocaleString()} km
                    </td>
                    <td
                      className="td text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {formatDate(v.nextService)}
                    </td>
                    <td className="td">
                      <Badge status={v.status} />
                    </td>
                    <td className="td">
                      <button
                        onClick={() => navigate(`/vehicles/${v.id}`)}
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
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        {filtered.map((v) => {
          const driver = drivers.find((d) => d.id === v.driverId);
          return (
            <button
              key={v.id}
              onClick={() => navigate(`/vehicles/${v.id}`)}
              className="card p-4 w-full text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-10 rounded-full flex-shrink-0"
                  style={{ background: v.color }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-sm truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {v.year} {v.make} {v.model}
                  </p>
                  <p
                    className="text-xs font-mono mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {v.plate}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge status={v.status} />
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
                  <p className="text-xs font-bold font-mono text-emerald-400">
                    {formatCurrency(v.totalRevenue)}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Revenue
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
                    {v.mileage.toLocaleString()}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    km
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
                    {formatDate(v.nextService)}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Next svc
                  </p>
                </div>
              </div>
              {driver && (
                <p
                  className="text-xs mt-2.5 pt-2.5 border-t flex items-center gap-2"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                  }}
                >
                  <Avatar initials={driver.avatar} size="sm" />
                  {driver.name}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
