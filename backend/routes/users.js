const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/:id', getUser);
router.get('/', getAllUsers);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
