const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Recipe = require('./Recipe');

const LikedRecipe = sequelize.define('LikedRecipe', {
}, {
  timestamps: true,
});


module.exports = LikedRecipe;