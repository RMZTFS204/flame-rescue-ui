
import React from "react";
import { cn } from "@/lib/utils";

interface WaterEffectProps {
  isActive: boolean;
  direction?: "up" | "down" | "left" | "right";
  intensity?: number; // 0-100
  className?: string;
}

const WaterEffect = ({
  isActive,
  direction = "right",
  intensity = 80,
  className,
}: WaterEffectProps) => {
  if (!isActive) return null;
  
  const getSprayStyles = () => {
    const baseStyles = {
      transformOrigin: "left center",
    };
    
    // Calculate length based on intensity
    const length = 50 + (intensity / 2);
    
    switch (direction) {
      case "up":
        return {
          ...baseStyles,
          width: "10px",
          height: `${length}px`,
          transformOrigin: "center bottom",
          transform: "rotate(-90deg)",
        };
      case "down":
        return {
          ...baseStyles,
          width: "10px",
          height: `${length}px`,
          transformOrigin: "center top",
          transform: "rotate(90deg)",
        };
      case "left":
        return {
          ...baseStyles,
          width: `${length}px`,
          height: "10px",
          transform: "rotate(180deg)",
          transformOrigin: "right center",
        };
      case "right":
      default:
        return {
          ...baseStyles,
          width: `${length}px`,
          height: "10px",
        };
    }
  };
  
  const dropletCount = Math.floor(10 * (intensity / 100));
  
  const sprayStyles = getSprayStyles();
  
  return (
    <div className={cn("relative", className)}>
      {/* Main water stream */}
      <div
        className="absolute bg-water-gradient rounded-r-full opacity-80"
        style={sprayStyles}
      />
      
      {/* Water droplets */}
      {Array.from({ length: dropletCount }).map((_, i) => {
        const size = 3 + Math.random() * 4;
        const offset = Math.random() * 100;
        const delay = Math.random() * 0.5;
        
        const getDropletPosition = () => {
          switch (direction) {
            case "up":
              return {
                left: `calc(50% + ${-5 + Math.random() * 10}px)`,
                bottom: `${offset}%`,
              };
            case "down":
              return {
                left: `calc(50% + ${-5 + Math.random() * 10}px)`,
                top: `${offset}%`,
              };
            case "left":
              return {
                right: `${offset}%`,
                top: `calc(50% + ${-5 + Math.random() * 10}px)`,
              };
            case "right":
            default:
              return {
                left: `${offset}%`,
                top: `calc(50% + ${-5 + Math.random() * 10}px)`,
              };
          }
        };
        
        return (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 animate-water-flow"
            style={{
              width: size,
              height: size,
              opacity: 0.6 + Math.random() * 0.4,
              ...getDropletPosition(),
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default WaterEffect;
