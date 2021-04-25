const Artist = require('../models/artistModel');
const Album = require('../models/albumModel');
const Track = require('../models/trackModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createArtist = catchAsync(async (req, res, next) => {
  req.body.self = req.headers.host;
  req.body.albums = req.headers.host;
  req.body.tracks = req.headers.host;

  const newDoc = await Artist.create(req.body);

  res.status(201).json({
    newDoc,
  });
});

exports.getAllArtists = catchAsync(async (req, res, next) => {
  const docs = await Artist.find();

  // SEND RESPONSE
  res.status(200).json({
    docs,
  });
});

exports.getArtist = catchAsync(async (req, res, next) => {
  const doc = await Artist.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    doc,
  });
});

exports.deleteArtist = catchAsync(async (req, res, next) => {
  const doc = await Artist.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json();
});

exports.getAllAlbumsOfArtist = catchAsync(async (req, res, next) => {
  const docs = await Album.find({ artist_id: req.params.artist_id });

  res.status(200).json({
    docs,
  });
});

exports.getAllTracksOfArtist = catchAsync(async (req, res, next) => {
  const docs = await Track.find({ artist_id: req.params.artist_id });

  res.status(200).json({
    docs,
  });
});
