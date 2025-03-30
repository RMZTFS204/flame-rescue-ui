
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Flame } from "lucide-react";
import LevelCard from "@/components/LevelCard";
import FireButton from "@/components/FireButton";

const LEVELS = [
  { 
    level: 1, 
    title: "Suburban House Fire", 
    isLocked: false, 
    fireProgress: 35, 
    description: "A house in the suburbs has caught fire. Put out the flames and save the family!" 
  },
  { 
    level: 2, 
    title: "Downtown Apartment", 
    isLocked: false, 
    fireProgress: 50, 
    description: "Multiple apartments are on fire in downtown. This is more challenging!" 
  },
  { 
    level: 3, 
    title: "Office Building", 
    isLocked: false, 
    fireProgress: 65, 
    description: "A 10-story office building is burning. Many people need to be rescued!" 
  },
  { 
    level: 4, 
    title: "Chemical Plant", 
    isLocked: true, 
    fireProgress: 80, 
    description: "Dangerous chemical fire! Be careful with your approach." 
  },
  { 
    level: 5, 
    title: "Forest Wildfire", 
    isLocked: true, 
    fireProgress: 95, 
    description: "A massive forest fire is threatening the nearby town. Can you contain it?" 
  },
];

const LevelSelect = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const handleLevelSelect = (levelIndex: number) => {
    if (!LEVELS[levelIndex].isLocked) {
      setSelectedLevel(levelIndex);
    }
  };
  
  const handleStartLevel = () => {
    if (selectedLevel !== null) {
      navigate(`/game/${selectedLevel + 1}`);
    }
  };
  
  const getSelectedLevelDetails = () => {
    if (selectedLevel === null) return null;
    return LEVELS[selectedLevel];
  };
  
  const selectedLevelInfo = getSelectedLevelDetails();
  
  return (
    <div className="game-container relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-dark to-black z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(249,115,22,0.1),transparent_70%)] z-0"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <Link to="/">
            <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Home size={20} />
              <span className="font-medium">Home</span>
            </button>
          </Link>
          
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Flame className="text-fire-red" size={24} />
            Select Mission
          </h1>
          
          <div className="w-20"></div> {/* Spacer for balance */}
        </header>
        
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Levels grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {LEVELS.map((level, index) => (
                <LevelCard
                  key={index}
                  level={level.level}
                  title={level.title}
                  isLocked={level.isLocked}
                  fireProgress={level.fireProgress}
                  isSelected={selectedLevel === index}
                  onSelect={() => handleLevelSelect(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Level details */}
          <div className="md:w-80 lg:w-96">
            <div className="game-card p-6 h-full">
              {selectedLevelInfo ? (
                <>
                  <h2 className="text-xl font-bold text-white mb-1">Level {selectedLevelInfo.level}</h2>
                  <h3 className="text-lg text-fire-orange mb-4">{selectedLevelInfo.title}</h3>
                  
                  <div className="mb-6">
                    <p className="text-white/70 mb-4">{selectedLevelInfo.description}</p>
                    
                    <div className="bg-white/5 p-3 rounded-lg mb-4">
                      <h4 className="text-sm font-medium text-white/60 mb-2">Mission Objectives:</h4>
                      <ul className="text-white/80 text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <Flame className="text-fire-red mt-0.5 flex-shrink-0" size={16} />
                          <span>Extinguish all fire hotspots</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="text-fire-orange mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="10" r="3" />
                            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                          </svg>
                          <span>Rescue all civilians in danger</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="text-blue-400 mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>Complete mission within time limit</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="text-center">
                      <FireButton 
                        onClick={handleStartLevel}
                        isAnimated
                        className="w-full"
                      >
                        Start Mission
                      </FireButton>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Flame className="text-fire-orange mb-3 opacity-50" size={40} />
                  <h3 className="text-lg font-medium text-white/70 mb-2">Select a Mission</h3>
                  <p className="text-white/50 text-sm">
                    Choose a level from the left to view mission details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
