import { useState } from "react";
import { Bell, Shield, Building, CreditCard, Save } from "lucide-react";

type ToggleKey = "latePayment" | "weeklySummary" | "maintenance" | "newDriver";

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    latePayment: true,
    weeklySummary: true,
    maintenance: true,
    newDriver: false,
  });

  const toggle = (key: ToggleKey) =>
    setToggles((p) => ({ ...p, [key]: !p[key] }));

  const sections = [
    {
      icon: Building,
      title: "Company Details",
      fields: [
        { label: "Company Name", value: "FahrVerse Nigeria Ltd", type: "text" },
        {
          label: "Business Email",
          value: "admin@fahrverse.com",
          type: "email",
        },
        { label: "Phone Number", value: "+234 800 000 0000", type: "tel" },
        {
          label: "Address",
          value: "25 Marina Street, Lagos Island",
          type: "text",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Settings",
      fields: [
        { label: "Weekly Cycle", value: "Sunday - Saturday", type: "text" },
        { label: "Grace Period", value: "2 days", type: "text" },
        { label: "Currency", value: "NGN (₦)", type: "text" },
      ],
    },
  ];

  const notifications: { label: string; desc: string; key: ToggleKey }[] = [
    {
      label: "Late payment alerts",
      desc: "Get notified when drivers miss payments",
      key: "latePayment",
    },
    {
      label: "Weekly summary report",
      desc: "Email summary every Monday morning",
      key: "weeklySummary",
    },
    {
      label: "Maintenance reminders",
      desc: "Alerts when vehicles are due for service",
      key: "maintenance",
    },
    {
      label: "New driver registration",
      desc: "Notify when a new driver is onboarded",
      key: "newDriver",
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in max-w-3xl">
      <div>
        <h1
          className="text-lg md:text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Settings
        </h1>
        <p
          className="text-xs md:text-sm mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          Manage your fleet account preferences
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="card p-4 md:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <section.icon size={18} className="text-accent" />
            <h2 className="section-title">{section.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.fields.map((f) => (
              <div key={f.label}>
                <label className="label mb-1.5">{f.label}</label>
                <input type={f.type} className="input" defaultValue={f.value} />
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-sm mt-5">
            <Save size={14} /> Save Changes
          </button>
        </div>
      ))}

      {/* Notifications */}
      <div className="card p-4 md:p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <Bell size={18} className="text-accent" />
          <h2 className="section-title">Notifications</h2>
        </div>
        <div className="space-y-1">
          {notifications.map((n) => (
            <div
              key={n.key}
              className="flex items-center justify-between py-3.5 border-b last:border-0"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex-1 min-w-0 pr-4">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {n.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {n.desc}
                </p>
              </div>
              <button
                onClick={() => toggle(n.key)}
                className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors ${toggles[n.key] ? "bg-accent" : ""}`}
                style={{
                  backgroundColor: toggles[n.key]
                    ? undefined
                    : "rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${toggles[n.key] ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="card p-4 md:p-6 border border-red-500/20">
        <div className="flex items-center gap-2.5 mb-4">
          <Shield size={18} className="text-red-400" />
          <h2 className="text-base font-bold text-red-400">Danger Zone</h2>
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Delete Account
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              Permanently delete your fleet account and all data
            </p>
          </div>
          <button className="btn btn-danger btn-sm flex-shrink-0">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
