import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Building2, Clock, Plus, X } from 'lucide-react';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export default function Opportunities() {
  const { authUser } = useAuthStore();
  const [opportunities, setOpportunities] = useState([]);
  const [companyFilter, setCompanyFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    role: '',
    type: 'Full-time',
    location: '',
    description: '',
    eligibility: '',
    skills: '',
    details: '',
  });

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const res = await axiosInstance.get('/opportunities');
      setOpportunities(res.data);
    } catch (err) {
      console.error('Failed to fetch opportunities', err);
      toast.error('Failed to load opportunities');
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCompany = opp.company
      .toLowerCase()
      .includes(companyFilter.toLowerCase());
    const matchesRole = opp.role.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesType = typeFilter === 'All' || opp.type === typeFilter;

    return matchesCompany && matchesRole && matchesType;
  });

  const handleApply = (opp) => {
    alert(`Apply clicked for: ${opp.title} at ${opp.company}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
      };
      await axiosInstance.post('/opportunities', payload);
      toast.success('Opportunity posted successfully!');
      setShowModal(false);
      setFormData({
        title: '',
        company: '',
        role: '',
        type: 'Full-time',
        location: '',
        description: '',
        eligibility: '',
        skills: '',
        details: '',
      });
      fetchOpportunities();
    } catch (err) {
      console.error('Failed to post opportunity', err);
      toast.error(err.response?.data?.message || 'Failed to post opportunity');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Opportunities</h1>
          <p className="mt-4 text-lg text-gray-600">
            Browse internships and jobs shared by alumni
          </p>
          {authUser?.role === 'alumni' && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 flex items-center mx-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post Opportunity
            </button>
          )}
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Company
              </label>
              <input
                type="text"
                placeholder="e.g., Google, Meta"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <input
                type="text"
                placeholder="e.g., Frontend, Data"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              >
                <option value="All">All</option>
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-gray-600">
          Showing <span className="font-semibold">{filteredOpportunities.length}</span> opportunities
        </div>

        {/* LIST */}
        <div className="grid gap-6">
          {filteredOpportunities.map((opp) => (
            <Link
              key={opp._id}
              to={`/opportunities/${opp._id}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {opp.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="font-semibold">{opp.company}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{opp.role}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${opp.type === 'Internship'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                          }`}
                      >
                        {opp.type}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{opp.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{opp.description}</p>

                  {opp.postedBy && (
                    <div className="text-sm text-gray-500 mt-2">
                      Posted by: <span className="font-medium text-gray-700">{opp.postedBy.fullName}</span> (Batch {opp.postedBy.batch})
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleApply(opp);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors md:ml-4 mt-4 md:mt-0"
                >
                  Apply
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No opportunities found matching your filters.
            </p>
            <button
              onClick={() => {
                setCompanyFilter('');
                setRoleFilter('');
                setTypeFilter('All');
              }}
              className="mt-4 text-blue-600 font-semibold hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* POST OPPORTUNITY MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Post New Opportunity</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="e.g. SDE Intern"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="e.g. Google"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="e.g. Remote / Bangalore"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Brief overview of the role..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                <textarea
                  name="eligibility"
                  rows={2}
                  value={formData.eligibility}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="e.g. Final year students only"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="React, Node.js, Python"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                <textarea
                  name="details"
                  rows={4}
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Full job details, responsibilities, etc."
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Post Opportunity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
