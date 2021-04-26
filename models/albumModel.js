const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
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
  genre: {
    type: String,
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

albumSchema.pre('validate', async function (next) {
  if (this.isNew) {
    this.id = Buffer.from(`${this.name}:${this.artist_id}`)
      .toString('base64')
      .substring(0, 20);
    this.artist += `/artists/${this.artist_id}`;
    this.self += `/albums/${this.id}`;
    this.tracks += `/albums/${this.id}/tracks`;
  }
  next();
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
