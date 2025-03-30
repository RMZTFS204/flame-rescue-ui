
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Clock, 
  MapPin, 
  CalendarDays, 
  Heart, 
  Film, 
  ArrowLeft, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MagicNavbar from "@/components/magic-meet/MagicNavbar";
import { magicMeetService } from '@/services/magicMeetService';
import { toast } from 'sonner';
import { Character, MeetTime } from '@/types/magic-meet';
import { cn } from '@/lib/utils';

const CharacterSchedule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);
  
  const { data: character, isLoading, error } = useQuery({
    queryKey: ['character', id],
    queryFn: () => magicMeetService.getCharacterById(id || ''),
    enabled: !!id
  });
  
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: magicMeetService.getUserFavorites
  });
  
  const isFavorite = favorites.includes(id || '');
  
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        return magicMeetService.removeFavorite(id || '');
      } else {
        return magicMeetService.addFavorite(id || '');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast(
        isFavorite ? 'Removed from favorites' : 'Added to favorites',
        { 
          description: `${character?.name} was ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
          duration: 3000
        }
      );
    }
  });
  
  const { mutate: scheduleMeet, isPending: isScheduling } = useMutation({
    mutationFn: () => magicMeetService.scheduleCharacterMeet(id || '', selectedTimeId || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userItinerary'] });
      toast.success(
        'Meet scheduled!', 
        { 
          description: `Your meet with ${character?.name} has been added to your itinerary.`,
          duration: 3000
        }
      );
      navigate('/magic-meet/itinerary');
    }
  });
  
  const handleScheduleMeet = () => {
    if (!selectedTimeId) {
      toast.error('Please select a time slot first');
      return;
    }
    
    scheduleMeet();
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-magic-background">
        <MagicNavbar />
        <div className="container px-4 mx-auto py-10 text-center">
          <p>Loading character information...</p>
        </div>
      </div>
    );
  }
  
  if (error || !character) {
    return (
      <div className="min-h-screen bg-magic-background">
        <MagicNavbar />
        <div className="container px-4 mx-auto py-10 text-center">
          <p className="text-red-500">Character not found. Please try again.</p>
          <Button asChild className="mt-4">
            <Link to="/magic-meet">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const availableMeetTimes = character.meetTimes.filter(time => time.isAvailable);
  
  return (
    <div className="min-h-screen bg-magic-background">
      <MagicNavbar />
      
      <div className="container px-4 mx-auto py-6">
        {/* Back Button */}
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
        
        {/* Character Information */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-magic-blue/20 mb-6">
          <div className="md:flex">
            {/* Character Image */}
            <div className="md:w-1/3 bg-magic-gradient h-[200px] md:h-auto">
              <div className="h-full flex items-center justify-center">
                <span className="text-white font-bold text-4xl">{character.name.charAt(0)}</span>
              </div>
            </div>
            
            {/* Character Details */}
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-3">
                <h1 className="text-2xl font-enchanted font-bold text-gray-800">{character.name}</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite()}
                  className={cn(
                    "p-2",
                    isFavorite ? "text-magic-gold" : "text-gray-400"
                  )}
                >
                  <Heart size={20} fill={isFavorite ? "#E6B325" : "none"} />
                </Button>
              </div>
              
              <p className="text-gray-600 mb-4">{character.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Film size={18} className="mr-2 text-magic-purple" />
                  <span>{character.movie}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={18} className="mr-2 text-magic-purple" />
                  <span>{character.location.name}, {character.location.area}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={18} className="mr-2 text-magic-purple" />
                  <span>Current wait: {character.waitTime} minutes</span>
                </div>
              </div>
              
              <Button 
                onClick={handleScheduleMeet}
                disabled={!selectedTimeId || isScheduling}
                className="bg-magic-darkBlue hover:bg-magic-purple text-white"
              >
                {isScheduling ? 'Scheduling...' : 'Schedule Meet'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Available Times */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-magic-blue/20 mb-8">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <CalendarDays size={20} className="mr-2 text-magic-darkBlue" />
              <h2 className="text-xl font-enchanted font-bold text-gray-800">
                Available Meet Times
              </h2>
            </div>
            
            {availableMeetTimes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {character.meetTimes.map((time) => (
                  <div 
                    key={time.id}
                    onClick={() => {
                      if (time.isAvailable) {
                        setSelectedTimeId(time.id);
                      }
                    }}
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-colors",
                      selectedTimeId === time.id 
                        ? "border-magic-gold bg-magic-gold/10" 
                        : time.isAvailable 
                          ? "border-gray-200 hover:border-magic-blue/50" 
                          : "border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">
                        {time.startTime} - {time.endTime}
                      </span>
                      
                      {time.isAvailable ? (
                        <Badge className={
                          selectedTimeId === time.id 
                            ? "bg-magic-gold text-white" 
                            : "bg-magic-blue text-magic-darkBlue"
                        }>
                          {selectedTimeId === time.id ? (
                            <span className="flex items-center">
                              <Check size={12} className="mr-1" /> Selected
                            </span>
                          ) : (
                            "Available"
                          )}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-400 text-gray-500">
                          <AlertTriangle size={12} className="mr-1" /> Unavailable
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No available meet times for today.</p>
                <p className="text-sm text-gray-400 mt-2">Please check back tomorrow or try another character.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSchedule;
