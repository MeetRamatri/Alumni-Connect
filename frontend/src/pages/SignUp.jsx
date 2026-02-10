import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    batch: '',
    company: '',
    role: 'student',
    cur_role: '',
    location: '',
  });

  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If switching to student, clear alumni-specific fields
    if (name === 'role' && value === 'student') {
      setFormData({
        ...formData,
        [name]: value,
        cur_role: '',
        company: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clean up form data - remove empty strings and convert batch to number
    const cleanedData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      ...(formData.batch && { batch: parseInt(formData.batch) }),
      ...(formData.role && { role: formData.role }),
      ...(formData.cur_role && { cur_role: formData.cur_role }),
      ...(formData.company && { company: formData.company }),
      ...(formData.location && { location: formData.location }),
    };

    const success = await signup(cleanedData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join the Alumni Connect community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label
              htmlFor="batch"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Batch
            </label>
            <input
              id="batch"
              name="batch"
              type="number"
              value={formData.batch}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="2020"
              autoComplete="off"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              autoComplete="off"
            >

              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {formData.role === 'alumni' && (
            <>
              <div>
                <label
                  htmlFor="cur_role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Job Role
                </label>
                <input
                  id="cur_role"
                  name="cur_role"
                  type="text"
                  value={formData.cur_role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Software Engineer"
                  autoComplete="organization-title"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Tech Corp"
                  autoComplete="organization"
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="San Francisco, CA"
              autoComplete="address-level2"
            />
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningUp ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
