const router = require('express').Router();
// const express = require('express');
const { createMovie, getMovies, deleteMovieById } = require('../controllers/movies');

const { movieValidation, movieIdValidation } = require('../middlewares/movie-validation');

router.get('/movies', getMovies);
router.post('/movies', movieValidation, createMovie);
router.delete('/movies/:movieId', movieIdValidation, deleteMovieById);

module.exports = router;
