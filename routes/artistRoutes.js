const express = require('express');
const artistController = require('../controllers/artistController');
const albumController = require('../controllers/albumController');

const router = express.Router();

router
  .route('/')
  .get(artistController.getAllArtists)
  .post(artistController.createArtist);

router
  .route('/:artist_id')
  .get(artistController.getArtist)
  .delete(artistController.deleteArtist);

router
  .route('/:artist_id/albums')
  .get(artistController.getAllAlbumsOfArtist)
  .post(albumController.createAlbum);

router.route('/:artist_id/tracks').get(artistController.getAllTracksOfArtist);

router
  .route('/:artist_id/albums/play')
  .put(artistController.playAllTracksOfArtist);

module.exports = router;
