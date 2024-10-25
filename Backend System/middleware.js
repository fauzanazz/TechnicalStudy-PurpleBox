function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    const username = req.body.username;
    const expectedToken = generateToken(username);

    if (token !== expectedToken) return res.sendStatus(403);
    next();
}

module.exports = authenticateToken;
