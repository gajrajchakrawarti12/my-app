import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-cyan-400">Cyber Rakshak</h3>
          <p>
            Empowering communities through cybersecurity awareness, gamified learning, and real-time crime insights.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-cyan-400">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/map-spot" className="hover:underline">Real-time Crime Map</a></li>
            <li><a href="/subscribe" className="hover:underline">Subscribe to Alerts</a></li>
            <li><a href="/learn/modules" className="hover:underline"> Learning</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Impact & Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-cyan-400">Connect</h4>
          <p>Email: <a href="mailto:support@cyberrakshak.org" className="hover:underline">support@cyberrakshak.org</a></p>
          <p className="mt-2">Follow us:</p>
          <div className="flex space-x-4 mt-1">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">GitHub</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 border-t border-gray-700 pt-4 text-xs">
        © {new Date().getFullYear()} Cyber Rakshak Initiative. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
