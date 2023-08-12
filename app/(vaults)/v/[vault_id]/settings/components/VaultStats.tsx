"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export function VaultStats({ vault }: { vault: any }) {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          See the analytics for the vaults users, likes and storage usage.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart width={300} height={100} data={data}>
            <XAxis axisLine={false} fontSize={12} dataKey="name" />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="currentColor"
              className="text-foreground/70"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
