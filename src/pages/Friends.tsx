import { useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Users, ChevronLeft } from 'lucide-react';
import { Friend } from '../types';
import { MOCK_RECOMMENDED } from '../constants';
import { cn } from '../lib/utils';

export default function Friends({ 
  friends, 
  setFriends, 
  sentRequests, 
  onSendRequest, 
  requestsCount 
}: { 
  friends: Friend[], 
  setFriends: Dispatch<SetStateAction<Friend[]>>,
  sentRequests: string[],
  onSendRequest: (id: string) => void,
  requestsCount: number
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'my' | 'find'>('my');

  return (
    <div className="px-6 pt-12 pb-24 space-y-6">
      <h1 className="text-2xl font-bold">{activeTab === 'my' ? 'My Friends' : 'Find Friends'}</h1>

      <div className="flex gap-2">
        <button 
          onClick={() => setActiveTab('my')}
          className={cn(
            "flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors",
            activeTab === 'my' ? "bg-black text-white" : "bg-gray-100 text-gray-900"
          )}
        >
          My Friends <UserPlus size={18} />
        </button>
        <button 
          onClick={() => setActiveTab('find')}
          className={cn(
            "flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors",
            activeTab === 'find' ? "bg-black text-white" : "bg-gray-100 text-gray-900"
          )}
        >
          Find Friends <UserPlus size={18} />
        </button>
      </div>

      {activeTab === 'my' && (
        <div className="space-y-6">
          <div 
            onClick={() => navigate('/friends/requests')}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Users size={24} className="text-gray-900" />
                {requestsCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-bold">Friend Requests</p>
                <p className="text-xs text-gray-400">
                  {requestsCount > 0 ? `View ${requestsCount} Received Requests` : 'No Pending Requests'}
                </p>
              </div>
            </div>
            <ChevronLeft size={20} className="rotate-180 text-gray-400" />
          </div>

          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2]"
            />
          </div>

          <div className="space-y-4">
            {friends.map(friend => (
              <div 
                key={friend.id} 
                className="flex items-center gap-4 p-2 cursor-pointer group"
                onClick={() => navigate(`/friends/${friend.id}`)}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img src={friend.profilePicture} alt={friend.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{friend.firstName} {friend.lastName}</p>
                    <span className="text-[10px] text-gray-400 font-medium">{friend.lastActivity}</span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">{friend.status}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate(`/chat/${friend.id}`); }}
                  className="px-6 py-2 bg-black text-white text-xs font-bold rounded-xl"
                >
                  Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'find' && (
        <div className="space-y-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2]"
            />
          </div>

          <div className="space-y-6">
            {MOCK_RECOMMENDED.map(rec => (
              <div key={rec.id} className="p-6 rounded-3xl border border-gray-100 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img src={rec.profilePicture} alt={rec.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-lg">{rec.firstName} {rec.lastName}</p>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => navigate(`/chat/${rec.id}`)}
                          className="px-6 py-1.5 bg-gray-100 text-gray-900 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          Chat
                        </button>
                        <button 
                          onClick={() => navigate(`/friends/${rec.id}`)}
                          className="px-6 py-1.5 bg-gray-100 text-gray-900 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          Profile
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {rec.bio.slice(0, 100)}... <span className="text-gray-400 font-bold cursor-pointer">(read more)</span>
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onSendRequest(rec.id)}
                  disabled={sentRequests.includes(rec.id)}
                  className={cn(
                    "w-full py-3 rounded-xl text-sm font-bold transition-colors",
                    sentRequests.includes(rec.id) 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-black text-white hover:bg-gray-800"
                  )}
                >
                  {sentRequests.includes(rec.id) ? 'Request Sent' : 'Make friend request'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
