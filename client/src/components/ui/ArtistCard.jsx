import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiBadgeCheck } from 'react-icons/hi';

export function ArtistCard({ artist }) {
  return (
    <Link to={`/artist/${artist._id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col items-center p-4 rounded-2xl cursor-pointer group card-hover text-center"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="relative mb-3">
          <img
            src={artist.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=a855f7&color=fff&size=200`}
            alt={artist.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-500/20 group-hover:border-purple-500/60 transition-all shadow-xl"
            loading="lazy"
          />
          {artist.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 gradient-bg rounded-full flex items-center justify-center">
              <HiBadgeCheck className="text-white text-xs" />
            </div>
          )}
        </div>
        <p className="text-sm font-bold text-white truncate max-w-full">{artist.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{artist.genre || 'Artist'}</p>
        {artist.followers?.length > 0 && (
          <p className="text-xs text-gray-600 mt-1">
            {artist.followers.length.toLocaleString()} followers
          </p>
        )}
      </motion.div>
    </Link>
  );
}
