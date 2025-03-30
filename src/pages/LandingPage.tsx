
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flame, Truck, Heart, Timer } from "lucide-react";
import FireButton from "@/components/FireButton";
import TruckAnimation from "@/components/TruckAnimation";
import FireAnimation from "@/components/FireAnimation";

const LandingPage = () => {
  const [animateElements, setAnimateElements] = useState(false);
  
  useEffect(() => {
    // Start animations after a short delay to allow page to render
    const timer = setTimeout(() => {
      setAnimateElements(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="game-container relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-dark to-black z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(249,115,22,0.15),transparent_70%)] z-0"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className={`transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Flame className="text-fire-red animate-fire-pulse" size={40} />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              <span className="text-fire-red">Fire</span><span className="text-fire-orange">fighter</span>
            </h1>
            <Flame className="text-fire-orange animate-fire-pulse" size={40} />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
            Rescue Simulator
          </h2>
          
          <p className="text-white/70 text-center max-w-md mx-auto mb-8">
            Control your fire truck, extinguish dangerous fires, and save civilians in this action-packed rescue simulator!
          </p>
        </div>
        
        {/* Fire truck animation */}
        <div className={`mb-12 transition-all duration-1000 delay-300 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            <TruckAnimation size="xl" isSirenActive={true} />
            <div className="absolute -right-10 -bottom-6">
              <FireAnimation size="lg" wind={0.5} />
            </div>
          </div>
        </div>
        
        {/* Game features */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 transition-all duration-1000 delay-500 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="game-card p-4 flex flex-col items-center text-center">
            <Truck className="text-fire-orange mb-3" size={30} />
            <h3 className="text-lg font-bold text-white mb-2">Control Your Truck</h3>
            <p className="text-white/70 text-sm">Drive through city streets with intuitive controls to reach fires quickly.</p>
          </div>
          
          <div className="game-card p-4 flex flex-col items-center text-center">
            <Flame className="text-fire-red mb-3" size={30} />
            <h3 className="text-lg font-bold text-white mb-2">Fight Fires</h3>
            <p className="text-white/70 text-sm">Use your water hose to extinguish fires before they spread too far.</p>
          </div>
          
          <div className="game-card p-4 flex flex-col items-center text-center">
            <Heart className="text-fire-red mb-3" size={30} />
            <h3 className="text-lg font-bold text-white mb-2">Save Civilians</h3>
            <p className="text-white/70 text-sm">Rescue trapped civilians and get them to safety in time.</p>
          </div>
        </div>
        
        {/* Start button */}
        <div className={`transition-all duration-1000 delay-700 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link to="/level-select">
            <FireButton size="lg" isAnimated className="shadow-glow">
              Start Rescue Mission
            </FireButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
