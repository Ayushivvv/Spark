import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Bell } from 'lucide-react';
import { User, Friend } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Home({ user, friends }: { user: User | null, friends: Friend[] }) {
  const navigate = useNavigate();

  const prompts = [
    { id: 1, friend: 'Lily', text: 'Reflect on the visit to the art gallery', image: 'https://picsum.photos/seed/art/400/300' },
    { id: 2, friend: 'Jay', text: 'Share a pleasant moment of your day', image: 'https://picsum.photos/seed/moment/400/300' },
  ];

  return (
    <div className="px-6 pt-12 pb-24 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl italic">S</span>
          </div>
          <h1 className="text-xl font-black tracking-tighter italic">SPARK</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/notifications')}
            className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative"
          >
            <Bell size={20} className="text-gray-600" />
            <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
        </div>
      </div>

      <div className="relative flex-grow">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2]"
        />
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-gray-100 shadow-sm group">
        <img 
          src="https://picsum.photos/seed/pears/800/450" 
          alt="Featured" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute top-10 left-10">
          <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">Sep 7, 2025</h2>
          <p className="text-white/80 text-sm font-medium">Featured Event</p>
        </div>
      </div>

      {/* Friends Activity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl tracking-tight">Friends activity</h3>
          <button 
            onClick={() => navigate('/friends')}
            className="p-1.5 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={18} className="rotate-180" />
          </button>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide px-2 snap-x">
          {friends.map(friend => (
            <div 
              key={friend.id} 
              className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group snap-center"
              onClick={() => navigate(`/friends/${friend.id}`)}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#90d8b2] p-0.5 shadow-sm group-hover:scale-105 transition-transform">
                <img src={friend.profilePicture} alt={friend.firstName} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="text-sm font-semibold text-gray-700">{friend.firstName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Prompts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl tracking-tight">Daily prompts</h3>
          <button 
            onClick={() => navigate('/prompts')}
            className="p-1.5 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={18} className="rotate-180" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {prompts.map(prompt => (
            <div key={prompt.id} className="space-y-3 group">
              <div className="rounded-2xl overflow-hidden aspect-square bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                <img src={prompt.image} alt="Prompt" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Talk with {prompt.friend}</p>
                <p className="text-[11px] font-bold leading-tight line-clamp-2">{prompt.text}</p>
              </div>
              <button 
                onClick={() => navigate(`/chat/${prompt.friend.toLowerCase()}`, { state: { prompt: prompt.text } })}
                className="w-full py-1.5 bg-[#8babf1] text-white text-[10px] font-bold rounded-full shadow-sm hover:bg-[#7a84e5] transition-colors"
              >
                Chat
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
