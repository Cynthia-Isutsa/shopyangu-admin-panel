"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

interface Product {
  price: number;
  stockLevel: number;
  total: number;
}

interface OverviewProps {
  products: Product[];
}

export function Overview({ products }: OverviewProps) {
  console.log({ products });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={products}>
        <XAxis
          dataKey="price"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `Ksh.${value}`} 
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`} 
        />
        <Bar
          dataKey="stockLevel"
          fill="#8884d8" 
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
