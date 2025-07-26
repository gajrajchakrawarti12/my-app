"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext(undefined);

const API_URL = "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // <-- Correct value here
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // empty body
        });
        const res = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true,
        });
        const userData = res.data.user;
        setUser({ ...userData });
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    username,
    password
  ) => {
    setIsLoading(true);
    try {
      const resLogin = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resLogin.status === 205) {
        return false;
      }

      const res = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      const userData = res?.data.user;
      setUser({ ...userData });
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name,
    username,
    email,
    password,
  ) => {
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/auth/register`,
        {
          username,
          password,
          email,
          fullName: name,
        },
        { withCredentials: true }
      );
      return true;
    } catch (error) {
      console.log("Signup error:", error);
      console.error(
        "Signup failed:",
        error?.response?.data?.message || error.message || error
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.warn("Logout API failed", error);
    } finally {
      setUser(null);
    }
  };

  const checkValidUsername = async (username) => {
    try {
      const responce = await fetch(`${API_URL}/auth/username/${username}`, {
        method: "GET",
        credentials: "include",
      });
      if (responce.status === 205) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading, checkValidUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
