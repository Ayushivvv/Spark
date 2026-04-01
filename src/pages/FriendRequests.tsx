import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { Friend } from '../types';
import { MOCK_RECOMMENDED } from '../constants';

export default function FriendRequests({ 
  requests, 
  onAccept, 
  onReject 
}: { 
  requests: Friend[], 
  onAccept: (request: Friend) => void, 
  onReject: (requestId: string) => void 
}) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-24 space-y-6">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-xl font-bold pr-8">Friend matching</h1>
      </div>

      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#90d8b2]"
        />
      </div>

      <div className="space-y-8">
        {requests.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No pending requests
          </div>
        ) : (
          requests.map(request => (
            <div key={request.id} className="space-y-4 pb-4 border-b border-gray-50 last:border-0">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src={request.profilePicture} alt={request.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg">{request.firstName} {request.lastName}</p>
                      <span className="text-xs text-gray-400 font-medium">{request.lastActivity}</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/friends/${request.id}`)}
                      className="px-6 py-2 bg-gray-100 text-gray-900 text-xs font-bold rounded-xl"
                    >
                      Profile
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {request.bio.slice(0, 100)}... <span className="text-gray-400 font-bold cursor-pointer">(read more)</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pl-20">
                <button 
                  onClick={() => onAccept(request)}
                  className="flex-1 py-2 bg-black text-white rounded-xl text-sm font-bold"
                >
                  Accept
                </button>
                <button 
                  onClick={() => onReject(request.id)}
                  className="flex-1 py-2 bg-gray-100 text-gray-900 rounded-xl text-sm font-bold"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
