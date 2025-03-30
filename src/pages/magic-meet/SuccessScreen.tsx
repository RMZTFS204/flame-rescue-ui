
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Check, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MagicNavbar from "@/components/magic-meet/MagicNavbar";
import { magicMeetService } from '@/services/magicMeetService';
import { cn } from '@/lib/utils';

const SuccessScreen: React.FC = () => {
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
  
  return (
    <div className="min-h-screen bg-magic-background">
      <MagicNavbar />
      
      <div className="container px-4 mx-auto py-10">
        <div className="max-w-lg mx-auto text-center mb-10 animate-magic-fade-in">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-magic-gold/20 flex items-center justify-center">
            <Check size={32} className="text-magic-gold" />
          </div>
          
          <h1 className="text-2xl font-enchanted font-bold text-gray-800 mb-2">
            Your Magical Meets are Scheduled!
          </h1>
          <p className="text-gray-600">
            Your character meet-and-greet itinerary is confirmed and ready to go. We'll send you notifications before each meet.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-magic-blue/20 mb-8 animate-magic-fade-in" style={{animationDelay: "0.2s"}}>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Calendar className="mr-3 text-magic-darkBlue" size={22} />
              <h2 className="text-lg font-medium text-gray-800">
                Your Schedule for {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
            </div>
            
            <div className="space-y-6">
              {itinerary?.scheduledMeets && itinerary.scheduledMeets.length > 0 ? (
                itinerary.scheduledMeets.map((scheduledMeet, index) => {
                  const character = getCharacterById(scheduledMeet.characterId);
                  const meetTime = getMeetTimeById(scheduledMeet.characterId, scheduledMeet.meetTimeId);
                  
                  if (!character || !meetTime) return null;
                  
                  // Calculate a fake walking time between 5-15 minutes
                  const walkingTime = Math.floor(Math.random() * 11) + 5;
                  
                  return (
                    <div 
                      key={scheduledMeet.id}
                      className="relative"
                    >
                      <div className="bg-white rounded-lg border border-magic-blue/20 p-5 shadow-sm">
                        <div className="flex items-start">
                          <div className="mr-4 h-14 w-14 rounded-full bg-magic-gradient flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">{character.name.charAt(0)}</span>
                          </div>
                          
                          <div className="flex-grow">
                            <h3 className="font-medium text-gray-800 text-lg mb-1">{character.name}</h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock size={16} className="mr-2 text-magic-purple" />
                                <span>{meetTime.startTime} - {meetTime.endTime}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-2 text-magic-purple" />
                                <span>{character.location.name}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 text-sm">
                              <span className="text-magic-darkBlue font-medium">
                                Estimated wait: {character.waitTime} min
                              </span>
                              
                              {index > 0 && (
                                <span className="ml-4 text-magic-purple font-medium">
                                  Walking time: {walkingTime} min
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connector line to next item */}
                      {index < itinerary.scheduledMeets.length - 1 && (
                        <div className="absolute left-7 top-full h-8 w-0.5 bg-magic-blue/30"></div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No character meets scheduled yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-center gap-4 animate-magic-fade-in" style={{animationDelay: "0.4s"}}>
          <Button 
            onClick={() => navigate('/magic-meet/map')}
            className="bg-magic-darkBlue hover:bg-magic-purple text-white"
          >
            View Map
          </Button>
          
          <Button 
            onClick={() => navigate('/magic-meet')}
            variant="outline"
            className="border-magic-darkBlue text-magic-darkBlue hover:bg-magic-darkBlue hover:text-white"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
