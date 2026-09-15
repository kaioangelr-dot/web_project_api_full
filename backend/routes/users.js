const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/:id', getUser);

module.exports = router;
