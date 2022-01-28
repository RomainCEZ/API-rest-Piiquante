
class User {
    constructor({email, password}) {
        this.email = email.value;
        this.password = password.hash;
    }
    // get email() {
    //     return this.email.value;
    // }
    // get password() {
    //     return this.password.hash;
    // }
}

module.exports = User;