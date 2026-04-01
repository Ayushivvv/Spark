export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  yearOfStudy: string;
  major: string;
  bio: string;
  hobbies: string[];
  personality: {
    calmVsEnergetic: number;
    spontaneousVsPlanned: number;
  };
  qualities: string[];
  improvements: string[];
  friendQuality: string;
  dealbreaker: string;
  scheduleVisibility: 'everyone' | 'friends' | 'nobody';
  schedule: {
    [key: string]: string[]; // day: ["09:00", "10:00"]
  };
}

export interface Friend extends User {
  status: string;
  lastActivity?: string;
  isRequest?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string; // ISO string
  time: string; // e.g. "7pm - 3am"
  location: string;
  attendees: string[]; // Friend IDs
  price?: string;
  isRSVPed: boolean;
  creatorId: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isPrompt?: boolean;
}
