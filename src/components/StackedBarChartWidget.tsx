"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
  data: any[];
};

export default function StackedBarChartWidget({ data }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" tick={{ fontSize: 10 }} />
          <YAxis
            type="number"
            domain={[0, 100]}
            unit="%"
            width={60}
            tick={{ fontSize: 10 }}
          />
          <Tooltip />
          <Legend />
          {displayedTypes.map((type) => (
            <Bar
              key={type}
              dataKey={type}
              stackId="a"
              fill={typeColors[type]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
