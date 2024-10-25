const crypto = require('crypto');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

function generateToken(username) {
    if (!username) {
        throw new Error('Username is required to generate a token');
    }
    return crypto.createHmac('sha256', TOKEN_SECRET).update(username).digest('hex');
}

module.exports = generateToken;