const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'musify/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
  },
});

const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'musify/audio',
    resource_type: 'video',
    allowed_formats: ['mp3', 'wav', 'ogg', 'flac', 'm4a'],
  },
});

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadAudio = multer({
  storage: audioStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

const uploadSongFiles = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
}).fields([
  { name: 'audio', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);

module.exports = { uploadImage, uploadAudio, uploadSongFiles };
