import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Building2, Clock } from 'lucide-react';

// Export so details page re-use kar sake
export const allOpportunities = [
  {
    id: 1,
    title: 'SDE Intern',
    company: 'Google',
    role: 'Software Engineer',
    type: 'Internship',
    location: 'Mountain View, CA',
    description: 'Work on cutting-edge projects with experienced engineers',
    eligibility:
      'Currently enrolled in a Bachelor’s or Master’s program in Computer Science or related field.',
    skills: ['Data Structures', 'Algorithms', 'JavaScript', 'React', 'Git'],
    details:
      'You will be part of a small engineering team working on high-impact features. You will collaborate with senior engineers, participate in code reviews, and ship production code.',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Meta',
    role: 'Frontend Engineer',
    type: 'Full-time',
    location: 'Menlo Park, CA',
    description: 'Build user interfaces for billions of users worldwide',
    eligibility:
      '1–3 years of experience in frontend development or strong internship experience.',
    skills: ['React', 'TypeScript', 'CSS', 'Performance Optimization'],
    details:
      'You will build and optimize UI components that scale to millions of users. Strong focus on performance, accessibility, and UX.',
  },
  {
    id: 3,
    title: 'Data Analyst Intern',
    company: 'Amazon',
    role: 'Data Analyst',
    type: 'Internship',
    location: 'Seattle, WA',
    description: 'Analyze data to drive business decisions',
    eligibility:
      'Pursuing a degree in Statistics, Mathematics, Engineering, or related field.',
    skills: ['SQL', 'Excel', 'Python', 'Tableau', 'Data Visualization'],
    details:
      'Work with business teams to understand problems and use data to derive insights, build dashboards, and support decisions.',
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'Microsoft',
    role: 'Software Engineer',
    type: 'Full-time',
    location: 'Redmond, WA',
    description: 'Develop enterprise-level applications',
    eligibility: '2+ years of experience with full stack development.',
    skills: ['C#', '.NET', 'React', 'Azure', 'SQL'],
    details:
      'You will design, develop, and maintain scalable web applications, working across the stack from frontend to backend.',
  },
  {
    id: 5,
    title: 'Product Manager',
    company: 'Apple',
    role: 'Product Manager',
    type: 'Full-time',
    location: 'Cupertino, CA',
    description: 'Lead product strategy and development',
    eligibility: '3+ years of product management or related experience.',
    skills: ['Product Thinking', 'Roadmapping', 'Stakeholder Management', 'Analytics'],
    details:
      'Own end-to-end product lifecycle, work with cross-functional teams, prioritize features, and define success metrics.',
  },
  {
    id: 6,
    title: 'Backend Engineer Intern',
    company: 'Netflix',
    role: 'Backend Engineer',
    type: 'Internship',
    location: 'Los Gatos, CA',
    description: 'Build scalable backend systems',
    eligibility: 'Final/Pre-final year in CS or related field.',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Distributed Systems'],
    details:
      'Contribute to backend services that power the Netflix experience, focusing on reliability and performance.',
  },
  {
    id: 7,
    title: 'Machine Learning Engineer',
    company: 'Tesla',
    role: 'ML Engineer',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    description: 'Develop AI systems for autonomous vehicles',
    eligibility: 'Strong background in Machine Learning and Deep Learning.',
    skills: ['Python', 'TensorFlow/PyTorch', 'Computer Vision', 'MLOps'],
    details:
      'You will develop, train, and deploy ML models used in autonomous systems and improve their accuracy and robustness.',
  },
  {
    id: 8,
    title: 'UX Designer',
    company: 'Airbnb',
    role: 'Designer',
    type: 'Full-time',
    location: 'San Francisco, CA',
    description: 'Create beautiful and intuitive user experiences',
    eligibility: 'Portfolio demonstrating strong UX and visual design.',
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
    details:
      'Work closely with PMs and engineers to design flows and interfaces that make Airbnb delightful to use.',
  },
];

export default function Opportunities() {
  const [companyFilter, setCompanyFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredOpportunities = allOpportunities.filter((opp) => {
    const matchesCompany = opp.company
      .toLowerCase()
      .includes(companyFilter.toLowerCase());
    const matchesRole = opp.role.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesType = typeFilter === 'All' || opp.type === typeFilter;

    return matchesCompany && matchesRole && matchesType;
  });

  const handleApply = (opp) => {
    // Abhi placeholder: yaha pe later form / backend call aa sakta hai
    alert(`Apply clicked for: ${opp.title} at ${opp.company}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Opportunities</h1>
          <p className="mt-4 text-lg text-gray-600">
            Browse internships and jobs shared by alumni
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* FILTER: COMPANY */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Company
              </label>
              <input
                id="company"
                type="text"
                placeholder="e.g., Google, Meta"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
            </div>

            {/* FILTER: ROLE */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Role
              </label>
              <input
                id="role"
                type="text"
                placeholder="e.g., Frontend, Data"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
            </div>

            {/* FILTER: TYPE */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Type
              </label>
              <select
                id="type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              >
                <option value="All">All</option>
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-gray-600">
          Showing{' '}
          <span className="font-semibold">{filteredOpportunities.length}</span>{' '}
          opportunities
        </div>

        {/* LIST */}
        <div className="grid gap-6">
          {filteredOpportunities.map((opp) => (
            <Link
              key={opp.id}
              to={`/opportunities/${opp.id}`}
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
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          opp.type === 'Internship'
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
                </div>

                {/* APPLY BUTTON — prevent navigation */}
                <button
                  onClick={(e) => {
                    e.preventDefault();   // Link navigation rok do
                    e.stopPropagation();  // parent click bhi nahi chalega
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
    </div>
  );
}
