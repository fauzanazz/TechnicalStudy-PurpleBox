const express = require('express');
const crypto = require('crypto');
const users = require('../models/user');

const router = express.Router();

const TOKEN_SECRET = process.env.TOKEN_SECRET

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken(username) {
    return crypto.createHmac('sha256', TOKEN_SECRET).update(username).digest('hex');
}

// Route to register a new user
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = hashPassword(password);

    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});

// Route to login a user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(username);
    res.json({ token });
});

// Route to logout a user
router.post('/logout', (req, res) => {
    // Invalidate the token on the client-side
    res.json({ message: 'User logged out successfully' });
});

module.exports = router;
