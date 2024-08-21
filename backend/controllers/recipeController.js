const Recipe = require('../models/Recipe');
const User = require('../models/User');

// Get All Recipes
exports.getAllRecipes = async (req, res) => {
  try {
    // const recipes = await Recipe.findAll({ include: User });
    const recipes = await Recipe.findAll({ include: User });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRecipe = async (req, res) => {
  const { title, ingredients, cooking_time, difficulty, picture_of_food } = req.body;
  const userId = req.user.id; // Asumsi user sudah diotentikasi dan ID disimpan di req.user.id

  try {
    const recipe = await Recipe.create({
      title,
      ingredients,
      cooking_time,
      difficulty,
      picture_of_food,
      userId
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sukai Resep
exports.likeRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.id;

  try {
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    await recipe.addLikedByUsers(userId);
    res.status(200).json({ message: "Recipe liked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.id;

  try {
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    await recipe.addSavedByUsers(userId);
    res.status(200).json({ message: "Recipe saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
