
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MagicNavbar from "@/components/magic-meet/MagicNavbar";
import { magicMeetService } from '@/services/magicMeetService';
import { ScheduledMeet } from '@/types/magic-meet';
import { cn } from '@/lib/utils';

const ItineraryBuilder: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: itinerary } = useQuery({
    queryKey: ['userItinerary'],
    queryFn: magicMeetService.getUserItinerary
  });
  
  const { data: characters = [] } = useQuery({
    queryKey: ['characters'],
    queryFn: magicMeetService.getCharacters
  });
  
  const getCharacterById = (id: string) => {
    return characters.find(char => char.id === id);
  };
  
  const getMeetTimeById = (characterId: string, meetTimeId: string) => {
    const character = getCharacterById(characterId);
    return character?.meetTimes.find(time => time.id === meetTimeId);
  };
  
  const renderScheduledMeet = (scheduledMeet: ScheduledMeet) => {
    const character = getCharacterById(scheduledMeet.characterId);
    const meetTime = getMeetTimeById(scheduledMeet.characterId, scheduledMeet.meetTimeId);
    
    if (!character || !meetTime) return null;
    
    return (
      <div 
        key={scheduledMeet.id}
        className="bg-white rounded-lg border border-magic-blue/20 p-4 shadow-sm flex items-center"
      >
        <div className="mr-4 h-12 w-12 rounded-full bg-magic-gradient flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold">{character.name.charAt(0)}</span>
        </div>
        
        <div className="flex-grow">
          <h3 className="font-medium text-gray-800">{character.name}</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock size={14} className="mr-1 text-magic-purple" />
              <span>{meetTime.startTime} - {meetTime.endTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-1 text-magic-purple" />
              <span>{character.location.name}</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-gray-400 hover:text-red-500"
          onClick={() => {
            // We would handle deletion here
            // For now, we'll just show a placeholder
            alert(`Remove ${character.name} from itinerary`);
          }}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-magic-background">
      <MagicNavbar />
      
      <div className="container px-4 mx-auto py-8">
        <h1 className="text-2xl font-enchanted font-bold text-gray-800 mb-6 flex items-center">
          <Calendar className="mr-3" size={24} />
          Your Meet-and-Greet Itinerary
        </h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-magic-blue/20 mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-800">Today's Schedule</h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <Button 
                onClick={() => navigate('/magic-meet')}
                variant="outline"
                className="text-magic-darkBlue border-magic-darkBlue hover:bg-magic-darkBlue hover:text-white"
              >
                Add More Characters
              </Button>
            </div>
            
            <div className="space-y-4">
              {itinerary?.scheduledMeets && itinerary.scheduledMeets.length > 0 ? (
                <>
                  {itinerary.scheduledMeets.map(renderScheduledMeet)}
                  
                  <div className="flex justify-end mt-6">
                    <Button 
                      onClick={() => navigate('/magic-meet/success')}
                      className="bg-magic-darkBlue hover:bg-magic-purple text-white"
                    >
                      Confirm Schedule <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">You haven't scheduled any character meets yet.</p>
                  <Button 
                    onClick={() => navigate('/magic-meet')}
                    className="bg-magic-darkBlue hover:bg-magic-purple text-white"
                  >
                    Find Characters to Meet
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {itinerary?.notes && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-magic-blue/20 p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Notes</h3>
            <p className="text-gray-600">{itinerary.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryBuilder;
