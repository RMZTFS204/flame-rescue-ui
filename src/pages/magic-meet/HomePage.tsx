
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import CharacterCard from "@/components/magic-meet/CharacterCard";
import MagicNavbar from "@/components/magic-meet/MagicNavbar";
import { magicMeetService } from '@/services/magicMeetService';
import { Character } from '@/types/magic-meet';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: featuredCharacters = [] } = useQuery({
    queryKey: ['featuredCharacters'],
    queryFn: magicMeetService.getFeaturedCharacters
  });
  
  const { data: searchResults = [] } = useQuery({
    queryKey: ['characterSearch', searchQuery],
    queryFn: () => magicMeetService.searchCharacters(searchQuery),
    enabled: isSearching && searchQuery.length > 0
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setIsSearching(false);
    }
  };
  
  const renderCharacterGrid = (characters: Character[]) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-magic-background">
      <MagicNavbar />
      
      {/* Hero Section */}
      <section className="bg-magic-gradient relative overflow-hidden">
        <div className="container px-4 mx-auto py-12 md:py-16 max-w-4xl">
          <div className="text-center relative z-10 animate-magic-fade-in">
            <h1 className="text-3xl md:text-4xl font-enchanted font-bold text-white mb-4">
              Meet Your Favorite Disney Characters
            </h1>
            <p className="text-white/90 mb-8 text-lg">
              Plan magical meet-and-greets with the characters you love
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-8">
              <Input
                className="pl-10 pr-4 py-6 rounded-full bg-white/95 text-gray-800 placeholder:text-gray-500 focus-visible:ring-magic-gold"
                placeholder="Search for characters, movies, or locations..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </form>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                className="bg-white text-magic-darkBlue hover:bg-magic-gold hover:text-white"
              >
                <Link to="/magic-meet/itinerary">
                  <Calendar className="mr-2" size={18} />
                  Plan Your Meet
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-magic-purple"
              >
                <Link to="/magic-meet/map">
                  <Sparkles className="mr-2" size={18} />
                  Find Characters
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-magic-gold opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-magic-purple opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="container px-4 mx-auto py-10">
        {/* Search Results */}
        {isSearching && searchQuery && (
          <section className="mb-12 animate-magic-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-enchanted font-bold text-gray-800">
                Search Results for "{searchQuery}"
              </h2>
            </div>
            
            {searchResults.length > 0 ? (
              renderCharacterGrid(searchResults)
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No characters found matching your search.</p>
                <Button variant="outline" onClick={() => setIsSearching(false)}>
                  Clear Search
                </Button>
              </div>
            )}
          </section>
        )}
        
        {/* Featured Characters */}
        {(!isSearching || !searchQuery) && (
          <section className="mb-12 animate-magic-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-enchanted font-bold text-gray-800">
                Featured Characters
              </h2>
              <Link 
                to="/magic-meet/favorites" 
                className="text-sm text-magic-darkBlue hover:underline flex items-center"
              >
                View all <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {featuredCharacters.length > 0 ? (
              renderCharacterGrid(featuredCharacters)
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading featured characters...</p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
