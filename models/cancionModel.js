const mongoose = require('mongoose');

const cancionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
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

cancionSchema.pre('save', async function (next) {
  if (!this.new) return next();

  this._id = Buffer.from(`${this.name}:${this.album_id}`)
    .toString('base64')
    .substring(0, 20);
  this.artist += `/artists/${this.artist_id}`;
  this.self += `/tracks/${this._id}`;
  this.album += `/albums/${this.album_id}`;
  next();
});

const Cancion = mongoose.model('Cancion', cancionSchema);

module.exports = Cancion;
