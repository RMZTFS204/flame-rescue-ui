
import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * FireButton Props Interface
 * Defines the properties that can be passed to the FireButton component
 */
interface FireButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"; // Button style variant
  size?: "sm" | "default" | "lg";            // Button size
  isAnimated?: boolean;                      // Whether the button should animate on hover
}

/**
 * FireButton Component
 * 
 * A styled button component with fire-themed design for the Firefighter Rescue Simulator.
 * 
 * @param {ReactNode} children - The content to display inside the button
 * @param {string} className - Additional CSS classes to apply
 * @param {string} variant - Button style: "default", "outline", or "ghost"
 * @param {string} size - Button size: "sm", "default", or "lg"
 * @param {boolean} isAnimated - Whether to apply hover/active animations
 * @param {object} props - Any additional HTML button attributes
 */
const FireButton = ({
  children,
  className,
  variant = "default",
  size = "default",
  isAnimated = false,
  ...props
}: FireButtonProps) => {
  // Base styles applied to all button variants
  const baseStyles = "font-baloo font-bold rounded-lg transition-all duration-300 transform focus:outline-none";
  
  // Style variations based on the variant prop
  const variantStyles = {
    default: "bg-fire-red hover:bg-fire-orange text-white shadow-md hover:shadow-lg",
    outline: "bg-transparent border-2 border-fire-red hover:border-fire-orange text-fire-red hover:text-fire-orange",
    ghost: "bg-transparent hover:bg-fire-red/10 text-fire-red",
  };
  
  // Size variations based on the size prop
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    default: "py-2 px-5 text-base",
    lg: "py-3 px-7 text-lg",
  };
  
  // Animation styles applied conditionally
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
