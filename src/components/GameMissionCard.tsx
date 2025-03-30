
import React from "react";
import { Check, X, Timer, Flame, Droplet, Heart, ArrowRight } from "lucide-react";
import FireButton from "./FireButton";
import { cn } from "@/lib/utils";

interface MissionStat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

interface GameMissionCardProps {
  title: string;
  description: string;
  isSuccess: boolean;
  stats: MissionStat[];
  onRetry: () => void;
  onNext?: () => void;
  className?: string;
}

const GameMissionCard = ({
  title,
  description,
  isSuccess,
  stats,
  onRetry,
  onNext,
  className,
}: GameMissionCardProps) => {
  return (
    <div className={cn(
      "game-card max-w-md mx-auto p-6 flex flex-col items-center text-center",
      className
    )}>
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center mb-4",
        isSuccess ? "bg-green-500/20" : "bg-fire-red/20"
      )}>
        {isSuccess ? (
          <Check className="text-green-500" size={32} />
        ) : (
          <X className="text-fire-red" size={32} />
        )}
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-white">
        {isSuccess ? "Mission Complete!" : "Mission Failed"}
      </h2>
      
      <h3 className="text-xl font-medium mb-1 text-white/90">{title}</h3>
      <p className="text-white/70 mb-6">{description}</p>
      
      {/* Stats */}
      <div className="w-full bg-white/5 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-white/60 mb-3 uppercase">Mission Stats</h4>
        
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2 text-white/80">
              {React.cloneElement(stat.icon as React.ReactElement, { size: 16 })}
              <span className="text-sm">{stat.label}:</span>
              <span className="text-sm font-bold ml-auto">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-4">
        <FireButton 
          variant="outline" 
          onClick={onRetry}
          isAnimated
        >
          Try Again
        </FireButton>
        
        {isSuccess && onNext && (
          <FireButton
            onClick={onNext}
            isAnimated
            className="flex items-center gap-2"
          >
            Next Level
            <ArrowRight size={16} />
          </FireButton>
        )}
      </div>
    </div>
  );
};

export default GameMissionCard;
