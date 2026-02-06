import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DataValueProps {
  value: string | number;
  label?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const DataValue = ({
  value,
  label,
  change,
  changeType = "neutral",
  size = "md",
  className,
}: DataValueProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  const changeColors = {
    positive: "text-secondary",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          {label}
        </span>
      )}
      <motion.span
        className={cn("font-mono font-semibold text-foreground", sizeClasses[size])}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.span>
      {change && (
        <span className={cn("text-xs font-mono mt-1", changeColors[changeType])}>
          {change}
        </span>
      )}
    </div>
  );
};

interface TimestampProps {
  time: string;
  className?: string;
}

export const Timestamp = ({ time, className }: TimestampProps) => {
  return (
    <span className={cn("font-mono text-xs text-muted-foreground", className)}>
      {time}
    </span>
  );
};

interface ViralScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const ViralScore = ({
  score,
  size = "md",
  showLabel = true,
  className,
}: ViralScoreProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-gradient-cyan";
    if (score >= 70) return "text-gradient-purple";
    return "text-muted-foreground";
  };

  const getGlowColor = (score: number) => {
    if (score >= 90) return "cyan-glow";
    if (score >= 70) return "ai-glow-subtle";
    return "";
  };

  return (
    <div className={cn("text-center", className)}>
      {showLabel && (
        <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
          Viral Score
        </span>
      )}
      <motion.span
        className={cn(
          "font-mono font-bold inline-block rounded-lg px-3 py-1",
          sizeClasses[size],
          getScoreColor(score),
          getGlowColor(score)
        )}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {score}
      </motion.span>
    </div>
  );
};