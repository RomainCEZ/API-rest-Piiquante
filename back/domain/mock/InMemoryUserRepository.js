class InMemoryUserRepository {
    constructor(users) {
        this.users = users
    }
    getOneUser(email) {
        const user = this.users.find( user => user.email === email);
        if (!user) {
            throw 'User not found !';
        } else {
            return user;
        }
    }
    createUserId() {
        return `User-${Date.now()}`;
    }
    saveUser(newUser) {
        newUser.userId = this.createUserId();
        this.users.push(newUser);
    }
}

module.exports = InMemoryUserRepository;