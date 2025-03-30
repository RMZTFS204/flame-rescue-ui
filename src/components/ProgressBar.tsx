
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  color?: "fire" | "water" | "health" | "default";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  isAnimated?: boolean;
}

const ProgressBar = ({
  value,
  max,
  className,
  color = "default",
  showText = false,
  size = "md",
  isAnimated = false,
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const containerSizes = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  };
  
  const barColors = {
    fire: "bg-gradient-to-r from-fire-red to-fire-orange",
    water: "bg-gradient-to-r from-blue-500 to-blue-400",
    health: "bg-gradient-to-r from-green-500 to-green-400",
    default: "bg-blue-600",
  };
  
  const animation = isAnimated ? "transition-all duration-500 ease-out" : "";
  
  return (
    <div className="w-full">
      <div className={cn("w-full bg-white/20 rounded-full overflow-hidden", containerSizes[size], className)}>
        <div
          className={cn(barColors[color], animation, containerSizes[size])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="mt-1 text-xs font-medium text-white/70 text-right">
          {value}/{max}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
