
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flame, Droplet, HeartPulse, Siren, Home, ArrowLeft, Timer, AlertTriangle } from "lucide-react";
import JoystickControl from "@/components/JoystickControl";
import GameControlButton from "@/components/GameControlButton";
import GameStats from "@/components/GameStats";
import WaterEffect from "@/components/WaterEffect";
import FireAnimation from "@/components/FireAnimation";
import TruckAnimation from "@/components/TruckAnimation";
import GameMissionCard from "@/components/GameMissionCard";
import ProgressBar from "@/components/ProgressBar";

const GameScreen = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  
  // Game state
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes
  const [waterLevel, setWaterLevel] = useState(100);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  
  // Game play state
  const [truckPosition, setTruckPosition] = useState({ x: 50, y: 50 });
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [isWaterActive, setIsWaterActive] = useState(false);
  const [waterDirection, setWaterDirection] = useState<"up" | "down" | "left" | "right">("right");
  const [fireIntensity, setFireIntensity] = useState(80);
  const [windDirection, setWindDirection] = useState(0.2); // slight wind to right
  const [rescueInProgress, setRescueInProgress] = useState(false);
  const [civilianHealth, setCivilianHealth] = useState(70);
  const [showCivilianAlert, setShowCivilianAlert] = useState(true);
  
  // Handle truck movement
  const handleJoystickMove = (x: number, y: number) => {
    if (isPaused || isGameOver) return;
    
    // Update truck position (with bounds checking)
    setTruckPosition(prev => ({
      x: Math.max(10, Math.min(90, prev.x + x * 2)),
      y: Math.max(10, Math.min(90, prev.y + y * 2)),
    }));
    
    // Set water direction based on movement
    if (Math.abs(x) > Math.abs(y)) {
      // Horizontal movement is greater
      setWaterDirection(x > 0 ? "right" : "left");
    } else if (Math.abs(y) > 0.1) {
      // Vertical movement is greater
      setWaterDirection(y > 0 ? "down" : "up");
    }
  };
  
  // Toggle siren
  const toggleSiren = () => {
    if (isPaused || isGameOver) return;
    setIsSirenActive(prev => !prev);
    
    // Increase score when siren is active (clearing path)
    if (!isSirenActive) {
      setScore(prev => prev + 50);
    }
  };
  
  // Toggle water hose
  const toggleWater = () => {
    if (isPaused || isGameOver) return;
    setIsWaterActive(prev => !prev);
    
    // If turning on water, check if it affects the fire
    if (!isWaterActive && isNearFire()) {
      fightFire();
    }
  };
  
  // Check if truck is near fire
  const isNearFire = () => {
    // In a real game, this would check actual collision/proximity
    // For this demo, we'll use a simple distance-based check
    const distanceToFire = Math.sqrt(
      Math.pow(truckPosition.x - 65, 2) + 
      Math.pow(truckPosition.y - 30, 2)
    );
    
    return distanceToFire < 30; // Arbitrary distance threshold
  };
  
  // Check if truck is near civilian
  const isNearCivilian = () => {
    // Similar to isNearFire
    const distanceToCivilian = Math.sqrt(
      Math.pow(truckPosition.x - 75, 2) + 
      Math.pow(truckPosition.y - 75, 2)
    );
    
    return distanceToCivilian < 20;
  };
  
  // Fight fire logic
  const fightFire = () => {
    if (waterLevel <= 0) return;
    
    // Decrease fire intensity when water is active and truck is near fire
    const interval = setInterval(() => {
      if (isWaterActive && isNearFire() && waterLevel > 0) {
        setFireIntensity(prev => Math.max(0, prev - 2));
        setWaterLevel(prev => Math.max(0, prev - 1));
        setScore(prev => prev + 10);
        
        // If fire is extinguished
        if (fireIntensity <= 5) {
          clearInterval(interval);
          setIsWaterActive(false);
          setScore(prev => prev + 500); // Bonus for extinguishing
        }
      } else {
        clearInterval(interval);
      }
    }, 500);
    
    return () => clearInterval(interval);
  };
  
  // Perform rescue
  const performRescue = () => {
    if (isPaused || isGameOver || !isNearCivilian()) return;
    
    setRescueInProgress(true);
    
    // Simulate rescue taking time
    setTimeout(() => {
      setRescueInProgress(false);
      setShowCivilianAlert(false);
      setScore(prev => prev + 1000); // Big bonus for rescue
    }, 3000);
  };
  
  // Check for game over
  useEffect(() => {
    if (fireIntensity <= 5 && !showCivilianAlert) {
      // Mission success!
      setIsGameOver(true);
      setIsSuccess(true);
    } else if (timeRemaining <= 0 || lives <= 0) {
      // Mission failed
      setIsGameOver(true);
      setIsSuccess(false);
    }
  }, [fireIntensity, showCivilianAlert, timeRemaining, lives]);
  
  // Timer countdown
  useEffect(() => {
    if (isPaused || isGameOver) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPaused, isGameOver]);
  
  // Simulate fire spreading
  useEffect(() => {
    if (isPaused || isGameOver) return;
    
    const fireSpreadInterval = setInterval(() => {
      if (fireIntensity < 100 && !isWaterActive) {
        setFireIntensity(prev => Math.min(100, prev + 0.5));
      }
    }, 2000);
    
    return () => clearInterval(fireSpreadInterval);
  }, [isPaused, isGameOver, isWaterActive, fireIntensity]);
  
  // Water level regeneration
  useEffect(() => {
    if (isPaused || isGameOver) return;
    
    const waterRegenInterval = setInterval(() => {
      if (!isWaterActive && waterLevel < 100) {
        setWaterLevel(prev => Math.min(100, prev + 1));
      }
    }, 1000);
    
    return () => clearInterval(waterRegenInterval);
  }, [isPaused, isGameOver, isWaterActive, waterLevel]);
  
  // Civilian health decrease when fire is intense
  useEffect(() => {
    if (isPaused || isGameOver || !showCivilianAlert) return;
    
    const civilianDamageInterval = setInterval(() => {
      if (fireIntensity > 50) {
        setCivilianHealth(prev => {
          const newHealth = Math.max(0, prev - 1);
          
          // If civilian dies
          if (newHealth <= 0) {
            setShowCivilianAlert(false);
            setLives(prev => prev - 1);
          }
          
          return newHealth;
        });
      }
    }, 1000);
    
    return () => clearInterval(civilianDamageInterval);
  }, [isPaused, isGameOver, showCivilianAlert, fireIntensity]);
  
  const handleRetry = () => {
    // Reset game state
    setIsGameOver(false);
    setIsSuccess(false);
    setTimeRemaining(180);
    setWaterLevel(100);
    setLives(3);
    setScore(0);
    setFireIntensity(80);
    setTruckPosition({ x: 50, y: 50 });
    setIsSirenActive(false);
    setIsWaterActive(false);
    setRescueInProgress(false);
    setCivilianHealth(70);
    setShowCivilianAlert(true);
  };
  
  const handleNextLevel = () => {
    const nextLevelId = Number(levelId) + 1;
    if (nextLevelId <= 5) {
      navigate(`/game/${nextLevelId}`);
      handleRetry();
    } else {
      navigate("/level-select");
    }
  };
  
  const handlePause = () => {
    setIsPaused(prev => !prev);
  };
  
  return (
    <div className="game-container">
      {/* Game world */}
      <div className="relative w-full h-screen bg-neutral-dark overflow-hidden">
        {/* Fire animation */}
        <div style={{ position: "absolute", left: "65%", top: "30%" }}>
          <FireAnimation 
            intensity={fireIntensity} 
            size="lg" 
            wind={windDirection} 
            isActive={!isGameOver} 
          />
        </div>
        
        {/* Truck */}
        <div 
          style={{ 
            position: "absolute", 
            left: `${truckPosition.x}%`, 
            top: `${truckPosition.y}%`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.2s, top 0.2s",
            zIndex: 20,
          }}
        >
          <TruckAnimation 
            size="md" 
            isSirenActive={isSirenActive}
            direction={waterDirection === "left" ? "left" : "right"} 
          />
          
          {/* Water effect */}
          {isWaterActive && (
            <div 
              style={{ 
                position: "absolute", 
                left: waterDirection === "left" ? "-80%" : "80%",
                top: "50%",
                transform: "translateY(-50%)",
                width: "80px",
                height: "20px",
              }}
            >
              <WaterEffect 
                isActive={isWaterActive} 
                direction={waterDirection}
                intensity={waterLevel} 
              />
            </div>
          )}
        </div>
        
        {/* Civilian in danger */}
        {showCivilianAlert && (
          <div 
            style={{ 
              position: "absolute", 
              left: "75%", 
              top: "75%", 
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <div className="relative">
              <div className="animate-float">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
              </div>
              
              {/* Health bar */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12">
                <ProgressBar 
                  value={civilianHealth} 
                  max={100} 
                  color={civilianHealth < 30 ? "fire" : "health"} 
                  size="sm" 
                />
              </div>
              
              {/* Alert indicator */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-danger-flash">
                <AlertTriangle className="text-fire-red" size={24} />
              </div>
            </div>
          </div>
        )}
        
        {/* Rescue progress */}
        {rescueInProgress && (
          <div 
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg max-w-xs text-center">
              <HeartPulse className="text-fire-red animate-pulse mx-auto mb-3" size={40} />
              <h3 className="text-xl font-bold text-white mb-2">Rescue in Progress</h3>
              <p className="text-white/70 mb-4">Stay still while rescuing the civilian!</p>
              <ProgressBar 
                value={rescueInProgress ? 50 : 0} 
                max={100} 
                color="health" 
                size="md" 
                isAnimated 
              />
            </div>
          </div>
        )}
        
        {/* Pause overlay */}
        {isPaused && !isGameOver && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg max-w-xs text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Game Paused</h2>
              <div className="space-y-3">
                <button 
                  className="bg-white/20 hover:bg-white/30 text-white py-2 px-6 rounded-lg w-full"
                  onClick={handlePause}
                >
                  Resume
                </button>
                <button 
                  className="bg-white/20 hover:bg-white/30 text-white py-2 px-6 rounded-lg w-full"
                  onClick={() => navigate("/level-select")}
                >
                  Exit to Menu
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Game over overlay */}
        {isGameOver && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <GameMissionCard
              title={`Level ${levelId}`}
              description={isSuccess 
                ? "You successfully extinguished the fire and rescued all civilians!"
                : "You failed to complete all the mission objectives in time."
              }
              isSuccess={isSuccess}
              stats={[
                { label: "Score", value: score, icon: <Flame size={16} /> },
                { label: "Time Left", value: `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`, icon: <Timer size={16} /> },
                { label: "Water Used", value: `${100 - waterLevel}%`, icon: <Droplet size={16} /> },
                { label: "Lives", value: lives, icon: <HeartPulse size={16} /> },
              ]}
              onRetry={handleRetry}
              onNext={isSuccess ? handleNextLevel : undefined}
            />
          </div>
        )}
        
        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top UI */}
          <div className="absolute top-4 left-4 right-4 pointer-events-auto">
            <div className="flex items-center justify-between">
              <button 
                className="bg-white/10 backdrop-blur-md p-2 rounded-full"
                onClick={handlePause}
              >
                {isPaused ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                )}
              </button>
              
              <GameStats
                timeRemaining={timeRemaining}
                maxTime={180}
                waterLevel={waterLevel}
                maxWater={100}
                score={score}
                lives={lives}
                maxLives={3}
                className="flex-1 mx-4"
              />
              
              <button 
                className="bg-white/10 backdrop-blur-md p-2 rounded-full"
                onClick={() => navigate("/level-select")}
              >
                <Home className="text-white" size={24} />
              </button>
            </div>
          </div>
          
          {/* Rescue button */}
          {isNearCivilian() && showCivilianAlert && (
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
              <button 
                className="rescue-button animate-fire-pulse"
                onClick={performRescue}
              >
                <HeartPulse size={20} />
                <span>Rescue!</span>
              </button>
            </div>
          )}
          
          {/* Controls */}
          <div className="absolute bottom-6 w-full flex items-center justify-between px-6 pointer-events-auto">
            {/* Joystick */}
            <div>
              <JoystickControl 
                onMove={handleJoystickMove}
                size="lg"
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col gap-4">
              <GameControlButton 
                icon={<Siren />}
                label="Siren"
                onClick={toggleSiren}
                isActive={isSirenActive}
                isAnimated
                animationClass="animate-siren-flash"
                variant="danger"
              />
              
              <GameControlButton 
                icon={<Droplet />}
                label="Water"
                onClick={toggleWater}
                isActive={isWaterActive}
                isAnimated
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
