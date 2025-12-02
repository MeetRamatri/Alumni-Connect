import { useNavigate } from 'react-router-dom';
import {
  Code,
  Music,
  Trophy,
  Palette,
  Theater,
  Lightbulb,
  Sparkles,
  Calendar,
  Users,
  Crown,
} from 'lucide-react';

// Export so details page also can use same data
export const clubsData = [
  {
    id: 1,
    name: 'Tech Club',
    description:
      'Learn programming, participate in hackathons, and build innovative projects with fellow tech enthusiasts.',
    longDescription:
      'The Tech Club is the hub for all things technology on campus. From coding bootcamps and competitive programming sessions to hackathons and project showcases, we provide a platform for students to build, learn, and collaborate. Members get exposure to latest technologies, mentorship from alumni, and opportunities to work on real-world projects.',
    icon: Code,
    tag: 'Technical',
    color: 'bg-blue-100 text-blue-800',
    president: 'Rahul Verma',
    vicePresident: 'Sneha Gupta',
    members: ['Aman Sharma', 'Priya Nair', 'Karan Singh', 'Neha Patel'],
    memberCount: '80+ active members',
    achievements: [
      'Winners of National Hackathon 2024',
      'Organized 10+ coding contests in the last year',
      'Contributed to 5 open-source projects',
    ],
  },
  {
    id: 2,
    name: 'Cultural Club',
    description:
      'Celebrate diversity through cultural events, festivals, and performances from around the world.',
    longDescription:
      'The Cultural Club is the heart of college celebrations. We organize festivals, cultural nights, traditional days, and theme events that bring together students from all backgrounds. The club aims to promote inclusivity, cultural awareness, and a sense of belonging.',
    icon: Sparkles,
    tag: 'Cultural',
    color: 'bg-purple-100 text-purple-800',
    president: 'Ananya Singh',
    vicePresident: 'Rohit Mehta',
    members: ['Meera Joshi', 'Ali Khan', 'Riya Das'],
    memberCount: '60+ active members',
    achievements: [
      'Organized Annual Cultural Night with 1000+ attendees',
      'Winners of Inter-College Cultural Fest 2023',
    ],
  },
  {
    id: 3,
    name: 'Sports Club',
    description:
      'Stay active and competitive with various sports activities, tournaments, and fitness programs.',
    longDescription:
      'Sports Club promotes physical fitness, teamwork, and a competitive spirit. The club manages teams for cricket, football, basketball, volleyball, and athletics, and regularly conducts intra-college and inter-college tournaments.',
    icon: Trophy,
    tag: 'Sports',
    color: 'bg-green-100 text-green-800',
    president: 'Vikram Singh',
    vicePresident: 'Manish Kumar',
    members: ['Saurabh Yadav', 'Deepak Rao', 'Ajay Sharma'],
    memberCount: '100+ athletes',
    achievements: [
      'Winners of Inter-College Football Championship',
      'Runner-up in State-Level Athletics Meet',
    ],
  },
  {
    id: 4,
    name: 'Music Club',
    description:
      'Express yourself through music, jam sessions, concerts, and collaborative performances.',
    longDescription:
      'Music Club is a community of singers, instrumentalists, composers, and music lovers. We host unplugged nights, band performances, and workshops on music production and instruments.',
    icon: Music,
    tag: 'Cultural',
    color: 'bg-pink-100 text-pink-800',
    president: 'Ishita Rao',
    vicePresident: 'Rohan Malhotra',
    members: ['Aditya Joshi', 'Simran Kaur', 'Nikhil Jain'],
    memberCount: '40+ performers',
    achievements: [
      'Winners of Battle of Bands 2024',
      'Regular performers at city cultural events',
    ],
  },
  {
    id: 5,
    name: 'Drama Club',
    description:
      'Explore the art of theater with plays, skits, workshops, and dramatic performances.',
    longDescription:
      'Drama Club focuses on stage performance, direction, scriptwriting, and production. Members perform stage plays, street plays (nukkad natak), and participate in inter-college theater competitions.',
    icon: Theater,
    tag: 'Cultural',
    color: 'bg-yellow-100 text-yellow-800',
    president: 'Kunal Sharma',
    vicePresident: 'Pooja Jain',
    members: ['Harshita Singh', 'Mohit Agarwal', 'Ritu Kumari'],
    memberCount: '35+ performers',
    achievements: [
      'Best Play Award at University Fest',
      'Street play campaigns on social issues',
    ],
  },
  {
    id: 6,
    name: 'Entrepreneurship Cell',
    description:
      'Turn your ideas into reality with mentorship, funding opportunities, and startup workshops.',
    longDescription:
      'The E-Cell nurtures the entrepreneurial spirit among students. We conduct ideation sessions, startup weekends, pitch days, and connect students with mentors and investors.',
    icon: Lightbulb,
    tag: 'Technical',
    color: 'bg-orange-100 text-orange-800',
    president: 'Arjun Menon',
    vicePresident: 'Shreya Kapoor',
    members: ['Rahul Jain', 'Neeraj Verma', 'Ankit Tiwari'],
    memberCount: '50+ aspiring founders',
    achievements: [
      'Incubated 5 student-led startups',
      'MoU with local startup incubator',
    ],
  },
  {
    id: 7,
    name: 'Art Club',
    description:
      'Unleash your creativity through painting, sketching, digital art, and various artistic mediums.',
    longDescription:
      'Art Club is a space for visual creativity—painting, sketching, doodling, digital art, and crafts. We organize exhibitions, live art sessions, and workshops.',
    icon: Palette,
    tag: 'Cultural',
    color: 'bg-red-100 text-red-800',
    president: 'Riya Kulkarni',
    vicePresident: 'Siddharth Rao',
    members: ['Swati Mishra', 'Varun Gupta', 'Divya Sharma'],
    memberCount: '45+ artists',
    achievements: [
      'Organized Annual Art Exhibition',
      'Wall art and murals across campus',
    ],
  },
];

export default function ClubsCulture() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Clubs and Culture</h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore the vibrant student life on campus
          </p>
        </div>

        {/* CLUBS GRID */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Clubs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubsData.map((club) => (
              <div
                key={club.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-200 hover:border-blue-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <club.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${club.color}`}
                  >
                    {club.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {club.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2 flex items-center">
                  <Crown className="w-3 h-3 mr-1 text-yellow-500" />
                  Current President: {club.president}
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {club.description}
                </p>
                <button
                  onClick={() => navigate(`/clubs-culture/${club.id}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Know More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CULTURE HIGHLIGHTS */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Culture Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Annual Tech Fest',
                description:
                  'A week-long celebration of technology featuring hackathons, workshops, competitions, and guest speakers from leading tech companies.',
              },
              {
                title: 'Cultural Night',
                description:
                  'Experience the vibrant diversity of our campus through dance, music, fashion shows, and culinary delights from different cultures.',
              },
              {
                title: 'Sports Week',
                description:
                  'Inter-college tournaments, friendly matches, and fitness challenges bringing together athletes and sports enthusiasts.',
              },
              {
                title: 'Innovation Summit',
                description:
                  'Showcase your innovative projects and ideas to industry leaders, investors, and potential collaborators.',
              },
            ].map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 text-lg mb-6">
              Join us in creating unforgettable memories and experiences!
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
