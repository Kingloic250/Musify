import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('musify_token');
    if (!token) { setLoading(false); return; }
    try {
      const { data } = await authAPI.getProfile();
      setUser(data.user);
    } catch {
      localStorage.removeItem('musify_token');
      localStorage.removeItem('musify_user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
    const handleLogout = () => { setUser(null); setLoading(false); };
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [loadUser]);

  const register = async (username, email, password) => {
    setError(null);
    const { data } = await authAPI.register({ username, email, password });
    localStorage.setItem('musify_token', data.token);
    setUser(data.user);
    return data;
  };

  const login = async (email, password) => {
    setError(null);
    const { data } = await authAPI.login({ email, password });
    localStorage.setItem('musify_token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('musify_token');
    localStorage.removeItem('musify_user');
    setUser(null);
  };

  const updateUser = (updatedUser) => setUser(updatedUser);

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
