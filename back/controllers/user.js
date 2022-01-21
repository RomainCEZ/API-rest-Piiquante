const UsersHandlingService = require('../domain/UsersHandlingService');
const User = require('../domain/User');
const User = require('../models/User');
const MongoDBAdapter = require('../adapter/MongoDBAdapter');
const InMemoryUserRepository = require('../domain/mock/InMemoryUserRepository');

class UserRequestDTO {
    constructor({email, password}) {
        this.email = email,
        this.password = password
    }
}

// const placeholderUser = new User({
//     email: '123@123.fr',
//     password: '123'
// });
const userRepository = new InMemoryUserRepository([]);
// const userRepository = new MongoDBAdapter();

const usersHandlingService = new UsersHandlingService(userRepository);
// usersHandlingService.createUser(placeholderUser)


exports.signup = (req, res, next) => {
    const userSignupRequest = req.body;
    const newUserRequestDTO = new UserRequestDTO({
        ...userSignupRequest
    });
    try {
        usersHandlingService.createUser(newUserRequestDTO);
        res.status(201).json({ message: 'New user created !' });
    }
    catch {
        res.status(500).json({ error });
    }
}

exports.login = async (req, res, next) => {
    try {
        const userLoginRequest = req.body;
        const userLogin = await usersHandlingService.createLoginSession(userLoginRequest)
        res.status(200).json(userLogin)
    } catch (error) {
        res.status(401).json({ error })
    }
}