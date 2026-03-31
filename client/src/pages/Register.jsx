import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { HiMail, HiLockClosed, HiUser, HiMusicNote, HiEye, HiEyeOff, HiCheckCircle } from 'react-icons/hi';

const FEATURES = [
  { icon: '🎵', text: 'Access 2M+ songs instantly' },
  { icon: '🎨', text: 'Create & share playlists' },
  { icon: '📱', text: 'Sync across all devices' },
  { icon: '🔥', text: 'Discover trending music' },
];

const STEPS_ANIM = {
  initial: { opacity: 0, x: -15 },
  animate: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.12, duration: 0.4 } }),
};

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][passwordStrength()];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#84cc16', '#22c55e', '#10b981'][passwordStrength()];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      toast.success('Account created! Welcome to Musify 🎵');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'username', label: 'Username', icon: HiUser, type: 'text', placeholder: 'cooluser123' },
    { name: 'email', label: 'Email address', icon: HiMail, type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', icon: HiLockClosed, type: showPassword ? 'text' : 'password', placeholder: '••••••••', toggle: () => setShowPassword(!showPassword), show: showPassword },
    { name: 'confirmPassword', label: 'Confirm Password', icon: HiLockClosed, type: showConfirm ? 'text' : 'password', placeholder: '••••••••', toggle: () => setShowConfirm(!showConfirm), show: showConfirm },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: '#0a0a0f' }}>
      {/* ── LEFT PANEL (branding) ── */}
      <div
        className="hidden lg:flex lg:w-5/12 relative flex-col items-center justify-center p-14 overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0d0d1a 0%, #130d22 60%, #0a0a14 100%)',
        }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Orbs */}
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-[90px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full blur-[80px] opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }}
        />

        <div className="relative z-10 w-full max-w-xs">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-10">
            <motion.div
              className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(168,85,247,0.5)' }}
              animate={{ boxShadow: ['0 0 30px rgba(168,85,247,0.3)', '0 0 60px rgba(168,85,247,0.6)', '0 0 30px rgba(168,85,247,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <HiMusicNote className="text-white text-2xl" />
            </motion.div>
            <div>
              <h1
                className="text-3xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Musify
              </h1>
              <p className="text-gray-500 text-xs">Music for everyone</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Join the community</h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            Start your free journey and discover a world of music curated just for you.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                {...STEPS_ANIM}
                className="flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.2)' }}
                >
                  {f.icon}
                </div>
                <span className="text-gray-300 text-sm">{f.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom badge */}
          <div
            className="mt-12 rounded-2xl p-4 flex items-center gap-3"
            style={{
              background: 'rgba(168,85,247,0.06)',
              border: '1px solid rgba(168,85,247,0.15)',
            }}
          >
            <HiCheckCircle className="text-purple-400 text-xl flex-shrink-0" />
            <p className="text-gray-400 text-xs leading-relaxed">
              Free forever. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-14 relative overflow-y-auto">
        {/* BG orbs mobile */}
        <div
          className="lg:hidden absolute top-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }}
        />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md py-6"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-3 shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(168,85,247,0.4)' }}
            >
              <HiMusicNote className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-black gradient-text">Musify</h1>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-3xl font-bold text-white mb-1.5">Create your account</h2>
            <p className="text-gray-500 text-sm">Join millions of music lovers today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ name, label, icon: Icon, type, placeholder, toggle, show }) => (
              <div key={name}>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                  {label}
                </label>
                <div
                  className="relative rounded-xl transition-all duration-200"
                  style={{
                    background: focused === name ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${focused === name ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: focused === name ? '0 0 0 3px rgba(168,85,247,0.1)' : 'none',
                  }}
                >
                  <Icon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-lg"
                    style={{ color: focused === name ? '#a855f7' : '#4b5563' }}
                  />
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(name)}
                    onBlur={() => setFocused('')}
                    required
                    placeholder={placeholder}
                    style={{
                      background: 'transparent',
                      outline: 'none',
                      width: '100%',
                      padding: toggle ? '13px 44px 13px 44px' : '13px 16px 13px 44px',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                    className="placeholder-gray-600"
                  />
                  {toggle && (
                    <button
                      type="button"
                      onClick={toggle}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      {show ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
                    </button>
                  )}
                </div>

                {/* Password strength */}
                {name === 'password' && form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{
                            background: n <= passwordStrength() ? strengthColor : 'rgba(255,255,255,0.08)',
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</p>
                  </div>
                )}

                {/* Confirm password match */}
                {name === 'confirmPassword' && form.confirmPassword && (
                  <p
                    className="text-xs mt-1.5 flex items-center gap-1"
                    style={{ color: form.password === form.confirmPassword ? '#22c55e' : '#ef4444' }}
                  >
                    {form.password === form.confirmPassword
                      ? <><HiCheckCircle /> Passwords match</>
                      : '✕ Passwords do not match'}
                  </p>
                )}
              </div>
            ))}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 40px rgba(168,85,247,0.45)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 mt-2"
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
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <span className="text-lg">→</span>
                </span>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span className="text-gray-600 text-xs">OR</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Login link */}
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold transition-colors"
              style={{ color: '#a855f7' }}
              onMouseEnter={e => e.target.style.color = '#c084fc'}
              onMouseLeave={e => e.target.style.color = '#a855f7'}
            >
              Sign in instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
