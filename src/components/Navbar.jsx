import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setIsOpen(false); // Close mobile menu when route changes
  }, [location.pathname]);

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/report-scam', name: 'Report Scam' },
    { path: '/tools', name: 'Tools' },
    { path: '/learn/modules', name: 'Modules' },
    { path: '/learn/videos', name: 'Videos' },
    { path: '/quiz/start', name: 'Take Quiz' },
    { path: '/quiz/results', name: 'Results' },
    { path: '/crimeprediction', name: 'Crime Prediction' },
    { path: '/contact', name: 'Contact' },
    ...(!user
      ? [
          { path: '/login', name: 'Login' },
          { path: '/signup', name: 'Signup' },
        ]
      : [
          { path: '/dashboard', name: 'Dashboard' }
        ]
    ),
  ];

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Cyber Rakshak" className="h-8 w-8" />
          <h1 className="text-xl font-bold">Cyber Rakshak</h1>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
          <img src={require('../assets/dropdown.png')} alt="Menu" className="h-6 w-6" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          {navLinks.map(({ path, name }) => (
            <Link
              key={name}
              to={path}
              className="hover:text-yellow-300 font-medium transition-colors"
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
     {isOpen && (
  <nav className="fixed right-0 top-13 h-full w-[20vw] bg-orange-900 text-white z-50 px-3 pt-16 space-y-3 text-sm shadow-lg">
    {navLinks.map(({ path, name }) => (
      <Link
        key={name}
        to={path}
        className="block px-3 py-2 rounded-md hover:bg-yellow-400 hover:text-blue-900 transition"
      >
        {name}
      </Link>
    ))}
  </nav>
)}

     
    </header>
  );
}

export default Navbar;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Logo from '../assets/logo.png';
// import MobileDropdown from './MobileDropdown';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const navStructure = [
//     {
//       label: 'Home',
//       links: [{ path: '/', name: 'Landing' }],
//     },
//     {
//       label: 'Report',
//       links: [{ path: '/report-scam', name: 'Report Scam' }, { path: '/tools', name: 'Tools' }],
//     },
//     {
//       label: 'Contact',
//       links: [{ path: '/contact', name: 'Support' }, { path: '/team', name: 'Team' }],
//     },
//     {
//       label: 'Learning',
//       links: [
//         { path: '/learn/modules', name: 'Modules' },
//         { path: '/learn/videos', name: 'Videos' },
//         { path: '/learn/quiz', name: 'Quizzes' },
//       ],
//     },
//     {
//       label: 'Quiz',
//       links: [{ path: '/quiz/start', name: 'Take Quiz' }, { path: '/quiz/results', name: 'Results' }],
//     },
//   ];

//   return (
//     <header className="bg-blue-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <img src={Logo} alt="Cyber Rakshak" className="h-8 w-8" />
//           <h1 className="text-xl font-bold">Cyber Rakshak</h1>
//         </div>

//         {/* Mobile toggle */}
//         {/* <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
//           <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
//             {isOpen ? (
//               <path d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button> */}
//         <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
//   <img
//     src={require('../assets/dropdown.png')}
//     alt="Menu"
//     className="h-6 w-6"
//   />
// </button>


//         {/* Desktop Nav */}
//         <nav className="hidden md:flex items-center space-x-6 text-sm">
//           {navStructure.map(({ label, links }) => (
//             <div key={label} className="relative group">
//               <button className="hover:text-yellow-300">{label}</button>
//               <div className="absolute hidden group-hover:block bg-white text-blue-900 mt-2 rounded shadow-lg">
//                 {links.map(({ path, name }) => (
//                   <Link key={name} to={path} className="block px-4 py-2 hover:bg-blue-100">
//                     {name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ))}
//           <Link to="/login" className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300">
//             Login
//           </Link>
//         </nav>
//       </div>

//       {/* Mobile Nav */}
//       {isOpen && (
//         <nav className="md:hidden px-6 pb-4 space-y-4 text-sm">
//           {navStructure.map(({ label, links }) => (
//             <MobileDropdown
//               key={label}
//               label={label}
//               links={links}
//               isOpen={activeDropdown === label}
//               onToggle={() =>
//                 setActiveDropdown(activeDropdown === label ? null : label)
//               }
//             />
//           ))}
//           <Link
//             to="/login"
//             className="block bg-yellow-400 text-blue-900 px-3 py-1 rounded hover:bg-yellow-300 font-semibold"
//           >
//             Login
//           </Link>
//         </nav>
//       )}
//     </header>
//   );
// }

// export default Navbar;

