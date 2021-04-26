const express = require('express');
const albumController = require('../controllers/albumController');
const trackController = require('../controllers/trackController');

const router = express.Router();

router.route('/').get(albumController.getAllAlbums);

router
  .route('/:album_id')
  .get(albumController.getAlbum)
  .delete(albumController.deleteAlbum);

router
  .route('/:album_id/tracks')
  .get(albumController.getAllTracksOfAlbum)
  .post(trackController.createTrack);

router
  .route('/:album_id/tracks/play')
  .put(albumController.playAllTracksOfAlbum);

module.exports = router;
