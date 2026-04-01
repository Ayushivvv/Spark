import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { User, Friend } from '../types';
import { cn } from '../lib/utils';
import { MOCK_RECOMMENDED, MOCK_REQUESTS } from '../constants';
import { checkAvailability, calculateIntersections, formatIntersection } from '../lib/schedule';

export default function ScheduleComparison({ user, friends, requests = [] }: { 
  user: User | null, 
  friends: Friend[],
  requests?: Friend[]
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAm, setIsAm] = useState(false);

  // Find the person from all available lists
  const friend = [...friends, ...requests, ...MOCK_RECOMMENDED, ...MOCK_REQUESTS].find(f => f.id === id);
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);

  if (!friend) return <div className="p-10 text-center font-bold">Person not found</div>;

  // Calculate intersections for the entire week
  const intersections = calculateIntersections(user, friend as Friend);

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-24">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold pr-8">Schedule Comparison</h1>
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

        <div className="grid grid-cols-2 gap-4">
          {/* My Schedule */}
          <div className="space-y-2">
            <p className="text-center text-sm font-bold">Me</p>
            <div className="grid grid-cols-[20px_1fr] gap-1">
              <div className="flex flex-col justify-between py-1 text-[8px] text-gray-400 font-bold">
                {hours.map(h => <span key={h}>{h}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {days.map(day => (
                  <div key={day} className="space-y-0.5">
                    {hours.map(hour => {
                      const available = checkAvailability(user, day, hour, isAm);
                      return (
                        <div
                          key={hour}
                          className={cn(
                            "h-4 rounded-[1px]",
                            available ? "bg-[#8dd2dd]" : "bg-gray-100"
                          )}
                        ></div>
                      );
                    })}
                    <span className="block text-center text-[6px] text-gray-400 font-bold mt-1">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Friend's Schedule */}
          <div className="space-y-2">
            <p className="text-center text-sm font-bold">{friend.firstName}</p>
            <div className="grid grid-cols-7 gap-0.5 ml-5">
              {days.map(day => (
                <div key={day} className="space-y-0.5">
                  {hours.map(hour => {
                    const available = checkAvailability(friend, day, hour, isAm);
                    return (
                      <div
                        key={hour}
                        className={cn(
                          "h-4 rounded-[1px]",
                          available ? "bg-[#8dd2dd]" : "bg-gray-100"
                        )}
                      ></div>
                    );
                  })}
                  <span className="block text-center text-[6px] text-gray-400 font-bold mt-1">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-100 rounded-3xl space-y-4">
          <p className="text-sm font-bold">Suggested Intersections:</p>
          {intersections.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {intersections.slice(0, 5).map((inter, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                  {formatIntersection(inter)}
                </li>
              ))}
              {intersections.length > 5 && (
                <li className="text-xs text-gray-500 italic">+ {intersections.length - 5} more slots</li>
              )}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No common free time found this week.</p>
          )}
        </div>
      </div>
    </div>
  );
}
