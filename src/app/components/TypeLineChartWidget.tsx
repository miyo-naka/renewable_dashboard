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

const typeColors: { [type: string]: string } = {
  other: "#1f77b4",
  solar: "#ff7f0e",
  wind: "#2ca02c",
  hydro: "#d62728",
};

const displayedTypes = ["other", "solar", "wind", "hydro"];

type RawTypeData = {
  country_area: string;
  year: string;
  other: string;
  solar: string;
  wind: string;
  hydro: string;
};

type DataPoint = {
  year: string;
  [type: string]: number | string;
};

export default function TypeLineChartWidget() {
  const [selectedRegion, setSelectedRegion] = useState("World");
  const [regionOptions, setRegionOptions] = useState<string[]>([]);
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch("/data/modified_modern-renewable-energy-consumption.csv")
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse<RawTypeData>(csv, {
          header: true,
          skipEmptyLines: true,
        });
        // 地域リスト抽出
        const allRegions = new Set<string>();
        parsed.data.forEach((row) => {
          allRegions.add(row.country_area);
        });
        setRegionOptions(Array.from(allRegions));
        // データ整形（選択地域のみ）
        const dataByYear: { [year: string]: DataPoint } = {};
        parsed.data.forEach((row) => {
          if (row.country_area !== selectedRegion) return;
          const year = row.year;
          if (!dataByYear[year]) {
            dataByYear[year] = { year };
          }
          displayedTypes.forEach((type) => {
            dataByYear[year][type] = parseFloat((row as any)[type] || "0");
          });
        });
        const sorted = Object.values(dataByYear).sort(
          (a, b) => parseInt(a.year) - parseInt(b.year)
        );
        setChartData(sorted);
      });
  }, [selectedRegion]);

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
      <div className="flex gap-4 items-center">
        <h2 className="text-xl font-bold mb-4">
          タイプ別再エネ生成量の年次推移
        </h2>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          {regionOptions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: 10 }} />
          <YAxis unit="TWh" width={60} tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend />
          {displayedTypes.map((type) => (
            <Line
              key={type}
              type="monotone"
              dataKey={type}
              stroke={typeColors[type]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
