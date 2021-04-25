const Track = require('../models/trackModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTrack = catchAsync(async (req, res, next) => {
  req.body.self = req.headers.host;
  req.body.artist = req.headers.host;
  req.body.album = req.headers.host;

  const newDoc = await Track.create(req.body);

  res.status(201).json({
    newDoc,
  });
});

exports.getAllTracks = catchAsync(async (req, res, next) => {
  const docs = await Track.find();

  // SEND RESPONSE
  res.status(200).json({
    docs,
  });
});

exports.getTrack = catchAsync(async (req, res, next) => {
  const doc = await Track.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    doc,
  });
});

exports.deleteTrack = catchAsync(async (req, res, next) => {
  const doc = await Track.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json();
});
