const express = require('express');
const router = express.Router();
const {
  uploadSong,
  getAllSongs,
  getSongById,
  searchSongs,
  toggleLike,
  recordPlay,
  getTrending,
} = require('../controllers/songController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { uploadSongFiles } = require('../middleware/uploadMiddleware');

router.get('/', getAllSongs);
router.get('/search', searchSongs);
router.get('/trending', getTrending);
router.get('/:id', getSongById);
router.post('/upload', protect, adminOnly, uploadSongFiles, uploadSong);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/play', recordPlay);

module.exports = router;
