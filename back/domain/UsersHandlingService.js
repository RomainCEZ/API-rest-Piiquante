const User = require('./User');
const UserPassword = require('./UserPassword');
const TokenService = require('./TokenService');

class UsersHandlingService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    getOneUser(email) { 
        return this.usersRepository.getOneUser(email);
    }
    async createUser(user) {
        const newUser = new User({email: user.email, password: new UserPassword(user.password).password});
        console.log(newUser)
        this.usersRepository.saveUser(newUser);
    }
    createLoginSession(user) {
        const newUser = this.getOneUser(user.email);
        this.verifyPassword(user.password, user.password);
        return {
            userId: newUser.userId,
            token: TokenService.createUserToken(newUser.userId)
        };
    }
    verifyPassword(userDTOPassword, userPassword) {
        if (userDTOPassword !== userPassword) 
        {
            throw 'Password invalid !';
        }
    }
}
module.exports = UsersHandlingService;