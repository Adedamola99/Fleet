import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import { vehicles, drivers } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicle = vehicles.find((v) => v.id === id);
  const driver = drivers.find((d) => d.id === vehicle?.driverId);

  if (!vehicle)
    return (
      <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
        <p>Vehicle not found.</p>
        <button
          onClick={() => navigate("/vehicles")}
          className="btn btn-secondary mt-4"
        >
          Back to Vehicles
        </button>
      </div>
    );

  const daysToService = Math.round(
    (new Date(vehicle.nextService).getTime() - Date.now()) / 86400000,
  );
  const serviceUrgent = daysToService < 30;

  const statRows = [
    {
      label: "Total Revenue",
      val: formatCurrency(vehicle.totalRevenue),
      color: "#10b981",
    },
    {
      label: "Weekly Target",
      val: formatCurrency(vehicle.weeklyTarget),
      color: "#3b82f6",
    },
    {
      label: "Mileage",
      val: `${vehicle.mileage.toLocaleString()} km`,
      color: "var(--text-secondary)",
    },
    {
      label: "Last Service",
      val: formatDate(vehicle.lastService),
      color: "var(--text-secondary)",
    },
    {
      label: "Next Service",
      val: formatDate(vehicle.nextService),
      color: serviceUrgent ? "#f59e0b" : "var(--text-secondary)",
    },
  ];

  const statsGrid = [
    { label: "Fleet Position", val: "#3 by Revenue" },
    { label: "Avg Weekly", val: formatCurrency(vehicle.totalRevenue / 52) },
    { label: "Utilisation", val: driver ? "100%" : "0%" },
    { label: "ROI Est.", val: "24.6%" },
    { label: "Svc Interval", val: "15,000 km" },
    {
      label: "Remaining",
      val: `${(15000 - (vehicle.mileage % 15000)).toLocaleString()} km`,
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in max-w-4xl">
      <button
        onClick={() => navigate("/vehicles")}
        className="btn btn-ghost btn-sm"
      >
        <ArrowLeft size={14} /> Back to Vehicles
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Vehicle card */}
        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0"
              style={{
                background: vehicle.color + "33",
                border: `2px solid ${vehicle.color}`,
              }}
            />
            <div>
              <h2
                className="font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h2>
              <p
                className="text-xs font-mono"
                style={{ color: "var(--text-secondary)" }}
              >
                {vehicle.plate}
              </p>
            </div>
          </div>
          <Badge status={vehicle.status} />
          <div
            className="space-y-3 border-t pt-4"
            style={{ borderColor: "var(--border)" }}
          >
            {statRows.map((s) => (
              <div key={s.label} className="flex justify-between items-center">
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.label}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: s.color }}
                >
                  {s.val}
                </span>
              </div>
            ))}
          </div>
          {serviceUrgent && (
            <div className="flex items-start gap-2 rounded-lg px-3 py-2.5 bg-amber-500/10 border border-amber-500/20">
              <AlertCircle
                size={14}
                className="text-amber-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-amber-300">
                Service due in {daysToService} days
              </p>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {driver && (
            <div className="card p-4 md:p-5">
              <h3 className="section-title mb-4">Assigned Driver</h3>
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar initials={driver.avatar} size="lg" />
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {driver.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {driver.email}
                  </p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <Badge status={driver.status} />
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Score: {driver.performanceScore}/100
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Weekly payment
                  </p>
                  <p className="font-bold text-accent">
                    {formatCurrency(driver.weeklyPayment)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="card p-4 md:p-5">
            <h3 className="section-title mb-4">Vehicle Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {statsGrid.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  <p
                    className="text-xs mb-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
