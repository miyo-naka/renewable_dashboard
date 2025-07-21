"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import Sidebar from "../components/Sidebar";
import LineChartWidget from "../components/LineChartWidget";
import TypeLineChartWidget from "../components/TypeLineChartWidget";

type RawData = {
  year: string;
  country_area: string;
  renewable_share: string;
};

type DataPoint = {
  year: string;
  [key: string]: string | number;
};

export default function HomePage() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/modified_renewable-share-energy.csv")
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse<RawData>(csv, {
          header: true,
          skipEmptyLines: true,
        });

        // 整形：yearごとに地域の値をまとめた形式に変換
        const dataByYear: { [year: string]: DataPoint } = {};
        const allRegions = new Set<string>();

        parsed.data.forEach((row) => {
          const year = row.year;
          const region = row.country_area;
          const share = parseFloat(row.renewable_share);

          if (!dataByYear[year]) {
            dataByYear[year] = { year };
          }

          dataByYear[year][region] = share;
          allRegions.add(region);
        });

        const sorted = Object.values(dataByYear).sort(
          (a, b) => parseInt(a.year) - parseInt(b.year)
        );

        setChartData(sorted as DataPoint[]);
        setRegions(Array.from(allRegions));
      });
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-50 overflow-hidden">
        <div className="flex flex-col h-full gap-4">
          <div className="flex-1 min-h-0">
            <LineChartWidget />
          </div>
          <div className="flex-1 min-h-0">
            <TypeLineChartWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
