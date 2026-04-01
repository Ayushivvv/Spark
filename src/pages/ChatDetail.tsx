import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Phone, Video, Mic, Smile, Image as ImageIcon, Send, X } from 'lucide-react';
import { Friend, Message } from '../types';
import { cn } from '../lib/utils';
import { MOCK_RECOMMENDED } from '../constants';

export default function ChatDetail({ friends, messages, setMessages }: { 
  friends: Friend[], 
  messages: Message[], 
  setMessages: Dispatch<SetStateAction<Message[]>> 
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  const [activePrompt, setActivePrompt] = useState<string | null>(location.state?.prompt || null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isFriend = friends.some(f => f.id === id);
  const friend = friends.find(f => f.id === id) || MOCK_RECOMMENDED.find(f => f.id === id) || friends[0];
  
  const chatMessages = messages.filter(m => 
    (m.senderId === 'me' && m.receiverId === id) || 
    (m.senderId === id && m.receiverId === 'me')
  );

  const myMessagesCount = chatMessages.filter(m => m.senderId === 'me').length;
  const canSendMessage = isFriend || myMessagesCount < 1;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = () => {
    if (!inputText.trim() || !canSendMessage) return;
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'me',
      receiverId: id!,
      text: inputText,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-6 pt-12 pb-4 border-b border-gray-50">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3 flex-grow ml-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={friend.profilePicture} alt={friend.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-0.5">
            <p className="font-bold text-sm">{friend.firstName} {friend.lastName}</p>
            <p className="text-[10px] text-gray-400">Active 11m ago</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="p-2"><Phone size={20} /></button>
          <button className="p-2"><Video size={20} /></button>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto px-6 py-6 space-y-6">
        {activePrompt && (
          <div className="bg-[#8babf1]/10 p-4 rounded-2xl border border-[#8babf1]/20 relative">
            <button 
              onClick={() => setActivePrompt(null)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Daily Prompt</p>
            <p className="text-xs font-bold text-gray-900 pr-6">{activePrompt}</p>
          </div>
        )}

        <p className="text-center text-[10px] text-gray-400 font-bold uppercase">Nov 30, 2023, 9:41 AM</p>
        
        {chatMessages.length === 0 && (
          <p className="text-center text-sm text-gray-500 pt-20">Start by sending a message!</p>
        )}

        {chatMessages.map(msg => (
          <div key={msg.id} className={cn(
            "flex flex-col max-w-[80%]",
            msg.senderId === 'me' ? "ml-auto items-end" : "mr-auto items-start"
          )}>
            <div className={cn(
              "px-4 py-3 rounded-2xl text-sm shadow-sm",
              msg.senderId === 'me' ? "bg-gray-500 text-white rounded-tr-none" : "bg-gray-900 text-white rounded-tl-none"
            )}>
              {msg.text}
            </div>
          </div>
        ))}

        {!isFriend && myMessagesCount >= 1 && (
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-4">
            <p className="text-center text-xs font-bold text-gray-900">
              You cannot send any more messages until becoming friends
            </p>
            <button 
              onClick={() => navigate('/friends')}
              className="w-full mt-2 py-2 bg-black text-white text-[10px] font-bold rounded-lg"
            >
              Go to Friends
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-6 pb-10 pt-4">
        <div className={cn(
          "flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100",
          !canSendMessage && "opacity-50 pointer-events-none"
        )}>
          <input
            type="text"
            placeholder={canSendMessage ? "Message..." : "Become friends to chat more"}
            className="flex-grow bg-transparent border-none focus:ring-0 text-sm py-2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={!canSendMessage}
          />
          {inputText.trim() ? (
            <button onClick={handleSend} className="p-1 text-gray-900"><Send size={20} /></button>
          ) : (
            <>
              <button className="p-1 text-gray-400"><Mic size={20} /></button>
              <button className="p-1 text-gray-400"><Smile size={20} /></button>
              <button className="p-1 text-gray-400"><ImageIcon size={20} /></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
