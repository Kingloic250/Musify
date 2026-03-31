const express = require('express');
const router = express.Router();
const {
  createArtist,
  getAllArtists,
  getArtistById,
  searchArtists,
  toggleFollow,
} = require('../controllers/artistController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getAllArtists);
router.get('/search', searchArtists);
router.get('/:id', getArtistById);
router.post('/', protect, adminOnly, upload.fields([{ name: 'image' }, { name: 'banner' }]), createArtist);
router.post('/:id/follow', protect, toggleFollow);

module.exports = router;
