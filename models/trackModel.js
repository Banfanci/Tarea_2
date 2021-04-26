const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  duration: {
    type: Number,
    required: [true, 'Please tell us your duration'],
  },
  times_played: {
    type: Number,
    default: 0,
  },
  artist: {
    type: String,
  },
  artist_id: {
    type: String,
  },
  album: {
    type: String,
  },
  album_id: {
    type: String,
  },
  self: {
    type: String,
  },
});

trackSchema.pre('validate', async function (next) {
  if (this.isNew) {
    const id = Buffer.from(`${this.name}:${this.album_id}`)
      .toString('base64')
      .substring(0, 20);
    this.id = id;
    this.artist += `/artists/${this.artist_id}`;
    this.self += `/tracks/${id}`;
    this.album += `/albums/${this.album_id}`;
  }
  next();
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
