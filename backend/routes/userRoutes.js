const express = require('express');
const router = express.Router();
const {getAllUsers,createUser} = require('../controllers/userController')
const { authenticateToken } = require('../MIddleware/authMiddleware.js');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


// Mendefinisikan rute GET untuk mendapatkan semua pengguna
router.get('/', getAllUsers);
router.post('/', createUser);
module.exports = router;
