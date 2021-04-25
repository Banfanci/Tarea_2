const mongoose = require('mongoose');

const artistaSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  age: {
    type: Number,
    required: [true, 'Please tell us your age'],
  },
  albums: {
    type: String,
  },
  tracks: {
    type: String,
  },
  self: {
    type: String,
  },
});

artistaSchema.pre('save', async function (next) {
  if (!this.new) return next();

  this._id = Buffer.from(`${this.name}`).toString('base64').substring(0, 20);
  this.self += `/artists/${this._id}`;
  this.albums += `/artists/${this._id}/albums`;
  this.tracks += `/artists/${this._id}/tracks`;
  next();
});

// Virtual populate
artistaSchema.virtual('albums_objects', {
  ref: 'Album',
  foreignField: 'artist_id',
  localField: '_id',
});

artistaSchema.virtual('tracks_objects', {
  ref: 'Cancion',
  foreignField: 'artist_id',
  localField: '_id',
});

const Artista = mongoose.model('Artista', artistaSchema);

module.exports = Artista;
