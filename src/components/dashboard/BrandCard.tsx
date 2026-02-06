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
  return (
    <Link
      href={`/brands/${brand.id}`}
      className="group block rounded-xl border bg-card p-5 transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground transition-colors">
            {brand.name}
          </h3>
          <p className="text-sm text-muted-foreground">{brand.videos} videos</p>
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

      <div className="mt-4 flex flex-wrap gap-2">
        {brand.performing > 0 && (
          <span className="status-badge status-performing">
            {brand.performing} performing
          </span>
        )}
        {brand.stagnated > 0 && (
          <span className="status-badge status-stagnated">
            {brand.stagnated} stagnated
          </span>
        )}
        {brand.needsBoost > 0 && (
          <span className="status-badge status-needs-boost">
            {brand.needsBoost} need boost
          </span>
        )}
        {brand.inactive > 0 && (
          <span className="status-badge status-inactive">
            {brand.inactive} inactive
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center text-sm text-muted-foreground group-hover:text-accent transition-colors">
        View details
        <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </Link>
  );
};

export default BrandCard;
