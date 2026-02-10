import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Crown,
  Star,
  Award,
  Code,
  Music,
  Trophy,
  Palette,
  Theater,
  Lightbulb,
  Sparkles,
  Calendar,
  Edit,
  X
} from 'lucide-react';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

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

export default function ClubsCultureDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Form State
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    tag: 'Cultural',
    icon: 'Users',
    color: '',
    president: '',
    vicePresident: '',
    memberCount: '',
    members: '',
    achievements: ''
  });

  useEffect(() => {
    fetchClubDetails();
  }, [id]);

  const fetchClubDetails = async () => {
    try {
      const res = await axiosInstance.get(`/clubs/${id}`);
      setClub(res.data);
      // Initialize edit form data
      setEditFormData({
        name: res.data.name,
        description: res.data.description,
        longDescription: res.data.longDescription || '',
        tag: res.data.tag,
        icon: res.data.icon,
        color: res.data.color,
        president: res.data.president || '',
        vicePresident: res.data.vicePresident || '',
        memberCount: res.data.memberCount || '',
        members: res.data.members ? res.data.members.join(', ') : '',
        achievements: res.data.achievements ? res.data.achievements.join(', ') : '',
      });
    } catch (err) {
      console.error("Failed to fetch club details", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClub = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedData = {
        ...editFormData,
        members: editFormData.members.split(',').map(item => item.trim()).filter(Boolean),
        achievements: editFormData.achievements.split(',').map(item => item.trim()).filter(Boolean),
      };

      const res = await axiosInstance.put(`/clubs/${id}`, updatedData);
      setClub(res.data);
      setIsEditModalOpen(false);
      toast.success("Club updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update club");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-4">Club not found.</p>
          <button
            onClick={() => navigate('/clubs-culture')}
            className="text-blue-600 font-semibold hover:text-blue-700 underline"
          >
            Back to Clubs
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[club.icon] || Users;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
          {/* Decorative Background for Header */}
          <div className={`h-32 bg-gradient-to-r ${club.color ? club.color.replace('text', 'from').replace('800', '500').split(' ')[0] + ' to-blue-500' : 'from-blue-500 to-indigo-600'}`}></div>

          <div className="px-8 pb-8">
            {/* Header Content */}
            <div className="relative -mt-12 flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
              <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
                <div className={`w-full h-full ${club.color ? club.color.split(' ')[0] : 'bg-blue-100'} rounded-xl flex items-center justify-center`}>
                  <IconComponent className={`w-12 h-12 ${club.color ? club.color.split(' ')[1] : 'text-blue-600'}`} />
                </div>
              </div>

              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${club.color || 'bg-blue-100 text-blue-800'}`}>
                    {club.tag}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {club.memberCount || '0'} Members
                </div>
              </div>

              {/* Edit Button for Admins */}
              {authUser?.role === 'admin' && (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium mt-4 md:mt-0"
                  title="Edit Club"
                >
                  <Edit className="w-4 h-4" />
                  Edit Details
                </button>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500 fill-yellow-500" />
                    About Us
                  </h2>
                  <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    {club.longDescription || club.description}
                  </div>
                </section>

                {/* Achievements */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-500" />
                    Achievements
                  </h2>
                  {club.achievements && club.achievements.length > 0 ? (
                    <div className="grid gap-3">
                      {club.achievements.map((ach, index) => (
                        <div key={index} className="flex items-start bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                          <Trophy className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{ach}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 italic bg-gray-50 p-4 rounded-xl text-center">
                      No achievements listed yet.
                    </div>
                  )}
                </section>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Leadership Card */}
                <div className="bg-white border boundary-gray-100 rounded-2xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                    <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                    Leadership
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">President</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {club.president ? club.president.charAt(0) : '?'}
                        </div>
                        <p className="font-medium text-gray-900">{club.president || 'TBD'}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Vice President</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                          {club.vicePresident ? club.vicePresident.charAt(0) : '?'}
                        </div>
                        <p className="font-medium text-gray-900">{club.vicePresident || 'TBD'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Members Card */}
                <div className="bg-white border boundary-gray-100 rounded-2xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    Core Team
                  </h3>
                  {club.members && club.members.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {club.members.map((member, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium border border-gray-100"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      Team details coming soon.
                    </p>
                  )}
                </div>

                {/* Join CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center shadow-lg">
                  <h3 className="font-bold text-lg mb-2">Want to join?</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Be a part of {club.name} and explore your passion!
                  </p>
                  <button className="w-full bg-white text-blue-600 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT CLUB MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
              <h3 className="text-xl font-bold text-gray-900">Edit Club Details</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateClub} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea
                  required
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description (About)</label>
                <textarea
                  value={editFormData.longDescription}
                  onChange={(e) => setEditFormData({ ...editFormData, longDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                  <select
                    value={editFormData.tag}
                    onChange={(e) => setEditFormData({ ...editFormData, tag: e.target.value })}
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
                    value={editFormData.icon}
                    onChange={(e) => setEditFormData({ ...editFormData, icon: e.target.value })}
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
                      onClick={() => setEditFormData({ ...editFormData, color })}
                      className={`w-8 h-8 rounded-full border-2 ${editFormData.color === color ? 'border-black' : 'border-transparent'} ${color.split(' ')[0]}`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">President</label>
                  <input
                    type="text"
                    value={editFormData.president}
                    onChange={(e) => setEditFormData({ ...editFormData, president: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vice President</label>
                  <input
                    type="text"
                    value={editFormData.vicePresident}
                    onChange={(e) => setEditFormData({ ...editFormData, vicePresident: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Core Members (comma separated)</label>
                <textarea
                  value={editFormData.members}
                  onChange={(e) => setEditFormData({ ...editFormData, members: e.target.value })}
                  placeholder="John Doe, Jane Smith, ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Achievements (comma separated)</label>
                <textarea
                  value={editFormData.achievements}
                  onChange={(e) => setEditFormData({ ...editFormData, achievements: e.target.value })}
                  placeholder="Won Hackathon 2024, Organized Tech Fest, ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20"
                />
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Updating...' : 'Update Club'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
