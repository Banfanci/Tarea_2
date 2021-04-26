const Track = require('../models/trackModel');
const Album = require('../models/albumModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTrack = catchAsync(async (req, res, next) => {
  req.body.self = req.headers.host;
  req.body.artist = req.headers.host;
  req.body.album = req.headers.host;
  req.body.album_id = req.params.album_id;

  const album = await Album.findOne({ id: req.params.album_id });
  if (!album) {
    return next(new AppError('No document found with that ID', 422));
  }

  req.body.artist_id = album.artist_id;

  const newDoc = await Track.create(req.body).catch(async (err) => {
    if (err.code === 11000) {
      const rdoc = await Track.findOne({ id: err.keyValue.id });
      res.status(409).json(rdoc);
    }
  });

  res.status(201).json(newDoc);
});

exports.getAllTracks = catchAsync(async (req, res, next) => {
  const docs = await Track.find();

  // SEND RESPONSE
  res.status(200).json(docs);
});

exports.getTrack = catchAsync(async (req, res, next) => {
  const doc = await Track.findOne({ id: req.params.track_id });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json(doc);
});

exports.deleteTrack = catchAsync(async (req, res, next) => {
  const doc = await Track.findOneAndDelete({ id: req.params.track_id });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json();
});

exports.playTrack = catchAsync(async (req, res, next) => {
  const doc = await Track.findOne({ id: req.params.track_id });
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  await Track.updateOne(
    { id: req.params.track_id },
    {
      $inc: {
        times_played: 1,
      },
    }
  );

  res.status(200).json();
});
