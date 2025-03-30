
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MagicNavbar from "@/components/magic-meet/MagicNavbar";
import CharacterCard from "@/components/magic-meet/CharacterCard";
import { magicMeetService } from '@/services/magicMeetService';

const FavoritesList: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: favoriteCharacters = [], isLoading } = useQuery({
    queryKey: ['favoriteCharacters'],
    queryFn: magicMeetService.getFavoriteCharacters
  });
  
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
          <Heart className="mr-3" size={24} />
          Your Favorite Characters
        </h1>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading favorites...</p>
          </div>
        ) : favoriteCharacters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteCharacters.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-magic-blue/20 p-6 text-center">
            <div className="py-10">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-magic-blue/20 flex items-center justify-center">
                <Heart size={24} className="text-magic-darkBlue" />
              </div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                No Favorites Yet
              </h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                You haven't added any characters to your favorites list yet. Find characters you love and add them to your favorites!
              </p>
              <Button 
                onClick={() => navigate('/magic-meet')}
                className="bg-magic-darkBlue hover:bg-magic-purple text-white"
              >
                Find Characters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
