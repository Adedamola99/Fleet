import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-accent",
  subtitle,
}: StatCardProps) {
  return (
    <div className="stat-card card-hover animate-fade-in">
      <div className="flex items-start justify-between">
        <div
          className={`p-2.5 rounded-lg ${iconColor}`}
          style={{ backgroundColor: "var(--hover-bg)" }}
        >
          <Icon size={18} strokeWidth={2} />
        </div>
        {change && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              changeType === "up"
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                : changeType === "down"
                  ? "text-red-600 dark:text-red-400 bg-red-500/10"
                  : "bg-[var(--hover-bg)]"
            }`}
            style={
              changeType === "neutral" ? { color: "var(--text-muted)" } : {}
            }
          >
            {change}
          </span>
        )}
      </div>
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          {title}
        </p>
        <p
          className="text-2xl font-black mt-1 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {value}
        </p>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
