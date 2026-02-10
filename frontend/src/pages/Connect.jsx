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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Connect</h1>
          <p className="mt-4 text-lg text-gray-600">
            Chat with alumni or schedule a meet
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search alumni by name, batch, company, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-lg"
            />
          </div>
        </div>

        <div className="mb-4 text-gray-600">
          Showing <span className="font-semibold">{filteredAlumni.length}</span> alumni
        </div>

        {isUsersLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredAlumni.map((user) => (
              <div key={user._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 relative">
                {/* Avatar Badge can be handled here too if we want */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 relative">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {user.fullName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    {/* Unread Badge on Avatar */}
                    {unreadCounts && unreadCounts[user._id] > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                        {unreadCounts[user._id]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{user.fullName}</h3>
                    <div className="space-y-2 mb-4">
                      {user.batch && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                          <span>Batch {user.batch}</span>
                        </div>
                      )}
                      {user.company && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                          <span>{user.company}</span>
                        </div>
                      )}
                      {(user.cur_role || user.role) && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                          <span>{user.cur_role || user.role}</span>
                        </div>
                      )}
                      {user.location && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                          <span>{user.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleChatClick(user)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                        {unreadCounts && unreadCounts[user._id] > 0 && (
                          <span className="ml-2 bg-green-200 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">
                            {unreadCounts[user._id]}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          if (user.calendlyLink) {
                            window.open(user.calendlyLink, '_blank', 'noopener,noreferrer');
                          } else {
                            toast.error('This user hasn\'t provided a scheduling link yet.');
                          }
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold border-2 transition-colors ${user.calendlyLink
                            ? 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                            : 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed hover:bg-gray-200'
                          }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule a meet</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredAlumni.length === 0 && !isUsersLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No alumni found matching your search.</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full h-[600px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {selectedUser.fullName?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selectedUser.fullName}</h3>
                  <p className="text-xs text-green-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {isMessagesLoading ? (
                <div className="flex justify-center mt-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                  <p>No messages yet.</p>
                  <p className="text-sm">Say hello to start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isMe = msg.senderId === authUser._id;
                  return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${isMe
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                        }`}>
                        <p className="break-words">{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white rounded-b-xl">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
                <button
                  onClick={handleSendChat}
                  disabled={!chatMessage.trim()}
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
