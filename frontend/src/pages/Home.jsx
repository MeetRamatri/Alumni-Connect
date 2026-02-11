import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  Handshake,
  Calendar,
  Clock,
  MapPin,
  Award,
  Globe,
  BookOpen,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Achievements
const achievements = [
  {
    icon: Users,
    number: '5000+',
    label: 'Alumni Network',
  },
  {
    icon: Building2,
    number: '100+',
    label: 'Partner Companies',
  },
  {
    icon: Handshake,
    number: '200+',
    label: 'Mentorship Sessions',
  },
];

// Fallback image
const fallbackImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

const handleImageError = (e) => {
  e.target.src = fallbackImage;
};

// Exported events
export const upcomingEvents = [
  {
    id: 1,
    title: 'Alumni Meet 2025',
    description:
      'Annual gathering of alumni from all batches. Network, share experiences, and reconnect.',
    date: 'March 15, 2025',
    time: '10:00 AM',
    location: 'Main Campus Auditorium',
    motto: 'Reconnect, Relive, Reignite.',
    guests: ['Distinguished Alumni from 1990–2024', 'Principal & Faculty'],
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    whyAttend: [
      'Meet seniors working in top companies and startups',
      'Build connections for internships and job referrals',
      'Relive college memories and expand your network',
    ],
  },
  {
    id: 2,
    title: 'Resume Review Session',
    description:
      'Get your resume reviewed by industry professionals and alumni working at top companies.',
    date: 'February 28, 2025',
    time: '2:00 PM',
    location: 'Virtual Event',
    motto: 'Turn your resume into your superpower.',
    guests: ['Alumni from Google, Microsoft, Amazon'],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    whyAttend: [
      'Get 1:1 feedback from experienced professionals',
      'Learn what hiring managers actually look for',
      'Improve your chances of getting shortlisted',
    ],
  },
  {
    id: 3,
    title: 'Tech Talk with XYZ Alum',
    description:
      'Learn about the latest trends in technology from our alumnus working at a leading tech company.',
    date: 'March 5, 2025',
    time: '4:00 PM',
    location: 'Lecture Hall 3',
    motto: 'Learn from those who’ve been where you are.',
    guests: ['XYZ Alum – Senior Software Engineer at a FAANG company'],
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    whyAttend: [
      'Understand real-world tech beyond textbooks',
      'Ask questions about career paths and challenges',
      'Get insights on interviews, system design, and growth',
    ],
  },
];

// Variants for staggered animations
const fadeInUpContainer = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const fadeInUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};



export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white pt-20 pb-24 lg:pt-32 lg:pb-40">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
          <div className="absolute top-48 -left-24 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-24 left-1/2 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-blue-600 font-semibold text-sm mb-6 border border-blue-100">
                🚀 Welcome to the Future of Networking
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
                Connect. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Grow. Inspire.
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
                Your gateway to a thriving alumni network. Discover opportunities, find mentors, and build lasting professional relationships that matter.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                >
                  Explore Opportunities
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/connect"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 hover:text-blue-600 transition-all hover:border-blue-200 transform hover:-translate-y-1 shadow-sm"
                >
                  Find Mentors
                </Link>
              </div>

              {/* Stats Preview */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-gray-900">5k+</p>
                  <p className="text-sm text-gray-500">Active Alumni</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">100+</p>
                  <p className="text-sm text-gray-500">Global Partners</p>
                </div>
              </div>
            </motion.div>

            {/* Right image slide from right */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <motion.div
                  className="space-y-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Modern Campus"
                    className="rounded-2xl shadow-xl w-full h-64 object-cover"
                    onError={handleImageError}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Collaboration"
                    className="rounded-2xl shadow-xl w-full h-48 object-cover"
                    onError={handleImageError}
                  />
                </motion.div>
                <motion.div
                  className="space-y-4 pt-12"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Tech Workshop"
                    className="rounded-2xl shadow-xl w-full h-48 object-cover"
                    onError={handleImageError}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Classroom"
                    className="rounded-2xl shadow-xl w-full h-64 object-cover"
                    onError={handleImageError}
                  />
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100/50 to-purple-100/50 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>





      {/* ACHIEVEMENTS Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={fadeInUpContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                variants={fadeInUpItem}
                whileHover={{ y: -5 }}
              >
                {/* Hover Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Alumni Connect?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the tools and network you need to accelerate your career and personal growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Handshake,
                title: 'Mentorship',
                desc: 'Get guidance from experienced alumni who have walked your path.',
                color: 'bg-blue-100 text-blue-600'
              },
              {
                icon: Zap,
                title: 'Opportunities',
                desc: 'Access exclusive job openings and internships from top companies.',
                color: 'bg-indigo-100 text-indigo-600'
              },
              {
                icon: Globe,
                title: 'Networking',
                desc: 'Expand your professional circle with alumni across the globe.',
                color: 'bg-purple-100 text-purple-600'
              },
              {
                icon: Award,
                title: 'Growth',
                desc: 'Unlock resources and events designed to boost your career.',
                color: 'bg-pink-100 text-pink-600'
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600">Join us at our next gathering</p>
            </div>
            <Link to="/events" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700">
              View All Events <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={event.image || fallbackImage}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                    {event.date.split(',')[0]}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                    <span className="mx-2">•</span>
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">{event.description}</p>

                  <Link
                    to={`/events/${event.id}`}
                    className="block w-full text-center py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                  >
                    Event Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/events" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
              View All Events <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to expand your network?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of alumni and students who are already connecting, learning, and growing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-1">
              Join the Community
            </Link>
            <Link to="/about" className="px-8 py-4 bg-blue-700/50 backdrop-blur-sm text-white rounded-xl font-bold border border-blue-400/30 hover:bg-blue-700 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
