const User = require('../models/User');
const { Op } = require('sequelize');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
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
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};