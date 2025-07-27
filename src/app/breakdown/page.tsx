"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import StackedBarChartWidget from "../../components/StackedBarChartWidget";
import PieChartWidget from "../../components/PieChartWidget";
import Sidebar from "@/components/Sidebar";
import { BreakDownData } from "@/type/breakdowndata";

export default function BreakdownPage() {
  const [data, setData] = useState<BreakDownData[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("World");
  const [selectedYear, setSelectedYear] = useState("");
  const [regionData, setRegionData] = useState<BreakDownData[]>([]);
  const [yearData, setYearData] = useState<BreakDownData[]>([]);

  useEffect(() => {
    fetch("/data/modified_renewable-share-electlicity_withtype.csv")
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse<BreakDownData>(csv, {
          header: true,
          skipEmptyLines: true,
        });
        setData(parsed.data);
        const regionSet = new Set<string>();
        const yearSet = new Set<string>();
        parsed.data.forEach((row) => {
          regionSet.add(row.country_area);
          yearSet.add(row.Year);
        });
        setRegions(Array.from(regionSet));
        const sortedYears = Array.from(yearSet).sort(
          (a, b) => parseInt(a) - parseInt(b)
        );
        setYears(sortedYears);
        setSelectedYear(sortedYears[sortedYears.length - 1]);
      });
  }, []);

  useEffect(() => {
    if (!selectedRegion) return;
    const filtered = data.filter((d) => d.country_area === selectedRegion);
    setRegionData(filtered);
  }, [selectedRegion, data]);

  useEffect(() => {
    if (!selectedYear) return;
    const filtered = data.filter((d) => d.Year === selectedYear);
    setYearData(filtered);
  }, [selectedYear, data]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex flex-1 p-2 gap-2">
        <div className="w-[35%] h-full bg-white rounded-lg shadow p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-2">
            Changes in renewable energy percentage by region
          </h2>
          <div className="mb-2">
            <label className="text-sm mr-2">region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="p-2 border rounded"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <StackedBarChartWidget data={regionData} />
          <p className="text-xs text-gray-500 text-right">
            Data source: Share of electricity production from renewables - Ember
            (2025); Energy Institute - Statistical Review of World Energy (2025)
            – with major processing by Our World in Data
          </p>
        </div>

        <div className="w-[65%] bg-white rounded-lg shadow p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-2">
            Proportion of renewable energy types in each region
          </h2>
          <div className="mb-2">
            <label className="text-sm mr-2">year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-2 border rounded"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-4 mb-2">
            {yearData.map((d) => (
              <div key={d.country_area} className="min-w-[180px]">
                <PieChartWidget data={d} />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-right">
            Data source: Share of electricity production from renewables - Ember
            (2025); Energy Institute - Statistical Review of World Energy (2025)
            – with major processing by Our World in Data
          </p>
        </div>
      </main>
    </div>
  );
}
