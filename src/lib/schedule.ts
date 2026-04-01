import { User, Friend } from '../types';

export const checkAvailability = (u: User | Friend | null, day: string, hour: number, am: boolean) => {
  if (!u?.schedule) return false;
  
  let h = hour;
  if (h === 12) h = 0;
  if (!am) h += 12;
  const timeStr = `${h.toString().padStart(2, '0')}:00`;
  
  return u.schedule[day]?.includes(timeStr) || false;
};

export const calculateIntersections = (user: User | null, friend: Friend | null) => {
  if (!user || !friend) return [];
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
  const intersections: { day: string, hour: number, am: boolean }[] = [];

  days.forEach(day => {
    [true, false].forEach(am => {
      hours.forEach(hour => {
        if (checkAvailability(user, day, hour, am) && checkAvailability(friend, day, hour, am)) {
          intersections.push({ day, hour, am });
        }
      });
    });
  });

  return intersections;
};

export const formatIntersection = (inter: { day: string, hour: number, am: boolean }) => {
  return `${inter.day} ${inter.hour}${inter.am ? 'am' : 'pm'}`;
};
