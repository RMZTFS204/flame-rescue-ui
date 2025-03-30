
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Flame } from "lucide-react";
import FireButton from "@/components/FireButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="game-container flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-dark to-black z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(249,115,22,0.1),transparent_70%)] z-0"></div>
      
      <div className="relative z-10 text-center p-6">
        <Flame className="text-fire-red animate-fire-pulse mx-auto mb-4" size={60} />
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-white/70 mb-6">
          Oops! This fire alarm location doesn't exist.
        </p>
        <Link to="/">
          <FireButton isAnimated>
            Return to Base
          </FireButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
