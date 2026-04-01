import { useState, type Dispatch, type SetStateAction, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { User } from '../types';

export default function EditBio({ user, setUser }: { user: User | null, setUser: Dispatch<SetStateAction<User | null>> }) {
  const navigate = useNavigate();
  const [bio, setBio] = useState(user?.bio || '');
  const [hasChanges, setHasChanges] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    setUser({ ...user, bio });
    navigate(-1);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    setHasChanges(e.target.value !== user.bio);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="flex items-center px-6 pt-12 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold">Edit Bio</h1>
        <button 
          onClick={handleSave}
          disabled={!hasChanges}
          className={`px-6 py-1.5 text-white text-xs font-bold rounded-full transition-colors ${hasChanges ? 'bg-black' : 'bg-gray-400'}`}
        >
          Done
        </button>
      </div>

      <div className="px-6 space-y-6">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm">
            <img src={user.profilePicture} alt={user.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <button className="text-[#8babf1] text-sm font-bold">Change Profile Photo</button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">Bio</label>
          <textarea
            value={bio}
            onChange={handleChange}
            className="w-full h-40 p-4 rounded-3xl bg-gray-50 border-none focus:ring-2 focus:ring-[#8babf1] text-sm leading-relaxed"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
    </div>
  );
}
