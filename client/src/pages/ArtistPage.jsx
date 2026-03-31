import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { artistsAPI } from '../services/api';
import { SongRow } from '../components/ui/SongCard';
import { SkeletonBanner, SkeletonRow } from '../components/ui/Skeleton';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { HiBadgeCheck, HiPlay, HiUserAdd, HiUserRemove } from 'react-icons/hi';

export default function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const { playSong } = usePlayer();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    artistsAPI.getById(id)
      .then(({ data }) => {
        setArtist(data.artist);
        setFollowing(data.artist.followers?.includes(user?._id));
      })
      .catch(() => toast.error('Failed to load artist'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFollow = async () => {
    if (!user) { toast.info('Login to follow artists'); return; }
    try {
      await artistsAPI.follow(id);
      setFollowing(!following);
      toast.success(following ? 'Unfollowed artist' : 'Following artist! 🎤');
    } catch { toast.error('Failed to update follow'); }
  };

  if (loading) return (
    <div className="p-0">
      <SkeletonBanner />
      <div className="p-6 space-y-4">{Array.from({length:5}).map((_,i) => <SkeletonRow key={i} />)}</div>
    </div>
  );

  if (!artist) return (
    <div className="p-8 text-center py-20">
      <p className="text-gray-400">Artist not found</p>
    </div>
  );

  return (
    <div>
      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {artist.banner
          ? <img src={artist.banner} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full"
              style={{ background: 'linear-gradient(135deg, #a855f720, #ec489910, #0a0a0f)' }} />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />

        {/* Artist info overlay */}
        <div className="absolute bottom-0 left-0 p-6 md:p-10 flex items-end gap-5">
          <img
            src={artist.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=a855f7&color=fff&size=200`}
            alt={artist.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-purple-500/30 shadow-2xl flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              {artist.verified && <HiBadgeCheck className="text-purple-400 text-xl" />}
              <span className="text-xs text-gray-400 uppercase tracking-widest">Artist</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white">{artist.name}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {(artist.followers?.length || 0).toLocaleString()} followers
              {artist.genre && ` · ${artist.genre}`}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 md:px-10 py-6 flex items-center gap-4">
        {artist.songs?.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSong(artist.songs[0], artist.songs, 0)}
            className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-xl shadow-purple-500/30"
          >
            <HiPlay className="text-white text-2xl ml-0.5" />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={handleFollow}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
            following
              ? 'border-purple-500/40 text-purple-400 bg-purple-500/10'
              : 'border-white/20 text-white glass hover:border-purple-500/40'}`}
        >
          {following ? <HiUserRemove /> : <HiUserAdd />}
          {following ? 'Following' : 'Follow'}
        </motion.button>
      </div>

      {/* Bio */}
      {artist.bio && (
        <div className="px-6 md:px-10 mb-8">
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">About</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{artist.bio}</p>
          </div>
        </div>
      )}

      {/* Popular songs */}
      {artist.songs?.length > 0 && (
        <div className="px-6 md:px-10 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Popular</h2>
          <div className="space-y-1">
            {artist.songs.map((song, i) => (
              <SongRow key={song._id} song={{ ...song, artist: { _id: artist._id, name: artist.name, image: artist.image } }}
                index={i} queue={artist.songs} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
