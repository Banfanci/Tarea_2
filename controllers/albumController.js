const Artist = require('../models/artistModel');
const Album = require('../models/albumModel');
const Track = require('../models/trackModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createAlbum = catchAsync(async (req, res, next) => {
  req.body.self = req.headers.host;
  req.body.artist = req.headers.host;
  req.body.tracks = req.headers.host;
  req.body.artist_id = req.params.artist_id;

  const doc = await Artist.findOne({ id: req.params.artist_id });

  if (!doc) {
    return next(new AppError('No document found with that ID', 422));
  }

  const newDoc = await Album.create(req.body).catch(async (err) => {
    if (err.code === 11000) {
      const rdoc = await Album.findOne({ id: err.keyValue.id });
      res.status(409).json(rdoc);
    }
  });

  res.status(201).json(newDoc);
});

exports.getAllAlbums = catchAsync(async (req, res, next) => {
  const docs = await Album.find();

  // SEND RESPONSE
  res.status(200).json(docs);
});

exports.getAlbum = catchAsync(async (req, res, next) => {
  const doc = await Album.findOne({ id: req.params.album_id });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json(doc);
});

exports.deleteAlbum = catchAsync(async (req, res, next) => {
  const doc = await Album.findOneAndDelete({ id: req.params.album_id });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  await Track.deleteMany({ album_id: req.params.album_id });

  res.status(204).json();
});

exports.getAllTracksOfAlbum = catchAsync(async (req, res, next) => {
  const docs = await Track.find({ album_id: req.params.album_id });

  res.status(200).json(docs);
});

exports.playAllTracksOfAlbum = catchAsync(async (req, res, next) => {
  const doc = await Album.findOne({ id: req.params.album_id });
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  await Track.updateMany(
    { album_id: req.params.album_id },
    {
      $inc: {
        times_played: 1,
      },
    }
  );

  res.status(200).json();
});
