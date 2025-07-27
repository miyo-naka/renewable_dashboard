"use client";
import { BreakDownData } from "@/type/breakdowndata";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const typeColors: { [type: string]: string } = {
  hydro: "#1f77b4",
  solar: "#ff7f0e",
  wind: "#2ca02c",
  other: "#d62728",
};

const displayedTypes = ["hydro", "solar", "wind", "other"];

type Props = {
  data: BreakDownData;
};

export default function PieChartWidget({ data }: Props) {
  const pieData = displayedTypes.map((type) => ({
    name: type,
    value: parseFloat(data[type as keyof BreakDownData] as string) || 0,
  }));
  return (
    <div className="bg-white rounded-lg shadow p-2 h-full flex flex-col">
      <div className="text-base font-bold mb-1">{data.country_area}</div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            label={{ fontSize: 10 }}
          >
            {pieData.map((entry) => (
              <Cell key={entry.name} fill={typeColors[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
