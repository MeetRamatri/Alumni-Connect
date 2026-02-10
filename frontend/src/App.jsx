import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Opportunities from './pages/Opportunities';
import OpportunityDetails from './pages/OpportunityDetails';
import ClubsCulture from './pages/ClubsCulture';
import ClubsCultureDetails from './pages/ClubsCultureDetails';
import Connect from './pages/Connect';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import EventDetails from './pages/EventDetails';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Opportunities */}
            <Route path="/opportunities" element={authUser ? <Opportunities /> : <Navigate to="/login" />} />
            <Route path="/opportunities/:id" element={authUser ? <OpportunityDetails /> : <Navigate to="/login" />} />

            {/* Events */}
            <Route path="/events/:id" element={authUser ? <EventDetails /> : <Navigate to="/login" />} />

            {/* Clubs & Culture */}
            <Route path="/clubs-culture" element={authUser ? <ClubsCulture /> : <Navigate to="/login" />} />
            <Route path="/clubs-culture/:id" element={authUser ? <ClubsCultureDetails /> : <Navigate to="/login" />} />

            {/* Other pages */}
            <Route path="/connect" element={authUser ? <Connect /> : <Navigate to="/login" />} />
            <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />

            {/* Redirects */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
