import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Image as ImageIcon,
  Users,
} from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    batch: user?.batch || '',
    company: user?.company || '',
    role: user?.role || '',
    location: user?.location || '',
    clubs: user?.clubs || '',
    profilePic: user?.profilePic || '',
  });

  const [previewImage, setPreviewImage] = useState(user?.profilePic || '');

  if (!user) return <Navigate to="/login" replace />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ⭐ PROFILE PIC UPLOAD
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      setFormData({ ...formData, profilePic: imageURL });
    }
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setPreviewImage(user.profilePic || '');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex items-center justify-between">

              <div className="flex items-center space-x-6">

                {/* 👤 PROFILE PIC */}
                <div className="relative">
                  <img
                    src={previewImage || "https://via.placeholder.com/150"}
                    className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
                  />

                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow cursor-pointer hover:bg-blue-50">
                      <ImageIcon className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePicChange}
                      />
                    </label>
                  )}
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                  <p className="text-blue-100 mt-1">{user.role}</p>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* BODY */}
          <div className="px-8 py-8">
            {isEditing ? (
              <div className="space-y-6">

                {/* INPUTS */}
                {[
                  { label: "Full Name", icon: User, name: "name" },
                  { label: "Email", icon: Mail, name: "email", type: "email" },
                  { label: "Batch", icon: Calendar, name: "batch" },
                  { label: "Current Job / Company", icon: Briefcase, name: "company" },
                  { label: "Role", icon: Briefcase, name: "role" },
                  { label: "Location", icon: MapPin, name: "location" },
                  { label: "Clubs / Societies", icon: Users, name: "clubs" },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <field.icon className="w-4 h-4 mr-2 text-blue-600" />
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                  </div>
                ))}

                {/* BUTTONS */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">

                {/* DISPLAY FIELDS */}
                {[
                  { label: "Full Name", icon: User, value: user.name },
                  { label: "Email", icon: Mail, value: user.email },
                  { label: "Batch", icon: Calendar, value: user.batch },
                  { label: "Current Job / Company", icon: Briefcase, value: user.company },
                  { label: "Role", icon: Briefcase, value: user.role },
                  { label: "Location", icon: MapPin, value: user.location },
                  { label: "Clubs / Societies", icon: Users, value: user.clubs || "Not Mentioned" },
                ].map((field, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <field.icon className="w-5 h-5 mr-3 text-blue-600" />
                      <span className="text-sm font-medium">{field.label}</span>
                    </div>
                    <p className="ml-8 text-lg text-gray-900">{field.value}</p>
                  </div>
                ))}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
