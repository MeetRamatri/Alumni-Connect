// src/pages/EventDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Target, ArrowLeft } from 'lucide-react';
import { upcomingEvents } from './Home';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = upcomingEvents.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-4">Event not found.</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {event.title}
            </h1>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex flex-wrap gap-4 text-gray-700">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          {/* Motto */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Motto of the Event
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {event.motto || 'Motto will be announced soon.'}
            </p>
          </section>

          {/* Who is coming */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Who is Coming?
            </h2>
            {event.guests && event.guests.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {event.guests.map((guest, index) => (
                  <li key={index}>{guest}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">
                Guest details will be shared soon.
              </p>
            )}
          </section>

          {/* Why attend */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Why Should You Come?
            </h2>
            {event.whyAttend && event.whyAttend.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {event.whyAttend.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">
                More details about benefits will be announced soon.
              </p>
            )}
          </section>

          {/* CTA */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-gray-700 text-sm">
              Make sure to mark your calendar and be a part of{' '}
              <span className="font-semibold">{event.title}</span>.
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
