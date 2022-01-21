const User = require('./User');
const UserPassword = require('./UserPassword');
const TokenService = require('./TokenService');
const bcrypt = require('bcrypt');

class UsersHandlingService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getOneUser(email) { 
        return await this.usersRepository.getOneUser(email);
    }
    createUser(user) {
        const newUser = new User({email: user.email, password: new UserPassword(user.password).password});
        this.usersRepository.saveUser(newUser);
    }
    async createLoginSession(user) {
        const userData = await this.getOneUser(user.email);
        await this.verifyPassword(user.password, userData.password);
        return {
            userId: await userData._id,
            token: TokenService.createUserToken(userData._id)
        };
    }
    async verifyPassword(userPassword, userPasswordHash) {
        const valid = await bcrypt.compare(userPassword, userPasswordHash);
        if (!valid) {
            throw 'Password invalid !';
        }
        return valid;
    }
}
module.exports = UsersHandlingService;