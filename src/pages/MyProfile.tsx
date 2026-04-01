import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Menu, LogOut } from 'lucide-react';
import { User } from '../types';

export default function MyProfile({ user, onLogout }: { user: User | null, onLogout: () => void }) {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="flex items-center px-6 pt-12 mb-6">
        <button className="p-2 -ml-2">
          <Menu size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold">You: {user.firstName} {user.lastName}</h1>
        <button 
          onClick={() => navigate('/profile/edit')}
          className="px-4 py-1.5 bg-gray-200 text-gray-900 text-xs font-bold rounded-full"
        >
          Edit
        </button>
      </div>

      <div className="px-6 space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex gap-6">
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img src={user.profilePicture} alt={user.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <button 
              onClick={() => navigate('/signup/calendar')}
              className="px-6 py-2 bg-[#8dd2dd] text-gray-900 text-xs font-bold rounded-full shadow-sm"
            >
              Calendar
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {user.bio}
            </p>
          </div>
        </div>

        {/* Coming Up Section */}
        <div className="p-6 rounded-3xl bg-[#8dd2dd]/20 space-y-4">
          <h3 className="text-sm font-bold">Coming Up:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-[#8dd2dd]/40 rounded-full">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              <p className="text-xs font-bold underline">Coffee with Lily on Tue, 2pm-3pm</p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#8dd2dd]/40 rounded-full">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              <p className="text-xs font-bold underline">Rock Climbing with Jay on Thu, 2pm-3pm</p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#8dd2dd]/40 rounded-full">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              <p className="text-xs font-bold underline">Coffee with Lily on Sat, 2pm-3pm</p>
            </div>
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="p-6 rounded-3xl bg-[#8babf1]/20 space-y-4">
          <h3 className="text-sm font-bold">Hobbies/Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.hobbies.map(hobby => (
              <span key={hobby} className="px-6 py-2 bg-[#8babf1] text-gray-900 text-xs font-bold rounded-full shadow-sm">
                {hobby}
              </span>
            ))}
            <button className="px-4 py-2 bg-[#8babf1] text-gray-900 text-xs font-bold rounded-full shadow-sm">
              ...
            </button>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
}
