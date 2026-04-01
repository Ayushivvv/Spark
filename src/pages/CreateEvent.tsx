import { useState, useRef, type Dispatch, type SetStateAction, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Camera, Calendar as CalendarIcon, Clock, Users, Plus, X, Check } from 'lucide-react';
import { User, Friend, Event } from '../types';
import { cn } from '../lib/utils';

export default function CreateEvent({ user, friends, setEvents, events }: { 
  user: User | null, 
  friends: Friend[], 
  setEvents: Dispatch<SetStateAction<Event[]>>,
  events: Event[]
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const editingEvent = id ? events.find(e => e.id === id) : null;

  const [title, setTitle] = useState(editingEvent?.title || '');
  const [description, setDescription] = useState(editingEvent?.description || '');
  const [date, setDate] = useState(editingEvent?.date || '2025-09-22');
  const [time, setTime] = useState(editingEvent?.time || '7pm - 3am');
  const [price, setPrice] = useState(editingEvent?.price || '$5');
  const [image, setImage] = useState<string | null>(editingEvent?.image || null);
  const [selectedFriends, setSelectedFriends] = useState<string[]>(editingEvent?.attendees.filter(id => id !== 'me') || []);
  const [showFriendSelector, setShowFriendSelector] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const toggleFriend = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleSave = () => {
    const attendees = friends
      .filter(f => selectedFriends.includes(f.id))
      .map(f => ({ id: f.id, firstName: f.firstName, profilePicture: f.profilePicture }));

    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === id ? {
        ...e,
        title,
        date,
        time,
        price,
        description,
        image: image || e.image,
        attendees: ['me', ...selectedFriends]
      } : e));
    } else {
      const newEvent: Event = {
        id: Math.random().toString(36).substr(2, 9),
        title: title || 'New Event',
        description: description || 'No description provided.',
        image: image || 'https://picsum.photos/seed/event/800/450',
        date,
        time,
        price,
        location: 'TBD',
        attendees: ['me', ...selectedFriends],
        isRSVPed: true,
        creatorId: 'me',
      };
      setEvents(prev => [...prev, newEvent]);
    }
    navigate('/events');
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="flex items-center px-6 pt-12 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold">{editingEvent ? 'Edit Event' : 'Create Event'}</h1>
        <button 
          onClick={handleSave}
          className="px-6 py-1.5 bg-black text-white text-xs font-bold rounded-full"
        >
          Done
        </button>
      </div>

      <div className="space-y-8">
        {/* Image Upload */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full aspect-[16/9] bg-[#8b95f6]/30 flex items-center justify-center cursor-pointer overflow-hidden group"
        >
          {image ? (
            <>
              <img src={image} alt="Event" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={32} className="text-white" />
              </div>
            </>
          ) : (
            <div className="w-48 h-24 border-2 border-gray-900 rounded-3xl flex items-center justify-center">
              <Camera size={48} className="text-gray-900" />
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        <div className="px-6 space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Title</label>
            <input
              type="text"
              placeholder="Event Title"
              className="w-full text-2xl font-bold border-none focus:ring-0 p-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Date</label>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarIcon size={16} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border-none p-0 focus:ring-0" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Time</label>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border-none p-0 focus:ring-0" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Price</label>
            <div className="flex items-baseline gap-1">
              <input 
                type="text" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="w-16 text-2xl font-bold border-none p-0 focus:ring-0" 
              />
              <span className="text-xs text-gray-400">/ person</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
            <textarea
              placeholder="Insert description of event here"
              className="w-full h-32 text-sm border-none focus:ring-0 p-0 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Friend Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-400 uppercase">Invite Friends</label>
              <button 
                onClick={() => setShowFriendSelector(!showFriendSelector)}
                className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            {showFriendSelector && (
              <div className="p-4 bg-gray-50 rounded-3xl space-y-3">
                {friends.map(friend => (
                  <div 
                    key={friend.id}
                    onClick={() => toggleFriend(friend.id)}
                    className="flex items-center justify-between p-2 hover:bg-white rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={friend.profilePicture} alt={friend.firstName} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <span className="text-sm font-bold">{friend.firstName} {friend.lastName}</span>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                      selectedFriends.includes(friend.id) ? "bg-black border-black" : "border-gray-300"
                    )}>
                      {selectedFriends.includes(friend.id) && <Check size={12} className="text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex -space-x-2 overflow-hidden">
              {selectedFriends.map(id => {
                const friend = friends.find(f => f.id === id);
                return friend ? (
                  <img 
                    key={id} 
                    src={friend.profilePicture} 
                    alt={friend.firstName} 
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                    referrerPolicy="no-referrer"
                  />
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
