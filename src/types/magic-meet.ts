
export interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  movie: string;
  location: Location;
  meetTimes: MeetTime[];
  waitTime: number; // in minutes
  isFeatured?: boolean;
}

export interface Location {
  id: string;
  name: string;
  area: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface MeetTime {
  id: string;
  startTime: string; // format "HH:MM"
  endTime: string; // format "HH:MM"
  date: string; // format "YYYY-MM-DD"
  isAvailable: boolean;
}

export interface ScheduledMeet {
  id: string;
  characterId: string;
  meetTimeId: string;
  userId: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Itinerary {
  id: string;
  userId: string;
  date: string;
  scheduledMeets: ScheduledMeet[];
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'schedule-change' | 'reminder' | 'system';
  isRead: boolean;
  timestamp: string;
  relatedCharacterId?: string;
}
