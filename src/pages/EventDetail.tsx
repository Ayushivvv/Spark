import { useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Check, MoreHorizontal } from 'lucide-react';
import { Event } from '../types';
import { cn } from '../lib/utils';

export default function EventDetail({ events, setEvents }: { events: Event[], setEvents: Dispatch<SetStateAction<Event[]>> }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  if (!event) return <div>Event not found</div>;

  const toggleRSVP = () => {
    setEvents(events.map(e => e.id === id ? { ...e, isRSVPed: !e.isRSVPed } : e));
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="relative h-80">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute top-12 left-6 right-6 flex justify-between">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/80 backdrop-blur rounded-full">
            <ChevronLeft size={24} />
          </button>
          <button className="p-2 bg-white/80 backdrop-blur rounded-full">
            <MoreHorizontal size={24} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-3xl"></div>
      </div>

      <div className="px-6 space-y-6 -mt-4 relative z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-xs text-gray-400 font-medium">
              {event.attendees.join(' and ')} are attending
            </p>
            <p className="text-xs text-gray-400 font-medium">{event.time}, Sep {event.date.split('-')[2]}, 2025</p>
          </div>
          <button 
            onClick={toggleRSVP}
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2",
              event.isRSVPed ? "bg-[#8babf1] text-white" : "bg-black text-white"
            )}
          >
            RSVP {event.isRSVPed && <Check size={16} />}
          </button>
        </div>

        {event.price && (
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{event.price}</span>
            <span className="text-xs text-gray-400">/ person</span>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-bold">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold">Location</h3>
          <div className="h-48 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
            Map View Placeholder
          </div>
          <p className="text-sm font-medium">{event.location}</p>
        </div>
      </div>
    </div>
  );
}
