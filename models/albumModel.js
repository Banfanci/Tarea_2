const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  genre: {
    type: Number,
    required: [true, 'Please tell us your genre'],
  },
  artist: {
    type: String,
  },
  artist_id: {
    type: String,
  },
  tracks: {
    type: String,
  },
  self: {
    type: String,
  },
});

albumSchema.pre('save', async function (next) {
  if (!this.new) return next();

  this._id = Buffer.from(`${this.name}:${this.artist_id}`)
    .toString('base64')
    .substring(0, 20);
  this.artist += `/artists/${this.artist_id}`;
  this.self += `/albums/${this._id}`;
  this.tracks += `/albums/${this._id}/tracks`;
  next();
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
