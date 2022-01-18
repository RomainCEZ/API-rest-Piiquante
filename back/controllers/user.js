const UsersHandlingService = require('../domain/UsersHandlingService');
const User = require('../domain/User');
const InMemoryUserRepository = require('../domain/mock/InMemoryUserRepository');

class UserRequestDTO {
    constructor({email, password}) {
        this.email = email,
        this.password = password
    }
}

const placeholderUser = new User(
    '123@123.fr',
    "123"
);
placeholderUser.userId = 'placeholder userId'

const userRepository = new InMemoryUserRepository([placeholderUser]);
const usersHandlingService = new UsersHandlingService(userRepository);

exports.signup = (req, res, next) => {
    const userSignupRequest = req.body;
    const newUserRequestDTO = new UserRequestDTO({
        ...userSignupRequest
    });
    try {
        usersHandlingService.createUser(newUserRequestDTO);
        res.status(201).json({
            message: 'New user created !'
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.login = (req, res, next) => {
    try {
        const userLoginRequest = req.body;
        const userLogin = usersHandlingService.createLoginSession(userLoginRequest);
        res.status(200).json(userLogin);    
    } catch (error) {
        res.status(401).json(error);
    }
}