const bcrypt = require('bcrypt');

class UserPassword {
    constructor(password) {
        this.password = this.passwordHash(password);
    }
    async passwordHash(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
}

module.exports = UserPassword;