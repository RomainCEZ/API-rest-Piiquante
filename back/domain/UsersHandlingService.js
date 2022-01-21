const User = require('./User');
const UserPassword = require('./UserPassword');
const TokenService = require('./TokenService');

class UsersHandlingService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getOneUser(email) { 
        return await this.usersRepository.getOneUser(email);
    }
    async createUser(user) {
        const password = await UserPassword.hashPassword(user.password);
        const newUser = new User({email: user.email, password: password.hash});
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
        const valid = await UserPassword.comparePassword(userPassword, userPasswordHash);
        if (!valid) {
            throw 'Password invalid !';
        }
        return valid;
    }
}
module.exports = UsersHandlingService;