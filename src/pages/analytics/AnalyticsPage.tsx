import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";
import RevenueChart from "../../components/charts/RevenueChart";
import PerformanceChart from "../../components/charts/PerformanceChart";
import PaymentPieChart from "../../components/charts/PaymentPieChart";
import ROIChart from "../../components/charts/ROIChart";
import StatCard from "../../components/ui/StatCard";

const insights = [
  {
    icon: "🏆",
    title: "Top Performer",
    desc: "Emeka Obi has maintained a 95+ score for 3 consecutive months.",
  },
  {
    icon: "⚠️",
    title: "High Risk Driver",
    desc: "Fatima Bello has ₦84,000 outstanding and a 78/100 risk score.",
  },
  {
    icon: "📈",
    title: "Revenue Growth",
    desc: "Fleet revenue grew 30.8% over the last 6 months.",
  },
  {
    icon: "🔧",
    title: "Maintenance Due",
    desc: "Kia Cerato (OGN-789-TU) service is overdue by 12 days.",
  },
  {
    icon: "💰",
    title: "Best ROI Month",
    desc: "March 2024 projected at 28.4% — highest in 6 months.",
  },
  {
    icon: "🎯",
    title: "Collection Target",
    desc: "Fleet is on track to hit ₦1.02M collection target this month.",
  },
];

const paymentSplit = [
  { label: "On-Time Rate", val: "73%", color: "#10b981" },
  { label: "Default Rate", val: "9%", color: "#ef4444" },
  { label: "Pending Rate", val: "18%", color: "#f59e0b" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1
          className="text-lg md:text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Analytics
        </h1>
        <p
          className="text-xs md:text-sm mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          Fleet financial performance and insights
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title="Avg Monthly Revenue"
          value="₦903,333"
          change="+14.2%"
          changeType="up"
          icon={TrendingUp}
          iconColor="text-accent"
        />
        <StatCard
          title="Fleet ROI"
          value="28.4%"
          change="+2.3%"
          changeType="up"
          icon={BarChart3}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Default Rate"
          value="9.1%"
          change="-1.2%"
          changeType="up"
          icon={PieChart}
          iconColor="text-amber-400"
          subtitle="Lower is better"
        />
        <StatCard
          title="Collection Rate"
          value="91%"
          change="+3%"
          changeType="up"
          icon={Activity}
          iconColor="text-violet-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        <div className="card p-4 md:p-5">
          <h2 className="section-title mb-1">Monthly Revenue Trend</h2>
          <p className="section-sub mb-4">
            Revenue vs collections over 6 months
          </p>
          <RevenueChart />
        </div>

        <div className="card p-4 md:p-5">
          <h2 className="section-title mb-1">Fleet ROI</h2>
          <p className="section-sub mb-4">Return on investment per month</p>
          <ROIChart />
        </div>

        <div className="card p-4 md:p-5">
          <h2 className="section-title mb-1">Driver Performance</h2>
          <p className="section-sub mb-4">Performance score comparison</p>
          <PerformanceChart />
        </div>

        <div className="card p-4 md:p-5">
          <h2 className="section-title mb-1">Payment Status Distribution</h2>
          <p className="section-sub mb-4">Overall payment health</p>
          <PaymentPieChart />
          <div className="grid grid-cols-3 gap-2 mt-3">
            {paymentSplit.map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-3 text-center"
                style={{ backgroundColor: "var(--bg-elevated)" }}
              >
                <p className="text-lg font-bold" style={{ color: s.color }}>
                  {s.val}
                </p>
                <p
                  className="text-[10px] mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="card p-4 md:p-5">
        <h2 className="section-title mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {insights.map((i) => (
            <div
              key={i.title}
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--bg-elevated)",
                borderColor: "var(--border)",
              }}
            >
              <div className="text-2xl mb-2">{i.icon}</div>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {i.title}
              </p>
              <p
                className="text-xs mt-1 leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {i.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
