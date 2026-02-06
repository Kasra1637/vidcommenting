import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlowInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const GlowInput = forwardRef<HTMLInputElement, GlowInputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="glow-input flex items-center gap-3 rounded-xl px-4 py-3">
        {icon && (
          <span className="text-muted-foreground">{icon}</span>
        )}
        <input
          ref={ref}
          className={cn(
            "flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

GlowInput.displayName = "GlowInput";

interface GlowTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode;
}

export const GlowTextarea = forwardRef<HTMLTextAreaElement, GlowTextareaProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="glow-input flex items-start gap-3 rounded-xl px-4 py-3">
        {icon && (
          <span className="mt-1 text-muted-foreground">{icon}</span>
        )}
        <textarea
          ref={ref}
          className={cn(
            "flex-1 min-h-[100px] resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

GlowTextarea.displayName = "GlowTextarea";