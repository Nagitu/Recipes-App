const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User'); // Pastikan model User diimpor

const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cooking_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
  },
  picture_of_food: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
});

Recipe.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Recipe, { foreignKey: 'userId' });

module.exports = Recipe;
