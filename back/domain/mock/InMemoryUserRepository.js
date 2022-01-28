class InMemoryUserRepository {
    constructor(users) {
        this.users = users
    }
    getUserByEmail(email) {
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
    isUnique(email) {
        return this.users.find( user => user.email === email) ? false : true
    }
    saveUser(newUser) {
        if (!this.isUnique(newUser.email)) {
            throw 'Email already registered !';
        } else {
            newUser.userId = this.createUserId();
            this.users.push(newUser);
        }

    }
}

module.exports = InMemoryUserRepository;