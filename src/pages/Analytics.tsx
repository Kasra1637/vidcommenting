import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Download, TrendingUp, Eye, MessageSquare, Users } from "lucide-react";

const reachData = [
  { date: "Jan 1", reach: 150000, comments: 12 },
  { date: "Jan 8", reach: 320000, comments: 28 },
  { date: "Jan 15", reach: 580000, comments: 45 },
  { date: "Jan 22", reach: 890000, comments: 67 },
  { date: "Jan 29", reach: 1200000, comments: 89 },
  { date: "Feb 5", reach: 1650000, comments: 112 },
  { date: "Feb 12", reach: 2100000, comments: 156 },
  { date: "Feb 19", reach: 2400000, comments: 189 },
];

const statusData = [
  { name: "Performing", value: 45, color: "hsl(var(--accent))" },
  { name: "Needs Boost", value: 30, color: "hsl(var(--primary))" },
  { name: "Stagnated", value: 15, color: "hsl(var(--sidebar-accent))" },
  { name: "Inactive", value: 10, color: "hsl(var(--muted))" },
];

const brandPerformance = [
  { name: "Olovka AI", reach: 1250000, videos: 45 },
  { name: "Wisebits", reach: 890000, videos: 32 },
  { name: "Teract", reach: 260000, videos: 10 },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedBrand, setSelectedBrand] = useState("all");

  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
              <p className="mt-1 text-muted-foreground">
                Track your campaign performance and ROI
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <p className="text-2xl font-bold text-foreground">2.4M</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm text-accent">
              <TrendingUp className="h-4 w-4" />
              +23% vs last period
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <MessageSquare className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Comments Posted</p>
                <p className="text-2xl font-bold text-foreground">189</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm text-accent">
              <TrendingUp className="h-4 w-4" />
              +45 this week
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Est. Visitors</p>
                <p className="text-2xl font-bold text-foreground">12.8K</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm text-accent">
              <TrendingUp className="h-4 w-4" />
              +18% vs last period
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Position</p>
                <p className="text-2xl font-bold text-foreground">2.3</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Top 3: 68% of comments
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Reach Over Time */}
          <div className="lg:col-span-2 rounded-xl border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Reach Over Time
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cumulative brand awareness growth
                </p>
              </div>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="olovka">Olovka AI</SelectItem>
                  <SelectItem value="wisebits">Wisebits</SelectItem>
                  <SelectItem value="teract">Teract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reachData}>
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

          {/* Status Distribution */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">
              Video Status
            </h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Videos"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Performance */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <h3 className="mb-6 text-lg font-semibold text-foreground">
            Brand Performance
          </h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brandPerformance} layout="vertical">
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatNumber}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  width={100}
                />
                <Tooltip
                  formatter={(value: number) => [formatNumber(value), "Reach"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar
                  dataKey="reach"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
