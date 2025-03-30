
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Heart, Map, Home, Menu, X, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { magicMeetService } from '@/services/magicMeetService';
import { useIsMobile } from '@/hooks/use-mobile';

const MagicNavbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: magicMeetService.getUserNotifications
  });
  
  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;
  
  const navLinks = [
    { name: 'Home', path: '/magic-meet', icon: <Home size={20} /> },
    { name: 'Itinerary', path: '/magic-meet/itinerary', icon: <Calendar size={20} /> },
    { name: 'Map', path: '/magic-meet/map', icon: <Map size={20} /> },
    { name: 'Favorites', path: '/magic-meet/favorites', icon: <Heart size={20} /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-magic-blue/30">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/magic-meet" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-magic-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-enchanted text-xl font-bold bg-gold-gradient bg-clip-text text-transparent">
              MyMagicMeet
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center py-1 font-medium text-sm transition-colors",
                    isActive(link.path) 
                      ? "text-magic-darkBlue border-b-2 border-magic-gold" 
                      : "text-gray-600 hover:text-magic-darkBlue"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
          
          {/* Notification Bell */}
          <div className="flex items-center space-x-4">
            <Link to="#" className="relative p-1.5 text-gray-600 hover:text-magic-purple transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-magic-darkBlue text-white text-xs p-0"
                >
                  {unreadCount}
                </Badge>
              )}
            </Link>
            
            {/* Mobile Menu */}
            {isMobile && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden p-1.5 text-gray-600 hover:text-magic-purple transition-colors">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white">
                  <div className="flex flex-col space-y-6 py-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 py-2 font-medium",
                          isActive(link.path) 
                            ? "text-magic-darkBlue" 
                            : "text-gray-600"
                        )}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MagicNavbar;
