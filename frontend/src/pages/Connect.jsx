import { useState } from 'react';
import {
  Search,
  MessageCircle,
  Calendar,
  MapPin,
  Building2,
  Briefcase,
  X,
} from 'lucide-react';

export default function Connect() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showChatModal, setShowChatModal] = useState(false);
  const [showMeetModal, setShowMeetModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [meetData, setMeetData] = useState({
    date: '',
    time: '',
    message: '',
  });

  const allAlumni = [
    {
      id: 1,
      name: 'Sarah Johnson',
      batch: '2018',
      company: 'Google',
      role: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Michael Chen',
      batch: '2019',
      company: 'Meta',
      role: 'Product Manager',
      location: 'Menlo Park, CA',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      batch: '2017',
      company: 'Amazon',
      role: 'Data Scientist',
      location: 'Seattle, WA',
      avatar: 'ER',
    },
    {
      id: 4,
      name: 'David Kumar',
      batch: '2020',
      company: 'Microsoft',
      role: 'Cloud Solutions Architect',
      location: 'Redmond, WA',
      avatar: 'DK',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      batch: '2016',
      company: 'Apple',
      role: 'Design Lead',
      location: 'Cupertino, CA',
      avatar: 'LA',
    },
    {
      id: 6,
      name: 'James Wilson',
      batch: '2019',
      company: 'Netflix',
      role: 'Backend Engineer',
      location: 'Los Gatos, CA',
      avatar: 'JW',
    },
    {
      id: 7,
      name: 'Priya Patel',
      batch: '2021',
      company: 'Tesla',
      role: 'ML Engineer',
      location: 'Palo Alto, CA',
      avatar: 'PP',
    },
    {
      id: 8,
      name: 'Robert Martinez',
      batch: '2018',
      company: 'Airbnb',
      role: 'Engineering Manager',
      location: 'San Francisco, CA',
      avatar: 'RM',
    },
  ];

  const filteredAlumni = allAlumni.filter((alumni) => {
    const search = searchTerm.toLowerCase();
    return (
      alumni.name.toLowerCase().includes(search) ||
      alumni.batch.includes(search) ||
      alumni.company.toLowerCase().includes(search) ||
      alumni.role.toLowerCase().includes(search) ||
      alumni.location.toLowerCase().includes(search)
    );
  });

  const handleChatClick = (alumni) => {
    setSelectedAlumni(alumni);
    setShowChatModal(true);
  };

  const handleMeetClick = (alumni) => {
    setSelectedAlumni(alumni);
    setShowMeetModal(true);
  };

  const handleSendChat = () => {
    alert(`Message sent to ${selectedAlumni?.name}: ${chatMessage}`);
    setChatMessage('');
    setShowChatModal(false);
  };

  const handleScheduleMeet = () => {
    alert(
      `Meeting scheduled with ${selectedAlumni?.name} on ${meetData.date} at ${meetData.time}`
    );
    setMeetData({ date: '', time: '', message: '' });
    setShowMeetModal(false);
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

        <div className="grid md:grid-cols-2 gap-6">
          {filteredAlumni.map((alumni) => (
            <div
              key={alumni.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {alumni.avatar}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {alumni.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span>Batch {alumni.batch}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{alumni.company}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{alumni.role}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{alumni.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleChatClick(alumni)}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat with Alum</span>
                    </button>
                    <button
                      onClick={() => handleMeetClick(alumni)}
                      className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Schedule a Meet</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No alumni found matching your search.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 font-semibold hover:text-blue-700"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {showChatModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Chat with {selectedAlumni.name}
              </h3>
              <button
                onClick={() => setShowChatModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
            />
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowChatModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendChat}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {showMeetModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Schedule Meet with {selectedAlumni.name}
              </h3>
              <button
                onClick={() => setShowMeetModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={meetData.date}
                  onChange={(e) =>
                    setMeetData({ ...meetData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={meetData.time}
                  onChange={(e) =>
                    setMeetData({ ...meetData, time: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={meetData.message}
                  onChange={(e) =>
                    setMeetData({ ...meetData, message: e.target.value })
                  }
                  placeholder="Add a message..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowMeetModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleMeet}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
