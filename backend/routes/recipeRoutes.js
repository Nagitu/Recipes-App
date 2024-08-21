const express = require('express');
const multer = require('multer');
const { getAllRecipes, createRecipe,likeRecipe,saveRecipe } = require('../controllers/recipeController.js');
const { authenticateToken } = require('../MIddleware/authMiddleware.js');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.get('/', getAllRecipes);
router.post('/', authenticateToken, upload.single('picture_of_food'), createRecipe);

router.post('/recipes/:recipeId/like', likeRecipe);

router.post('/recipes/:recipeId/save',saveRecipe);

module.exports = router;
