import { useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit2, Plus } from 'lucide-react';
import { User } from '../types';
import { cn } from '../lib/utils';

export default function EditProfile({ user, setUser }: { user: User | null, setUser: Dispatch<SetStateAction<User | null>> }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    setUser({ ...user, firstName, lastName });
    navigate('/profile');
  };

  const handleFieldChange = (setter: (val: string) => void, val: string, original: string) => {
    setter(val);
    setHasChanges(true);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="flex items-center px-6 pt-12 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold">Edit</h1>
        <button 
          onClick={handleSave}
          disabled={!hasChanges}
          className={cn(
            "px-6 py-1.5 text-white text-xs font-bold rounded-full transition-colors",
            hasChanges ? "bg-black" : "bg-gray-400"
          )}
        >
          Done
        </button>
      </div>

      <div className="px-6 space-y-6">
        {/* Name Fields */}
        <div className="p-6 rounded-3xl bg-black text-white space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">First Name:</label>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => handleFieldChange(setFirstName, e.target.value, user.firstName)}
              className="w-full bg-white text-black px-4 py-2 rounded-full text-sm font-bold"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Middle/Last Name:</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => handleFieldChange(setLastName, e.target.value, user.lastName)}
              className="w-full bg-white text-black px-4 py-2 rounded-full text-sm font-bold"
            />
          </div>
        </div>

        {/* Bio Section */}
        <div 
          onClick={() => navigate('/profile/edit/bio')}
          className="p-6 rounded-3xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 space-y-4 relative cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="absolute top-4 right-4 p-1 text-gray-400"><Edit2 size={16} /></div>
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <img src={user.profilePicture} alt={user.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold">Bio</h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                {user.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Calendar Settings */}
        <div className="p-6 rounded-3xl bg-[#8dd2dd]/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Calendar</h3>
            <button 
              onClick={() => navigate('/profile/calendar')}
              className="text-[10px] font-bold text-[#4a909c] underline"
            >
              Configure Slots
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-[#8dd2dd] text-gray-900 text-xs font-bold rounded-xl shadow-sm">
              Show Events From:
            </button>
            <select className="bg-white border-none rounded-xl text-xs font-bold px-4 py-2 focus:ring-0">
              <option>This Week</option>
              <option>Next Week</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-[#8dd2dd] text-gray-900 text-xs font-bold rounded-xl shadow-sm">
              AI suggestions:
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setAiSuggestions(!aiSuggestions)}
                className={cn(
                  "w-8 h-4 rounded-full relative transition-colors",
                  aiSuggestions ? "bg-black" : "bg-gray-300"
                )}
              >
                <div className={cn(
                  "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                  aiSuggestions ? "left-4.5" : "left-0.5"
                )}></div>
              </button>
              <span className="text-xs font-bold">{aiSuggestions ? 'Yes' : 'No'}</span>
              <span className="text-[8px] text-gray-400 font-medium leading-tight">Suggest meeting times based on availability</span>
            </div>
          </div>
        </div>

        {/* Hobbies Section */}
        <div 
          onClick={() => navigate('/profile/edit/hobbies')}
          className="p-6 rounded-3xl bg-[#8babf1]/20 space-y-4 cursor-pointer hover:bg-[#8babf1]/30 transition-colors relative"
        >
          <div className="absolute top-4 right-4 p-1 text-[#4a5a9c]"><Edit2 size={16} /></div>
          <h3 className="text-sm font-bold">Hobbies/Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.hobbies.map(hobby => (
              <span key={hobby} className="px-6 py-2 bg-[#8babf1] text-gray-900 text-xs font-bold rounded-full shadow-sm">
                {hobby}
              </span>
            ))}
            <div className="px-4 py-2 bg-[#8babf1]/50 text-gray-900 text-xs font-bold rounded-full border border-dashed border-[#4a5a9c] flex items-center gap-1">
              <Plus size={14} /> Edit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
