import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({ name: '', username: '', password: '', confirmPassword: '', captchaInput: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { signup, isLoading, user, checkValidUsername } = useAuth();
  const [captcha, setCaptcha] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const navigate = useNavigate();

  const generateCaptcha = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect if already logged in
    }
    generateCaptcha();
  }, [user, navigate, generateCaptcha]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { name, username, password, confirmPassword, captchaInput } = formData;
    if (captchaInput.trim() !== captcha) {
      setError("Captcha does not match");
      setFormData(prev => ({ ...prev, captchaInput: "" }));
      generateCaptcha();
      return;
    }

    if (!name || !username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!usernameValid) {
      setError("Username is already taken");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const wasSuccessful = await signup(name, username, password);
    if (wasSuccessful) {
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Create Your Account</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
        <div className="mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-sm text-blue-900"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-2 text-sm text-blue-900"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {/* Captcha */}
                <div className="space-y-2 mt-4">
                  <label htmlFor="captcha" className="text-sm font-medium">
                    Captcha
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1 text-lg">
                      {captcha.split("").map((char, idx) => {
                        const colorClasses = [
                          "text-[#01303F]",
                          "text-[#D3B199]",
                          "text-[#2CFB8D]",
                          "text-[#12E3C6]",
                        ];
                        return (
                          <span
                            key={idx}
                            className={`${colorClasses[idx % colorClasses.length]} font-bold`}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, captchaInput: "" }));
                        generateCaptcha();
                      }}
                      className="text-sm text-blue-600 underline"
                    >
                      Refresh
                    </button>
                  </div>
                  <input
                    name="captchaInput"
                    id="captcha"
                    type="text"
                    placeholder="Enter the characters above"
                    value={formData.captchaInput}
                    onChange={(e) => setFormData(prev => ({ ...prev, captchaInput: e.target.value }))}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 font-semibold"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span className="text-blue-800 cursor-pointer hover:underline"><a href="/login">login</a></span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
