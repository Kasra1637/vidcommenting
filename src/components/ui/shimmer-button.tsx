import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const ShimmerButton = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ShimmerButtonProps) => {
  const variants = {
    primary: "shimmer-button text-white",
    secondary: "bg-secondary/20 text-secondary border border-secondary/30",
    ghost: "bg-transparent text-foreground",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};