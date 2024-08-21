const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = process.env;
const { Op } = require('sequelize');



exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
  }
  if (!username) {
      return res.status(400).json({ message: "Username is required" });
  }
  if (!password) {
      return res.status(400).json({ message: "Password is required" });
  }
  const isUserExist = await User.findOne({
      where: {
          [Op.or]: [
              { email: email },
              { username: username }
          ]
      }
  });
  if (isUserExist) {
    if (isUserExist.email === email) {
        return res.status(400).json({ error: 'Email already in use' });
    }
    if (isUserExist.username === username) {
        return res.status(400).json({ error: 'Username already in use' });
    }
}
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or username' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

    jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Invalid refresh token' });

      const newAccessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
