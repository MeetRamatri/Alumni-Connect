import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Crown,
  Star,
  Award,
} from 'lucide-react';
import { clubsData } from './ClubsCulture';

export default function ClubsCultureDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const club = clubsData.find((c) => c.id === Number(id));

  if (!club) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-4">Club not found.</p>
          <button
            onClick={() => navigate('/clubs-culture')}
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Back to Clubs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <club.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{club.tag} Club</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Members</p>
              <p className="text-lg font-semibold text-gray-800">
                {club.memberCount}
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
                <p className="font-semibold text-gray-900">{club.president}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Vice President</p>
                <p className="font-semibold text-gray-900">{club.vicePresident}</p>
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
              <p className="text-gray-600">
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
            <p className="text-gray-700 leading-relaxed">
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
              <p className="text-gray-600">
                Achievements will be updated soon.
              </p>
            )}
          </section>

          {/* CTA */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-gray-700 text-sm">
              Interested in joining <span className="font-semibold">{club.name}</span>? 
              Reach out to the president or faculty coordinator on campus.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              I&apos;m Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
