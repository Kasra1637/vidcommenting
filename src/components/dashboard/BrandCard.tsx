import { Link } from "wouter";
import { TrendingUp, ArrowRight } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  reach: number;
  videos: number;
  performing: number;
  stagnated: number;
  needsBoost: number;
  inactive: number;
}

interface BrandCardProps {
  brand: Brand;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const BrandCard = ({ brand }: BrandCardProps) => {
  const total = brand.videos;

  const statusCategories = [
    {
      label: "Performing",
      count: brand.performing,
      percent: (brand.performing / total) * 100,
      color: "bg-emerald-500",
      bgLight: "bg-emerald-500/10",
      textColor: "text-emerald-600",
    },
    {
      label: "Needs Boost",
      count: brand.needsBoost,
      percent: (brand.needsBoost / total) * 100,
      color: "bg-blue-500",
      bgLight: "bg-blue-500/10",
      textColor: "text-blue-600",
    },
    {
      label: "Stagnated",
      count: brand.stagnated,
      percent: (brand.stagnated / total) * 100,
      color: "bg-amber-500",
      bgLight: "bg-amber-500/10",
      textColor: "text-amber-600",
    },
    {
      label: "Inactive",
      count: brand.inactive,
      percent: (brand.inactive / total) * 100,
      color: "bg-slate-400",
      bgLight: "bg-slate-400/10",
      textColor: "text-slate-600",
    },
  ];

  return (
    <Link
      href={`/brands/${brand.id}`}
      className="group block rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            {brand.name}
          </h3>
          <p className="text-sm text-muted-foreground">{brand.videos} videos</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">
            {formatNumber(brand.reach)}
          </p>
          <div className="flex items-center justify-end gap-1 text-success">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">reach</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {statusCategories.map((status) => (
          status.count > 0 && (
            <div key={status.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{status.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${status.textColor}`}>
                    {status.count}
                  </span>
                  <span className="text-muted-foreground">
                    {status.percent.toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className={`relative h-2 w-full overflow-hidden rounded-full ${status.bgLight}`}>
                <div
                  className={`h-full rounded-full ${status.color} transition-all duration-700 ease-out`}
                  style={{ width: `${status.percent}%` }}
                />
              </div>
            </div>
          )
        ))}
      </div>

      <div className="mt-5 pt-4 border-t flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Last updated: 2h ago
        </div>
        <div className="flex items-center text-sm font-medium text-primary group-hover:text-accent transition-colors">
          View details
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;
