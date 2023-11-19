const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('../utils/consts');

const {
  USER_ALREADY_EXISTS_ERROR_TEXT,
  USER_INVALID_DATA_ERROR_TEXT,
  USER_INVALID_DATA_UPDATE_ERROR_TEXT,
  USER_NOT_FOUND_ERROR_TEXT,
} = require('../utils/error-message-text');

const { NODE_ENV, JWT_SECRET } = process.env;

const SALT_TIMES = 10;
const DB_DUPLCATE_ERROR_CODE = 11000;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_TIMES)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((r) => res.status(HTTP_STATUS_CREATED).send({
      name: r.name, email: r.email, _id: r._id,
    }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(USER_INVALID_DATA_ERROR_TEXT));
        return;
      }
      if (e.code === DB_DUPLCATE_ERROR_CODE) {
        next(new ConflictError(USER_ALREADY_EXISTS_ERROR_TEXT));
        return;
      }
      next(e);
    });
};

// // GET USER BY ID
module.exports.getUserById = (req, res, next) => User.findById(req.user._id)
  .then((r) => {
    if (r === null) {
      throw new NotFoundError(USER_NOT_FOUND_ERROR_TEXT);
    }
    return res.status(HTTP_STATUS_OK).send(r);
  })
  .catch((e) => {
    if (e.name === 'CastError') {
      next(new BadRequestError(USER_NOT_FOUND_ERROR_TEXT));
      return;
    }
    next(e);
  });

module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((r) => {
      if (r === null) {
        throw new NotFoundError(USER_NOT_FOUND_ERROR_TEXT);
      }
      return res.status(HTTP_STATUS_OK).send(r);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(USER_INVALID_DATA_UPDATE_ERROR_TEXT));
        return;
      }
      next(e);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.send({ token });
      // res.send(token);
    })
    .catch(next);
  // .catch((e) => {
  //   console.log(e, 'this is token in login');
  //   next(e);
  // });
};
