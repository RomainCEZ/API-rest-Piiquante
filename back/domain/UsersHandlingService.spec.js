const UsersHandlingService = require('./UsersHandlingService');
const User = require('./User');
const Email = require('./Email');
const UserPassword = require('./UserPassword');
const InMemoryUserRepository = require('./mock/InMemoryUserRepository');
const TokenService = require('./TokenService')
const bcrypt = require('bcrypt');


describe('UsersHandlingService', () => {
    it('Should return an email', () => {
        const email = new Email('email123@domain.com');
        expect(email.value).toBeDefined();
    })
    it('Should throw an error', () => {
        expect(() => {
            new Email('email123domain.com').value
        }).toThrow('Email invalid !');
    })
    it('Should return a hash', () => {
        const password = UserPassword.fromTextPlain('password');
        expect(password.hash).toBeDefined();
    })
    it('Should return user', () => {
        const user = new User({
            email: new Email('email@domain.com'), 
            password: UserPassword.fromTextPlain('password')
        });
        expect(user).toBeDefined();
    })
    it('Should throw an error', async () => {
        const user = new User({
                email: new Email('email@domain.com'), 
                password: UserPassword.fromTextPlain('password')
            });
        const userRepository = new InMemoryUserRepository([user]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        const sameUserEmail = usersHandlingService.createUser({
                email: new Email('email@domain.com'), 
                password: UserPassword.fromTextPlain('password')
            })
        expect(sameUserEmail).rejects.toEqual('Email already registered !');
    })
    it('Should return a specific user from a list of users', async () => {
        const expectedUser = new User({
            email: new Email('email@domain.com'), 
            password: UserPassword.fromTextPlain('password')
        });
        const otherUser = new User({
            email: new Email('otherEmail@domain.com'), 
            password: UserPassword.fromTextPlain('password')
        });
        const userRepository = new InMemoryUserRepository([expectedUser, otherUser]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        const user = await usersHandlingService.getUserByEmail('email@domain.com');
        expect(user).toEqual(expectedUser);
    })
    it('Should create a new user', async () => {
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        await usersHandlingService.createUser({
            email: new Email('email@domain.com'), 
            password: UserPassword.fromTextPlain('password')
        });
        const user = await usersHandlingService.getUserByEmail('email@domain.com');
        expect(user).toBeDefined();
    })
    it('Should create a userId', async () => {
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        await usersHandlingService.createUser({
            email: new Email('email@domain.com'), 
            password: UserPassword.fromTextPlain('password')
        });
        const user = await usersHandlingService.getUserByEmail('email@domain.com')
        expect(user.userId).toBeDefined();
    })
    it('Should return an object containing a user Id and a token', async () => {
        const userData = new User({email: new Email('email@domain.com'), password: UserPassword.fromTextPlain('password')});
        userData.userId = 'userId'
        const userRepository = new InMemoryUserRepository([userData]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        const expectedLoginInfo = {
            userId: userData.userId,
            token: TokenService.createUserToken(userData.userId)
        }
        const loginSession = await usersHandlingService.createLoginSession({
            email: new Email('email@domain.com'), 
            password: UserPassword.fromTextPlain('password')
        })
        expect(loginSession).toEqual(expectedLoginInfo); //can randomly fail, just run the test again
    })
    it('Should have a password', async () => {
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        await usersHandlingService.createUser({email: new Email('email@domain.com'), password: UserPassword.fromTextPlain('password')});
        const user = await usersHandlingService.getUserByEmail('email@domain.com');
        expect(user.password).toBeDefined();
    })
    it('Should compare password and hash and return true', async () => {
        const userRepository = new InMemoryUserRepository([]);
        const usersHandlingService = new UsersHandlingService(userRepository);
        await usersHandlingService.createUser({email: new Email('email@domain.com'), password: UserPassword.fromTextPlain('password')});
        const user = await usersHandlingService.getUserByEmail('email@domain.com');
        expect(UserPassword.fromTextPlain('password').toEqual(user.password)).toBeTruthy();
    })
})