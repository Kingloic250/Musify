const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Playlist name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    isPublic: {
      type: Boolean,
      default: true,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

playlistSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Playlist', playlistSchema);
