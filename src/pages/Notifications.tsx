import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, UserPlus, Calendar, MessageSquare } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'friend_request',
      title: 'New Friend Request',
      message: 'Alex Johnson sent you a friend request.',
      time: '2m ago',
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'event_reminder',
      title: 'Event Reminder',
      message: 'Art Gallery Visit starts in 1 hour!',
      time: '1h ago',
      icon: Calendar,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'Lily: "See you there!"',
      time: '3h ago',
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="flex items-center px-6 pt-12 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold">Notifications</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 space-y-4">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className="flex items-start gap-4 p-4 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className={`p-3 rounded-2xl ${notification.color}`}>
              <notification.icon size={20} />
            </div>
            <div className="flex-grow space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">{notification.title}</h3>
                <span className="text-[10px] text-gray-400 font-bold">{notification.time}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{notification.message}</p>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <Bell size={32} className="text-gray-300" />
            </div>
            <p className="text-sm font-bold text-gray-400">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
