import { useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, X } from 'lucide-react';
import { User } from '../types';

export default function EditHobbies({ user, setUser }: { user: User | null, setUser: Dispatch<SetStateAction<User | null>> }) {
  const navigate = useNavigate();
  const [hobbies, setHobbies] = useState(user?.hobbies || []);
  const [newHobby, setNewHobby] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    setUser({ ...user, hobbies });
    navigate(-1);
  };

  const addHobby = () => {
    if (newHobby.trim() && !hobbies.includes(newHobby.trim())) {
      const updated = [...hobbies, newHobby.trim()];
      setHobbies(updated);
      setNewHobby('');
      setHasChanges(true);
    }
  };

  const removeHobby = (hobbyToRemove: string) => {
    const updated = hobbies.filter(h => h !== hobbyToRemove);
    setHobbies(updated);
    setHasChanges(true);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="flex items-center px-6 pt-12 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold">Hobbies & Interests</h1>
        <button 
          onClick={handleSave}
          disabled={!hasChanges}
          className={`px-6 py-1.5 text-white text-xs font-bold rounded-full transition-colors ${hasChanges ? 'bg-black' : 'bg-gray-400'}`}
        >
          Done
        </button>
      </div>

      <div className="px-6 space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-900">Your Interests</label>
          <div className="flex flex-wrap gap-3">
            {hobbies.map(hobby => (
              <div 
                key={hobby} 
                className="flex items-center gap-2 px-6 py-2 bg-[#8babf1] text-gray-900 text-xs font-bold rounded-full shadow-sm group"
              >
                {hobby}
                <button onClick={() => removeHobby(hobby)} className="p-0.5 hover:bg-black/10 rounded-full">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-900">Add New</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addHobby()}
              className="flex-grow px-6 py-3 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-[#8babf1] text-sm font-bold"
              placeholder="e.g. Photography"
            />
            <button 
              onClick={addHobby}
              className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
