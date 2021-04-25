const mongoose = require('mongoose');
const Album = require('./albumModel');
const Track = require('./trackModel');

const artistSchema = new mongoose.Schema({
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

artistSchema.pre('save', async function (next) {
  if (!this.new) return next();

  this._id = Buffer.from(`${this.name}`).toString('base64').substring(0, 20);
  this.self += `/artists/${this._id}`;
  this.albums += `/artists/${this._id}/albums`;
  this.tracks += `/artists/${this._id}/tracks`;
  next();
});

artistSchema.pre('remove', function (next) {
  Album.remove({ artist_id: this._id }).exec();
  Track.remove({ artist_id: this._id }).exec();
  next();
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
