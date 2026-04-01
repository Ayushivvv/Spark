import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { User } from '../types';
import { MOCK_USER } from '../constants';

export default function SignUpStep2({ onSignUp }: { onSignUp: (u: User) => void }) {
  const navigate = useNavigate();
  const [calmVsEnergetic, setCalmVsEnergetic] = useState(50);
  const [spontaneousVsPlanned, setSpontaneousVsPlanned] = useState(50);

  const handleSignUp = () => {
    onSignUp(MOCK_USER);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-10">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold pr-8">Sign Up</h1>
      </div>

      <div className="space-y-10">
        {/* Schedule */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-900">Add schedule</h2>
          <div className="flex gap-2">
            <button className="flex-1 py-3 bg-black text-white rounded-xl text-sm font-semibold">Google</button>
            <button className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-xl text-sm font-semibold">Apple</button>
            <button 
              onClick={() => navigate('/signup/calendar')}
              className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-xl text-sm font-semibold"
            >
              Manual
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-gray-900">I am...</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-gray-400">
              <span>Calm</span>
              <div className="flex-grow mx-4 relative h-1 bg-gray-100 rounded-full">
                <input
                  type="range"
                  className="absolute inset-0 w-full h-1 appearance-none bg-transparent cursor-pointer accent-[#8b95f6]"
                  value={calmVsEnergetic}
                  onChange={(e) => setCalmVsEnergetic(parseInt(e.target.value))}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-6 bg-[#8b95f6]"></div>
              </div>
              <span>Energetic</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold uppercase text-gray-400">
              <span>Spontaneous</span>
              <div className="flex-grow mx-4 relative h-1 bg-gray-100 rounded-full">
                <input
                  type="range"
                  className="absolute inset-0 w-full h-1 appearance-none bg-transparent cursor-pointer accent-[#8b95f6]"
                  value={spontaneousVsPlanned}
                  onChange={(e) => setSpontaneousVsPlanned(parseInt(e.target.value))}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-6 bg-[#8b95f6]"></div>
              </div>
              <span>Planned</span>
            </div>
          </div>
        </div>

        {/* Qualities */}
        <div className="p-6 rounded-2xl border border-gray-100 space-y-6">
          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-400 uppercase block">Rank your Top 3 positive qualities</label>
            <input type="text" placeholder="Quality 1" className="w-full border-b border-gray-100 pb-2 text-sm focus:outline-none focus:border-[#90d8b2]" />
            <input type="text" placeholder="Quality 2" className="w-full border-b border-gray-100 pb-2 text-sm focus:outline-none focus:border-[#90d8b2]" />
            <input type="text" placeholder="Quality 3" className="w-full border-b border-gray-100 pb-2 text-sm focus:outline-none focus:border-[#90d8b2]" />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-400 uppercase block">Share 3 areas of improvement</label>
            <input type="text" placeholder="Area 1" className="w-full border-b border-gray-100 pb-2 text-sm focus:outline-none focus:border-[#90d8b2]" />
            <input type="text" placeholder="Area 2" className="w-full border-b border-gray-100 pb-2 text-sm focus:outline-none focus:border-[#90d8b2]" />
            <input type="text" placeholder="Area 3" className="w-full border-b border-gray-100 pb-2 text-sm focus:outline-none focus:border-[#90d8b2]" />
          </div>
        </div>

        <button
          onClick={handleSignUp}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors mt-4"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
