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
  const performingPercent = (brand.performing / total) * 100;
  const stagnatedPercent = (brand.stagnated / total) * 100;
  const needsBoostPercent = (brand.needsBoost / total) * 100;
  const inactivePercent = (brand.inactive / total) * 100;

  return (
    <Link
      href={`/brands/${brand.id}`}
      className="group block rounded-xl border border-transparent bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-foreground transition-colors">
            {brand.name}
          </h3>
          <p className="text-sm text-muted-foreground">{brand.videos} videos tracked</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">
            {formatNumber(brand.reach)}
          </p>
          <div className="flex items-center gap-1 text-success">
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs">reach</span>
          </div>
        </div>
      </div>

      {/* Performance Distribution Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Performance Distribution</span>
          <span>{total} total</span>
        </div>

        {/* Stacked Bar */}
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/50">
          <div className="flex h-full">
            {brand.performing > 0 && (
              <div
                className="h-full bg-gradient-to-r from-secondary to-secondary/80 transition-all duration-500 group-hover:brightness-110"
                style={{ width: `${performingPercent}%` }}
              />
            )}
            {brand.stagnated > 0 && (
              <div
                className="h-full bg-gradient-to-r from-warning to-warning/80 transition-all duration-500 group-hover:brightness-110"
                style={{ width: `${stagnatedPercent}%` }}
              />
            )}
            {brand.needsBoost > 0 && (
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 group-hover:brightness-110"
                style={{ width: `${needsBoostPercent}%` }}
              />
            )}
            {brand.inactive > 0 && (
              <div
                className="h-full bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/20 transition-all duration-500 group-hover:brightness-110"
                style={{ width: `${inactivePercent}%` }}
              />
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {brand.performing > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{brand.performing}</span> performing
              </span>
            </div>
          )}
          {brand.stagnated > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-warning" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{brand.stagnated}</span> stagnated
              </span>
            </div>
          )}
          {brand.needsBoost > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{brand.needsBoost}</span> need boost
              </span>
            </div>
          )}
          {brand.inactive > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{brand.inactive}</span> inactive
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center text-sm text-muted-foreground group-hover:text-accent transition-colors">
        View details
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default BrandCard;
