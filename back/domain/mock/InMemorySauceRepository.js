class InMemorySauceRepository {
    constructor(sauces) {
        this.sauces = sauces;
    }
    getSauces() {
        return this.sauces;
    }
    addNewSauce(newSauce) {
        this.sauces.push(newSauce);
    }
}

module.exports = InMemorySauceRepository;