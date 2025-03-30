
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FireAnimationProps {
  intensity?: number; // 0-100
  size?: "sm" | "md" | "lg" | "xl";
  wind?: number; // -1 to 1, negative is left, positive is right
  isActive?: boolean;
  className?: string;
}

const FireAnimation = ({
  intensity = 80,
  size = "md",
  wind = 0,
  isActive = true,
  className,
}: FireAnimationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; speed: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  const sizeConfig = {
    sm: { width: 50, height: 70, particleCount: 15 },
    md: { width: 80, height: 100, particleCount: 25 },
    lg: { width: 120, height: 150, particleCount: 40 },
    xl: { width: 180, height: 220, particleCount: 60 },
  };
  
  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }
    
    // Initialize particles
    const newParticles = [];
    const config = sizeConfig[size];
    const particleCount = Math.floor(config.particleCount * (intensity / 100));
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * config.width,
        y: config.height - Math.random() * 20,
        size: 4 + Math.random() * 8,
        opacity: 0.5 + Math.random() * 0.5,
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    
    setParticles(newParticles);
    
    // Animation loop
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(p => {
          // Apply wind effect
          const windEffect = wind * (p.size / 4);
          
          // Move particles upward and with wind
          const newX = p.x + windEffect;
          const newY = p.y - p.speed;
          
          // Reset particles that go out of bounds
          if (newY < 0 || newX < -10 || newX > config.width + 10) {
            return {
              ...p,
              x: Math.random() * config.width,
              y: config.height,
              size: 4 + Math.random() * 8,
              opacity: 0.5 + Math.random() * 0.5,
              speed: 0.5 + Math.random() * 1.5,
            };
          }
          
          return {
            ...p,
            x: newX,
            y: newY,
          };
        })
      );
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [intensity, size, wind, isActive]);
  
  const config = sizeConfig[size];
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{
        width: config.width,
        height: config.height,
      }}
    >
      {/* Base fire glow */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/4 bg-fire-orange rounded-full filter blur-md opacity-70"
        style={{
          boxShadow: "0 0 15px rgba(249, 115, 22, 0.8)",
        }}
      />
      
      {/* Fire particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-t from-fire-orange to-fire-yellow"
          style={{
            left: p.x,
            bottom: p.y,
            width: p.size,
            height: p.size * 1.5,
            opacity: p.opacity,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
};

export default FireAnimation;
