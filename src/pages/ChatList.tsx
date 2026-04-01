import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft } from 'lucide-react';
import { Friend, Message } from '../types';

export default function ChatList({ friends, messages }: { friends: Friend[], messages: Message[] }) {
  const navigate = useNavigate();

  return (
    <div className="px-6 pt-12 pb-24 space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>

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
            onClick={() => navigate(`/chat/${friend.id}`)}
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
                <span className="text-[10px] text-gray-400 font-medium">1d</span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-1">Recently attended a concert</p>
            </div>
            <button className="px-6 py-2 bg-black text-white text-xs font-bold rounded-xl">
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
