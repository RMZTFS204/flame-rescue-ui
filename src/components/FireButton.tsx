
import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FireButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  isAnimated?: boolean;
}

const FireButton = ({
  children,
  className,
  variant = "default",
  size = "default",
  isAnimated = false,
  ...props
}: FireButtonProps) => {
  const baseStyles = "font-baloo font-bold rounded-lg transition-all duration-300 transform focus:outline-none";
  
  const variantStyles = {
    default: "bg-fire-red hover:bg-fire-orange text-white shadow-md hover:shadow-lg",
    outline: "bg-transparent border-2 border-fire-red hover:border-fire-orange text-fire-red hover:text-fire-orange",
    ghost: "bg-transparent hover:bg-fire-red/10 text-fire-red",
  };
  
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    default: "py-2 px-5 text-base",
    lg: "py-3 px-7 text-lg",
  };
  
  const animationStyles = isAnimated ? "hover:scale-105 active:scale-95" : "";
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        animationStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default FireButton;
