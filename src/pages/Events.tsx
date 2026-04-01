import { useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Filter, ArrowUpDown, Check, Plus, Edit2, Calendar as CalendarIcon } from 'lucide-react';
import { Event } from '../types';
import { cn } from '../lib/utils';

export default function Events({ events }: { events: Event[] }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(22);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const days = Array.from({ length: 35 }, (_, i) => i - 4); // Simple calendar mock
  const eventDays = events.map(e => parseInt(e.date.split('-')[2]));
  const rsvpedDays = events.filter(e => e.isRSVPed).map(e => parseInt(e.date.split('-')[2]));

  const filteredEvents = showAllEvents 
    ? events 
    : events.filter(e => parseInt(e.date.split('-')[2]) === selectedDate);

  return (
    <div className="px-6 pt-12 pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Events</h1>
        <button 
          onClick={() => navigate('/events/create')}
          className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2]"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-50 rounded-xl text-sm font-medium flex items-center gap-2">
            Filter <ChevronLeft size={16} className="-rotate-90" />
          </button>
          <button className="px-4 py-2 bg-gray-50 rounded-xl text-sm font-medium flex items-center gap-2">
            Sort <ChevronLeft size={16} className="-rotate-90" />
          </button>
          <div className="flex-grow text-right text-xs text-gray-400 font-medium py-2">
            {filteredEvents.length} results
          </div>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="p-6 rounded-[32px] bg-gray-50 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <button className="p-1"><ChevronLeft size={18} /></button>
          <div className="flex gap-2 text-sm">
            <span className="font-bold">September 2025</span>
          </div>
          <button className="p-1 rotate-180"><ChevronLeft size={18} /></button>
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-center">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <span key={d} className="text-[9px] font-bold text-gray-400 uppercase">{d}</span>
          ))}
          {days.map((day, i) => {
            const isCurrentMonth = day > 0 && day <= 30;
            const isRSVPed = rsvpedDays.includes(day);
            const hasEvent = eventDays.includes(day);
            const isSelected = selectedDate === day;
            
            return (
              <div 
                key={i} 
                onClick={() => isCurrentMonth && setSelectedDate(day)}
                className={cn(
                  "h-8 w-8 mx-auto flex items-center justify-center text-xs rounded-full cursor-pointer transition-all",
                  !isCurrentMonth && "text-gray-200",
                  isCurrentMonth && isSelected && "bg-[#8babf1] text-white scale-110 shadow-md",
                  isCurrentMonth && !isSelected && isRSVPed && "bg-[#8babf1]/30 text-[#4a5a9c]",
                  isCurrentMonth && !isSelected && hasEvent && !isRSVPed && "bg-gray-200 text-gray-600",
                  isCurrentMonth && !isSelected && !hasEvent && "text-gray-900 hover:bg-gray-100"
                )}
              >
                {day > 0 && day <= 30 ? day : (day <= 0 ? 31 + day : day - 30)}
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => setShowAllEvents(!showAllEvents)}
          className="w-full py-3 bg-white border-2 border-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
        >
          {showAllEvents ? 'Hide Events' : 'Show all events'}
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        <h3 className="font-bold text-lg">
          {showAllEvents ? 'All Events' : `Events for Sep ${selectedDate}`}
        </h3>
        
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {filteredEvents.map(event => (
              <div 
                key={event.id} 
                className="space-y-3 cursor-pointer group relative"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                {event.creatorId === 'me' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/events/edit/${event.id}`);
                    }}
                    className="absolute top-1 right-1 p-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10 text-gray-600 hover:text-black"
                  >
                    <Edit2 size={10} />
                  </button>
                )}
                <div className="rounded-2xl overflow-hidden aspect-square bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold tracking-tight line-clamp-1">{event.title}</h4>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                    {event.attendees.length} friend{event.attendees.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-[9px] text-gray-500 font-medium line-clamp-1">Sep {event.date.split('-')[2]}</p>
                </div>
                <button className={cn(
                  "w-full py-1.5 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm transition-colors",
                  event.isRSVPed ? "bg-[#8babf1] text-white hover:bg-[#7a84e5]" : "bg-black text-white hover:bg-gray-800"
                )}>
                  RSVP {event.isRSVPed && <Check size={12} />}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-2">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <CalendarIcon size={24} className="text-gray-300" />
            </div>
            <p className="text-sm font-bold text-gray-400">No events scheduled for this day</p>
          </div>
        )}
      </div>
    </div>
  );
}
