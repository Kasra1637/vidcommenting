import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";

interface ReachChartProps {
  data: Array<{
    date: string;
    reach: number;
    brand1?: number;
    brand2?: number;
  }>;
}

const ReachChart = ({ data }: ReachChartProps) => {
  const [viewType, setViewType] = useState<"total" | "daily">("total");

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Reach Over Time</h3>
          <p className="text-sm text-muted-foreground">
            Track your brand awareness growth
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewType === "total" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType("total")}
          >
            Total
          </Button>
          <Button
            variant={viewType === "daily" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType("daily")}
          >
            Daily
          </Button>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatNumber}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [formatNumber(value), "Reach"]}
            />
            <Area
              type="monotone"
              dataKey="reach"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#reachGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReachChart;
