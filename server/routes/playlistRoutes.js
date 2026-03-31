const express = require('express');
const router = express.Router();
const {
  createPlaylist,
  getUserPlaylists,
  getPublicPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSong,
  removeSong,
} = require('../controllers/playlistController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/public', getPublicPlaylists);
router.get('/', protect, getUserPlaylists);
router.post('/', protect, upload.single('cover'), createPlaylist);
router.get('/:id', getPlaylistById);
router.put('/:id', protect, upload.single('cover'), updatePlaylist);
router.delete('/:id', protect, deletePlaylist);
router.post('/:id/add-song', protect, addSong);
router.delete('/:id/remove-song/:songId', protect, removeSong);

module.exports = router;
