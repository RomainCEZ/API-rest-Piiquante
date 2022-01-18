const jsonwebtoken = require('jsonwebtoken')

class TokenService {
    constructor() {
        this.secret = 'THIS_IS_A_SECRET_DONT_TELL_ANYONE';
    }
    static createUserToken(userId) {
        const token = jsonwebtoken.sign(
            { userId },
            `${this.secret}`,
            { expiresIn: '24h' }
        );
        return token;
    }
    static decodeToken(token) {
        return jsonwebtoken.verify(token, `${this.secret}`);
    }
}

module.exports = TokenService;