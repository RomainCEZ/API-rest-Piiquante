const bcrypt = require('bcrypt');

class UserPassword {
    constructor(password) {
        this.password = bcrypt.hashSync(password, 10);
    }    
}

module.exports = UserPassword;