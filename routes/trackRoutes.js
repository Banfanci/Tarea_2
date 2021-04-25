const express = require('express');
const trackController = require('../controllers/trackController');

const router = express.Router();

router.route('/').get(trackController.getAllTracks);

router
  .route('/:track_id')
  .get(trackController.getTrack)
  .delete(trackController.deleteTrack);

module.exports = router;
