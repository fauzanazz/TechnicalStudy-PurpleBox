const generateToken = require('./generateToken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    const username = req.body.username;
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    const expectedToken = generateToken(username);

    if (token !== expectedToken) return res.sendStatus(403);
    next();
}

module.exports = authenticateToken;
