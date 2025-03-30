
import { Character, Location, MeetTime, Itinerary, Notification } from "@/types/magic-meet";

// Sample character data
const characters: Character[] = [
  {
    id: "nick-wilde",
    name: "Nick Wilde",
    image: "/characters/nick-wilde.png",
    description: "The con-artist fox from Zootopia who becomes a police officer.",
    movie: "Zootopia",
    location: {
      id: "loc-1",
      name: "Pixar Pier",
      area: "Disney California Adventure",
      coordinates: { x: 120, y: 85 }
    },
    meetTimes: [
      { id: "nt-1", startTime: "09:00", endTime: "09:30", date: "2023-07-15", isAvailable: true },
      { id: "nt-2", startTime: "11:00", endTime: "11:30", date: "2023-07-15", isAvailable: true },
      { id: "nt-3", startTime: "14:00", endTime: "14:30", date: "2023-07-15", isAvailable: false },
      { id: "nt-4", startTime: "16:00", endTime: "16:30", date: "2023-07-15", isAvailable: true }
    ],
    waitTime: 20,
    isFeatured: true
  },
  {
    id: "judy-hopps",
    name: "Judy Hopps",
    image: "/characters/judy-hopps.png",
    description: "The optimistic and determined bunny officer from Zootopia.",
    movie: "Zootopia",
    location: {
      id: "loc-1",
      name: "Pixar Pier",
      area: "Disney California Adventure",
      coordinates: { x: 120, y: 85 }
    },
    meetTimes: [
      { id: "jt-1", startTime: "09:00", endTime: "09:30", date: "2023-07-15", isAvailable: true },
      { id: "jt-2", startTime: "11:00", endTime: "11:30", date: "2023-07-15", isAvailable: false },
      { id: "jt-3", startTime: "14:00", endTime: "14:30", date: "2023-07-15", isAvailable: true },
      { id: "jt-4", startTime: "16:00", endTime: "16:30", date: "2023-07-15", isAvailable: true }
    ],
    waitTime: 15,
    isFeatured: true
  },
  {
    id: "mickey-mouse",
    name: "Mickey Mouse",
    image: "/characters/mickey-mouse.png",
    description: "The iconic Disney character and mascot of the Disney parks.",
    movie: "Various",
    location: {
      id: "loc-2",
      name: "Main Street",
      area: "Disneyland",
      coordinates: { x: 50, y: 30 }
    },
    meetTimes: [
      { id: "mt-1", startTime: "08:30", endTime: "09:00", date: "2023-07-15", isAvailable: true },
      { id: "mt-2", startTime: "10:30", endTime: "11:00", date: "2023-07-15", isAvailable: true },
      { id: "mt-3", startTime: "13:30", endTime: "14:00", date: "2023-07-15", isAvailable: true },
      { id: "mt-4", startTime: "15:30", endTime: "16:00", date: "2023-07-15", isAvailable: true }
    ],
    waitTime: 30,
    isFeatured: true
  },
  {
    id: "elsa",
    name: "Elsa",
    image: "/characters/elsa.png",
    description: "The Snow Queen with magical ice powers from Frozen.",
    movie: "Frozen",
    location: {
      id: "loc-3",
      name: "Fantasy Faire",
      area: "Disneyland",
      coordinates: { x: 80, y: 60 }
    },
    meetTimes: [
      { id: "et-1", startTime: "10:00", endTime: "10:30", date: "2023-07-15", isAvailable: true },
      { id: "et-2", startTime: "12:00", endTime: "12:30", date: "2023-07-15", isAvailable: true },
      { id: "et-3", startTime: "15:00", endTime: "15:30", date: "2023-07-15", isAvailable: false },
      { id: "et-4", startTime: "17:00", endTime: "17:30", date: "2023-07-15", isAvailable: true }
    ],
    waitTime: 40,
    isFeatured: true
  },
  {
    id: "buzz-lightyear",
    name: "Buzz Lightyear",
    image: "/characters/buzz-lightyear.png",
    description: "The space ranger action figure from Toy Story.",
    movie: "Toy Story",
    location: {
      id: "loc-4",
      name: "Tomorrowland",
      area: "Disneyland",
      coordinates: { x: 110, y: 40 }
    },
    meetTimes: [
      { id: "bt-1", startTime: "09:30", endTime: "10:00", date: "2023-07-15", isAvailable: true },
      { id: "bt-2", startTime: "11:30", endTime: "12:00", date: "2023-07-15", isAvailable: true },
      { id: "bt-3", startTime: "14:30", endTime: "15:00", date: "2023-07-15", isAvailable: true },
      { id: "bt-4", startTime: "16:30", endTime: "17:00", date: "2023-07-15", isAvailable: false }
    ],
    waitTime: 25,
    isFeatured: false
  }
];

