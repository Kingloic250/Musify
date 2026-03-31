import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { playlistsAPI } from '../../services/api';
import { useState, useEffect } from 'react';
import {
  HiHome, HiSearch, HiCollection, HiHeart, HiPlus,
  HiMusicNote, HiLogout, HiUpload
} from 'react-icons/hi';

const navItems = [
  { to: '/', icon: HiHome, label: 'Explore' },
  { to: '/genres', icon: HiCollection, label: 'Genres' },
  { to: '/albums', icon: HiCollection, label: 'Albums' },
  { to: '/artists', icon: HiCollection, label: 'Artists' },
];

const libraryItems = [
  { to: '/recent', icon: HiCollection, label: 'Recent' },
  { to: '/library', icon: HiCollection, label: 'Albums' },
  { to: '/liked', icon: HiHeart, label: 'Favourites' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (user) {
      playlistsAPI.getAll()
        .then(({ data }) => setPlaylists(data.playlists || []))
        .catch(() => {});
    }
  }, [user]);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <motion.div
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.2 }}
      className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 overflow-hidden"
      style={{
        background: 'var(--color-bg-sidebar)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="w-8 h-8 flex items-center justify-center">
            <HiMusicNote className="text-primary text-2xl" />
        </div>
        {!collapsed && (
          <span className="font-bold text-2xl text-white tracking-tight">
            Groovvy
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-6">
          {/* MENU */}
          <div>
            <p className="px-3 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Menu</p>
            <div className="space-y-1">
                {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                    key={label}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${isActive
                        ? 'text-primary'
                        : 'text-gray-400 hover:text-white'}`
                    }
                >
                    <Icon className="text-xl" />
                    {!collapsed && <span className="text-sm font-semibold">{label}</span>}
                    {label === 'Explore' && !collapsed && <div className="ml-auto w-1 h-4 bg-primary rounded-full shadow-[0_0_8px_#4d7cfe]" />}
                </NavLink>
                ))}
            </div>
          </div>

          {/* LIBRARY */}
          <div>
            <p className="px-3 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Library</p>
            <div className="space-y-1">
                {libraryItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${isActive
                        ? 'text-primary'
                        : 'text-gray-400 hover:text-white'}`
                    }
                >
                    <Icon className="text-xl" />
                    {!collapsed && <span className="text-sm font-semibold">{label}</span>}
                </NavLink>
                ))}
            </div>
          </div>

          {/* PLAYLIST */}
          <div>
            <div className="flex items-center justify-between px-3 mb-4">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Playlist</p>
              <button onClick={() => navigate('/library')} className="text-gray-500 hover:text-white transition-colors">
                <HiPlus className="text-sm" />
              </button>
            </div>
            <div className="space-y-1">
              {playlists.map((pl) => (
                <NavLink
                  key={pl._id}
                  to={`/playlist/${pl._id}`}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${isActive ? 'text-primary' : 'text-gray-400 hover:text-white'}`
                  }
                >
                  <div className="w-2 h-2 rounded-full border border-current" />
                  {!collapsed && <span className="text-sm font-semibold truncate">{pl.name}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* User section */}
      {user && (
        <div className="p-4 mt-auto">
          <div className="bg-[#121214] rounded-xl p-3 flex items-center gap-3">
             <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=4d7cfe&color=fff`} alt="" className="w-full h-full object-cover" />
             </div>
             {!collapsed && (
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">Google Homepod</p>
                    <p className="text-[10px] text-gray-500 truncate">Playing on Device</p>
                </div>
             )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
