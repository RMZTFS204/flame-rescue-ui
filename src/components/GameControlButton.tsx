
import React from "react";
import { cn } from "@/lib/utils";

interface GameControlButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  isAnimated?: boolean;
  animationClass?: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GameControlButton = ({
  icon,
  label,
  onClick,
  isActive = false,
  isAnimated = false,
  animationClass = "",
  variant = "primary",
  size = "md",
  className,
}: GameControlButtonProps) => {
  const variantStyles = {
    primary: "bg-white/20 hover:bg-white/30 text-white border border-white/30",
    secondary: "bg-blue-500/70 hover:bg-blue-500/90 text-white border border-blue-400/50",
    danger: "bg-fire-red/70 hover:bg-fire-red/90 text-white border border-fire-orange/50",
  };
  
  const sizeStyles = {
    sm: "p-2 text-xs",
    md: "p-3 text-sm",
    lg: "p-4 text-base",
  };
  
  const getIconSize = () => {
    switch (size) {
      case "sm": return 16;
      case "lg": return 24;
      default: return 20;
    }
  };
  
  const activeClass = isActive ? "ring-2 ring-white ring-opacity-50" : "";
  const animatedClass = isAnimated ? "transform hover:scale-105 active:scale-95" : "";
  
  return (
    <button
      className={cn(
        "rounded-full backdrop-blur-md transition-all duration-200 flex flex-col items-center justify-center gap-1",
        variantStyles[variant],
        sizeStyles[size],
        activeClass,
        animatedClass,
        isActive && animationClass,
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement, { size: getIconSize() })}
      </div>
      {label && <span className="font-medium">{label}</span>}
    </button>
  );
};

export default GameControlButton;
