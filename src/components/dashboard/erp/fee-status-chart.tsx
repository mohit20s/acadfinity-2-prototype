"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Paid', total: 4586000, fill: '#10b981' }, // emerald-500
  { name: 'Due', total: 850000, fill: '#f59e0b' },  // amber-500
  { name: 'Overdue', total: 245000, fill: '#ef4444' }, // rose-500
];

export function FeeStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 100000}L`} />
        <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}