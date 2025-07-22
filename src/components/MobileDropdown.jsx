import React from 'react';
import { Link } from 'react-router-dom';

function MobileDropdown({ label, links, isOpen, onToggle }) {
  return (
    <div>
      {/* Main Label */}
      <button
        onClick={onToggle}
        className="w-full text-left font-semibold text-white hover:text-yellow-300"
      >
        {label}
      </button>

      {/* Side Panel Links */}
     {isOpen && (
  <div className="fixed right-0 top-0 h-full w-[40%] bg-blue-800 text-white shadow-lg z-50 pt-16">
    <ul className="px-4 space-y-2">
      {links.map(({ path, name }) => (
        <li key={name}>
          <Link
            to={path}
            className="block px-3 py-2 rounded-md hover:bg-yellow-400 hover:text-blue-900 transition duration-200"
            onClick={onToggle} // optional: auto-close on click
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
}

export default MobileDropdown;
