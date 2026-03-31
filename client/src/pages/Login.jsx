import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { HiMail, HiLockClosed, HiMusicNote, HiEye, HiEyeOff } from 'react-icons/hi';

const BARS = 32;

function MusicVisualizer() {
  return (
    <div className="flex items-end gap-[3px] h-20">
      {Array.from({ length: BARS }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[4px] rounded-full"
          animate={{ scaleY: [0.15, 1, 0.4, 0.8, 0.2, 0.6, 0.15] }}
          transition={{
            duration: 1.6 + (i % 7) * 0.18,
            repeat: Infinity,
            delay: (i * 0.07) % 1.2,
            ease: 'easeInOut',
          }}
          initial={{ scaleY: 0.15 }}
          style={{ originY: 1, background: 'linear-gradient(to top, #a855f7, #ec4899)' }}
        />
      ))}
    </div>
  );
}

const floatAnim = {
  animate: { y: [0, -12, 0] },
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! 🎵');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: '#0a0a0f' }}>
      {/* ── LEFT PANEL (branding) ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d0d1a 0%, #150d24 50%, #0f0a1e 100%)',
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glowing orbs */}
        <div
          className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-[80px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }}
        />

        {/* Floating cards */}
        <motion.div
          className="absolute top-24 right-12 rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.25)',
            backdropFilter: 'blur(12px)',
          }}
          {...floatAnim}
          transition={{ ...floatAnim.transition, delay: 0.5 }}
        >
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
            <HiMusicNote className="text-white text-base" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Now Playing</p>
            <p className="text-purple-300 text-[10px]">Blinding Lights</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-28 left-10 rounded-2xl px-4 py-3 text-center"
          style={{
            background: 'rgba(236,72,153,0.1)',
            border: '1px solid rgba(236,72,153,0.2)',
            backdropFilter: 'blur(12px)',
          }}
          {...floatAnim}
          transition={{ ...floatAnim.transition, delay: 1.2 }}
        >
          <p className="text-3xl font-black text-white">2M+</p>
          <p className="text-pink-300 text-xs">Songs available</p>
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-6 -translate-y-1/2 rounded-2xl px-4 py-3 text-center"
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.2)',
            backdropFilter: 'blur(12px)',
          }}
          {...floatAnim}
          transition={{ ...floatAnim.transition, delay: 0.8 }}
        >
          <p className="text-3xl font-black text-white">50K+</p>
          <p className="text-purple-300 text-xs">Active listeners</p>
        </motion.div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <motion.div
            className="w-24 h-24 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-2xl"
            style={{ boxShadow: '0 0 60px rgba(168,85,247,0.5)' }}
            animate={{ boxShadow: ['0 0 40px rgba(168,85,247,0.4)', '0 0 80px rgba(168,85,247,0.7)', '0 0 40px rgba(168,85,247,0.4)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <HiMusicNote className="text-white text-5xl" />
          </motion.div>

          <h1
            className="text-6xl font-black mb-3"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Musify
          </h1>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-xs mx-auto">
            Your music universe, <br />
            <span className="text-purple-300 font-medium">beautifully crafted</span>
          </p>

          <MusicVisualizer />

          <p className="text-gray-600 text-sm mt-8">
            Stream · Discover · Love
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16 relative">
        {/* Background orbs for mobile */}
        <div
          className="lg:hidden absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }}
        />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex flex-col items-center mb-10">
            <div
              className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-3 shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(168,85,247,0.4)' }}
            >
              <HiMusicNote className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-black gradient-text">Musify</h1>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back 👋</h2>
            <p className="text-gray-500 text-sm">Sign in to continue your musical journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                Email address
              </label>
              <div
                className="relative rounded-xl transition-all duration-200"
                style={{
                  background: focused === 'email' ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${focused === 'email' ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: focused === 'email' ? '0 0 0 3px rgba(168,85,247,0.1)' : 'none',
                }}
              >
                <HiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-lg"
                  style={{ color: focused === 'email' ? '#a855f7' : '#4b5563' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  required
                  placeholder="you@example.com"
                  style={{
                    background: 'transparent',
                    outline: 'none',
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    color: '#fff',
                    fontSize: '0.95rem',
                  }}
                  className="placeholder-gray-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                Password
              </label>
              <div
                className="relative rounded-xl transition-all duration-200"
                style={{
                  background: focused === 'password' ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${focused === 'password' ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: focused === 'password' ? '0 0 0 3px rgba(168,85,247,0.1)' : 'none',
                }}
              >
                <HiLockClosed
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-lg"
                  style={{ color: focused === 'password' ? '#a855f7' : '#4b5563' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  required
                  placeholder="••••••••"
                  style={{
                    background: 'transparent',
                    outline: 'none',
                    width: '100%',
                    padding: '14px 44px 14px 44px',
                    color: '#fff',
                    fontSize: '0.95rem',
                  }}
                  className="placeholder-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors py-2 "
                >
                  {showPassword ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 40px rgba(168,85,247,0.45)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-white font-bold p-2.5 my-6 rounded-xl transition-all disabled:opacity-50 relative overflow-hidden mt-2"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                boxShadow: '0 4px 24px rgba(168,85,247,0.35)',
                fontSize: '1rem',
                letterSpacing: '0.02em',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <span className="text-lg">→</span>
                </span>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span className="text-gray-600 text-xs">OR</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Register link */}
          <p className="text-center text-gray-500 text-sm">
            New to Musify?{' '}
            <Link
              to="/register"
              className="font-semibold transition-colors"
              style={{ color: '#a855f7' }}
              onMouseEnter={e => e.target.style.color = '#c084fc'}
              onMouseLeave={e => e.target.style.color = '#a855f7'}
            >
              Create a free account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