// Fake user favorites
let userFavorites: string[] = [];

// Fake notifications
let notifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    message: "Mickey Mouse's 10:30 AM meet has been moved to 11:00 AM",
    type: "schedule-change",
    isRead: false,
    timestamp: "2023-07-15T08:15:00Z",
    relatedCharacterId: "mickey-mouse"
  },
  {
    id: "notif-2",
    userId: "user-1",
    message: "Your meet with Judy Hopps starts in 15 minutes!",
    type: "reminder",
    isRead: false,
    timestamp: "2023-07-15T10:45:00Z",
    relatedCharacterId: "judy-hopps"
  }
];

// User's itinerary
let userItinerary: Itinerary = {
  id: "itin-1",
  userId: "user-1",
  date: "2023-07-15",
  scheduledMeets: [],
  notes: "Hoping to meet all the Zootopia characters today!"
};

// API simulation functions
export const magicMeetService = {
  // Characters
  getCharacters: async (): Promise<Character[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...characters]), 500);
    });
  },
  
  getFeaturedCharacters: async (): Promise<Character[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(characters.filter(c => c.isFeatured)), 300);
    });
  },
  
  getCharacterById: async (id: string): Promise<Character | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(characters.find(c => c.id === id)), 300);
    });
  },
  
  searchCharacters: async (query: string): Promise<Character[]> => {
    return new Promise((resolve) => {
      const results = characters.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.movie.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => resolve(results), 300);
    });
  },
  
  // Favorites
  getUserFavorites: async (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...userFavorites]), 300);
    });
  },
  
  getFavoriteCharacters: async (): Promise<Character[]> => {
    return new Promise((resolve) => {
      const favorites = characters.filter(c => userFavorites.includes(c.id));
      setTimeout(() => resolve(favorites), 400);
    });
  },
  
  addFavorite: async (characterId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!userFavorites.includes(characterId)) {
        userFavorites.push(characterId);
      }
      setTimeout(() => resolve(true), 300);
    });
  },
  
  removeFavorite: async (characterId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      userFavorites = userFavorites.filter(id => id !== characterId);
      setTimeout(() => resolve(true), 300);
    });
  },
  
  // Itinerary
  getUserItinerary: async (): Promise<Itinerary> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...userItinerary}), 400);
    });
  },
  
  scheduleCharacterMeet: async (characterId: string, meetTimeId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const newMeet = {
        id: `meet-${Date.now()}`,
        characterId,
        meetTimeId,
        userId: "user-1",
        status: 'scheduled' as const
      };
      
      userItinerary.scheduledMeets.push(newMeet);
      setTimeout(() => resolve(true), 500);
    });
  },
  
  cancelScheduledMeet: async (meetId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      userItinerary.scheduledMeets = userItinerary.scheduledMeets.filter(meet => meet.id !== meetId);
      setTimeout(() => resolve(true), 300);
    });
  },
  
  // Notifications
  getUserNotifications: async (): Promise<Notification[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...notifications]), 300);
    });
  },
  
  markNotificationAsRead: async (notificationId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const notification = notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.isRead = true;
      }
      setTimeout(() => resolve(true), 200);
    });
  },
  
  // Utility functions
  getEstimatedWalkingTime: (fromLocation: Location, toLocation: Location): number => {
    // Simple distance calculation for walking time (in minutes)
    const dx = fromLocation.coordinates.x - toLocation.coordinates.x;
    const dy = fromLocation.coordinates.y - toLocation.coordinates.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Assume 1 unit = 1 minute of walking
    return Math.round(distance * 0.5);
  }
};
