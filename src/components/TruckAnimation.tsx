
import React from "react";
import { Truck, Siren } from "lucide-react";
import { cn } from "@/lib/utils";

interface TruckAnimationProps {
  size?: "sm" | "md" | "lg" | "xl";
  isSirenActive?: boolean;
  isMoving?: boolean;
  direction?: "left" | "right";
  className?: string;
}

const TruckAnimation = ({
  size = "md",
  isSirenActive = false,
  isMoving = false,
  direction = "right",
  className,
}: TruckAnimationProps) => {
  const sizeMap = {
    sm: { truck: 40, siren: 12 },
    md: { truck: 60, siren: 18 },
    lg: { truck: 80, siren: 24 },
    xl: { truck: 120, siren: 32 },
  };
  
  const getMovementClass = () => {
    if (!isMoving) return "animate-truck-bounce";
    return direction === "right" ? "animate-slide-right" : "animate-slide-left";
  };
  
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center",
        getMovementClass(),
        className
      )}
    >
      {/* Truck */}
      <Truck 
        size={sizeMap[size].truck} 
        className={cn(
          "text-fire-red",
          direction === "left" && "transform scale-x-[-1]"
        )} 
        strokeWidth={1.5}
      />
      
      {/* Siren */}
      {isSirenActive && (
        <div 
          className={cn(
            "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full",
            "animate-siren-flash"
          )}
          style={{
            width: sizeMap[size].siren,
            height: sizeMap[size].siren / 2,
          }}
        >
          <Siren size={sizeMap[size].siren} className="text-white" />
        </div>
      )}
      
      {/* Shadow */}
      <div 
        className="absolute -bottom-2 bg-black/40 rounded-full"
        style={{
          width: sizeMap[size].truck * 0.7,
          height: sizeMap[size].truck * 0.1,
          filter: "blur(2px)",
        }}
      />
    </div>
  );
};

export default TruckAnimation;
