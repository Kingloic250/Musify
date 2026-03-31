import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiMusicNote, HiPlay } from 'react-icons/hi';

export function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlist/${playlist._id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="group rounded-2xl overflow-hidden cursor-pointer card-hover"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="relative aspect-square">
          {playlist.coverImage ? (
            <img
              src={playlist.coverImage}
              alt={playlist.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center gradient-bg-subtle">
              <HiMusicNote className="text-4xl text-purple-400/60" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <HiPlay className="text-white text-xl ml-0.5" />
            </div>
          </div>
        </div>
        <div className="p-3">
          <p className="text-sm font-bold text-white truncate">{playlist.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {playlist.songs?.length || 0} songs
            {playlist.owner && ` · ${playlist.owner.username || playlist.owner}`}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
