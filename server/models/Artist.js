const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      default: '',
    },
    banner: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    genre: {
      type: String,
      default: 'Various',
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    albums: [
      {
        title: String,
        coverImage: String,
        year: Number,
      },
    ],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    monthlyListeners: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

artistSchema.index({ name: 'text', genre: 'text' });

module.exports = mongoose.model('Artist', artistSchema);
