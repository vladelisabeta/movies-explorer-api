const router = require('express').Router();
const { userValidation } = require('../middlewares/user-validation');

const { getUserById, updateUserProfile } = require('../controllers/users');

router.get('/users/me', getUserById);
router.patch('/users/me', userValidation, updateUserProfile);

module.exports = router;
