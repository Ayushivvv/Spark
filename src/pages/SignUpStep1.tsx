import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, Search, X } from 'lucide-react';

export default function SignUpStep1() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [bio, setBio] = useState('');
  const [hobbyInput, setHobbyInput] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);

  const addHobby = () => {
    if (hobbyInput.trim() && !hobbies.includes(hobbyInput.trim())) {
      setHobbies([...hobbies, hobbyInput.trim()]);
      setHobbyInput('');
    }
  };

  const removeHobby = (hobby: string) => {
    setHobbies(hobbies.filter(h => h !== hobby));
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-10">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold pr-8">Sign Up</h1>
      </div>

      <div className="space-y-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <Camera size={32} className="text-gray-400 mb-1" />
            <span className="text-[10px] text-gray-400 uppercase font-bold">Upload</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2]"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Year of Study</label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2] appearance-none"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Major</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2]"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Bio</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2] h-24 resize-none"
            placeholder="Write a short bio that captures you!"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <p className="text-[10px] text-right text-gray-400">{bio.length}/200 characters</p>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase">Hobbies</label>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Hobbies/Interests"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2]"
              value={hobbyInput}
              onChange={(e) => setHobbyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addHobby()}
            />
          </div>
          <div className="flex flex-wrap gap-2 min-h-[60px] p-4 rounded-xl border border-gray-100">
            {hobbies.map(hobby => (
              <span key={hobby} className="px-3 py-1 bg-[#8babf1] text-white rounded-full text-sm flex items-center gap-1">
                {hobby}
                <X size={14} className="cursor-pointer" onClick={() => removeHobby(hobby)} />
              </span>
            ))}
            {hobbies.length === 0 && <span className="text-gray-300 text-sm">Hobbies/Interests appear here</span>}
          </div>
        </div>

        <button
          onClick={() => navigate('/signup/step2')}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors mt-4"
        >
          Next
        </button>
      </div>
    </div>
  );
}
