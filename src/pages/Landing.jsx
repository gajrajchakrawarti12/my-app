import React from 'react';
import Navbar from '../components/Navbar';
import CrimeAwareness from './CrimeAwareness';
import Appcrime from '../pagescrime/Appcrime';
import Footer from '../components/Footer.jsx';

function Landing() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('https://t3.ftcdn.net/jpg/08/68/76/66/240_F_868766637_7oCeLzi8UthSXss3c8x4IKAmzIm8WX57.jpg')",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 bg-black/60 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Cyber Rakshak</h1>
          <p className="text-lg md:text-xl max-w-xl">
            Empowering citizens to report scams, learn cybersecurity, and protect their digital rights.
          </p>
          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 bg-yellow-400 text-blue-900 px-6 py-2 rounded hover:bg-yellow-300 font-semibold"
          >
            Report Scam
          </a>
        </div>

        {/* Crime tools and footer */}
        <section id="crime-section" className="relative bg-gray-100 text-black py-10 px-4">
          <Appcrime />
          <Footer />
        </section>
      </div>
    </div>
  );
}

export default Landing;
