const UsersHandlingService = require('./UsersHandlingService');
const User = require('./User');
const UserPassword = require('./UserPassword');
const InMemoryUserRepository = require('./mock/InMemoryUserRepository');
const TokenService = require('./TokenService')

describe('UsersHandlingService', () => {
    it('Should return a specific user from a list of users', () => {
        const expectedUser = new User({email: 'email'});
        const otherUser = new User({email: 'otherEmail'});
        const userRepository = new InMemoryUserRepository([expectedUser, otherUser]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        expect(usersHandlingService.getOneUser('email')).toEqual(expectedUser);
    })
    it('Should create a new user', () => {
        const newUser = new User({email: 'email'})
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        usersHandlingService.createUser(newUser);
        expect(usersHandlingService.getOneUser('email')).toBeDefined();
    })
    it('Should create a userId', () => {
        const newUser = new User({email: 'email'})
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        usersHandlingService.createUser(newUser);
        expect(usersHandlingService.getOneUser('email').userId).toBeDefined();
    })
    it('Should return an object containing a user Id and a token', () => {
        const user = new User({email: 'email'});
        const userRepository = new InMemoryUserRepository([user]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        const expectedLoginInfo = {
            userId: user.userId,
            token: TokenService.createUserToken(user.userId)
        }
        expect(usersHandlingService.createLoginSession(user)).toEqual(expectedLoginInfo);
    })
})