const User = require('./User');
const UserPassword = require('./UserPassword');
const TokenService = require('./TokenService');
const bcrypt = require('bcrypt');

class UsersHandlingService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    getOneUser(email) { 
        return this.usersRepository.getOneUser(email);
    }
    createUser(user) {
        const newUser = new User({email: user.email, password: new UserPassword(user.password).password});
        this.usersRepository.saveUser(newUser);
    }
    async createLoginSession(user) {
        const userData = this.getOneUser(user.email);

        this.verifyPassword(user.password, userData.password);
        return {
            userId: userData.userId,
            token: TokenService.createUserToken(userData.userId)
        };
    }
    verifyPassword(userPassword, userPasswordHash) {
        if (!bcrypt.compareSync(userPassword, userPasswordHash)) {
            throw 'Password invalid !';
        }
        return true;
    }
}
module.exports = UsersHandlingService;