import { Mail, MapPin, Phone, Github, Linkedin, Twitter, GraduationCap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t-2 border-blue-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* LOGO SECTION */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-blue-600">Alumni Connect</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Bridging the gap between students and alumni, fostering meaningful connections and opportunities.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Opportunities</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Clubs & Culture</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Connect</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-600 text-sm">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>info@alumniconnect.edu</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 text-sm">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Campus Address</span>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
            <div className="flex items-center space-x-3">
              <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>


        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} Alumni Connect. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
