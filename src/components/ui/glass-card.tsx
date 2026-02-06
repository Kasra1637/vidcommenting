import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "accent" | "subtle" | "none";
  variant?: "default" | "elevated" | "flat";
}

export const GlassCard = ({
  children,
  className,
  hover = true,
  glow = "none",
  variant = "default",
  ...props
}: GlassCardProps) => {
  const glowStyles = {
    cyan: "glass-card-glow",
    accent: "glass-card-glow",
    subtle: "",
    none: "",
  };

  const variantStyles = {
    default: "",
    elevated: "shadow-xl",
    flat: "shadow-none border-transparent",
  };

  return (
    <motion.div
      className={cn(
        "glass-card p-6",
        hover && "hover-lift cursor-pointer",
        glowStyles[glow],
        variantStyles[variant],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={hover ? { scale: 1.01 } : undefined}
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
