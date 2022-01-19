const TokenService = require('../domain/TokenService');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = TokenService.decodeToken(token);
        const decodedUserId = decodedToken.userId;
        req.auth = { decodedUserId };
        if (req.body.userId && decodedUserId !== req.body.userId) {
            throw 'User Id invalid !';
        }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed !' })
    }
}