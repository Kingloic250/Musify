const Song = require('../models/Song');
const Artist = require('../models/Artist');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Upload a song
// @route   POST /api/songs/upload
const uploadSong = async (req, res) => {
  try {
    const { title, artistId, album, lyrics, genre, duration } = req.body;

    if (!req.files || !req.files.audio || !req.files.cover) {
      return res.status(400).json({ success: false, message: 'Audio file and cover image are required' });
    }

    const uploadToCloudinary = (buffer, options) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const [audioResult, coverResult] = await Promise.all([
      uploadToCloudinary(req.files.audio[0].buffer, {
        folder: 'musify/audio',
        resource_type: 'video',
      }),
      uploadToCloudinary(req.files.cover[0].buffer, {
        folder: 'musify/images',
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
      }),
    ]);

    const song = await Song.create({
      title,
      artist: artistId,
      album: album || 'Single',
      coverImage: coverResult.secure_url,
      audioUrl: audioResult.secure_url,
      duration: duration || Math.round(audioResult.duration) || 0,
      lyrics: lyrics || '',
      genre: genre || 'Unknown',
    });

    await Artist.findByIdAndUpdate(artistId, { $push: { songs: song._id } });

    await song.populate('artist', 'name image');

    res.status(201).json({ success: true, song });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all songs (paginated)
// @route   GET /api/songs
const getAllSongs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const songs = await Song.find({ isPublic: true })
      .populate('artist', 'name image verified')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Song.countDocuments({ isPublic: true });

    res.json({
      success: true,
      songs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single song
// @route   GET /api/songs/:id
const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate(
      'artist',
      'name image bio verified followers'
    );

    if (!song) {
      return res.status(404).json({ success: false, message: 'Song not found' });
    }

    res.json({ success: true, song });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Search songs
// @route   GET /api/songs/search?q=query
const searchSongs = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, songs: [] });

    const songs = await Song.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { album: { $regex: q, $options: 'i' } },
        { genre: { $regex: q, $options: 'i' } },
      ],
      isPublic: true,
    })
      .populate('artist', 'name image')
      .limit(20);

    res.json({ success: true, songs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Like/unlike a song
// @route   POST /api/songs/:id/like
const toggleLike = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ success: false, message: 'Song not found' });

    const user = await User.findById(req.user._id);
    const isLiked = user.likedSongs.includes(song._id);

    if (isLiked) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { likedSongs: song._id } });
      await Song.findByIdAndUpdate(song._id, { $pull: { likes: req.user._id } });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $addToSet: { likedSongs: song._id } });
      await Song.findByIdAndUpdate(song._id, { $addToSet: { likes: req.user._id } });
    }

    res.json({ success: true, liked: !isLiked });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Record a play and add to recently played
// @route   POST /api/songs/:id/play
const recordPlay = async (req, res) => {
  try {
    await Song.findByIdAndUpdate(req.params.id, { $inc: { plays: 1 } });

    if (req.user) {
      const user = await User.findById(req.user._id);
      user.recentlyPlayed = user.recentlyPlayed.filter(
        (r) => r.song.toString() !== req.params.id
      );
      user.recentlyPlayed.unshift({ song: req.params.id, playedAt: new Date() });
      user.recentlyPlayed = user.recentlyPlayed.slice(0, 20);
      await user.save();
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get trending songs (by plays)
// @route   GET /api/songs/trending
const getTrending = async (req, res) => {
  try {
    const songs = await Song.find({ isPublic: true })
      .populate('artist', 'name image verified')
      .sort({ plays: -1 })
      .limit(20);
    res.json({ success: true, songs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { uploadSong, getAllSongs, getSongById, searchSongs, toggleLike, recordPlay, getTrending };
