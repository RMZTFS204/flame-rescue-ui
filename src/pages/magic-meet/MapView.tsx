
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MagicNavbar from "@/components/magic-meet/MagicNavbar";

const MapView: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-magic-background">
      <MagicNavbar />
      
      <div className="container px-4 mx-auto py-6">
        <div className="mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-magic-purple"
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </Button>
        </div>
        
        <h1 className="text-2xl font-enchanted font-bold text-gray-800 mb-6 flex items-center">
          <MapPin className="mr-3" size={24} />
          Character Locations
        </h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-magic-blue/20 p-6 flex items-center justify-center">
          <div className="text-center py-16">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-magic-blue/20 flex items-center justify-center">
              <MapPin size={24} className="text-magic-darkBlue" />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Interactive Map Coming Soon
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Our interactive map is currently under development. Soon you'll be able to see all character locations and find the fastest routes to meet them!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
