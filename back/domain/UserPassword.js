const bcrypt = require('bcrypt');

class UserPassword {
    constructor(textPlainUserPassword, hashUserPassword) {
        this.textPlainUserPassword = textPlainUserPassword;
        this.hashUserPassword = hashUserPassword;
        if (!this.hash) {
            this.hash = bcrypt.hashSync(this.value, 10);
        }
    }
    get value() {
        return this.textPlainUserPassword;
    }
    get hash() {
        if (!this.hashUserPassword) {
            this.hashUserPassword = bcrypt.hashSync(this.value, 10);
        }
        return this.hashUserPassword;
    }

    toEqual(hash) {
        return bcrypt.compareSync(this.value, hash);
    }
    static fromHash(hash) {
        return new UserPassword(null, hash);
    }
    static fromTextPlain(textPlainUserPassword) {
        return new UserPassword(textPlainUserPassword, null);
    }
}

module.exports = UserPassword;