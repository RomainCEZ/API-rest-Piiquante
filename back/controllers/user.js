exports.signup = (req, res, next) => {
    res.status(201).json({
        message: 'New user created !'
    });
}

exports.login = (req, res, next) => {
    res.status(200).json({
        userId: 'free_login_for_everyone',
        token: 'super_secret_token'
    });
}