const User = require('./User');
const Email = require('./Email');
const UserPassword = require('./UserPassword');
const TokenService = require('./TokenService');

class UsersHandlingService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUserByEmail(email) { 
        return await this.usersRepository.getUserByEmail(email);
    }
    async createUser({ email, password }) {
        const newUser = new User({email, password});
        this.usersRepository.saveUser(newUser);
    }
    async createLoginSession({ email, password }) {
        const user = await this.getUserByEmail(email.value);
        this.verifyPassword(password, user.password);
        return {
            userId: await user.userId,
            token: TokenService.createUserToken(user.userId)
        };
    }
    verifyPassword(userPassword, userPasswordHash) {
        if (!userPassword.toEqual(userPasswordHash)) {
            throw 'Password invalid !';
        }
    }
}
module.exports = UsersHandlingService;