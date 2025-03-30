
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Heart } from 'lucide-react';
import { Character } from '@/types/magic-meet';
import { cn } from '@/lib/utils';
import { magicMeetService } from '@/services/magicMeetService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface CharacterCardProps {
  character: Character;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  size = 'md',
  className 
}) => {
  const queryClient = useQueryClient();
  
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: magicMeetService.getUserFavorites
  });
  
  const isFavorite = favorites.includes(character.id);
  
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        return magicMeetService.removeFavorite(character.id);
      } else {
        return magicMeetService.addFavorite(character.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast(
        isFavorite ? 'Removed from favorites' : 'Added to favorites',
        { 
          description: `${character.name} was ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
          duration: 3000
        }
      );
    }
  });
  
  const availableTimes = character.meetTimes.filter(time => time.isAvailable).length;
  
  // Set appropriate size classes based on the size prop
  const sizeClasses = {
    sm: {
      card: "max-w-[180px]",
      image: "h-[120px]",
      title: "text-sm",
      body: "text-xs"
    },
    md: {
      card: "max-w-[260px]",
      image: "h-[180px]",
      title: "text-base",
      body: "text-sm"
    },
    lg: {
      card: "max-w-[320px]",
      image: "h-[220px]",
      title: "text-lg",
      body: "text-base"
    }
  };
  
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-md overflow-hidden border border-magic-blue/20 transition-all duration-300 hover:shadow-magic-glow",
      sizeClasses[size].card,
      className
    )}>
      <Link to={`/magic-meet/character/${character.id}`}>
        <div className="relative">
          <div className={cn(
            "w-full bg-magic-blue/20 object-cover object-center",
            sizeClasses[size].image
          )}>
            {/* Character image would go here */}
            <div className="h-full flex items-center justify-center bg-magic-gradient">
              <span className="text-white font-bold text-xl">{character.name.charAt(0)}</span>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              toggleFavorite();
            }}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={16} fill={isFavorite ? "#E6B325" : "none"} className={isFavorite ? "text-magic-gold" : "text-gray-400"} />
          </button>
        </div>
      </Link>
      
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/magic-meet/character/${character.id}`}>
            <h3 className={cn(
              "font-enchanted font-bold text-gray-800 hover:text-magic-darkBlue",
              sizeClasses[size].title
            )}>
              {character.name}
            </h3>
          </Link>
        </div>
        
        <p className={cn(
          "text-gray-500 mb-3 line-clamp-2",
          sizeClasses[size].body
        )}>
          {character.movie}
        </p>
        
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center text-xs text-gray-600">
            <MapPin size={14} className="mr-1 text-magic-purple" />
            <span className="truncate">{character.location.name}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-600">
            <Clock size={14} className="mr-1 text-magic-darkBlue" />
            <span>{character.waitTime} min wait • {availableTimes} times today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
