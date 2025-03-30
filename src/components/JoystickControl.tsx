
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface JoystickControlProps {
  onMove: (x: number, y: number) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const JoystickControl = ({
  onMove,
  size = "md",
  className,
}: JoystickControlProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);
  
  const sizeConfig = {
    sm: { base: "w-24 h-24", handle: "w-10 h-10" },
    md: { base: "w-32 h-32", handle: "w-14 h-14" },
    lg: { base: "w-40 h-40", handle: "w-16 h-16" },
  };
  
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    updatePosition(clientX, clientY);
  };
  
  const handleMove = (clientX: number, clientY: number) => {
    if (isDragging) {
      updatePosition(clientX, clientY);
    }
  };
  
  const handleEnd = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    onMove(0, 0);
  };
  
  const updatePosition = (clientX: number, clientY: number) => {
    if (!joystickRef.current) return;
    
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let dx = clientX - centerX;
    let dy = clientY - centerY;
    
    // Normalize to radius
    const radius = rect.width / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > radius) {
      dx = (dx / distance) * radius;
      dy = (dy / distance) * radius;
    }
    
    // Normalize values between -1 and 1
    const normalizedX = dx / radius;
    const normalizedY = dy / radius;
    
    setPosition({ x: dx, y: dy });
    onMove(normalizedX, normalizedY);
  };
  
  // Touch event handlers
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    
    const handleTouchEnd = () => {
      handleEnd();
    };
    
    const joystick = joystickRef.current;
    if (joystick) {
      joystick.addEventListener("touchstart", handleTouchStart, { passive: false });
      joystick.addEventListener("touchmove", handleTouchMove, { passive: false });
      joystick.addEventListener("touchend", handleTouchEnd);
    }
    
    return () => {
      if (joystick) {
        joystick.removeEventListener("touchstart", handleTouchStart);
        joystick.removeEventListener("touchmove", handleTouchMove);
        joystick.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isDragging]);
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX, e.clientY);
  };
  
  const handleMouseUp = () => {
    handleEnd();
  };
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove as unknown as EventListener);
      window.addEventListener("mouseup", handleMouseUp);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as unknown as EventListener);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  
  return (
    <div 
      ref={joystickRef}
      className={cn(
        "joystick-base touch-none",
        sizeConfig[size].base,
        className
      )}
      onMouseDown={handleMouseDown}
    >
      <div 
        className={cn(
          "joystick-handle",
          sizeConfig[size].handle,
          isDragging && "cursor-grabbing"
        )}
        style={{
          left: `calc(50% + ${position.x}px)`,
          top: `calc(50% + ${position.y}px)`,
        }}
      />
    </div>
  );
};

export default JoystickControl;
