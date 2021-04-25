const Album = require('../models/albumModel');
const Track = require('../models/trackModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createAlbum = catchAsync(async (req, res, next) => {
  req.body.self = req.headers.host;
  req.body.artist = req.headers.host;
  req.body.tracks = req.headers.host;

  const newDoc = await Album.create(req.body);

  res.status(201).json({
    newDoc,
  });
});

exports.getAllAlbums = catchAsync(async (req, res, next) => {
  const docs = await Album.find();

  // SEND RESPONSE
  res.status(200).json({
    docs,
  });
});

exports.getAlbum = catchAsync(async (req, res, next) => {
  const doc = await Album.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    doc,
  });
});

exports.deleteAlbum = catchAsync(async (req, res, next) => {
  const doc = await Album.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json();
});

exports.getAllTracksOfAlbum = catchAsync(async (req, res, next) => {
  const docs = await Track.find({ album_id: req.params.album_id });

  res.status(200).json({
    docs,
  });
});
