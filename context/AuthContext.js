'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  // Function to fetch current user
  const fetchUser = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        // Check if token exists and is not expired
        if (userData.token) {
          try {
            // Decode the JWT token to check expiration
            const tokenPayload = JSON.parse(atob(userData.token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            
            if (tokenPayload.exp && tokenPayload.exp < currentTime) {
              // Token is expired, clear it
              console.log('Token expired, clearing user data');
              localStorage.removeItem('user');
              setUser(null);
            } else {
              setUser(userData);
            }
          } catch (tokenError) {
            // Token is malformed, clear it
            console.error('Invalid token format, clearing user data:', tokenError);
            localStorage.removeItem('user');
            setUser(null);
          }
        } else {
          // No token, clear user data
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Failed to retrieve user from local storage:', error);
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/users/login', { email, password });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store full user data including token
      return userData;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const signup = async (name, designation, email, mobileNumber, password) => {
    try {
      const response = await axios.post('/api/users/register', {
        name,
        designation,
        email,
        mobileNumber,
        password,
      });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store full user data including token
      return userData;
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/users/logout'); // Call backend logout endpoint
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || error.message);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  // Function to clear user data (useful for token expiration)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const googleLogin = async (googleUser) => {
    try {
      const response = await axios.post('/api/users/google-auth', {
        email: googleUser.email,
        name: googleUser.displayName,
        photoURL: googleUser.photoURL,
        uid: googleUser.uid,
      });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store full user data including token
      return userData;
    } catch (error) {
      console.error('Google Login failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Google Login failed');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading, googleLogin, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
