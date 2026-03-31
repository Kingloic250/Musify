const Artist = require('../models/Artist');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Create artist
// @route   POST /api/artists
const createArtist = async (req, res) => {
  try {
    const { name, bio, genre } = req.body;

    const uploadToCloudinary = (buffer, folder) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    let imageUrl = '';
    let bannerUrl = '';

    if (req.files && req.files.image) {
      const result = await uploadToCloudinary(req.files.image[0].buffer, 'musify/artists');
      imageUrl = result.secure_url;
    }
    if (req.files && req.files.banner) {
      const result = await uploadToCloudinary(req.files.banner[0].buffer, 'musify/artists/banners');
      bannerUrl = result.secure_url;
    }

    const artist = await Artist.create({ name, bio, genre, image: imageUrl, banner: bannerUrl });
    res.status(201).json({ success: true, artist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all artists
// @route   GET /api/artists
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find()
      .select('name image bio genre monthlyListeners verified followers')
      .sort({ monthlyListeners: -1 });
    res.json({ success: true, artists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single artist with songs
// @route   GET /api/artists/:id
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate(
      'songs',
      'title coverImage audioUrl duration plays'
    );

    if (!artist) {
      return res.status(404).json({ success: false, message: 'Artist not found' });
    }

    res.json({ success: true, artist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Search artists
// @route   GET /api/artists/search?q=query
const searchArtists = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, artists: [] });

    const artists = await Artist.find({
      name: { $regex: q, $options: 'i' },
    })
      .select('name image genre monthlyListeners verified')
      .limit(10);

    res.json({ success: true, artists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Follow/unfollow artist
// @route   POST /api/artists/:id/follow
const toggleFollow = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });

    const isFollowing = artist.followers.includes(req.user._id);

    if (isFollowing) {
      await Artist.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user._id } });
    } else {
      await Artist.findByIdAndUpdate(req.params.id, { $addToSet: { followers: req.user._id } });
    }

    res.json({ success: true, following: !isFollowing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createArtist, getAllArtists, getArtistById, searchArtists, toggleFollow };
