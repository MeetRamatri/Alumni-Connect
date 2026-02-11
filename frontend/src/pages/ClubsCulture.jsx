import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code,
  Music,
  Trophy,
  Palette,
  Theater,
  Lightbulb,
  Sparkles,
  Calendar,
  Users,
  Crown,
  Plus,
  X
} from 'lucide-react';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

// Map string names to components
const iconMap = {
  Code,
  Music,
  Trophy,
  Palette,
  Theater,
  Lightbulb,
  Sparkles,
  Calendar,
  Users,
  Crown
};

const predefinedColors = [
  'bg-blue-100 text-blue-800',
  'bg-purple-100 text-purple-800',
  'bg-green-100 text-green-800',
  'bg-pink-100 text-pink-800',
  'bg-yellow-100 text-yellow-800',
  'bg-orange-100 text-orange-800',
  'bg-red-100 text-red-800',
  'bg-indigo-100 text-indigo-800',
];

export default function ClubsCulture() {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Club Form State
  const [newClub, setNewClub] = useState({
    name: '',
    description: '',
    longDescription: '',
    tag: 'Cultural',
    icon: 'Users',
    color: 'bg-blue-100 text-blue-800',
    president: '',
    vicePresident: '',
    memberCount: '',
  });

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const res = await axiosInstance.get('/clubs');
      setClubs(res.data);
    } catch (err) {
      console.error("Failed to fetch clubs", err);
      toast.error("Failed to load clubs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClub = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post('/clubs', newClub);
      setClubs([...clubs, res.data]);
      setIsModalOpen(false);
      setNewClub({
        name: '',
        description: '',
        longDescription: '',
        tag: 'Cultural',
        icon: 'Users',
        color: 'bg-blue-100 text-blue-800',
        president: '',
        vicePresident: '',
        memberCount: '',
      });
      toast.success("Club created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create club");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Clubs and Culture</h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore the vibrant student life on campus
          </p>
        </div>

        {/* CLUBS GRID */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 w-full relative">
              Our Clubs
              {authUser?.role === 'admin' && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
                  title="Add New Club"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : clubs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">No clubs found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clubs.map((club) => {
                const IconComponent = iconMap[club.icon] || Users;
                // Parse color string to get background and text/border colors
                const colorClass = club.color || 'bg-blue-100 text-blue-800';
                // This is a naive parsing, relying on the format "bg-X-100 text-X-800"
                const bgClass = colorClass.split(' ')[0];
                const textClass = colorClass.split(' ')[1];

                return (
                  <div
                    key={club._id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 flex flex-col h-full relative overflow-hidden"
                  >
                    {/* Decorative Top Line */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${bgClass.replace('100', '500')}`} />

                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 ${bgClass} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-7 h-7 ${textClass}`} />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colorClass}`}
                      >
                        {club.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {club.name}
                    </h3>

                    {club.president && (
                      <div className="flex items-center text-sm text-gray-500 mb-3 bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                        <Crown className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">lead: {club.president}</span>
                      </div>
                    )}

                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-sm flex-grow">
                      {club.description}
                    </p>

                    <button
                      onClick={() => navigate(`/clubs-culture/${club._id}`)}
                      className={`w-full py-3 rounded-xl font-bold transition-all ${'bg-gray-50 text-gray-700 hover:bg-gray-100 group-hover:bg-blue-600 group-hover:text-white'
                        }`}
                    >
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CULTURE HIGHLIGHTS */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Culture Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Annual Tech Fest',
                description:
                  'A week-long celebration of technology featuring hackathons, workshops, competitions, and guest speakers from leading tech companies.',
              },
              {
                title: 'Cultural Night',
                description:
                  'Experience the vibrant diversity of our campus through dance, music, fashion shows, and culinary delights from different cultures.',
              },
              {
                title: 'Sports Week',
                description:
                  'Inter-college tournaments, friendly matches, and fitness challenges bringing together athletes and sports enthusiasts.',
              },
              {
                title: 'Innovation Summit',
                description:
                  'Showcase your innovative projects and ideas to industry leaders, investors, and potential collaborators.',
              },
            ].map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 text-lg mb-6">
              Join us in creating unforgettable memories and experiences!
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              Get Involved
            </button>
          </div>
        </div>
      </div>

      {/* ADD CLUB MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
              <h3 className="text-xl font-bold text-gray-900">Add New Club</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateClub} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
                <input
                  type="text"
                  required
                  value={newClub.name}
                  onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea
                  required
                  value={newClub.description}
                  onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                  <select
                    value={newClub.tag}
                    onChange={(e) => setNewClub({ ...newClub, tag: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select
                    value={newClub.icon}
                    onChange={(e) => setNewClub({ ...newClub, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {Object.keys(iconMap).map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Color Theme</label>
                <div className="flex flex-wrap gap-2">
                  {predefinedColors.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewClub({ ...newClub, color })}
                      className={`w-8 h-8 rounded-full border-2 ${newClub.color === color ? 'border-black' : 'border-transparent'} ${color.split(' ')[0]}`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">President</label>
                  <input
                    type="text"
                    value={newClub.president}
                    onChange={(e) => setNewClub({ ...newClub, president: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vice President</label>
                  <input
                    type="text"
                    value={newClub.vicePresident}
                    onChange={(e) => setNewClub({ ...newClub, vicePresident: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Club'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
