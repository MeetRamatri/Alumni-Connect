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

        <div className="bg-white rounded-2xl shadow-lg p-8 relative">
          {/* Edit Button for Admins */}
          {authUser?.role === 'admin' && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute top-8 right-8 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit Club"
            >
              <Edit className="w-6 h-6" />
            </button>
          )}

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pr-12">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{club.tag} Club</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Members</p>
              <p className="text-lg font-semibold text-gray-800">
                {club.memberCount || 'N/A'}
              </p>
            </div>
          </div>

          {/* Leadership */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-500" />
              Leadership
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">President</p>
                <p className="font-semibold text-gray-900">{club.president || 'TBD'}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Vice President</p>
                <p className="font-semibold text-gray-900">{club.vicePresident || 'TBD'}</p>
              </div>
            </div>
          </section>

          {/* Members */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Core Members
            </h2>
            {club.members && club.members.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {club.members.map((member, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                  >
                    {member}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">
                Member details will be updated soon.
              </p>
            )}
          </section>

          {/* Description */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              About the Club
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {club.longDescription || club.description}
            </p>
          </section>

          {/* Achievements */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-green-600" />
              Club Achievements
            </h2>
            {club.achievements && club.achievements.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {club.achievements.map((ach, index) => (
                  <li key={index}>{ach}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">
                Achievements will be updated soon.
              </p>
            )}
          </section>

          {/* CTA */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-6">
            <p className="text-gray-700 text-sm">
              Interested in joining <span className="font-semibold">{club.name}</span>?
              Reach out to the president or faculty coordinator on campus.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              I&apos;m Interested
            </button>
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
