/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User, Friend, Event, Message } from './types';
import { MOCK_USER, MOCK_FRIENDS, MOCK_EVENTS, MOCK_REQUESTS } from './constants';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignUpStep1 from './pages/SignUpStep1';
import SignUpStep2 from './pages/SignUpStep2';
import CalendarSetup from './pages/CalendarSetup';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Friends from './pages/Friends';
import FriendProfile from './pages/FriendProfile';
import ChatList from './pages/ChatList';
import ChatDetail from './pages/ChatDetail';
import ScheduleComparison from './pages/ScheduleComparison';
import MyProfile from './pages/MyProfile';
import EditProfile from './pages/EditProfile';
import EditBio from './pages/EditBio';
import EditHobbies from './pages/EditHobbies';
import Notifications from './pages/Notifications';
import DailyPrompts from './pages/DailyPrompts';

// Components
import Navbar from './components/Navbar';

import FriendRequests from './pages/FriendRequests';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [requests, setRequests] = useState<Friend[]>(MOCK_REQUESTS);
  const [sentRequests, setSentRequests] = useState<string[]>([]);

  // Simple auth check simulation
  const isAuthenticated = !!user;

  const handleAcceptRequest = (request: Friend) => {
    setFriends(prev => [...prev, request]);
    setRequests(prev => prev.filter(r => r.id !== request.id));
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const handleSendRequest = (friendId: string) => {
    setSentRequests(prev => [...prev, friendId]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-sans pb-20">
        <Routes>
          {/* Auth Routes */}
          <Route path="/signin" element={<SignIn onSignIn={() => setUser(MOCK_USER)} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/step1" element={<SignUpStep1 />} />
          <Route path="/signup/step2" element={<SignUpStep2 onSignUp={(u) => setUser(u)} />} />
          <Route path="/signup/calendar" element={<CalendarSetup user={user} onSave={(schedule, visibility) => {
            if (user) {
              setUser({ ...user, schedule, scheduleVisibility: visibility as any });
            }
          }} />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Home user={user} friends={friends} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/events"
            element={isAuthenticated ? <Events events={events} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/events/:id"
            element={isAuthenticated ? <EventDetail events={events} setEvents={setEvents} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/events/create"
            element={isAuthenticated ? <CreateEvent user={user} friends={friends} setEvents={setEvents} events={events} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/events/edit/:id"
            element={isAuthenticated ? <CreateEvent user={user} friends={friends} setEvents={setEvents} events={events} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/friends"
            element={isAuthenticated ? (
              <Friends 
                friends={friends} 
                setFriends={setFriends} 
                sentRequests={sentRequests}
                onSendRequest={handleSendRequest}
                requestsCount={requests.length}
              />
            ) : <Navigate to="/signin" />}
          />
          <Route
            path="/friends/requests"
            element={isAuthenticated ? (
              <FriendRequests 
                requests={requests} 
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            ) : <Navigate to="/signin" />}
          />
          <Route
            path="/friends/:id"
            element={isAuthenticated ? <FriendProfile user={user} friends={friends} requests={requests} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/chat"
            element={isAuthenticated ? <ChatList friends={friends} messages={messages} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/chat/:id"
            element={isAuthenticated ? <ChatDetail friends={friends} messages={messages} setMessages={setMessages} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/compare/:id"
            element={isAuthenticated ? <ScheduleComparison user={user} friends={friends} requests={requests} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <MyProfile user={user} onLogout={() => setUser(null)} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/profile/edit"
            element={isAuthenticated ? <EditProfile user={user} setUser={setUser} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/profile/edit/bio"
            element={isAuthenticated ? <EditBio user={user} setUser={setUser} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/profile/edit/hobbies"
            element={isAuthenticated ? <EditHobbies user={user} setUser={setUser} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/notifications"
            element={isAuthenticated ? <Notifications /> : <Navigate to="/signin" />}
          />
          <Route
            path="/prompts"
            element={isAuthenticated ? <DailyPrompts /> : <Navigate to="/signin" />}
          />
        </Routes>

        {isAuthenticated && <Navbar />}
      </div>
    </Router>
  );
}

