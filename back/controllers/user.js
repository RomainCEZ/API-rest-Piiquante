const UsersHandlingService = require('../domain/UsersHandlingService');
const User = require('../domain/User');
const InMemoryUserRepository = require('../domain/mock/InMemoryUserRepository');

class UserRequestDTO {
    constructor({email, password}) {
        this.email = email,
        this.password = password
    }
}

const placeholderUser = new User({
    email: '123@123.fr',
    password: '123'
});
const userRepository = new InMemoryUserRepository([]);
const usersHandlingService = new UsersHandlingService(userRepository);
usersHandlingService.createUser(placeholderUser)


exports.signup = (req, res, next) => {
    const userSignupRequest = req.body;
    const newUserRequestDTO = new UserRequestDTO({
        ...userSignupRequest
    });
    usersHandlingService.createUser(newUserRequestDTO)
        .then( () => res.status(201).json({
            message: 'New user created !'
        })).catch( error => res.status(500).json(error));
}

exports.login = (req, res, next) => {
    const userLoginRequest = req.body;
    usersHandlingService.createLoginSession(userLoginRequest)
        .then( userLogin => res.status(200).json(userLogin))
        .catch( error => res.status(401).json(error));
}