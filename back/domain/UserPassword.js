const bcrypt = require('bcrypt');

class UserPassword {
    constructor(hash) {
        // this.password = bcrypt.hashSync(password, 10);
        this.hash = hash;
    }
    static async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return new UserPassword(hash);
    }
    static async comparePassword(userPassword, userPasswordHash) {
        const valid = await bcrypt.compare(userPassword, userPasswordHash);
        return valid;
    }
}

module.exports = UserPassword;