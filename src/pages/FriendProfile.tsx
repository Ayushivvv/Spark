import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MessageCircle, Calendar, MoreHorizontal } from 'lucide-react';
import { Friend, User } from '../types';
import { MOCK_RECOMMENDED, MOCK_REQUESTS } from '../constants';
import { calculateIntersections, formatIntersection } from '../lib/schedule';

export default function FriendProfile({ user, friends, requests = [] }: { user: User | null, friends: Friend[], requests?: Friend[] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const friend = [...friends, ...requests, ...MOCK_RECOMMENDED, ...MOCK_REQUESTS].find(f => f.id === id);

  if (!friend) return <div>Friend not found</div>;

  const intersections = calculateIntersections(user, friend as Friend);

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="flex items-center px-6 pt-12 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold pr-8">{friend.firstName} {friend.lastName}</h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-[#90d8b2]/20 shadow-sm flex gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
            <img src={friend.profilePicture} alt={friend.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-6">
              {friend.bio}
            </p>
            <button 
              onClick={() => navigate(`/chat/${friend.id}`)}
              className="px-6 py-2 bg-[#90d8b2] text-gray-900 text-xs font-bold rounded-full shadow-sm"
            >
              Chat with {friend.firstName}
            </button>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="p-6 rounded-3xl bg-[#8dd2dd]/20 space-y-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate(`/compare/${friend.id}`)}
              className="px-6 py-2 bg-[#8dd2dd] text-gray-900 text-xs font-bold rounded-full shadow-sm"
            >
              Calendar
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-white/50">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              <p className="text-xs font-bold">Attending - CSSU Party on Sep 22, 7pm-3am</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase">Suggestions:</p>
              {intersections.length > 0 ? (
                intersections.slice(0, 3).map((inter, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-white/50">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <p className="text-xs font-bold">{formatIntersection(inter)}</p>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-white/50">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <p className="text-xs font-bold text-gray-500 italic">No common free time</p>
                </div>
              )}
              <div className="flex gap-1 p-1">
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="p-6 rounded-3xl bg-[#8babf1]/20 space-y-4">
          <h3 className="text-sm font-bold">Hobbies/Interests</h3>
          <div className="flex flex-wrap gap-2">
            {friend.hobbies.map(hobby => (
              <span key={hobby} className="px-6 py-2 bg-[#8babf1] text-gray-900 text-xs font-bold rounded-full shadow-sm">
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
