import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';
const AuthContext = createContext(null);
const DEMO_USER = { id: 'demo', name: 'Demo Architect', email: 'demo@systemdesign.ai', aiCredits: 100, preferences: { reducedMotion: false, emailUpdates: true, defaultArchitecture: 'Microservices' } };
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('sdp_user')); } catch { return null; } });
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(localStorage.getItem('sdp_token')));
  const persistSession = useCallback((nextUser, token) => { localStorage.setItem('sdp_token', token); localStorage.setItem('sdp_user', JSON.stringify(nextUser)); setUser(nextUser); }, []);
  const clearSession = useCallback(() => { localStorage.removeItem('sdp_token'); localStorage.removeItem('sdp_user'); setUser(null); }, []);
  useEffect(() => { const restore = async () => { if (import.meta.env.VITE_DEMO_MODE === 'true' && !localStorage.getItem('sdp_token')) { setUser(DEMO_USER); setIsBootstrapping(false); return; } if (!localStorage.getItem('sdp_token')) { setIsBootstrapping(false); return; } try { const data = await authApi.me(); persistSession(data.user, localStorage.getItem('sdp_token')); } catch { clearSession(); } finally { setIsBootstrapping(false); } }; restore(); }, [clearSession, persistSession]);
  useEffect(() => { const expired = () => clearSession(); window.addEventListener('auth:expired', expired); return () => window.removeEventListener('auth:expired', expired); }, [clearSession]);
  const login = useCallback(async (credentials) => { const data = await authApi.login(credentials); persistSession(data.user, data.token); return data.user; }, [persistSession]);
  const register = useCallback(async (payload) => { const data = await authApi.register(payload); persistSession(data.user, data.token); return data.user; }, [persistSession]);
  const logout = useCallback(async () => { try { if (localStorage.getItem('sdp_token')) await authApi.logout(); } finally { clearSession(); } }, [clearSession]);
  const updateUser = useCallback((nextUser) => { localStorage.setItem('sdp_user', JSON.stringify(nextUser)); setUser(nextUser); }, []);
  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), isBootstrapping, login, register, logout, updateUser }), [user, isBootstrapping, login, register, logout, updateUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used inside AuthProvider'); return context; }
