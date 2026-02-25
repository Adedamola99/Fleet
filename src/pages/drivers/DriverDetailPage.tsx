import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Car, AlertTriangle } from "lucide-react";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import { drivers, vehicles, payments } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";

export default function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const driver = drivers.find((d) => d.id === id);
  const vehicle = vehicles.find((v) => v.id === driver?.vehicleId);
  const driverPayments = payments.filter((p) => p.driverId === id);

  if (!driver)
    return (
      <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
        <p>Driver not found.</p>
        <button
          onClick={() => navigate("/drivers")}
          className="btn btn-secondary mt-4"
        >
          Back to Drivers
        </button>
      </div>
    );

  const riskColor =
    driver.riskScore >= 70
      ? "text-red-400"
      : driver.riskScore >= 40
        ? "text-amber-400"
        : "text-emerald-400";
  const riskBg =
    driver.riskScore >= 70
      ? "bg-red-400"
      : driver.riskScore >= 40
        ? "bg-amber-400"
        : "bg-emerald-400";

  const financeCards = [
    {
      label: "Total Paid",
      val: formatCurrency(driver.totalPaid),
      color: "#10b981",
    },
    {
      label: "Outstanding",
      val: formatCurrency(driver.outstandingBalance),
      color: driver.outstandingBalance > 0 ? "#ef4444" : "#10b981",
    },
    {
      label: "Weekly Rate",
      val: formatCurrency(driver.weeklyPayment),
      color: "#3b82f6",
    },
    {
      label: "Joined",
      val: formatDate(driver.joinDate),
      color: "var(--text-secondary)",
    },
  ];

  const vehicleStats = vehicle
    ? [
        {
          label: "Vehicle",
          val: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        },
        { label: "Plate", val: vehicle.plate },
        { label: "Status", val: vehicle.status },
        { label: "Mileage", val: `${vehicle.mileage.toLocaleString()} km` },
        { label: "Last Service", val: formatDate(vehicle.lastService) },
        { label: "Next Service", val: formatDate(vehicle.nextService) },
      ]
    : [];

  return (
    <div className="space-y-4 animate-fade-in max-w-5xl">
      <button
        onClick={() => navigate("/drivers")}
        className="btn btn-ghost btn-sm"
      >
        <ArrowLeft size={14} /> Back to Drivers
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile card */}
        <div className="card p-5 flex flex-col gap-4">
          <div className="flex flex-col items-center text-center gap-3">
            <Avatar initials={driver.avatar} size="lg" />
            <div>
              <h2
                className="font-bold text-lg"
                style={{ color: "var(--text-primary)" }}
              >
                {driver.name}
              </h2>
              <div className="mt-1">
                <Badge status={driver.status} />
              </div>
            </div>
          </div>
          <div
            className="space-y-3 border-t pt-4"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="flex items-center gap-2.5 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <Mail size={14} style={{ color: "var(--text-muted)" }} />
              <span className="truncate">{driver.email}</span>
            </div>
            <div
              className="flex items-center gap-2.5 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <Phone size={14} style={{ color: "var(--text-muted)" }} />{" "}
              {driver.phone}
            </div>
            <div
              className="flex items-center gap-2.5 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <Car size={14} style={{ color: "var(--text-muted)" }} />
              {vehicle ? `${vehicle.make} ${vehicle.model}` : "No vehicle"}
            </div>
          </div>
          <div
            className="grid grid-cols-2 gap-2 border-t pt-4"
            style={{ borderColor: "var(--border)" }}
          >
            {financeCards.map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-3"
                style={{ backgroundColor: "var(--bg-elevated)" }}
              >
                <p
                  className="text-[10px] mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.label}
                </p>
                <p className="text-sm font-bold" style={{ color: s.color }}>
                  {s.val}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Performance & Risk */}
          <div className="card p-4 md:p-5">
            <h3 className="section-title mb-4">Performance & Risk</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs uppercase tracking-wide"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Performance Score
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {driver.performanceScore}/100
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--hover-bg)" }}
                >
                  <div
                    className={`h-full rounded-full ${driver.performanceScore >= 80 ? "bg-emerald-400" : driver.performanceScore >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${driver.performanceScore}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs uppercase tracking-wide"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Risk Score
                  </span>
                  <span className={`text-sm font-bold ${riskColor}`}>
                    {driver.riskScore}/100
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--hover-bg)" }}
                >
                  <div
                    className={`h-full rounded-full ${riskBg}`}
                    style={{ width: `${driver.riskScore}%` }}
                  />
                </div>
              </div>
            </div>
            {driver.riskScore >= 50 && (
              <div className="mt-4 flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3">
                <AlertTriangle
                  size={15}
                  className="text-amber-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-xs text-amber-300">
                  High risk score — review payment history and vehicle usage.
                </p>
              </div>
            )}
          </div>

          {/* Vehicle info */}
          {vehicle && (
            <div className="card p-4 md:p-5">
              <h3 className="section-title mb-4">Assigned Vehicle</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vehicleStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "var(--bg-elevated)" }}
                  >
                    <p
                      className="text-[10px] mb-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {s.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment history — table on desktop, cards on mobile */}
          <div className="card overflow-hidden">
            <div
              className="p-4 md:p-5 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <h3 className="section-title">Payment History</h3>
            </div>

            {/* Desktop table */}
            <div className="overflow-x-auto hidden sm:block">
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
                  {driverPayments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        No payments recorded.
                      </td>
                    </tr>
                  ) : (
                    driverPayments.map((p) => (
                      <tr key={p.id} className="table-row">
                        <td
                          className="td text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {formatDate(p.weekEnding)}
                        </td>
                        <td
                          className="td font-mono"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {formatCurrency(p.amount)}
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
                            <span style={{ color: "var(--text-muted)" }}>
                              —
                            </span>
                          )}
                        </td>
                        <td
                          className="td text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {p.note || "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile payment cards */}
            <div
              className="sm:hidden divide-y"
              style={{ borderColor: "var(--border)" }}
            >
              {driverPayments.length === 0 ? (
                <p
                  className="text-center py-8 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  No payments recorded.
                </p>
              ) : (
                driverPayments.map((p) => (
                  <div key={p.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-sm font-mono font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {formatCurrency(p.amount)}
                      </span>
                      <Badge status={p.status} />
                    </div>
                    <div
                      className="flex justify-between text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span>Week: {formatDate(p.weekEnding)}</span>
                      <span>
                        {p.paidAt ? `Paid: ${formatDate(p.paidAt)}` : "—"}
                      </span>
                    </div>
                    {p.note && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {p.note}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
