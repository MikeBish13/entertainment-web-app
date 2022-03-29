const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser, updateUser} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/:id', updateUser);
router.get('/me', protect, getUser)

module.exports = router;