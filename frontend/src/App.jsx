import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

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
import EventDetails from './pages/EventDetails';   // ⬅️ NEW

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Opportunities */}
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/opportunities/:id" element={<OpportunityDetails />} />

              {/* Events */}
              <Route path="/events/:id" element={<EventDetails />} />

              {/* Clubs & Culture */}
              <Route path="/clubs-culture" element={<ClubsCulture />} />
              <Route path="/clubs-culture/:id" element={<ClubsCultureDetails />} />

              {/* Other pages */}
              <Route path="/connect" element={<Connect />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
