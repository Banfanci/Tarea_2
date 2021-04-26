const express = require('express');
const trackController = require('../controllers/trackController');

const router = express.Router();

router.route('/').get(trackController.getAllTracks);

router
  .route('/:track_id')
  .get(trackController.getTrack)
  .delete(trackController.deleteTrack);

router.route('/:track_id/play').put(trackController.playTrack);

module.exports = router;
