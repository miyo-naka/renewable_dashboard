'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'World', value: 65 },
  { name: 'Asia', value: 45 },
  { name: 'Europe', value: 70 },
  { name: 'Africa', value: 30 },
  { name: 'Asia Pacific', value: 55 },
  { name: 'North America', value: 60 },
  { name: 'South America', value: 50 },
];

export default function BarChartWidget() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">地域別再エネ比率（サンプル）</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 