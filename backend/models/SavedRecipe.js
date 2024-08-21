const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Recipe = require('./Recipe');

const SavedRecipe = sequelize.define('SavedRecipe', {
}, {
  timestamps: true,
});

module.exports = SavedRecipe;