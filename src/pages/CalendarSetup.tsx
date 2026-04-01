import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { User } from '../types';

export default function CalendarSetup({ user, onSave }: { user: User | null, onSave?: (schedule: any, visibility: string) => void }) {
  const navigate = useNavigate();
  const [isAm, setIsAm] = useState(true);
  const [visibility, setVisibility] = useState(user?.scheduleVisibility || 'friends');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);

  // Initialize from user schedule
  useEffect(() => {
    if (user?.schedule) {
      const slots: string[] = [];
      Object.entries(user.schedule).forEach(([day, times]) => {
        times.forEach(time => {
          const [hStr] = time.split(':');
          let h = parseInt(hStr);
          let ampm = 'am';
          if (h >= 12) {
            ampm = 'pm';
            if (h > 12) h -= 12;
          } else if (h === 0) {
            h = 12;
          }
          slots.push(`${day}-${h}-${ampm}`);
        });
      });
      setSelectedSlots(slots);
    }
  }, [user]);

  const toggleSlot = (day: string, hour: number) => {
    const slot = `${day}-${hour}-${isAm ? 'am' : 'pm'}`;
    setSelectedSlots(prev => 
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleSave = () => {
    // Convert back to User.schedule format
    const schedule: Record<string, string[]> = {};
    selectedSlots.forEach(slot => {
      const [day, hourStr, ampm] = slot.split('-');
      let hour = parseInt(hourStr);
      if (ampm === 'pm' && hour < 12) hour += 12;
      if (ampm === 'am' && hour === 12) hour = 0;
      
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      if (!schedule[day]) schedule[day] = [];
      schedule[day].push(timeStr);
    });

    if (onSave) {
      onSave(schedule, visibility);
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-10">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold pr-8">Calendar</h1>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-center gap-4">
          <span className={cn("text-sm font-medium", isAm ? "text-gray-900" : "text-gray-400")}>am</span>
          <button 
            onClick={() => setIsAm(!isAm)}
            className="w-12 h-6 bg-gray-900 rounded-full relative p-1 transition-colors"
          >
            <div className={cn(
              "w-4 h-4 bg-white rounded-full transition-transform",
              !isAm && "translate-x-6"
            )}></div>
          </button>
          <span className={cn("text-sm font-medium", !isAm ? "text-gray-900" : "text-gray-400")}>pm</span>
        </div>

        <div className="space-y-2">
          <p className="text-center text-sm font-bold">Me</p>
          <div className="grid grid-cols-[30px_1fr] gap-2">
            <div className="flex flex-col justify-between py-1 text-[10px] text-gray-400 font-bold">
              {hours.map(h => <span key={h}>{h}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map(day => (
                <div key={day} className="space-y-1">
                  {hours.map(hour => (
                    <div
                      key={hour}
                      onClick={() => toggleSlot(day, hour)}
                      className={cn(
                        "h-6 rounded-sm cursor-pointer transition-colors",
                        selectedSlots.includes(`${day}-${hour}-${isAm ? 'am' : 'pm'}`) 
                          ? "bg-[#8dd2dd]" 
                          : "bg-gray-100 hover:bg-gray-200"
                      )}
                    ></div>
                  ))}
                  <span className="block text-center text-[10px] text-gray-400 font-bold mt-2">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-bold">My full schedule should be visible to</p>
          <div className="space-y-3">
            {['Everyone', 'Friends only', 'Nobody'].map(option => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <div 
                  onClick={() => setVisibility(option.toLowerCase().replace(' ', ''))}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    visibility === option.toLowerCase().replace(' ', '') ? "border-gray-900" : "border-gray-300"
                  )}
                >
                  {visibility === option.toLowerCase().replace(' ', '') && <div className="w-2.5 h-2.5 bg-gray-900 rounded-full"></div>}
                </div>
                <span className="text-sm font-medium">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
        >
          Submit Calender
        </button>
      </div>
    </div>
  );
}
