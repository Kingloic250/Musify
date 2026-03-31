const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Song title is required'],
      trim: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
    },
    album: {
      type: String,
      trim: true,
      default: 'Single',
    },
    coverImage: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    plays: {
      type: Number,
      default: 0,
    },
    lyrics: {
      type: String,
      default: '',
    },
    genre: {
      type: String,
      default: 'Unknown',
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

songSchema.index({ title: 'text', album: 'text', genre: 'text' });

module.exports = mongoose.model('Song', songSchema);
