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
} from 'lucide-react';
import { motion } from 'framer-motion';

// Achievements
const achievements = [
  {
    icon: Users,
    number: '5000+',
    label: 'Alumni',
  },
  {
    icon: Building2,
    number: '100+',
    label: 'Companies',
  },
  {
    icon: Handshake,
    number: '200+',
    label: 'Successful Mentorship Sessions',
  },
];

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
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left content slide from left */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Alumni Connect
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Bridging the gap between students and alumni. Discover opportunities, find mentors,
                schedule meetings, and grow your professional network.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/opportunities"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Explore Opportunities
                </Link>
                <Link
                  to="/connect"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-transform hover:-translate-y-1"
                >
                  Connect with Alumni
                </Link>
              </div>
            </motion.div>

            {/* Right image slide from right */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            >
              <motion.img
                src="https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="College Campus"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 120 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Our College</h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded in 1985, our institution has been a beacon of excellence in education and
                  innovation. With a commitment to holistic development, we nurture talent and foster
                  an environment where ideas transform into reality.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our alumni network spans across the globe, working at leading organizations and
                  startups. Through Alumni Connect, we celebrate these connections and create
                  opportunities for current students to learn from their predecessors&apos; experiences.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <motion.div
                  className="bg-white rounded-lg p-4 shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 150 }}
                >
                  <p className="text-2xl font-bold text-blue-600">50K+</p>
                  <p className="text-gray-600 text-sm">Alumni Worldwide</p>
                </motion.div>
                <motion.div
                  className="bg-white rounded-lg p-4 shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 150 }}
                >
                  <p className="text-2xl font-bold text-blue-600">40+</p>
                  <p className="text-gray-600 text-sm">Years of Legacy</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <motion.img
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="College Building"
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 120 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900">Why Alumni Connect?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Bridging excellence in education with opportunity
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            variants={fadeInUpContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                icon: Handshake,
                title: 'Mentorship',
                desc: 'Connect with alumni mentors for career guidance and personal development.',
              },
              {
                icon: Zap,
                title: 'Opportunities',
                desc: 'Discover internships and job openings shared exclusively by alumni.',
              },
              {
                icon: Globe,
                title: 'Networking',
                desc: 'Build lasting professional relationships with peers and alumni globally.',
              },
              {
                icon: Award,
                title: 'Growth',
                desc: 'Access resources and events designed for your professional advancement.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow"
                variants={fadeInUpItem}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 140 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900">Our Achievements</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={fadeInUpContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
                variants={fadeInUpItem}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 140 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <achievement.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </h3>
                <p className="text-gray-600 font-medium">{achievement.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
            <p className="mt-4 text-lg text-gray-600">
              Don&apos;t miss out on these exciting opportunities to connect and grow
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={fadeInUpContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all hover:border-blue-300"
                variants={fadeInUpItem}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 140 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <Link
                  to={`/events/${event.id}`}
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
