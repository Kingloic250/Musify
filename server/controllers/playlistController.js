const Playlist = require('../models/Playlist');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Create playlist
// @route   POST /api/playlists
const createPlaylist = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;

    let coverImage = '';
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'musify/playlists' },
          (err, r) => (err ? reject(err) : resolve(r))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      coverImage = result.secure_url;
    }

    const playlist = await Playlist.create({
      name,
      description,
      owner: req.user._id,
      coverImage,
      isPublic: isPublic !== undefined ? isPublic : true,
    });

    res.status(201).json({ success: true, playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user playlists
// @route   GET /api/playlists
const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id })
      .populate('songs', 'title coverImage duration')
      .sort({ createdAt: -1 });
    res.json({ success: true, playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all public playlists
// @route   GET /api/playlists/public
const getPublicPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ isPublic: true })
      .populate('owner', 'username avatar')
      .populate('songs', 'title coverImage duration')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ success: true, playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single playlist
// @route   GET /api/playlists/:id
const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate('owner', 'username avatar')
      .populate({
        path: 'songs',
        select: 'title coverImage audioUrl duration plays',
        populate: { path: 'artist', select: 'name image' },
      });

    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    res.json({ success: true, playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update playlist
// @route   PUT /api/playlists/:id
const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { name, description, isPublic } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (isPublic !== undefined) updateData.isPublic = isPublic;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'musify/playlists' },
          (err, r) => (err ? reject(err) : resolve(r))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      updateData.coverImage = result.secure_url;
    }

    const updated = await Playlist.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, playlist: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete playlist
// @route   DELETE /api/playlists/:id
const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await playlist.deleteOne();
    res.json({ success: true, message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add song to playlist
// @route   POST /api/playlists/:id/add-song
const addSong = async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ success: false, message: 'Song already in playlist' });
    }

    playlist.songs.push(songId);
    await playlist.save();

    res.json({ success: true, playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove song from playlist
// @route   DELETE /api/playlists/:id/remove-song/:songId
const removeSong = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    playlist.songs = playlist.songs.filter((s) => s.toString() !== req.params.songId);
    await playlist.save();

    res.json({ success: true, playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPlaylist,
  getUserPlaylists,
  getPublicPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSong,
  removeSong,
};
