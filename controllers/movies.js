const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  INVALID_DATA_FILM_CREATE_ERROR_TEXT,
  FILMS_NOT_FOUND_ERROR_TEXT,
  FILMS_INVALID_ID_ERROR_TEXT,
  INVALID_OWNER_DELETE_FILM_ERROR_TEXT,
  // INVALID_FILMS_ID_NOT_FOUND_TEXT,
} = require('../utils/error-message-text');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('../utils/consts');

const Movie = require('../models/movie');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((r) => r.populate('owner'))
    .then((r) => res.status(HTTP_STATUS_CREATED).send(r))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(INVALID_DATA_FILM_CREATE_ERROR_TEXT));
        return;
      }
      next(e);
    });
};

module.exports.getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .populate(['owner'])
  .then((r) => res.status(HTTP_STATUS_OK).send(r))
  .catch(next);

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  return Movie.findById(movieId)
    .then((r) => {
      if (r === null) {
        throw new NotFoundError(FILMS_NOT_FOUND_ERROR_TEXT);
      }
      if (r.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(INVALID_OWNER_DELETE_FILM_ERROR_TEXT);
      }
      return Movie.deleteOne(r);
    })
    .then((r) => {
      res.status(HTTP_STATUS_OK).send(r);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError(FILMS_INVALID_ID_ERROR_TEXT));
        return;
      }
      next(e);
    });
};
