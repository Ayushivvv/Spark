import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Apple } from 'lucide-react';

export default function SignIn({ onSignIn }: { onSignIn: () => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    onSignIn();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center px-8 pt-20 pb-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-16">Spark</h1>
      
      <div className="w-full space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Sign in</h2>
          <p className="text-sm text-gray-500">Enter your email and password to sign into this app</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="email@domain.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#90d8b2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#90d8b2]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSignIn}
            className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </div>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleSignIn}
            className="w-full py-3 bg-gray-100 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button 
            onClick={handleSignIn}
            className="w-full py-3 bg-gray-100 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <Apple size={20} />
            Continue with Apple
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 pt-4">
          No account? <Link to="/signup" className="text-black font-semibold underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
