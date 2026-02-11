import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LogOut, GraduationCap, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

export default function Navbar() {
  const { authUser: user, logout } = useAuthStore();
  const { unreadCounts, getUnreadCounts, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate total unread messages
  const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (user) {
      getUnreadCounts();
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [user, getUnreadCounts, subscribeToMessages, unsubscribeFromMessages]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20'
        : 'bg-white shadow-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT — Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 transform group-hover:scale-105">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Alumni Connect
              </span>
              <p className="text-xs text-gray-500 leading-none tracking-wide">Excellence Unites</p>
            </div>
          </Link>

          {/* CENTER — Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-1 ml-auto mr-8">
            {[
              { path: '/', label: 'Home' },
              { path: '/opportunities', label: 'Opportunities' },
              { path: '/clubs-culture', label: 'Clubs & Culture' },
              { path: '/connect', label: 'Connect', badge: totalUnread }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full transition-all duration-300 relative text-sm font-medium ${isActive(link.path)
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
              >
                {link.label}
                {link.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse shadow-sm">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* RIGHT — Profile / Login (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 pl-1 pr-3 py-1 rounded-full hover:bg-gray-100/80 transition-all group border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                    <span className="text-white font-semibold text-xs">
                      {user.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user.fullName.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 py-3 space-y-2">
            {[
              { path: '/', label: 'Home' },
              { path: '/opportunities', label: 'Opportunities' },
              { path: '/clubs-culture', label: 'Clubs & Culture' },
              { path: '/connect', label: 'Connect', badge: totalUnread }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(link.path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
                  } flex justify-between items-center`}
              >
                {link.label}
                {link.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-100 mt-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700 font-medium">{user.fullName}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-xl font-medium shadow-md active:scale-95 transition-all"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
