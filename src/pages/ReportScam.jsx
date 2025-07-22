import React, { useState } from 'react';

function ReportScam() {
  const [form, setForm] = useState({ name: '', email: '', description: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', form);
    // Hook this into your backend API later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full transition-all hover:shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">🚨 Report a Scam</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          name="name"
          placeholder="e.g. Rahul Sharma"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          name="email"
          placeholder="e.g. rahul@example.com"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Scam Description</label>
        <textarea
          name="description"
          placeholder="Describe what happened..."
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="border border-gray-300 rounded-md p-3 w-full mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors duration-300"
        >
          Submit Report
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Your privacy is important. We’ll never share your info without consent.
        </p>
      </form>
    </div>
  );
}

export default ReportScam;
