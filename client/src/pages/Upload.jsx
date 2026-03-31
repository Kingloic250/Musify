import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { songsAPI, artistsAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { HiUpload, HiMusicNote, HiPhotograph } from 'react-icons/hi';

export default function Upload() {
  const [artists, setArtists] = useState([]);
  const [form, setForm] = useState({
    title: '', artistId: '', album: '', genre: '', lyrics: '',
    audio: null, cover: null,
  });
  const [previews, setPreviews] = useState({ audio: null, cover: null });
  const [loading, setLoading] = useState(false);
  const [newArtistMode, setNewArtistMode] = useState(false);
  const [newArtist, setNewArtist] = useState({ name: '', bio: '', genre: '' });
  const { toast } = useToast();

  useEffect(() => {
    artistsAPI.getAll().then(({ data }) => setArtists(data.artists || [])).catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, [field]: file });
    setPreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
  };

  const handleCreateArtist = async () => {
    if (!newArtist.name.trim()) { toast.error('Artist name required'); return; }
    try {
      const fd = new FormData();
      fd.append('name', newArtist.name);
      fd.append('bio', newArtist.bio);
      fd.append('genre', newArtist.genre);
      const { data } = await artistsAPI.create(fd);
      setArtists(prev => [...prev, data.artist]);
      setForm(prev => ({ ...prev, artistId: data.artist._id }));
      setNewArtistMode(false);
      toast.success(`Artist "${data.artist.name}" created!`);
    } catch { toast.error('Failed to create artist'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.audio || !form.cover || !form.artistId) {
      toast.error('Audio file, cover image, and artist are required'); return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('artistId', form.artistId);
      fd.append('album', form.album);
      fd.append('genre', form.genre);
      fd.append('lyrics', form.lyrics);
      fd.append('audio', form.audio);
      fd.append('cover', form.cover);
      await songsAPI.upload(fd);
      toast.success('Song uploaded successfully! 🎵');
      setForm({ title: '', artistId: '', album: '', genre: '', lyrics: '', audio: null, cover: null });
      setPreviews({ audio: null, cover: null });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <HiUpload className="text-purple-400 text-2xl" />
        <h1 className="text-2xl font-black text-white">Upload Song</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cover image */}
        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">Cover Image *</label>
          <label className="cursor-pointer block">
            <div className={`relative w-40 h-40 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all
              ${previews.cover ? 'border-purple-500/40' : 'border-white/10 hover:border-purple-500/30'}`}>
              {previews.cover
                ? <img src={previews.cover} alt="cover" className="w-full h-full object-cover" />
                : <div className="text-center p-4">
                    <HiPhotograph className="text-3xl text-gray-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Click to upload</p>
                  </div>}
            </div>
            <input type="file" accept="image/*" onChange={e => handleFile(e, 'cover')} className="hidden" />
          </label>
        </div>

        {/* Audio file */}
        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">Audio File *</label>
          <label className={`cursor-pointer block glass rounded-xl px-5 py-4 border border-dashed transition-all
            ${previews.audio ? 'border-purple-500/40 bg-purple-500/5' : 'border-white/10 hover:border-purple-500/30'}`}>
            <div className="flex items-center gap-3">
              <HiMusicNote className={`text-xl ${previews.audio ? 'text-purple-400' : 'text-gray-600'}`} />
              <span className={`text-sm ${previews.audio ? 'text-purple-400' : 'text-gray-500'}`}>
                {form.audio ? form.audio.name : 'Click to select audio file (MP3, WAV, OGG)'}
              </span>
            </div>
            <input type="file" accept="audio/*" onChange={e => handleFile(e, 'audio')} className="hidden" />
          </label>
        </div>

        {/* Artist */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Artist *</label>
            <button type="button" onClick={() => setNewArtistMode(!newArtistMode)}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              {newArtistMode ? 'Select existing' : '+ New artist'}
            </button>
          </div>
          {newArtistMode
            ? <div className="glass rounded-xl p-4 space-y-3">
                <input name="name" placeholder="Artist name" value={newArtist.name}
                  onChange={e => setNewArtist({...newArtist, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/60" />
                <input name="genre" placeholder="Genre" value={newArtist.genre}
                  onChange={e => setNewArtist({...newArtist, genre: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/60" />
                <textarea placeholder="Bio (optional)" value={newArtist.bio}
                  onChange={e => setNewArtist({...newArtist, bio: e.target.value})}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/60 resize-none" />
                <button type="button" onClick={handleCreateArtist}
                  className="gradient-bg text-white px-4 py-2 rounded-lg text-sm font-medium">Create Artist</button>
              </div>
            : <select name="artistId" value={form.artistId} onChange={handleChange} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/60 text-sm">
                <option value="">Select an artist</option>
                {artists.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
              </select>}
        </div>

        {/* Metadata */}
        {[
          { name: 'title', label: 'Song Title *', placeholder: 'Enter song title' },
          { name: 'album', label: 'Album', placeholder: 'Album name (optional)' },
          { name: 'genre', label: 'Genre', placeholder: 'e.g. Pop, Hip-Hop, R&B' },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">{label}</label>
            <input name={name} value={form[name]} onChange={handleChange}
              placeholder={placeholder} required={name === 'title'}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-all text-sm" />
          </div>
        ))}

        {/* Lyrics */}
        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">Lyrics</label>
          <textarea name="lyrics" value={form.lyrics} onChange={handleChange}
            placeholder="Paste lyrics here..." rows={8}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-all text-sm resize-none" />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full gradient-bg text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-purple-500/20 disabled:opacity-50 text-base"
        >
          {loading
            ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Uploading to Cloudinary...</>
            : <><HiUpload className="text-xl" /> Upload Song</>}
        </motion.button>
      </form>
    </div>
  );
}
