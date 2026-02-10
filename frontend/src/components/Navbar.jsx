import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LogOut, GraduationCap } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

export default function Navbar() {
  const { authUser: user, logout } = useAuthStore();
  const { unreadCounts, getUnreadCounts, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  // Calculate total unread messages
  const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

  // Subscribe to messages globally for notifications
  // Ideally this should be in a top-level component, but Navbar works too as it's always present.
  // Although subscribing here might duplicate if also done in Connect.
  // Better approach: Do it in App.jsx or a layout. But Navbar is fine if we check auth.
  // Actually, useChatStore logic handles socket events. Let's just use the state here.
  // We need to fetch counts on mount if user is logged in.

  // useEffect(() => {
  //   if(user) getUnreadCounts();
  // }, [user]); 
  // Wait, component logic inside replace tool is weird. I'll just add the hook usage.
  const location = useLocation();

  // Fetch unread counts when user logs in
  // Note: we need useEffect from react
  // I will add import in next step if missing
  // Actually I can't see imports. I'll assume React imports are present or I'll check first. 
  // Wait, I should check Navbar imports first. 
  // Let's just add the hook usage here assuming useEffect is imported or I'll add it.
  // Navbar.jsx imports: `import { Link, useLocation } from 'react-router-dom';`
  // It effectively needs `useEffect`.

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (user) {
      getUnreadCounts();
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [user, getUnreadCounts, subscribeToMessages, unsubscribeFromMessages]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT — Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Alumni Connect
              </span>
              <p className="text-xs text-gray-500 leading-none">Excellence Unites</p>
            </div>
          </Link>

          {/* CENTER — Nav Links (Right Pushed) */}
          <div className="hidden md:flex items-center space-x-1 ml-auto mr-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-all ${isActive('/')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              Home
            </Link>
            <Link
              to="/opportunities"
              className={`px-3 py-2 rounded-lg transition-all ${isActive('/opportunities')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              Opportunities
            </Link>
            <Link
              to="/clubs-culture"
              className={`px-3 py-2 rounded-lg transition-all ${isActive('/clubs-culture')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              Clubs & Culture
            </Link>
            <Link
              to="/connect"
              className={`px-3 py-2 rounded-lg transition-all relative ${isActive('/connect')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              Connect
              {totalUnread > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {totalUnread}
                </span>
              )}
            </Link>
          </div>

          {/* RIGHT — Profile / Login */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <span className="text-white font-semibold text-sm">
                      {user.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                    {user.fullName.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:from-blue-700 hover:to-blue-800"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center space-x-2">
            {user ? (
              <>
                <Link to="/profile">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-xs">
                      {user.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
