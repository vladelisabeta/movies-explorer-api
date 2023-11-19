const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const INVALID_PATH_ERROR_TEXT = require('../utils/error-message-text');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { signupValidation, signinValidation } = require('../middlewares/user-validation');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);

router.use('/', userRoutes);
router.use('/', movieRoutes);

// ошибка такой страницы не существует
router.use('*', (req, res, next) => {
  next(new NotFoundError(INVALID_PATH_ERROR_TEXT));
});

module.exports = router;
