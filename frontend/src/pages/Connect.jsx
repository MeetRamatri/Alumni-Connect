import { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '../lib/axios';
import {
  Search,
  MessageCircle,
  Calendar,
  MapPin,
  Building2,
  Briefcase,
  X,
  Send,
  Video,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';

export default function Connect() {
  const { authUser } = useAuthStore();
  const {
    messages,
    users,
    selectedUser,
    isUsersLoading,
    isMessagesLoading,
    unreadCounts,
    getUsers,
    getMessagesByUserId,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
    setSelectedUser
  } = useChatStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Initial fetch
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Socket subscription
  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to bottom
  useEffect(() => {
    if (showChatModal && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showChatModal]);

  const filteredAlumni = users.filter((user) => {
    if (user._id === authUser?._id) return false;
    const search = searchTerm.toLowerCase();
    const name = user.fullName || '';
    const batch = user.batch ? String(user.batch) : '';
    const company = user.company || '';
    const role = user.cur_role || user.role || '';
    const location = user.location || '';
    return (
      name.toLowerCase().includes(search) ||
      batch.includes(search) ||
      company.toLowerCase().includes(search) ||
      role.toLowerCase().includes(search) ||
      location.toLowerCase().includes(search)
    );
  });

  const handleChatClick = async (user) => {
    setSelectedUser(user);
    setShowChatModal(true);
    await getMessagesByUserId(user._id);
  };

  const handleSendChat = async () => {
    if (!chatMessage.trim()) return;
    await sendMessage({ text: chatMessage });
    setChatMessage('');
  };

  const handleCloseChat = () => {
    setShowChatModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect with Alumni</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build your professional network. Chat with alumni, schedule mentorship sessions, and grow your career.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by name, company, role, or batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm transition-all text-lg"
            />
          </div>
          <div className="mt-3 text-right text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{filteredAlumni.length}</span> alumni
          </div>
        </div>

        {isUsersLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col group"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="relative">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className="w-16 h-16 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <span className="text-white font-bold text-2xl">
                          {user.fullName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    {unreadCounts && unreadCounts[user._id] > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-bounce shadow-sm">
                        {unreadCounts[user._id]}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                      {user.fullName}
                    </h3>
                    {(user.cur_role || user.role) && (
                      <p className="text-blue-600 text-sm font-medium truncate flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                        {user.cur_role || user.role}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  {user.company && (
                    <div className="flex items-center text-gray-600 text-sm p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50/50 transition-colors">
                      <Building2 className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                      <span className="font-medium">{user.company}</span>
                    </div>
                  )}
                  {user.batch && (
                    <div className="flex items-center text-gray-600 text-sm p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50/50 transition-colors">
                      <Calendar className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                      <span>Batch of {user.batch}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center text-gray-600 text-sm p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50/50 transition-colors">
                      <MapPin className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                      <span className="truncate">{user.location}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    onClick={() => handleChatClick(user)}
                    className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-blue-500/30 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </button>
                  <button
                    onClick={() => {
                      if (user.calendlyLink) {
                        window.open(user.calendlyLink, '_blank', 'noopener,noreferrer');
                      } else {
                        toast.error('Scheduling link not available');
                      }
                    }}
                    className={`flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold border transition-all active:scale-95 ${user.calendlyLink
                        ? 'bg-white text-gray-700 border-gray-200 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50'
                        : 'bg-gray-50 text-gray-400 border-transparent cursor-not-allowed'
                      }`}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Meet
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredAlumni.length === 0 && !isUsersLoading && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No alumni found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search terms</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 font-semibold hover:text-blue-700"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* CHAT MODAL */}
      {showChatModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full h-[600px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {selectedUser.profilePic ? (
                    <img src={selectedUser.profilePic} alt="" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedUser.fullName?.charAt(0)}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selectedUser.fullName}</h3>
                  <p className="text-xs text-green-600 font-medium">Online</p>
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {isMessagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <MessageCircle className="w-12 h-12 mb-3 text-gray-300" />
                  <p className="font-medium">No messages yet</p>
                  <p className="text-sm">Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isMe = msg.senderId === authUser._id;
                  return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm ${isMe
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                          }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <p className={`text-[10px] mt-1.5 text-right ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
                />
                <button
                  onClick={handleSendChat}
                  disabled={!chatMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all transform active:scale-95 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
