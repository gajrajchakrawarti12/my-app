import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '', captchaInput: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState("");

  const { login, isLoading, user } = useAuth();
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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const trimmedUsername = formData.username.trim();

      if (formData.captchaInput.trim() !== captcha) {
        setError("Captcha does not match");
        setFormData(prev => ({ ...prev, captchaInput: "" }));
        generateCaptcha();
        return;
      }

      if (!trimmedUsername || !formData.password) {
        setError("Please fill in all fields");
        return;
      }

      try {
        const success = await login(trimmedUsername, formData.password);

        if (success) {
          navigate("/");
        } else {
          setError("Invalid username or password");
        }
      } catch (err) {
        if (err.message?.includes("Network")) {
          setError("Network error. Please try again later.");
        } else {
          setError("Invalid username or password");
        }
      }
    },
    [formData, login, navigate, captcha, generateCaptcha]
  );


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Login to Cyber Rakshak</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <p className="text-gray-600 text-sm mb-4">Please enter your
        username and password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              id="captcha"
              type="text"
              placeholder="Enter the characters above"
              value={formData.captchaInput}
              onChange={(e) => setFormData(prev => ({ ...prev, captchaInput: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 font-semibold"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account? <span className="text-blue-800 cursor-pointer hover:underline"> <a href="/signup">Sign up</a></span>
        </p>
      </div>
    </div>
  );
}

export default Login;
