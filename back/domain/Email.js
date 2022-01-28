class Email {
    constructor(email) {
        this.email = email;
    }
    get value() {
        const emailIsValid = this.emailIsValid(this.email)
        if(!emailIsValid) {
            throw 'Email invalid !';
        }
        return this.email;
    }
    emailIsValid(email) {
        return new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i).test(email);
        // return new RegExp(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[a\w-]*[\w])?/i).test(email);
    }
}

module.exports = Email;