const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
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

artistSchema.pre('validate', async function (next) {
  if (this.isNew) {
    const id = Buffer.from(`${this.name}`).toString('base64').substring(0, 22);

    this.id = id;
    this.self += `/artists/${id}`;
    this.albums += `/artists/${id}/albums`;
    this.tracks += `/artists/${id}/tracks`;
  }
  next();
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
