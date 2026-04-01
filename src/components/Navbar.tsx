import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Send, Users, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Calendar, path: '/events', label: 'Events' },
    { icon: Send, path: '/chat', label: 'Chat' },
    { icon: Users, path: '/friends', label: 'Friends' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
          </NavLink>
        );
      })}
      <NavLink to="/profile" className="flex flex-col items-center">
        <div className={cn(
          "w-8 h-8 rounded-full overflow-hidden border-2 transition-all",
          location.pathname.startsWith('/profile') ? "border-gray-900 scale-110" : "border-transparent"
        )}>
          <img src="https://picsum.photos/seed/rose/100" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </NavLink>
    </nav>
  );
}
