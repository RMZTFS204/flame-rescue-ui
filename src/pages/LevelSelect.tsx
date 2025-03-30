import React from "react";
import { Link } from "react-router-dom";
import FireButton from "@/components/FireButton";

const LevelSelect = () => {
  const levels = [
    { id: "1", name: "Level 1: The Fire Station" },
    { id: "2", name: "Level 2: Downtown Inferno" },
    { id: "3", name: "Level 3: The High-Rise Rescue" },
    { id: "4", name: "Level 4: The Chemical Plant" },
    { id: "5", name: "Level 5: The Forest Fire" },
  ];

  return (
    <div className="min-h-screen bg-neutral-dark text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-baloo font-bold mb-8 text-center">Firefighter Rescue Simulator</h1>
      <h2 className="text-2xl font-baloo mb-12 text-center">Select a Level</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level) => (
          <Link to={`/game/${level.id}`} key={level.id}>
            <FireButton className="w-full">
              {level.name}
            </FireButton>
          </Link>
        ))}
      </div>
      
      <div className="mt-10">
        <Link to="/magic-meet">
          <FireButton
            variant="outline"
            className="text-lg px-8 py-3 hover:bg-fire-red/10"
          >
            Try MyMagicMeet
          </FireButton>
        </Link>
      </div>
    </div>
  );
};

export default LevelSelect;
