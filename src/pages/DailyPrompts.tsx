import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Share2 } from 'lucide-react';

export default function DailyPrompts() {
  const navigate = useNavigate();

  const prompts = [
    { 
      id: 1, 
      friend: 'Lily', 
      text: 'Reflect on the visit to the art gallery', 
      image: 'https://picsum.photos/seed/art/400/300',
      time: '2h ago'
    },
    { 
      id: 2, 
      friend: 'Jay', 
      text: 'Share a pleasant moment of your day', 
      image: 'https://picsum.photos/seed/moment/400/300',
      time: '5h ago'
    },
    { 
      id: 3, 
      friend: 'Sarah', 
      text: 'What is your favorite weekend activity?', 
      image: 'https://picsum.photos/seed/weekend/400/300',
      time: 'Yesterday'
    },
    { 
      id: 4, 
      friend: 'Alex', 
      text: 'Describe your perfect morning routine', 
      image: 'https://picsum.photos/seed/morning/400/300',
      time: '2 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="flex items-center px-6 pt-12 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold">Daily Prompts</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 space-y-6">
        {prompts.map(prompt => (
          <div 
            key={prompt.id}
            className="rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm"
          >
            <div className="aspect-[4/3] relative">
              <img 
                src={prompt.image} 
                alt={prompt.friend} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold">
                {prompt.time}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{prompt.friend}'s Prompt</span>
              </div>
              <h3 className="text-lg font-bold leading-tight">{prompt.text}</h3>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => navigate('/chat')}
                  className="flex-grow py-3 bg-black text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <MessageSquare size={16} /> Chat
                </button>
                <button className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
