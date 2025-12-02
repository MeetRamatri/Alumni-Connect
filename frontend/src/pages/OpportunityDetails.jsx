import { useParams, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Building2,
  Clock,
  ArrowLeft,
  CheckCircle2,
  ListChecks,
} from 'lucide-react';
import { allOpportunities } from './Opportunities';

export default function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const opportunity = allOpportunities.find((opp) => opp.id === Number(id));

  const handleApply = () => {
    // Yaha later real apply flow aa sakta hai
    alert(`Apply clicked for: ${opportunity.title} at ${opportunity.company}`);
  };

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-4">
            Opportunity not found.
          </p>
          <button
            onClick={() => navigate('/opportunities')}
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {opportunity.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-semibold">{opportunity.company}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{opportunity.role}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      opportunity.type === 'Internship'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {opportunity.type}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{opportunity.location}</span>
                </div>
              </div>
            </div>

            {/* APPLY BUTTON ON DETAILS PAGE */}
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </button>
          </div>

          {/* DESCRIPTION */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {opportunity.details || opportunity.description}
            </p>
          </section>

          {/* ELIGIBILITY */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
              Eligibility
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {opportunity.eligibility ||
                'Eligibility details will be provided by the recruiter.'}
            </p>
          </section>

          {/* REQUIRED SKILLS */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <ListChecks className="w-5 h-5 mr-2 text-blue-600" />
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {(opportunity.skills || []).length > 0 ? (
                opportunity.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-700">
                  Skills will be shared by the recruiter.
                </p>
              )}
            </div>
          </section>

          <p className="text-xs text-gray-500 mt-4">
            This opportunity was shared by alumni. Please verify details before applying.
          </p>
        </div>
      </div>
    </div>
  );
}
