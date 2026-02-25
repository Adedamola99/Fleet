import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { paymentStatusData } from "../../data/mockData";

export default function PaymentPieChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={paymentStatusData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
        >
          {paymentStatusData.map((entry, i) => (
            <Cell key={i} fill={entry.color} opacity={0.9} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={(v: number) => [`${v}%`, ""]}
        />
        <Legend wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
