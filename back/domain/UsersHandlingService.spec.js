const UsersHandlingService = require('./UsersHandlingService');
const User = require('./User');
const UserPassword = require('./UserPassword');
const InMemoryUserRepository = require('./mock/InMemoryUserRepository');
const TokenService = require('./TokenService')
const bcrypt = require('bcrypt');


describe('UsersHandlingService', () => {
    it('Should return a specific user from a list of users', async () => {
        const expectedUser = new User({email: 'email'});
        const otherUser = new User({email: 'otherEmail'});
        const userRepository = new InMemoryUserRepository([expectedUser, otherUser]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        const user = await usersHandlingService.getOneUser('email');
        expect(user).toEqual(expectedUser);
    })
    it('Should create a new user', () => {
        const newUser = new User({email: 'email', password: 'password'})
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        usersHandlingService.createUser(newUser);
        expect(usersHandlingService.getOneUser('email')).toBeDefined();
    })
    it('Should create a userId', async () => {
        const newUser = new User({email: 'email', password: 'password'})
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        usersHandlingService.createUser(newUser);
        const user = await usersHandlingService.getOneUser('email')
        expect(user.userId).toBeDefined();
    })
    it('Should return an object containing a user Id and a token', async () => {
        const userData = new User({email: 'email', password: new UserPassword('password').password});
        const userRepository = new InMemoryUserRepository([userData]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        const expectedLoginInfo = {
            userId: userData.userId,
            token: TokenService.createUserToken(userData.userId)
        }
        const user = new User({email: 'email', password: 'password'});
        const loginSession = await usersHandlingService.createLoginSession(user)
        expect(loginSession).toEqual(expectedLoginInfo);
    })
    it('Should have a password', async () => {
        const newUser = new User({email: 'email', password: 'password'});
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        usersHandlingService.createUser(newUser);
        const user = await usersHandlingService.getOneUser('email');
        expect(user.password).toBeDefined();
    })
    it('Should compare password and hash and return true', async () => {
        const newUser = new User({email: 'email', password: 'testpassword'});
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        usersHandlingService.createUser(newUser);
        const user = await usersHandlingService.getOneUser('email');
        expect(usersHandlingService.verifyPassword('testpassword', user.password)).toBeTruthy();
    })
})