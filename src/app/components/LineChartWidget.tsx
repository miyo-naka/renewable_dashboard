"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type RawData = {
  year: string;
  country_area: string;
  renewable_share: string;
};

type DataPoint = {
  year: string;
  [key: string]: string | number;
};

const displayedRegions = [
  "World",
  "Asia",
  "Europe",
  "Africa",
  "Asia Pacific",
  "North America",
  "South America",
];

const regionColors: { [region: string]: string } = {
  World: "#1f77b4",
  Asia: "#ff7f0e",
  Europe: "#2ca02c",
  Africa: "#d62728",
  "Asia Pacific": "#9467bd",
  "North America": "#8c564b",
  "South America": "#e377c2",
};

export default function LineChartWidget() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch("/data/modified_renewable-share-energy.csv")
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse<RawData>(csv, {
          header: true,
          skipEmptyLines: true,
        });
        const dataByYear: { [year: string]: DataPoint } = {};
        parsed.data.forEach((row) => {
          const year = row.year;
          const region = row.country_area;
          const share = parseFloat(row.renewable_share);
          if (!dataByYear[year]) {
            dataByYear[year] = { year };
          }
          dataByYear[year][region] = share;
        });
        const sorted = Object.values(dataByYear).sort(
          (a, b) => parseInt(a.year) - parseInt(b.year)
        );
        setChartData(sorted as DataPoint[]);
      });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">再エネ比率の年次推移（地域別）</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 50]} unit="%" width={60} tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend />
          {displayedRegions.map((region) => (
            <Line
              key={region}
              type="monotone"
              dataKey={region}
              stroke={regionColors[region]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
