import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "purple" | "cyan" | "none";
}

export const GlassCard = ({
  children,
  className,
  hover = true,
  glow = "none",
  ...props
}: GlassCardProps) => {
  const glowStyles = {
    purple: "hover:shadow-md",
    cyan: "hover:shadow-md",
    none: "",
  };

  return (
    <motion.div
      className={cn(
        "glass-card p-6",
        hover && "hover-lift refract-hover cursor-pointer",
        glowStyles[glow],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface BentoCardProps extends GlassCardProps {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const BentoCard = ({
  children,
  className,
  size = "md",
  ...props
}: BentoCardProps) => {
  const sizeClasses = {
    sm: "bento-sm",
    md: "bento-md",
    lg: "bento-lg",
    xl: "bento-xl",
    full: "bento-full",
  };

  return (
    <GlassCard
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      {children}
    </GlassCard>
  );
};

export const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("bento-grid", className)}>
      {children}
    </div>
  );
};