
import React from "react";
import { Flame, Lock } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { cn } from "@/lib/utils";

interface LevelCardProps {
  level: number;
  title: string;
  isLocked: boolean;
  fireProgress: number;
  isSelected?: boolean;
  onSelect: () => void;
  className?: string;
}

const LevelCard = ({
  level,
  title,
  isLocked,
  fireProgress,
  isSelected = false,
  onSelect,
  className,
}: LevelCardProps) => {
  return (
    <div
      className={cn(
        "level-card cursor-pointer",
        isLocked && "level-locked pointer-events-none",
        isSelected && "border-fire-orange scale-105",
        className
      )}
      onClick={isLocked ? undefined : onSelect}
    >
      <div className="absolute top-2 right-2">
        {isLocked ? (
          <Lock className="text-white/60" size={20} />
        ) : (
          <Flame 
            className={cn(
              "text-fire-orange",
              !isLocked && "animate-fire-pulse"
            )} 
            size={22} 
          />
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-1 text-white">Level {level}</h3>
      <p className="text-white/70 text-sm mb-3">{title}</p>
      
      <div className="flex items-center gap-2 mb-2">
        <Flame className="text-fire-orange" size={16} />
        <span className="text-xs text-white/70">Fire intensity:</span>
      </div>
      
      <ProgressBar 
        value={fireProgress} 
        max={100} 
        color="fire" 
        size="sm" 
      />
      
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
          <Lock className="text-white/80" size={28} />
        </div>
      )}
    </div>
  );
};

export default LevelCard;
