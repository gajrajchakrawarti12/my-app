import React from 'react';
import Navbar from '../components/Navbar'; // Make sure Navbar.jsx is in src/components

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Component */}
      

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Empower Yourself Digitally</h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Cyber Rakshak helps you report scams, learn cybersecurity, and protect your digital rights. Your safety in the online world starts here.
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <a
            href="/learn"
            className="inline-block bg-blue-800 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold transition"
          >
            Start Learning
          </a>
        </div>
      </section>
      
    </div>
  );
}

export default Home;
