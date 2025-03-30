
import React from "react";
import { Droplet, Flame, Clock, Heart } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { cn } from "@/lib/utils";

interface GameStatsProps {
  timeRemaining: number;
  maxTime: number;
  waterLevel: number;
  maxWater: number;
  score: number;
  lives: number;
  maxLives: number;
  className?: string;
}

const GameStats = ({
  timeRemaining,
  maxTime,
  waterLevel,
  maxWater,
  score,
  lives,
  maxLives,
  className,
}: GameStatsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isLowTime = timeRemaining < maxTime * 0.25;
  const isLowWater = waterLevel < maxWater * 0.25;
  
  return (
    <div className={cn(
      "game-card p-3 flex flex-col gap-3",
      className
    )}>
      <div className="flex items-center justify-between gap-4">
        {/* Timer */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Clock className={cn(
              "text-white",
              isLowTime && "text-fire-red animate-pulse"
            )} size={16} />
            <span className={cn(
              "text-xs font-medium text-white/70",
              isLowTime && "text-fire-red font-bold"
            )}>
              Time: {formatTime(timeRemaining)}
            </span>
          </div>
          <ProgressBar 
            value={timeRemaining} 
            max={maxTime} 
            color={isLowTime ? "fire" : "default"} 
            size="sm" 
            isAnimated 
          />
        </div>
        
        {/* Score */}
        <div className="flex items-center">
          <div className="bg-fire-red/20 p-2 rounded-lg">
            <span className="text-lg font-baloo font-bold text-white">
              {score.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-4">
        {/* Water level */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Droplet className={cn(
              "text-blue-400",
              isLowWater && "text-fire-red animate-pulse"
            )} size={16} />
            <span className={cn(
              "text-xs font-medium text-white/70",
              isLowWater && "text-fire-red font-bold"
            )}>
              Water: {Math.round((waterLevel / maxWater) * 100)}%
            </span>
          </div>
          <ProgressBar 
            value={waterLevel} 
            max={maxWater} 
            color="water" 
            size="sm" 
            isAnimated 
          />
        </div>
        
        {/* Lives */}
        <div className="flex items-center gap-1">
          {Array.from({ length: maxLives }).map((_, i) => (
            <Heart
              key={i}
              className={cn(
                i < lives ? "text-fire-red fill-fire-red" : "text-white/40",
                i < lives && "animate-fire-pulse"
              )}
              size={20}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameStats;
